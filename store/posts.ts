import { getAllPosts } from '~/api';
import type { Post } from '~/types/post';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);

  const fetchPosts = async () => {
    const pageSize = 3;
    const { items } = await getAllPosts({
      page: posts.value.length / pageSize,
      pageSize,
    });

    posts.value.push(items);
  };

  return { posts, fetchPosts };
});
