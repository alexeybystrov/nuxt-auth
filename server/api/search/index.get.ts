import { esClient } from '../../utils/elasticsearch';

export default defineEventHandler(async (event) => {
  const q = String(getQuery(event).q || '');

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
});
