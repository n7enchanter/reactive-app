package com.n7enchanter.chatapp.repository;

import com.n7enchanter.chatapp.entity.Room;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface IRoomDao extends ReactiveMongoRepository<Room,String> {
    @Tailable
    @Query(value = "{ $or: [ { privatChat: ?0 },  {contributors: ?1 } ] }")
    Flux<Room> getAllByContributor(String privatChat,String username);
    Flux<Room> findAllByPrivatChat(String privateChat);

}
