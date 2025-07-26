<template>
  <v-container>
    <v-text-field
      v-model="searchTerm"
      label="Search posts"
      prepend-inner-icon="mdi-magnify"
      clearable
      @input="onInput"
      @click:clear="onClear"
    />

    <v-infinite-scroll v-if="showInfiniteScroll" @load="load">
      <v-row>
        <v-col cols="12">
          <v-card
            v-for="post in postsStore.posts"
            :key="post._id"
            class="mb-4"
            min-height="380px"
          >
            <v-img :src="post.imageUrl" height="200px" cover />
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.description }}</v-card-subtitle>
            <v-card-text>
              <v-rating :model-value="post.rating" readonly />
              <div class="d-flex justify-space-between align-center mt-2">
                <div>
                  <v-icon color="blue">mdi-eye</v-icon> {{ post.views }}
                </div>
                <div>
                  <v-icon color="red">mdi-heart</v-icon> {{ post.likes }}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <template #empty> No more posts </template>
    </v-infinite-scroll>

    <v-btn
      class="post-button"
      icon="mdi-plus"
      color="primary"
      @click="navigateTo('/posts/create')"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { usePostsStore } from '@/store/posts';

const postsStore = usePostsStore();

const DEBOUNCE_DELAY = 300;
const searchTerm = ref('');
const showInfiniteScroll = ref(true);

const load = async ({ done }: { done: any }) => {
  if (searchTerm.value) {
    return done('empty');
  }

  await postsStore.fetchPosts();

  if (postsStore.isAllPostsFetched) {
    done('empty');
  } else {
    done('ok');
  }
};

const onInput = useDebounceFn(async () => {
  if (searchTerm.value) {
    await postsStore.searchPostsByTerm(searchTerm.value);
  } else {
    onClear();
  }
}, DEBOUNCE_DELAY);

const onClear = () => {
  postsStore.clearPosts();
  showInfiniteScroll.value = false;

  nextTick(() => {
    showInfiniteScroll.value = true;
  });
};

postsStore.clearPosts();
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
