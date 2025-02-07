import { getAllPosts } from '~/api';

export const usePostsStore = defineStore('posts', () => {
  interface Post {
    rating: number;
    views: number;
    likes: number;
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  const posts = ref<Post[]>([]);

  const getPosts = async () => {
    const { items } = await getAllPosts();

    posts.value = items;
  };

  return { posts, getPosts };
});
