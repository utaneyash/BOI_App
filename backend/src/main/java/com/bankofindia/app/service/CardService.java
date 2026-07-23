package com.bankofindia.app.service;

import com.bankofindia.app.dto.CardResponse;
import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.Card;
import com.bankofindia.app.exception.ApiException;
import com.bankofindia.app.repository.CardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@Service
public class CardService {

    private final AccountService accountService;
    private final CardRepository cardRepository;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final DateTimeFormatter EXPIRY_FORMAT = DateTimeFormatter.ofPattern("MM/yy");

    public CardService(AccountService accountService, CardRepository cardRepository) {
        this.accountService = accountService;
        this.cardRepository = cardRepository;
    }

    public CardResponse getMyCard(String email) {
        Account account = accountService.getPrimaryAccount(email);
        Card card = cardRepository.findByAccount(account)
                .orElseThrow(() -> new ApiException("No card found for this account", HttpStatus.NOT_FOUND));

        return toResponse(card);
    }

    @Transactional
    public CardResponse applyForCard(String email) {
        Account account = accountService.getPrimaryAccount(email);

        if (cardRepository.existsByAccount(account)) {
            throw new ApiException("An account can only have one card in this demo", HttpStatus.CONFLICT);
        }

        String cardNumber = generateCardNumber();
        YearMonth expiry = YearMonth.now().plusYears(4);

        Card card = new Card(account, cardNumber, account.getUser().getFullName(), expiry);
        cardRepository.save(card);

        return toResponse(card);
    }

    private CardResponse toResponse(Card card) {
        String last4 = card.getCardNumber().substring(card.getCardNumber().length() - 4);
        String masked = "•••• •••• •••• " + last4;
        return new CardResponse(masked, card.getCardHolderName(), card.getExpiry().format(EXPIRY_FORMAT), card.getStatus().name());
    }

    private String generateCardNumber() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) sb.append(RANDOM.nextInt(10));
        return sb.toString();
    }
}
