<template>
  <v-infinite-scroll @load="load">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-table>
            <thead>
              <tr>
                <th class="font-weight-bold text-left">Created at</th>
                <th class="font-weight-bold text-left">Updated at</th>
                <th class="font-weight-bold text-left">Title</th>
                <th class="font-weight-bold text-left">Rating</th>
                <th class="font-weight-bold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in postsStore.posts" :key="post._id">
                <td class="date">{{ formatDate(post.createdAt) }}</td>
                <td class="date">{{ formatDate(post.updatedAt) }}</td>
                <td class="title">{{ post.title }}</td>
                <td>
                  <v-rating
                    :model-value="post.rating"
                    size="small"
                    density="comfortable"
                    readonly
                  />
                </td>
                <td>
                  <v-btn
                    color="primary"
                    size="small"
                    class="me-2"
                    @click="editPost(post._id)"
                    >Edit</v-btn
                  >
                  <v-btn
                    color="error"
                    size="small"
                    @click="deletePost(post._id)"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>

    <template #empty> No more posts </template>
  </v-infinite-scroll>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/store/posts';
import { deletePostById } from '~/api';

definePageMeta({
  middleware: ['auth'],
});

const postsStore = usePostsStore();

const load = async ({ done }: { done: any }) => {
  await postsStore.fetchPosts();

  if (postsStore.isAllPostsFetched) {
    done('empty');
  } else {
    done('ok');
  }
};

const editPost = (id: string) => {
  navigateTo(`/posts/edit/${id}`);
};

const deletePost = async (id: string) => {
  await deletePostById(id);
  postsStore.deletePost(id);
};

postsStore.clearPosts();
</script>

<style scoped>
.v-btn {
  min-width: 80px;
}

.date,
.title {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
