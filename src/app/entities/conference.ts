import Talk from './talk';

export class Conference {
  id: string;
  name: string;
  from: Date;
  to: Date;
  topics: string[];
  talks: Talk[];
  location: ConfLocation;

  constructor(conf: any) {
    this.id = conf.partkey + '|' + conf.sortkey;
    this.name = conf.name;
    this.from = new Date(conf.from);
    this.to = new Date(conf.to);
    this.topics = conf.topics;
    this.talks = conf.talks;
    this.location = conf.location;
  }
}
