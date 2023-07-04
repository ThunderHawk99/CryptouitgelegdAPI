package faroukh.davouzov.cryptouitgelegd.repository;

import faroukh.davouzov.cryptouitgelegd.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag getTagByName(String name);
}
