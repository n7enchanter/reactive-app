package com.n7enchanter.chatapp.controllers;

import com.n7enchanter.chatapp.entity.*;
import com.n7enchanter.chatapp.repository.IMessageDao;
import com.n7enchanter.chatapp.repository.IRoomDao;
import com.n7enchanter.chatapp.repository.IRoomDetailsDao;
import com.n7enchanter.chatapp.repository.IUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoomRestController {
    @Autowired
    IUserDao userDao;
    @Autowired
    IMessageDao messageDao;
    @Autowired
    IRoomDao roomDao;
    @Autowired
    IRoomDetailsDao roomDetailsDao;
    @PostMapping("/createRoom")
    public void createRoom(Principal principal, @RequestBody User user){
        List<String> contributors = Arrays.asList(principal.getName(),user.getUsername());
        roomDao.save(new Room(contributors)).map(room -> {
            roomDetailsDao.save(new RoomDetails(room.getId(),"new"));
            Message message = new Message(room.getId(),"created",principal.getName());
            messageDao.save(message).subscribe();
            return room;
        }).subscribe();
    }
    @GetMapping(value = "/getRooms",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<RoomDto> getRooms(Principal principal){
        return roomDao.getAllByContributor("false",principal.getName()).flatMapSequential(room ->
             roomDetailsDao.findByRoomId(room.getId()).defaultIfEmpty(new RoomDetails()).map(roomDetails -> {
                RoomDto roomDto = new RoomDto();
                if(roomDetails.getRoomId() != null){
                    roomDto.setRoomName(roomDetails.getRoomName());
                }
                roomDto.setRoomId(room.getId());
                roomDto.setContributors(room.getContributors());
                roomDto.getContributors().remove(principal.getName());
                roomDto.setPrivatChat(room.getPrivatChat());
                return roomDto;
            })
        );
    }

    @PostMapping("/setRoomName")
    public void setRoomName(@RequestBody RoomDetails roomDetails){
        roomDetailsDao.save(roomDetails).subscribe();
    }
}
