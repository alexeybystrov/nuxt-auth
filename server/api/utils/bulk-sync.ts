import Post from '~/server/models/Post';
import { bulkSyncPosts } from '~/server/utils/elastic';

export default defineEventHandler(async () => {
  const allPosts = await Post.find();

  // @ts-ignore
  await bulkSyncPosts(allPosts);

  return { status: 'ok', synced: allPosts.length };
});
