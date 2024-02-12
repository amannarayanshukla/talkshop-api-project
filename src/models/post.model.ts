export class Post {
    post_id: string;
    user_id: string;
    text_content: string;
    private creation_date: Date;

    constructor(post_id: string, user_id: string, text_content: string) {
        this.post_id = post_id;
        this.user_id = user_id;
        this.text_content = text_content;
        this.creation_date = new Date(); // This will be handled by Cassandra's `toTimestamp(now())`
    }
}
