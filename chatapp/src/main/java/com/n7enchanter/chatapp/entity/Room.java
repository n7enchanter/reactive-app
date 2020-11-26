package com.n7enchanter.chatapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Room")
public class Room {
    @Id
    private String id;
    private List<String> contributors;
    private String privatChat;
    @Builder
    public Room(List<String> contributors){
        this. contributors = contributors;
        this.privatChat = "true";
    }

}
