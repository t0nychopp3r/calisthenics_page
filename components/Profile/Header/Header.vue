<script setup></script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-zinc-600 p-4">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <svg class="fill-current h-20 w-20 mr-2 rounded-lg" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <image href="~/assets/img/cali_monkey.png" width="200" height="200" />
      </svg>
      <span class="font-semibold text-2xl tracking-tight">Your Cali Guide</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-xl lg:flex-grow">
        <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Home
        </a>
        <a href="/about" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          About Calisthenics
        </a>
        <a href="/streetparks" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
          Street Parks
        </a>
      </div>
      <div>
        <a href="/login" class="inline-block text-sm px-6 py-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
          YourJourney
        </a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"></style>