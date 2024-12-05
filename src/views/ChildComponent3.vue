<script setup>
import {ref} from "vue";
const count = ref(0);
</script>

<template>
  <h2>子组件3</h2>
  <span>count:{{ count }}</span>
  <button @click="count++">+</button>
</template>

<style scoped>
</style>