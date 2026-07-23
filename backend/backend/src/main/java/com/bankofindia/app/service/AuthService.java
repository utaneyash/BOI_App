package com.bankofindia.app.service;

import com.bankofindia.app.dto.*;
import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.User;
import com.bankofindia.app.exception.ApiException;
import com.bankofindia.app.repository.AccountRepository;
import com.bankofindia.app.repository.UserRepository;
import com.bankofindia.app.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private static final SecureRandom RANDOM = new SecureRandom();

    public AuthService(UserRepository userRepository, AccountRepository accountRepository,
                        PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                        JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("An account with this email already exists", HttpStatus.CONFLICT);
        }

        User user = new User(
                request.getFullName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                passwordEncoder.encode(request.getUpiPin())
        );
        userRepository.save(user);

        // Every new user gets one starter "Everyday" account with a small opening balance.
        Account account = new Account(
                user,
                generateAccountNumber(),
                "Everyday",
                new BigDecimal("1000.00"),
                generateUpiId(request.getFullName())
        );
        accountRepository.save(account);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getFullName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password", HttpStatus.UNAUTHORIZED));

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getFullName(), user.getEmail());
    }

    private String generateAccountNumber() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) sb.append(RANDOM.nextInt(10));
        return sb.toString();
    }

    private String generateUpiId(String fullName) {
        String base = fullName.toLowerCase().replaceAll("[^a-z]", "");
        if (base.isEmpty()) base = "user";
        return base + RANDOM.nextInt(1000) + "@bankofindia";
    }
}
