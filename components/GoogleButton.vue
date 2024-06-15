<template>
  <div ref="googleBtn" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  cliendId: string;
  loginSuccessCallBack: (response: { credential: string }) => void;
}>();

const googleBtn = ref();

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: props.cliendId,
    callback: props.loginSuccessCallBack,
  });

  window.google.accounts.id.renderButton(googleBtn.value, {
    type: 'standard',
    text: 'signup_with', // or 'signup_with' | 'continue_with' | 'signin'
    size: 'large', // or 'small' | 'medium' width: '290', // max width 400
    theme: 'outline', // or 'filled_black' | 'filled_blue'
    logo_alignment: 'left', // or 'center'
  });
});
</script>
