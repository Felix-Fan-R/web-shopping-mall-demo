<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="123">
    <button type="button" @click="count++">count is {{ count }}</button>
    </div>

    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>


  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
