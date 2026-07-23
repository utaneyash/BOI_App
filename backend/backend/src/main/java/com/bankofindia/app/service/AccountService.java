package com.bankofindia.app.service;

import com.bankofindia.app.dto.AccountResponse;
import com.bankofindia.app.dto.TransactionResponse;
import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.Transaction;
import com.bankofindia.app.entity.User;
import com.bankofindia.app.exception.ApiException;
import com.bankofindia.app.repository.AccountRepository;
import com.bankofindia.app.repository.TransactionRepository;
import com.bankofindia.app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public AccountService(UserRepository userRepository, AccountRepository accountRepository,
                           TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public Account getPrimaryAccount(String email) {
        User user = getUserByEmail(email);
        return accountRepository.findFirstByUser(user)
                .orElseThrow(() -> new ApiException("No account found for this user", HttpStatus.NOT_FOUND));
    }

    public AccountResponse getAccountSummary(String email) {
        Account account = getPrimaryAccount(email);
        return new AccountResponse(account.getAccountNumber(), account.getAccountType(),
                account.getBalance(), account.getUpiId());
    }

    public List<TransactionResponse> getTransactionHistory(String email) {
        Account account = getPrimaryAccount(email);
        List<Transaction> transactions = transactionRepository.findByAccountOrderByCreatedAtDesc(account);

        return transactions.stream()
                .map(t -> new TransactionResponse(
                        t.getId(), t.getType().name(), t.getAmount(),
                        t.getCounterpartyUpiId(), t.getNote(), t.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
