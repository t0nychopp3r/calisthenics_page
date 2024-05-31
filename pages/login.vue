<script setup>
  const user = useSupabaseUser()

  const isLogin = ref(true)
</script>

<template>
  <div class="container-logs">
    <div class="left-column">
    </div>
    <div class="middle-column">
      <p class="title-text">{{ isLogin ? 'Change your profile settings' : 'Sign up to gain access to your personal workout space' }} </p>
      <div class="container-login" style="padding: 50px 0 100px 0">
        <Account v-if="user" />
        <Auth v-else />
      </div>
    </div>
    <div class="right-column">
    </div>
  </div>
</template>