package faroukh.davouzov.cryptouitgelegd.api;

import faroukh.davouzov.cryptouitgelegd.domain.Tag;
import faroukh.davouzov.cryptouitgelegd.domain.User;
import faroukh.davouzov.cryptouitgelegd.dto.TagDTO;
import faroukh.davouzov.cryptouitgelegd.dto.UserDTO;
import faroukh.davouzov.cryptouitgelegd.service.TagService;
import faroukh.davouzov.cryptouitgelegd.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class TagResource {
    private final TagService tagService;
    private final ModelMapper modelMapper;

    @GetMapping("/tags")
    public ResponseEntity<List<TagDTO>> getTags() {
        List<Tag> tags = tagService.getTags();
        List<TagDTO> tagDTOS= tags.stream().map(tag -> modelMapper.map(tag, TagDTO.class)).collect(Collectors.toList());
        tagDTOS =  tagDTOS.stream().sorted(Comparator.comparing(TagDTO::getName)).collect(Collectors.toList());
        return ResponseEntity.ok().body(tagDTOS);
    }
}
