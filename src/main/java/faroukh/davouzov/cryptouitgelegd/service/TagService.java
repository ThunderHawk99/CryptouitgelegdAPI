package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Tag;

import java.util.List;

public interface TagService {
    void saveTag(Tag tag);

    List<Tag> getTags();
}
