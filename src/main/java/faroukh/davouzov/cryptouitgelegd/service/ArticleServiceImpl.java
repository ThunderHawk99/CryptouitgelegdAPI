package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Article;
import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;
import faroukh.davouzov.cryptouitgelegd.domain.Tag;
import faroukh.davouzov.cryptouitgelegd.repository.ArticleBodyRepository;
import faroukh.davouzov.cryptouitgelegd.repository.ArticleRepository;
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
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final ArticleBodyRepository articleBodyRepository;
    private final TagRepository tagRepository;

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public Article saveArticle(Article article) {
        ArticleBody articleBody = articleBodyRepository.save(article.getBody());
        article.setBody(articleBody);
        return articleRepository.save(article);
    }

    @Override
    public ArticleBody getArticleBody(Long id) {
        return articleBodyRepository.getById(id);
    }

    @Override
    public void addTagToArticle(String articleName, String tagName) {
        Article article = articleRepository.getArticleByTitle(articleName);
        Tag tag = tagRepository.getTagByName(tagName);
        article.getTags().add(tag);
    }
}
