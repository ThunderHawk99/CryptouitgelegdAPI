package faroukh.davouzov.cryptouitgelegd.api;

import faroukh.davouzov.cryptouitgelegd.domain.Article;
import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import faroukh.davouzov.cryptouitgelegd.domain.User;
import faroukh.davouzov.cryptouitgelegd.dto.ArticleBodyDTO;
import faroukh.davouzov.cryptouitgelegd.dto.ArticleDTO;
import faroukh.davouzov.cryptouitgelegd.dto.ArticleSaveDTO;
import faroukh.davouzov.cryptouitgelegd.dto.TagDTO;
import faroukh.davouzov.cryptouitgelegd.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ArticleResource {

    private final ModelMapper modelMapper;
    private final ArticleService articleService;

    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDTO>> getArticles() {
        List<Article> articles = articleService.getAllArticles();
        List<ArticleDTO> articleDTOS = articles.stream().map(article -> modelMapper.map(article, ArticleDTO.class)).collect(Collectors.toList());
        articleDTOS.forEach(articleDTO -> {
            List<TagDTO> tagDTOS = articleDTO.getTags().stream().map(tag -> modelMapper.map(tag, TagDTO.class)).collect(Collectors.toList());
            articleDTO.setTags(tagDTOS);
        });
        return ResponseEntity.ok().body(articleDTOS);
    }

    @GetMapping("/articles/body")
    public ResponseEntity<ArticleBodyDTO> getArticleBody(@RequestParam Long id){
        ArticleBody articleBody = articleService.getArticleBody(id);
        ArticleBodyDTO articleBodyDTO = modelMapper.map(articleBody, ArticleBodyDTO.class);
        return ResponseEntity.ok().body(articleBodyDTO);
    }

    @PostMapping("/articles/save")
    public ResponseEntity<?> saveArticle(@RequestBody ArticleSaveDTO articleSaveDTO){
        Article article = modelMapper.map(articleSaveDTO, Article.class);
        return ResponseEntity.ok().body(articleService.saveArticle(article));
    }

}
