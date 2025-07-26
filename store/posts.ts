import { getAllPosts, searchPosts } from '~/api';
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

  const searchPostsByTerm = async (searchTerm: string) => {
    const { items, totalItems } = await searchPosts({ q: searchTerm });

    posts.value = items;
    page = 1;
    allItemsCount = totalItems;
  };

  const isAllPostsFetched = computed(
    () => posts.value.length === allItemsCount,
  );

  const getPostById = (id: string) => {
    return posts.value.find((post) => post._id === id);
  };

  const deletePost = (id: string) => {
    posts.value = posts.value.filter((post) => post._id !== id);
  };

  return {
    posts,
    clearPosts,
    fetchPosts,
    searchPostsByTerm,
    isAllPostsFetched,
    getPostById,
    deletePost,
  };
});
