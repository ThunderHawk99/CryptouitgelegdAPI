package faroukh.davouzov.cryptouitgelegd.service;

import faroukh.davouzov.cryptouitgelegd.domain.Article;
import faroukh.davouzov.cryptouitgelegd.domain.ArticleBody;

import java.util.List;

public interface ArticleService {
    List<Article> getAllArticles();
    Article saveArticle(Article article);
    ArticleBody getArticleBody(Long id);

    void addTagToArticle(String articleName,String tagName);

}
