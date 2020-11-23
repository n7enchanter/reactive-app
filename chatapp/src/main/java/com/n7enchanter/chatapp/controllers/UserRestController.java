package com.n7enchanter.chatapp.controllers;

import com.n7enchanter.chatapp.entity.User;
import com.n7enchanter.chatapp.repository.IUserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;

@RestController
@CrossOrigin(value = { "http://localhost:4200" })
public class UserRestController {
    @Autowired
    IUserDao userRepository;
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value ="/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<UserDetails> index(@RequestBody User user) {
        return userRepository.findByUsername(user.getUsername()).defaultIfEmpty(new User()).map(userDetails -> {
            if(userDetails.getUsername()!=null
                    && PasswordEncoderFactories
                    .createDelegatingPasswordEncoder()
                    .matches(user.getPassword(),userDetails.getPassword())){
                return userDetails;
            }
            return new User();
        });
    }
    @PostMapping(value = "/register")
    public Mono<UserDetails> register(@RequestBody User user){
        final User newUser = new User(user.getUsername(), PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(user.getPassword()));
        return  userRepository.findByUsername(newUser.getUsername()).defaultIfEmpty(new User()).map(userDetails -> {
            if(userDetails.getUsername()==null){
                userRepository.save(newUser).subscribe();
                return userDetails;
            }
            return new User();
        });
    }

    @GetMapping(value = "/getUsers")
    public Flux<String> getUsers(){
        return userRepository.findAll().map(User::getUsername);
    }
}
