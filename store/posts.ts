import { getAllPosts } from '~/api';
import { Post } from '~/types/post';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);

  const fetchPosts = async () => {
    const { items } = await getAllPosts();

    posts.value = items;
  };

  return { posts, fetchPosts };
});
