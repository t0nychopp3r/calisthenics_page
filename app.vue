<template>
  <div class="app-container">
    <header class="header">
      <ProfileHeader />
    </header>
    <main class="app-content">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <footer class="footer">
      <ProfileFooter />
    </footer>
  </div>
</template>