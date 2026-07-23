package com.bankofindia.app.repository;

import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByAccount(Account account);
    boolean existsByAccount(Account account);
}
