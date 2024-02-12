import { Request, Response } from 'express';

import { kafkaProducerClient } from '../store/kafka/kafka.producer';
import {Post} from "../models/post.model";
import { PostDao } from "../dao/post.dao";
import {PostAnalysisController} from "./post-analysis.controller";

const kafkaTopic = process.env.POST_ANALYSIS_TOPIC || 'post-analysiss'

// Function to create a post
export const createPost = async (req: Request, res: Response) => {

    const { post_id, user_id, text_content } = req.body;
    const post = new Post(post_id, user_id, text_content);
    await PostDao.createPost(post).catch((error) => {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
    const message = JSON.stringify({ text: text_content, post_id: post_id, user_id: user_id });
    const data = await kafkaProducerClient.sendMessage(kafkaTopic, message).catch((error) => {
        console.error('Error sending message to Kafka:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
    if (!data) {
        console.log('Error in sending message to Kafka');
    }
    return res.status(201).json({ message: 'Post created successfully and send to kafka' });
};

// Function to get analysis of a post
export const getPostAnalysis = async (req: Request, res: Response) => {
    // get the post analysis if not found return 404 or status of current
    const { status, message } = await PostAnalysisController.getPostAnalysis(req, res).catch((error) => {
        console.error('Error retrieving post analysis:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    });
    return res.status(<number>status).json({ data: message });
};
