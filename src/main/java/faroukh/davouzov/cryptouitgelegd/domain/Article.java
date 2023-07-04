package faroukh.davouzov.cryptouitgelegd.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String image;
    private String description;
    @OneToOne
    private ArticleBody body;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Tag> tags = new ArrayList<>();

}
