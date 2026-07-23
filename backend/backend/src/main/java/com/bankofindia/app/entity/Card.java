package com.bankofindia.app.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.YearMonth;

@Entity
@Table(name = "cards")
public class Card {

    public enum Status { ACTIVE, BLOCKED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false, unique = true)
    private Account account;

    @Column(nullable = false, unique = true)
    private String cardNumber; // stored in full here for a demo; a real system would tokenize this via a card network/PCI-DSS vault, never store raw PANs itself

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private YearMonth expiry;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.ACTIVE;

    @Column(nullable = false)
    private Instant issuedAt = Instant.now();

    public Card() {}

    public Card(Account account, String cardNumber, String cardHolderName, YearMonth expiry) {
        this.account = account;
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expiry = expiry;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }
    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    public String getCardHolderName() { return cardHolderName; }
    public void setCardHolderName(String cardHolderName) { this.cardHolderName = cardHolderName; }
    public YearMonth getExpiry() { return expiry; }
    public void setExpiry(YearMonth expiry) { this.expiry = expiry; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public Instant getIssuedAt() { return issuedAt; }
    public void setIssuedAt(Instant issuedAt) { this.issuedAt = issuedAt; }
}
