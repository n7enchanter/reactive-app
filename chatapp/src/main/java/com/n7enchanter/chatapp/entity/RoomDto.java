package com.n7enchanter.chatapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private String roomId;
    private String roomName;
    private List<String> contributors;
    private String privatChat;
}
