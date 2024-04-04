<script setup>
  const user = useSupabaseUser()
</script>

<template>
  <div class="container-logs">
    <div class="left-column">
      <p> Placeholder left column e.g. overview Workouts </p>
    </div>
    <div class="middle-column">
      <p class="title-text">Welcome to your personal program space</p>
      <div class="container" style="padding: 50px 0 100px 0">
        <Account v-if="user" />
        <Auth v-else />
      </div>
    </div>
    <div class="right-column">
      <p> Placeholder right column e.g. Street Parks and Calendar </p>
    </div>
  </div>
</template>