import Speaker from './speaker';
import Room from './room';

class Talk {
  id: string;
  name: string;
  from: Date;
  to: Date;
  topics: string[];
  speaker: Speaker;
  room: Room;

  constructor(talk: any) {
    this.id = '';
    this.name = talk.name;
    this.from = new Date(talk.from);
    this.to = new Date(talk.to);
    this.topics = talk.topics;
    this.speaker = new Speaker(talk.speaker);
    this.room = new Room(talk.room);
  }
}

export default Talk;