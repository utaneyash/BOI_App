package com.bankofindia.app.controller;

import com.bankofindia.app.dto.CardResponse;
import com.bankofindia.app.service.CardService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/me")
    public CardResponse getMyCard(Authentication authentication) {
        return cardService.getMyCard(authentication.getName());
    }

    @PostMapping("/apply")
    public CardResponse applyForCard(Authentication authentication) {
        return cardService.applyForCard(authentication.getName());
    }
}
