package com.bankofindia.app.dto;

import java.math.BigDecimal;
import java.time.Instant;

public class TransactionResponse {
    private Long id;
    private String type;
    private BigDecimal amount;
    private String counterpartyUpiId;
    private String note;
    private Instant createdAt;

    public TransactionResponse(Long id, String type, BigDecimal amount, String counterpartyUpiId, String note, Instant createdAt) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.counterpartyUpiId = counterpartyUpiId;
        this.note = note;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public BigDecimal getAmount() { return amount; }
    public String getCounterpartyUpiId() { return counterpartyUpiId; }
    public String getNote() { return note; }
    public Instant getCreatedAt() { return createdAt; }
}
