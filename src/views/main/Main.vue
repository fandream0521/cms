<script setup lang='ts'>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<template>
  <div class="main">
    <h2>counter: {{ count }}</h2>
    <h2>doubleCounter: {{ doubleCount }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
