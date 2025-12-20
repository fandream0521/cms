<script setup lang="ts">

</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped lang="less">
.app {
  height: 100vh;
  width: 100vw;
}

.test {
  color: green;

  :deep(.inner) {
    color: yellow;
  }
}
</style>
