CREATE KEYSPACE "talkshop" WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor' : 1
}


CREATE TABLE talkshop.posts (
    post_id text PRIMARY KEY,
    user_id text,
    text_content text,
    creation_date timestamp
);

CREATE TABLE talkshop.post_analysis (
    post_id text PRIMARY KEY,
    user_id text,
    word_count text,
    average_word_length text,
    analysis_date timestamp,
    status text
);
