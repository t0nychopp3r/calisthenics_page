<script setup>
  const user = useSupabaseUser()
  const isLogin = ref(true)

  const message = computed(() => {
  return user.value 
    ? 'Change your profile settings' 
    : 'Sign up to gain access to your personal workout space'
  })
</script>

<template>
  <div class="container-logs">
    <div class="left-column">
      <!-- Left Column placeholder -->
    </div>
    <div class="middle-column-login">
      <p class="title-text">{{ message}} </p>
      <div class="container-login" style="padding: 50px 0 100px 0">
        <Account v-if="user" />
        <Auth v-else />
      </div>
    </div>
    <div class="right-column">
      <!-- Right Column placeholder -->
    </div>
  </div>
</template>