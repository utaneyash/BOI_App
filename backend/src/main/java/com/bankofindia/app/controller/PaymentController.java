package com.bankofindia.app.controller;

import com.bankofindia.app.dto.TransactionResponse;
import com.bankofindia.app.dto.UpiPaymentRequest;
import com.bankofindia.app.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/upi")
    public TransactionResponse sendUpiPayment(Authentication authentication,
                                               @Valid @RequestBody UpiPaymentRequest request) {
        return paymentService.sendUpiPayment(authentication.getName(), request);
    }
}
