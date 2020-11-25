export class Chat {
  roomId: number;
    contributor: string;
    privateChat: string
    roomName: string
    constructor( roomId: number, contributor: string, privateChat: string, roomName: string) {
      this.roomId = roomId;
      this.contributor = contributor;
      this.privateChat = privateChat;
      roomName === undefined || roomName==='new' || roomName === null? this.roomName = contributor : this.roomName = roomName;
    }
}

export class Room {
  roomId: number;
  contributors: string[];
  privateChat: string
  roomName: string
  constructor( roomId: number, contributors: string[],privateChat: string,roomName: string) {
    this.roomId = roomId;
    this.contributors = contributors;
    this.privateChat = privateChat;
    if(roomName !== undefined && roomName !== null){
      this.roomName = roomName;
    }
  }
}
