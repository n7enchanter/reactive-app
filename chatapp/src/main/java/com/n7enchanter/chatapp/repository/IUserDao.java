package com.n7enchanter.chatapp.repository;

import com.n7enchanter.chatapp.entity.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;
@Repository
public interface IUserDao extends ReactiveMongoRepository<User, String> {
    Mono<UserDetails> findByUsername(String username);
    Mono<UserDetails> findByUsernameAndPassword(String username,String password);
}