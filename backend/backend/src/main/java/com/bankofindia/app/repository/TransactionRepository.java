package com.bankofindia.app.repository;

import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountOrderByCreatedAtDesc(Account account);
}
