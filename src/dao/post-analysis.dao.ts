import { clientManager } from '../store/cassandra/cassandra';
import { PostAnalysis } from '../models/post-analysis.model';
import { CacheService } from '../services/cache-service.layer';

export class PostAnalysisDao {
    static async getPostAnalysis(post_id: string): Promise<PostAnalysis> {
        const cacheKey = `postAnalysis:${post_id}`;
        try {
            // Try fetching from Redis cache first
            const cachedData = await CacheService.getFromCache(cacheKey);
            if (cachedData) {
                console.log('Data fetched from cache:', cachedData);
                return JSON.parse(cachedData);
            }

            // If not in cache, fetch from Cassandra
            const query = 'SELECT * FROM post_analysis WHERE post_id = ?';
            const result = await clientManager.getClient().execute(query, [post_id], { prepare: true });

            if (result.rowLength > 0) {
                const analysisData = result.first();
                const analysis = new PostAnalysis(analysisData.post_id, analysisData.word_count, analysisData.average_word_length, analysisData.status, analysisData.user_id);

                // Add to Redis cache using CacheService
                await CacheService.setToCache(cacheKey, JSON.stringify(analysis));
                return analysis;
            } else {
                throw new Error('Post analysis not found');
            }
        } catch (error) {
            console.error('Error fetching post analysis:', error);
            throw error;
        }
    }
}
