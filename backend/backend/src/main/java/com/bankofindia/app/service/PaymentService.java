package com.bankofindia.app.service;

import com.bankofindia.app.dto.TransactionResponse;
import com.bankofindia.app.dto.UpiPaymentRequest;
import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.Transaction;
import com.bankofindia.app.entity.User;
import com.bankofindia.app.exception.ApiException;
import com.bankofindia.app.repository.AccountRepository;
import com.bankofindia.app.repository.TransactionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public PaymentService(AccountService accountService, AccountRepository accountRepository,
                           TransactionRepository transactionRepository, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // NOTE: In a real UPI integration, PIN entry and verification happen through
    // NPCI's infrastructure via a licensed PSP bank — an app never verifies a
    // live UPI PIN on its own servers. This endpoint is a simplified stand-in
    // for demo/learning purposes only. It also doesn't yet rate-limit failed
    // PIN attempts, which a real implementation must do (e.g. lock after 3 tries).
    @Transactional
    public TransactionResponse sendUpiPayment(String email, UpiPaymentRequest request) {
        User user = accountService.getUserByEmail(email);
        Account account = accountService.getPrimaryAccount(email);

        if (!passwordEncoder.matches(request.getPin(), user.getUpiPinHash())) {
            throw new ApiException("Incorrect UPI PIN", HttpStatus.UNAUTHORIZED);
        }

        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new ApiException("Insufficient balance", HttpStatus.BAD_REQUEST);
        }

        // Debit the sender. (A complete implementation would also credit the
        // recipient's account if they're on the same bank/system.)
        account.setBalance(account.getBalance().subtract(request.getAmount()));
        accountRepository.save(account);

        Transaction transaction = new Transaction(
                account,
                Transaction.Type.UPI_TRANSFER,
                request.getAmount(),
                request.getUpiId(),
                request.getNote()
        );
        transactionRepository.save(transaction);

        return new TransactionResponse(
                transaction.getId(), transaction.getType().name(), transaction.getAmount(),
                transaction.getCounterpartyUpiId(), transaction.getNote(), transaction.getCreatedAt()
        );
    }
}
