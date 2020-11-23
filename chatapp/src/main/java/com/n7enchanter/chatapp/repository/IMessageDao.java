package com.n7enchanter.chatapp.repository;

import com.n7enchanter.chatapp.entity.Message;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
@Repository
public interface IMessageDao extends ReactiveMongoRepository<Message, String> {
    @Tailable
    public Flux<Message> findByRoomId(String roomId);
}
