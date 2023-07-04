package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Tag;
import faroukh.davouzov.cryptouitgelegd.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TagImpl implements TagService{
    private final TagRepository tagRepository;
    @Override
    public void saveTag(Tag tag) {
        tagRepository.save(tag);
    }

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }
}
