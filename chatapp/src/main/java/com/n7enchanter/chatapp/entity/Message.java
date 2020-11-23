package com.n7enchanter.chatapp.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Message")
public class Message {
    @Id
    private String id;
    private Instant time = Instant.now();
    private String roomId;
    private String sender;
    private String message;

    @Builder
    public Message(String roomId,String message,String sender){
        this.roomId = roomId;
        this.message = message;
        this.sender = sender;
    }
}
