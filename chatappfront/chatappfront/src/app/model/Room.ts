export class Chat {
    id: number;
    contributor: String;
    privateChat: String
    constructor( id: number, contributor: String, privateChat: String) {
      this.id = id;
      this.contributor = contributor;
      this.privateChat = privateChat;
    }
}

export class Room {
  id: number;
  contributors: String[];
  privateChat: String
  constructor( id: number, contributors: String[],privateChat: String) {
    this.id = id;
    this.contributors = contributors;
    this.privateChat = privateChat;
  }
}