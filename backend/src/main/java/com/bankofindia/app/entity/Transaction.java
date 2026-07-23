package com.bankofindia.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "transactions")
public class Transaction {

    public enum Type { DEPOSIT, WITHDRAW, UPI_TRANSFER }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    private String counterpartyUpiId; // who money was sent to, for UPI_TRANSFER

    private String note;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    public Transaction() {}

    public Transaction(Account account, Type type, BigDecimal amount, String counterpartyUpiId, String note) {
        this.account = account;
        this.type = type;
        this.amount = amount;
        this.counterpartyUpiId = counterpartyUpiId;
        this.note = note;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }

    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCounterpartyUpiId() { return counterpartyUpiId; }
    public void setCounterpartyUpiId(String counterpartyUpiId) { this.counterpartyUpiId = counterpartyUpiId; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
