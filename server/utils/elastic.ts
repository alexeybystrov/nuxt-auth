import { esClient } from '../utils/elasticsearch';
import { Post } from '~/types/post';

export const postSyncToElastic = async (post: Post) => {
  await esClient.index({
    index: 'posts',
    id: post._id.toString(),
    document: {
      userId: post.userId,
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      rating: post.rating,
      views: post.views,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    },
  });
};

export const bulkSyncPosts = async (posts: Post[]) => {
  const body = posts.flatMap((doc) => [
    { index: { _index: 'posts', _id: doc._id.toString() } },
    {
      userId: doc.userId,
      title: doc.title,
      description: doc.description,
      imageUrl: doc.imageUrl,
      rating: doc.rating,
      views: doc.views,
      likes: doc.likes,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    },
  ]);

  await esClient.bulk({ refresh: true, body });
};
