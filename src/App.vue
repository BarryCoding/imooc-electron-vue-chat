<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[10rem] bg-gray-300 text-gray-700 hover:bg-yellow-300">
      sidebar
    </div>

    <div class="h-full flex-1 bg-green-300 text-blue-700">
      content
      <input
        type="text"
        placeholder="Search for anything"
        class="placeholder:text-blue-300"
      />
    </div>
  </div>
</template>

<script setup>
console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
