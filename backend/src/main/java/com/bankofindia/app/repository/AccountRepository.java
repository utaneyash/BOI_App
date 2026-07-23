package com.bankofindia.app.repository;

import com.bankofindia.app.entity.Account;
import com.bankofindia.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUser(User user);
    Optional<Account> findFirstByUser(User user);
    Optional<Account> findByUpiId(String upiId);
}
