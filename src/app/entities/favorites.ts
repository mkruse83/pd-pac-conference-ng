import Talk from './talk';

class Favorites {
    conferences: {[key: string]: boolean};

    constructor(obj: any[]) {
        this.conferences = {};
        obj.forEach(fav => {
            this.conferences[fav.conferencePartKey + '|' + fav.conferenceSortKey + '|' + fav.roomNameInLocation + '|' + fav.from] = true;
        });
    }

    public isFavorite(conferenceId: string, talk: Talk): boolean {
        const key = conferenceId + '|' + talk.room.nameInLocation + '|' + talk.from.getTime();
        return this.conferences[key];
    }
}

export default Favorites;
