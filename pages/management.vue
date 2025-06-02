<template>
  <v-infinite-scroll @load="load">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <v-table>
            <thead>
              <tr>
                <th class="font-weight-bold text-left">Created at</th>
                <th class="font-weight-bold text-left">Updated at</th>
                <th class="font-weight-bold text-left">Title</th>
                <th class="font-weight-bold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in postsStore.posts" :key="post._id">
                <td>{{ formatDate(post.createdAt) }}</td>
                <td>{{ formatDate(post.updatedAt) }}</td>
                <td class="title">{{ post.title }}</td>
                <td>
                  <v-btn
                    color="primary"
                    size="small"
                    class="me-2"
                    @click="navigateTo(`/posts/edit/${post._id}`)"
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

  done('ok');
};

const deletePost = async (id: string) => {
  await deletePostById(id);
  postsStore.deletePost(id);
};
</script>

<style scoped>
.v-btn {
  min-width: 80px;
}

.title {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
