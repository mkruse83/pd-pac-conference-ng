class Room {
  name: string;
  nameInLocation: string;

  constructor(room: any) {
    this.name = room.name;
    this.nameInLocation = room.nameInLocation;
  }
}

export default Room;