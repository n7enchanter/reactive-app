export class Message {
    sender: string;
    message: string;
    roomId: string;

    constructor( sender: string, message: string,roomId: string) {
      this.sender = sender;
      this.message = message;
      this.roomId = roomId;
    }
}