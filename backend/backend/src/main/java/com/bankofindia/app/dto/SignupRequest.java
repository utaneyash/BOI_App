package com.bankofindia.app.dto;

import jakarta.validation.constraints.*;

public class SignupRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "UPI PIN is required")
    @Pattern(regexp = "\\d{4,6}", message = "PIN must be 4-6 digits")
    private String upiPin;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getUpiPin() { return upiPin; }
    public void setUpiPin(String upiPin) { this.upiPin = upiPin; }
}
