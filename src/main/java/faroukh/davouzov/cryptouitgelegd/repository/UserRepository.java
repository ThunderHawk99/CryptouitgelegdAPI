package faroukh.davouzov.cryptouitgelegd.repository;

import faroukh.davouzov.cryptouitgelegd.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}
