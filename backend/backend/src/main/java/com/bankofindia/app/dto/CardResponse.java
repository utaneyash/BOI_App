package com.bankofindia.app.dto;

public class CardResponse {
    private String maskedNumber; // e.g. "•••• •••• •••• 4471"
    private String cardHolderName;
    private String expiry; // e.g. "08/29"
    private String status;

    public CardResponse(String maskedNumber, String cardHolderName, String expiry, String status) {
        this.maskedNumber = maskedNumber;
        this.cardHolderName = cardHolderName;
        this.expiry = expiry;
        this.status = status;
    }

    public String getMaskedNumber() { return maskedNumber; }
    public String getCardHolderName() { return cardHolderName; }
    public String getExpiry() { return expiry; }
    public String getStatus() { return status; }
}
