package com.bankofindia.app.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class UpiPaymentRequest {

    @NotBlank(message = "Recipient UPI ID is required")
    @Pattern(regexp = "^[\\w.\\-]{2,256}@[a-zA-Z]{2,64}$", message = "Enter a valid UPI ID, e.g. name@bank")
    private String upiId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    private String note;

    @NotBlank(message = "UPI PIN is required")
    private String pin;

    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }
}
