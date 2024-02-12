# Social Media Analytics Platform

## Overview

This project is a social media analytics platform designed for high-performance data processing. It leverages a microservices architecture with Kafka for message streaming, Cassandra for scalable data storage, and Redis for caching and Kafka for publishing messages for analysing posts.

## Prerequisites

Docker and Docker Compose

## Getting Started

## Running the application

### Services

**_To start all services_**, run:
    *docker-compose -f docker/docker-compose.kafka.yml up*

**_To stop all services_**, run:
    *docker-compose -f docker/docker-compose.kafka.yml down*

### DATABASE
Run the commands in schema.ddl file to create the keyspace and tables in Cassandra.

### API
**_Clone the repository_**:
    *git clone 

**_Install dependencies_**:
    *npm install*

**_Build the application_**:
    *npm run build*

**_Start the application_**:
    *npm run start*

## Architecture
### Zookeeper & Kafka: 
Used for managing Kafka's cluster state and message streaming, respectively. This is used to publish messages for analysing posts. When we would have larger number of posts, we can increase the number of producers and consumers to handle the load. 
### Cassandra:
Provides scalable and resilient data storage. It is used to store the posts and post analytics data.
### Redis:
Caches frequently accessed data to improve read performance.

## Assumptions

#### Reasons to use the above technologies:

**Cassandra:** It is a distributed database that provides high availability and scalability. It is a good choice for storing large amounts of data. **Most importantly, it is a write optimized database, which is a good fit for our use case as we would be writing a lot of posts and post analytics data, incomparison to reading the data. Close to 10: 1 ratio of writes to reads.**

**Kafka:** It is a distributed streaming platform that is used for building real-time data pipelines and streaming applications. It is a good choice for our use case as we would be publishing messages for analysing posts. **It is also a good choice for our use case as it is horizontally scalable, fault-tolerant, and has high throughput**. When we need to handle a larger number of posts, **we can increase the number of producers and consumers to handle the load. And since ours is microservices architecture, we can further control by increasing only consumers or producers based on the load.**

**Redis:** It is an in-memory data structure store, used as a database, cache, and message broker. It is a good choice for our use case as it is used to cache frequently accessed data to improve read performance. **It is also a good choice for our use case, since it will further improve the reads**

### Answers to the questions:
**Consider how to handle large amounts of post data and high request volumes**
We are using Cassandra for storing the posts and post analytics data, also Kafka for message streaming. When we would have larger number of posts, we can increase the number of producers and consumers to handle the load. Read is further improved by using Redis for caching.

**Think about how you could parallelize or distribute the analysis computation.**
We can further do the following things:
We are not using a Task queue, as of now, but we can add that to separate the task of analysing the number of words in a post and average word length, we can use Bull queue for that. We can have multiple workers to handle the load.
Increase consumers or producers based on the load. And since ours is microservices architecture.
Have database sharding, in this case we can use USER_ID as the shard key, and then we can update the query to get the data from the correct shard by using the USER_ID.

### Infrastructure Considerations
**How would you handle the database? What database would you use in production and why?**
We are using Cassandra for storing the posts and post analytics data. Reason, mentioned above.

**How would you manage traffic spikes?**
Scalibility:
Docker : Since both projects are dockerised, we can easily scale the services horizontally by adding more containers. We will also use Kubernetes for orchestration.
Kafka : Increase the number of brokers and partition count and replication factor.
Cassandra : Increase the number of nodes and replication factor and sharding.
Load Balancers: Kubernetes will provide load balancing for the services via Ingress.
Caching: We are using Redis for caching, which will further improve the read performance.
Task Queue: We can add a task queue for further parallelizing the analysis computation, via Bull queue.
Auto Scaling: We can use Kubernetes for auto scaling the services.

**How would you ensure high availability and fault tolerance for the service?**
Kubernetes: Have the services running in multiple availability zones.
Databases: Have database cluster spread across multiple availability zones, eventually we have also have clusters across regions. We should have a regular backup of the data on a different region.
Load balancers: Kubernetes will provide load balancing for the services via Ingress.
Kafka: Increase the number of replication so if one broker goes down, the other can take over. We can also increase partition count to handle the load.
Docker: Since both projects are dockerised, if a container goes down, Kubernetes will start a new one.(this is self-healing). We can also have auto scaling

**How would you ensure the security of the data?**
1. Use SSL for communication between the services.
2. Kafka : Use SSL for communication between the brokers and the clients.
3. Application: Use JWT for authentication and authorization.
4. Databases: Use encryption in transit. We should have SSL enabled for Cassandra. In this use case I don't see a requirement for encryption at rest, but if required we can use that as well.
5. Dependency Scanning: Regularly scan the dependencies for vulnerabilities. We can use Snyk for that.


**How would you handle logging, monitoring, and alerting for the service?**
Logging: We can use ELK stack for logging. Application logs can be sent to Logstash, which will then send it to Elasticsearch for indexing and then we can use Kibana for visualization.
Monitoring: We can use Prometheus for monitoring, which will scrape the metrics from the services and then we can use Grafana for visualization. We can also send logs from GC, AWS, etc to Prometheus.
Alerting: We can have alerts set up in Prometheus, which will send alerts to Slack or Opsgenie.


**Which hosting providers and services would you consider using and why?**
Would use GCP, Reason: Since I have experience with GCP, and it provides a lot of services like Kubernetes, Pub/Sub, BigQuery, etc. It also provides a lot of security features like VPC, IAM, etc. It also provides a lot of monitoring and logging features like Stackdriver, etc. It also provides a lot of machine learning services, which we can use for further analysis of the data.

## Future Work
1. Update the Cassandra ddl and query to insert user_id in post analysis table.
2. Add a task queue for parallelizing the analysis computation.
3.

# talkshop-api-project
