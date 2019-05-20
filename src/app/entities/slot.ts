import Room from './room';

class Slot {
  id: string;
  name: string;
  from: Date;
  to: Date;
  room: Room;

  constructor(talk: any) {
    this.id = '';
    this.name = talk.name;
    this.from = new Date(talk.from);
    this.to = new Date(talk.to);
    if (talk.room) {
      this.room = new Room(talk.room);
    }
  }

  public isFree() {
    return true;
  }
}

export default Slot;