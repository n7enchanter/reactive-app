package com.n7enchanter.chatapp.controllers;

import com.n7enchanter.chatapp.entity.Message;
import com.n7enchanter.chatapp.repository.IMessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.security.Principal;

@RestController
@CrossOrigin(value = { "http://localhost:4200" })
public class MessageRestController {
    @Autowired
    IMessageDao messageDao;

    @PostMapping("/postMessage")
    public void postMessage(@RequestBody Message message, Principal principal){
        message.setSender(principal.getName());
        messageDao.save(message).subscribe();
    }

    @GetMapping(value = "/getMessages/{roomId}",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Message> getMessages(@PathVariable String roomId){
        return messageDao.findByRoomId(roomId);
    }
}
