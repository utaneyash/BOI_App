package com.bankofindia.app.controller;

import com.bankofindia.app.dto.AccountResponse;
import com.bankofindia.app.dto.TransactionResponse;
import com.bankofindia.app.service.AccountService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/me")
    public AccountResponse getMyAccount(Authentication authentication) {
        return accountService.getAccountSummary(authentication.getName());
    }

    @GetMapping("/me/transactions")
    public List<TransactionResponse> getMyTransactions(Authentication authentication) {
        return accountService.getTransactionHistory(authentication.getName());
    }
}
