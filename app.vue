<template>
  <div :style="{ height: '100vh', width: '100vw' }">
    <NuxtPage />
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      style: 'margin: 0'
    }
  }
}
</script>

<style>
@import 'element-plus/dist/index.css';
</style>