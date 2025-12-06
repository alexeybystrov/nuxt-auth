import { esClient } from '../../utils/elasticsearch';

export default defineEventHandler(async (event) => {
  const q = String(getQuery(event).q || '');

  try {
    const result = await esClient.search({
      index: 'posts',
      query: {
        multi_match: {
          query: q,
          fields: ['title', 'description'],
        },
      },
      size: 20,
    });

    return {
      totalItems: result.hits.hits.length,
      items: result.hits.hits.map(({ _id, _source }) => ({ _id, ..._source! })),
    };
  } catch (error: any) {
    // If Elasticsearch is not configured, return empty results
    if (error.message?.includes('Elasticsearch is not configured')) {
      return {
        totalItems: 0,
        items: [],
      };
    }
    throw error;
  }
});
