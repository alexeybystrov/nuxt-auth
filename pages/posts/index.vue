<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-for="post in postsStore.posts" :key="post._id" class="mb-4">
          <v-img :src="post.imageUrl" height="200px" cover />
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>{{ post.description }}</v-card-subtitle>
          <v-card-text>
            <v-rating :model-value="post.rating" readonly />
            <div class="d-flex justify-space-between align-center mt-2">
              <div><v-icon color="blue">mdi-eye</v-icon> {{ post.views }}</div>
              <div><v-icon color="red">mdi-heart</v-icon> {{ post.likes }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-btn
    class="post-button"
    icon="mdi-plus"
    color="primary"
    @click="navigateTo('/posts/create')"
  />
</template>

<script setup lang="ts">
import { usePostsStore } from '@/store/posts';

const postsStore = usePostsStore();
postsStore.fetchPosts();
</script>

<style scoped>
.v-card {
  transition: 0.3s;
}

.v-card:hover {
  transform: scale(1.02);
}

.post-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
