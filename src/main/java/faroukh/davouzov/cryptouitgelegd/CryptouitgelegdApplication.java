package faroukh.davouzov.cryptouitgelegd;

import faroukh.davouzov.cryptouitgelegd.domain.*;
import faroukh.davouzov.cryptouitgelegd.service.ArticleService;
import faroukh.davouzov.cryptouitgelegd.service.TagService;
import faroukh.davouzov.cryptouitgelegd.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class CryptouitgelegdApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptouitgelegdApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return  new BCryptPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setExposedHeaders(Arrays.asList("Authorization", "content-type"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	CommandLineRunner run(UserService userService,
						  ArticleService articleService,
						  TagService tagService){
		return args -> {
			ArticleBody  articleBody= new ArticleBody(null, "    <div class=\"container\">\n" +
					"        <div>\n" +
					"            <img src=\"https://i.imgur.com/BJUtiYb.png\">\n" +
					"        </div>\n" +
					"        <div style=\"margin-top: 24px; margin-bottom: 32px;\"></div>\n" +
					"        <div>\n" +
					"            <h1>What Is Tokenomics and Why Does It Matter?</h1>\n" +
					"        </div>\n" +
					"        <!-- <div *ngIf=\"articleBody\">\n" +
					"            <div [innerHTML]=\"articleBody.body | unsafeHTML\">\n" +
					"    \n" +
					"            </div>\n" +
					"        </div> -->\n" +
					"        <article>\n" +
					"            <p style=\"font-weight: bold;\">TL;DR</p>\n" +
					"            <p>Tokenomics is a term that captures a token’s economics. \n" +
					"                It describes the factors that impact a token’s use and value, \n" +
					"                including but not limited to the token’s creation and distribution, \n" +
					"                supply and demand, incentive mechanisms, and token burn schedules. \n" +
					"                For crypto projects, well-designed tokenomics is critical to success. \n" +
					"                Assessing a project’s tokenomics before deciding to participate is essential for investors and stakeholders.\n" +
					"            </p>\n" +
					"            <h2>Introduction</h2>\n" +
					"            <p>A portmanteau of “token” and “economics,” tokenomics is a key component of doing fundamental research on a crypto project. \n" +
					"                Aside from looking at the white paper, founding team, roadmap, and community growth, tokenomics is central to evaluating the future prospects of a blockchain project. \n" +
					"                Crypto projects should carefully design their tokenomics to ensure sustainable long-term development. \n" +
					"            </p>\n" +
					"            <img src=\"https://i.imgur.com/BJUtiYb.png\">\n" +
					"            <h2>Tokenomics at a glance</h2>\n" +
					"            <p>Blockchain projects design tokenomics rules around their tokens to encourage or discourage various user actions. \n" +
					"                This is similar to how a central bank prints money and implements monetary policies to encourage or discourage spending, lending, saving, and the movement of money, \n" +
					"                Note that the word “token” here refers to both coins and tokens. You can learn the difference between the two here. Unlike fiat currencies, \n" +
					"                the rules of tokenomics are implemented through code and are transparent, predictable, and difficult to change.</p>\n" +
					"            <p>\n" +
					"                Let’s look at bitcoin as an example. The total supply of bitcoin is pre-programmed to be 21 million coins. \n" +
					"                The way bitcoins are created and entered into circulation is by mining. \n" +
					"                Miners are given some bitcoins as a reward when a block is mined every 10 minutes or so. \n" +
					"            </p>\n" +
					"            <p>\n" +
					"                The reward, also called block subsidy, is halved every 210,000 blocks. \n" +
					"                By this schedule, a halving takes place every four years. \n" +
					"                Since January 3, 2009, when the first block, or the genesis block, was created on the Bitcoin network, \n" +
					"                the block subsidy has been halved three times from 50 BTC to 25 BTC, 12.5 BTC, and 6.25 BTC currently.\n" +
					"            </p>\n" +
					"            <p>\n" +
					"                Based on these rules, it’s easy to calculate that around 328,500 bitcoins will be mined in 2022 by dividing the total number of \n" +
					"                minutes of the year by 10 (because a block is mined every 10 minutes) and then multiplying by 6.25 (because each block gives out 6.25 BTC as rewards). \n" +
					"                Therefore, the number of bitcoins mined each year can be predicted, and the last bitcoin is expected to be mined around the year 2140.\n" +
					"            </p>\n" +
					"            <p>\n" +
					"                Bitcoin’s tokenomics also include the design of transaction fees, which miners receive when a new block is validated. \n" +
					"                This fee is designed to increase as transaction size and network congestion rise. It helps prevent spam transactions and incentivizes miners to \n" +
					"                keep validating transactions even as block subsidies keep diminishing. \n" +
					"            </p>\n" +
					"            <p>\n" +
					"                In short, the tokenomics of Bitcoin is simple and ingenious. Everything is transparent and predictable. \n" +
					"                The incentives surrounding Bitcoin keep participants compensated to keep the network robust and contribute to its value as a cryptocurrency. \n" +
					"            </p>\n" +
					"        </article>\n" +
					"        <style>\n" +
					"            .container {\n" +
					"            margin: auto;\n" +
					"            padding: 24px 16px;\n" +
					"            max-width: 752px;\n" +
					"        }\n" +
					"    \n" +
					"        img {\n" +
					"            object-fit: contain;\n" +
					"            min-width: 100%;\n" +
					"            min-height: 100%;\n" +
					"            max-height: 100%;\n" +
					"            max-width: 100%;\n" +
					"            border-radius: 16px;\n" +
					"        }\n" +
					"    \n" +
					"        \n" +
					"        h1 {\n" +
					"            font-size: 48px;\n" +
					"            line-height: 56px;\n" +
					"        }\n" +
					"        \n" +
					"        h2 {\n" +
					"            padding-top: 36px;\n" +
					"            padding-bottom: 4px;\n" +
					"        }\n" +
					"        \n" +
					"        p {\n" +
					"            padding-top: 12px;\n" +
					"            padding-bottom: 12px;\n" +
					"        }\n" +
					"        \n" +
					"        @media only screen and (max-width: 768px) {\n" +
					"            h1 {\n" +
					"                font-size: 32px;\n" +
					"            }\n" +
					"          }\n" +
					"        </style>\n" +
					"    </div>");

			String description = "Tokenomics is a term that captures all aspects of a token's economic model, including its initial distribution, supply and incentives system.";
			Article article = new Article(null, "What is Tokenomics and Why Does It Matter?", "https://i.imgur.com/BJUtiYb.png", description, articleBody, null);
			articleService.saveArticle(article);
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_MANAGER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

			userService.saveUser(new User(null,"faroekh@hotmail.com", "Faroukh Davouzov", "MyThiCaL", "1234", new ArrayList<Role>()));
			userService.addRoleToUser("MyThiCaL", "ROLE_USER");
			userService.addRoleToUser("MyThiCaL", "ROLE_ADMIN");

			tagService.saveTag(new Tag(null,"CEX"));
			tagService.saveTag(new Tag(null,"DEX"));
			tagService.saveTag(new Tag(null,"DEFI"));
			tagService.saveTag(new Tag(null,"LAYER1"));
			tagService.saveTag(new Tag(null,"LAYER2"));
			tagService.saveTag(new Tag(null,"BRIDGES"));
			tagService.saveTag(new Tag(null,"BLOCKCHAIN"));
			tagService.saveTag(new Tag(null,"ECONOMICS"));

			articleService.addTagToArticle("What is Tokenomics and Why Does It Matter?","BLOCKCHAIN");


		};
	}
}
