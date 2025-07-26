import { Client } from '@elastic/elasticsearch';

const { elasticNode, elasticApiKey } = useRuntimeConfig();

export const esClient = new Client({
  node: elasticNode,
  auth: {
    apiKey: elasticApiKey,
  },
  serverMode: 'serverless',
});
