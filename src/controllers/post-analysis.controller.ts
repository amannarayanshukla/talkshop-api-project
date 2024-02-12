import { Request, Response } from 'express';

import { PostAnalysisDao } from '../dao/post-analysis.dao';

export class PostAnalysisController {
    // Method to handle the fetching of post analysis
    static async getPostAnalysis(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const analysis = await PostAnalysisDao.getPostAnalysis(id);
            return {
                status: 200,
                message: analysis
            };
        } catch (error: unknown) {
            if (error instanceof Error && error.message === 'Post analysis not found') {
                return {
                    status: 404,
                    message: error.message
                }
            } else {
                console.error('Failed to retrieve post analysis:', error);
                return {
                    status: 500,
                    message: 'An error occurred'
                }
            }
        }
    }
}
