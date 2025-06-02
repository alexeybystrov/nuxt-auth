<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="localPost.title" label="Title" required />
    <v-textarea v-model="localPost.description" label="Description" required />
    <v-text-field v-model="localPost.imageUrl" label="Image URL" required />
    <v-btn type="submit" color="primary">{{ submitLabel }}</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';

const props = defineProps<{
  post: Partial<Post>;
  submitLabel?: string;
}>();
const emit = defineEmits<{
  (e: 'submit', post: Partial<Post>): void;
}>();

const localPost = ref<Partial<Post>>({ ...props.post });

const handleSubmit = () => {
  emit('submit', localPost.value);
};

watchEffect(() => {
  localPost.value = { ...props.post };
});
</script>
