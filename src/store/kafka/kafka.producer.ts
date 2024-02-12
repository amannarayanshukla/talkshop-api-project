import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';

class KafkaProducer {
    private client: KafkaClient;
    private producer: Producer;

    constructor(kafkaHost: string) {
        this.client = new KafkaClient({ kafkaHost });
        this.producer = new Producer(this.client);
        this.producer.on('ready', () => console.log('Kafka Producer is connected and ready.'));
        this.producer.on('error', (error) => console.error('Error in Kafka Producer', error));
    }

    sendMessage(topic: string, message: string): Promise<void> {
        const payloads: ProduceRequest[] = [
            {
                topic,
                messages: message
            }
        ];

        return new Promise((resolve, reject) => {
            this.producer.send(payloads, (error, data) => {
                if (error) {
                    console.error('Error in sending message: ', error);
                    reject(error);
                } else {
                    console.log('Message sent successfully', data);
                    resolve(data);
                }
            });
        });
    }
}

export const kafkaProducerClient: KafkaProducer = new KafkaProducer('localhost:9092');
