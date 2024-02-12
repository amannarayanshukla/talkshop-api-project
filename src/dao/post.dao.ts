// Import the necessary modules
import {clientManager} from '../store/cassandra/cassandra';
import { Post } from '../models/post.model';

export class PostDao {
    static async createPost(post: Post): Promise<boolean> {
        const query = 'INSERT INTO posts (post_id, user_id, text_content, creation_date) VALUES (?, ?, ?, toTimestamp(now()))';
        try {
            await clientManager.getClient().execute(query, [post.post_id, post.user_id, post.text_content], { prepare: true });
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
