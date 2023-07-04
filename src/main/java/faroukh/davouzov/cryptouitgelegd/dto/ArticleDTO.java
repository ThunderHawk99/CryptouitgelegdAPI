package faroukh.davouzov.cryptouitgelegd.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class ArticleDTO {
    private String title;
    private String image;
    private String description;
    @JsonIgnoreProperties("body")
    private ArticleBody body;
    private Collection<TagDTO> tags = new ArrayList<>();

}
