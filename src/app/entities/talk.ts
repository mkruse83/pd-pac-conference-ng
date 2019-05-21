import Speaker from './speaker';
import Slot from './slot';

class Talk extends Slot{
  topics: string[];
  speaker: Speaker;

  constructor(talk: any) {
    super(talk);
    this.topics = talk.topics;
    if (talk.speaker) {
      this.speaker = new Speaker(talk.speaker);
    }
  }

  public isFree() {
    return false;
  }
}

export default Talk;
