import { Client, ClientOptions, types } from 'cassandra-driver';

export class CassandraClientManager {
    private client: Client;

    constructor(options: ClientOptions) {
        this.client = new Client(options);
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log('Connected to Cassandra');
        } catch (e) {
            console.error('Connection to Cassandra failed: ', e);
            throw e; // Rethrow or handle as needed
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.shutdown();
            console.log('Disconnected from Cassandra');
        } catch (e) {
            console.error('Disconnection from Cassandra failed: ', e);
            throw e; // Rethrow or handle as needed
        }
    }

    // Optionally, expose the client for direct operations elsewhere
    getClient(): Client {
        return this.client;
    }

}

export const clientManager: CassandraClientManager = new CassandraClientManager({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'talkshop',
    pooling: {
        coreConnectionsPerHost: {
            [types.distance.local]: 2,
            [types.distance.remote]: 1
        }
    }
});
