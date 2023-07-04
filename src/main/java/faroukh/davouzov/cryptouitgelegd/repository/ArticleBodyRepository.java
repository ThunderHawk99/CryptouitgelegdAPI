package faroukh.davouzov.cryptouitgelegd.repository;

import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleBodyRepository extends JpaRepository<ArticleBody, Long> {
    ArticleBody getById(Long id);
}
