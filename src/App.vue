<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { DB } from '@/fake/DB'
import { RouterView } from 'vue-router'
import Loading from '@/components/Loading.vue'

const saveDBToLocal = () => {
  window.localStorage.setItem('DB', JSON.stringify(DB))
}

onBeforeUnmount(() => {
  saveDBToLocal()
})

window.addEventListener('beforeunload', saveDBToLocal)
</script>

<template>
  <div class="font-sans custom-text-1">
    <Loading />
    <RouterView />
  </div>
</template>