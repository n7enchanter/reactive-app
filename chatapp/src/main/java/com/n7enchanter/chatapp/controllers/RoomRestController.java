package com.n7enchanter.chatapp.controllers;

import com.n7enchanter.chatapp.entity.Message;
import com.n7enchanter.chatapp.entity.Room;
import com.n7enchanter.chatapp.entity.User;
import com.n7enchanter.chatapp.repository.IMessageDao;
import com.n7enchanter.chatapp.repository.IRoomDao;
import com.n7enchanter.chatapp.repository.IUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(value = { "http://localhost:4200" })
public class RoomRestController {
    @Autowired
    IUserDao userDao;
    @Autowired
    IMessageDao messageDao;
    @Autowired
    IRoomDao roomDao;
    @PostMapping("/createRoom")
    public void createRoom(Principal principal, @RequestBody User user){
        List<String> contributors = Arrays.asList(principal.getName(),user.getUsername());
        roomDao.save(new Room(contributors)).map(room -> {
            Message message = new Message(room.getId(),"created",principal.getName());
            messageDao.save(message).subscribe();
            return room;
        }).subscribe();
    }
    @GetMapping(value = "/getRooms",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Room> getRooms(Principal principal){
        return roomDao.getAllByContributor("false",principal.getName()).map(room -> {
            room.getContributors().remove(principal.getName());
            return room;
        });
    }
}
