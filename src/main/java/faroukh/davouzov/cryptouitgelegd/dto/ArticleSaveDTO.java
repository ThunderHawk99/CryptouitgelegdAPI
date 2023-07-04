package faroukh.davouzov.cryptouitgelegd.dto;

import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import lombok.Data;

@Data
public class ArticleSaveDTO {
    private String title;
    private String image;
    private ArticleBody body;
}
