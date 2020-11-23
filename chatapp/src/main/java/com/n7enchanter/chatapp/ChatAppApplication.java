package com.n7enchanter.chatapp;

import com.n7enchanter.chatapp.entity.Message;
import com.n7enchanter.chatapp.entity.Room;
import com.n7enchanter.chatapp.entity.User;
import com.n7enchanter.chatapp.repository.IMessageDao;
import com.n7enchanter.chatapp.repository.IRoomDao;
import com.n7enchanter.chatapp.repository.IUserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@SpringBootApplication
public class ChatAppApplication {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	public static void main(String[] args) {
		SpringApplication.run(ChatAppApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

//	@Bean
//	CommandLineRunner start(IUserDao userRepository, IRoomDao roomDao, IMessageDao messageDao, PasswordEncoder passwordEncoder){
//		return args -> {
//			Room publicRoom = new Room();
//			publicRoom.setPrivatChat("false");
//			Flux<Room> r = roomDao.findAllByPrivatChat("false").defaultIfEmpty(new Room()).map(room -> {
//				if(room.getPrivatChat()==null){
//					roomDao.save(publicRoom).map(newRoom -> {
//						Message message = new Message(newRoom.getId(),"created","admin");
//						messageDao.save(message).subscribe();
//						return newRoom;
//					}).subscribe();
//				}
//				return room;
//			});
//			log.info("a");
//
//		};
//	}

}
