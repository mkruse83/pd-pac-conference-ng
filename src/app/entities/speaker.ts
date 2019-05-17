class Speaker {
  name: string;
  company: string;
  title: string;

  constructor(speaker: any) {
    this.name = speaker.name;
    this.company = speaker.company;
    this.title = speaker.title;
  }
}

export default Speaker;