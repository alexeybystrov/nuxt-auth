import { Client } from '@elastic/elasticsearch';

let esClientInstance: Client | null = null;

function getElasticsearchClient(): Client | null {
  // Lazy initialization - only create client when needed
  if (esClientInstance) {
    return esClientInstance;
  }

  const config = useRuntimeConfig();

  // Get Elasticsearch config from runtime config or fallback to process.env
  const elasticNode = config.elasticNode || process.env.ELASTIC_NODE;
  const elasticApiKey = config.elasticApiKey || process.env.ELASTIC_API_KEY;

  // If config is missing, return null (Elasticsearch is optional)
  if (
    !elasticNode ||
    typeof elasticNode !== 'string' ||
    elasticNode.trim() === ''
  ) {
    console.warn(
      'WARNING: ELASTIC_NODE is not configured. Elasticsearch features will be disabled.',
    );
    return null;
  }

  if (
    !elasticApiKey ||
    typeof elasticApiKey !== 'string' ||
    elasticApiKey.trim() === ''
  ) {
    console.warn(
      'WARNING: ELASTIC_API_KEY is not configured. Elasticsearch features will be disabled.',
    );
    return null;
  }

  try {
    esClientInstance = new Client({
      node: elasticNode,
      auth: {
        apiKey: elasticApiKey,
      },
      serverMode: 'serverless',
    });
    console.log('Elasticsearch client initialized successfully');
    return esClientInstance;
  } catch (error) {
    console.error('Failed to create Elasticsearch client:', error);
    return null;
  }
}

// Export a proxy that lazily initializes the client
export const esClient = new Proxy({} as Client, {
  get(_target, prop) {
    const client = getElasticsearchClient();
    if (!client) {
      throw new Error(
        'Elasticsearch is not configured. Please set ELASTIC_NODE and ELASTIC_API_KEY environment variables to use search features.',
      );
    }
    return client[prop as keyof Client];
  },
});
