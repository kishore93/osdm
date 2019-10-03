package com.zoomable.map.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

@Configuration
@PropertySource("classpath:application.yaml")
public class MongoDBLoader {

	@Value("${mongo.host}")
	private String host;
	
	@Value("${mongo.port}")
	private int port;
	
	@Value("${mongo.authentication-database}")
	private String authenticationDB;
	
	@Value("${mongo.username}")
	private String username;
	
	@Value("${mongo.password}")
	private String password;
	
	@Bean
	public MongoDbFactory mongoDbFactory() {

		StringBuilder mongoUrl = new StringBuilder("mongodb+srv://");
        mongoUrl.append(username + ":");
        mongoUrl.append(password + "@");
        mongoUrl.append(host + "/");
        mongoUrl.append(authenticationDB);
        mongoUrl.append("?retryWrites=true&w=majority");
		
		MongoClient client = new MongoClient(new MongoClientURI(mongoUrl.toString()));

		return new SimpleMongoDbFactory(client, authenticationDB);

	}

	@Bean
	public MongoTemplate apiMongoTemplate(MongoDbFactory mongoDbFactory) {
		MappingMongoConverter converter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory),
				new MongoMappingContext());
		// Removing _class attribute generated by default.
		converter.setTypeMapper(new DefaultMongoTypeMapper(null));
		// Map with keys containing "dots" will be rejected as the conversion
		// for the entire object will fail.
		// Setting the replacement value of "-" for all "dots" in keys.
		converter.setMapKeyDotReplacement("\\-\\-");
		return new MongoTemplate(mongoDbFactory, converter);

	}
}