package com.bankofindia.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    // UPI PIN is stored hashed, exactly like the login password.
    // Never store or transmit the raw PIN.
    @Column(nullable = false)
    private String upiPinHash;

    public User() {}

    public User(String fullName, String email, String passwordHash, String upiPinHash) {
        this.fullName = fullName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.upiPinHash = upiPinHash;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getUpiPinHash() { return upiPinHash; }
    public void setUpiPinHash(String upiPinHash) { this.upiPinHash = upiPinHash; }
}
