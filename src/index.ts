import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

import { createPost, getPostAnalysis } from "./controllers/post.controller";



const app: Express = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Routes
app.post('/api/v1/posts', createPost);
app.get('/api/v1/posts/:id/analysis', getPostAnalysis);



app.get("/", (req: Request, res: Response) => {
    res.send("My Server!");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
