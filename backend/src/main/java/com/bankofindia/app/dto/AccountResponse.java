package com.bankofindia.app.dto;

import java.math.BigDecimal;

public class AccountResponse {
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String upiId;

    public AccountResponse(String accountNumber, String accountType, BigDecimal balance, String upiId) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.upiId = upiId;
    }

    public String getAccountNumber() { return accountNumber; }
    public String getAccountType() { return accountType; }
    public BigDecimal getBalance() { return balance; }
    public String getUpiId() { return upiId; }
}
