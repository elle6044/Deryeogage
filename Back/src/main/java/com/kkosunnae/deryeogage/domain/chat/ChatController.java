package com.kkosunnae.deryeogage.domain.chat;

import com.kkosunnae.deryeogage.domain.user.UserService;
import com.kkosunnae.deryeogage.global.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private final JwtUtil jwtUtil;

    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;


    //새 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<Integer> createRoom(@RequestBody ChatRoomRequestDto requestDto) {
        Integer id = chatRoomService.save(requestDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    //사용자가 속한 전체 채팅방 목록 출력
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponseDto>> getAllRooms(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);

        Long userId = jwtUtil.getUserId(jwtToken);

        List<ChatRoomResponseDto> rooms = chatRoomService.findAll(userId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    //특정 채팅방 상세
    @GetMapping("/room/{id}")
    public ResponseEntity<ChatRoomResponseDto> getRoom(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        chatMessageService.markMessagesAsRead(id, userId);

        ChatRoomResponseDto dto = chatRoomService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }



    //채팅 메시지 보내고 받기
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public void send(@Header("Authorization") String token, @RequestBody ChatMessageRequestDto requestDto) {

        token = token.replace("Bearer ", "");
        long userid=jwtUtil.getUserId(token);
        String nickName = userService.getUserNickname(userid);
        requestDto.setUser(userid);
        requestDto.setNickName(nickName);

        Integer id = chatMessageService.save(requestDto.getChatRoom().getId(), requestDto);
        if(id != null) {
            messagingTemplate.convertAndSend("/topic/messages", "Message received successfully!");
            // 채팅방 상태 변경 알림
            messagingTemplate.convertAndSend("/topic/rooms/update", "Chat room updated");
        } else {
            messagingTemplate.convertAndSend("/topic/messages", "Message failed to send.");
        }
    }

    //채팅방 접속 시 이전 채팅내역 가져오기
    @GetMapping("/room/{id}/messages")
    public ResponseEntity<List<ChatMessageResponseDto>> getRoomMessages(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id) {
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);
        chatMessageService.markMessagesAsRead(id, userId);

        List<ChatMessageResponseDto> messages = chatMessageService.findByChatRoomId(id);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    //채팅방 밖에서 가장 최근 메시지
    @GetMapping("/room/{id}/lastmessage")
    public ResponseEntity<ChatMessageResponseDto> getRoomLastMessage(@PathVariable Integer id) {
        ChatMessageResponseDto message = chatMessageService.findLastByChatRoomId(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    //채팅방 밖에서 안 읽은 메시지 수
    @GetMapping("/room/{id}/nonreadcount")
    public Integer getNonReadCount(@RequestHeader("Authorization") String authorizationHeader, @PathVariable Integer id){
        String jwtToken = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(jwtToken);

        int nonReadCount = chatMessageService.getNonReadCount(id, userId);
        System.out.println("count"+nonReadCount);
        return nonReadCount;
    }



    @GetMapping("/message/{id}")
    public ResponseEntity<ChatMessageResponseDto> getMessage(@PathVariable Integer id) {
        ChatMessageResponseDto dto = chatMessageService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
