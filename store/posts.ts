import { getAllPosts } from '~/api';
import type { Post } from '~/types/post';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);
  let page = 1;
  let allItemsCount = 0;

  const clearPosts = () => {
    posts.value = [];
    page = 1;
    allItemsCount = 0;
  };

  const fetchPosts = async () => {
    if (allItemsCount && allItemsCount === posts.value.length) return;

    const pageSize = 3;

    const { items, totalItems } = await getAllPosts({
      page,
      pageSize,
    });

    posts.value.push(...items);
    page += 1;
    allItemsCount = totalItems;
  };

  return { posts, clearPosts, fetchPosts };
});
