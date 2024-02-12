export class PostAnalysis {
    private post_id: string;
    private word_count: string;
    private average_word_length: string;
    private analysis_date: Date;
    private status: string;
    private user_id: string;

    constructor(post_id: string, word_count: string, average_word_length: string, status: string, user_id: string) {
        this.post_id = post_id;
        this.word_count = word_count;
        this.average_word_length = average_word_length;
        this.analysis_date = new Date(); // Timestamp for when the analysis was done
        this.status = status; // Status of the analysis
        this.user_id = user_id;
    }

}
