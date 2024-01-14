<script lang="ts" setup>
import { computed } from 'vue'
import Avtar from '@/components/Avtar.vue'
import { store } from '@/stores/store'
import { type chat } from '@/fake/DB'

const myStore = store()

const props = defineProps({
  chat: { type: Object as () => chat, required: true }
})

const isMyChat = computed(() => {
  return myStore.userEmail === props.chat.user
})

const millisecondsToTimeString = (milliseconds: number) => {
  const date = new Date(milliseconds)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`
  return formattedTime
}
</script>

<template>
  <div class="flex items-start gap-x-2" :class="isMyChat ? 'flex-row-reverse' : ''">
    <Avtar :email="props.chat.user" :size="'small'" />
    <div class="custom-backgroud-1 py-1 px-4 rounded-full myWidth flex justify-between gap-4">
      <p class="text-wrap min-h-7">{{ props.chat.text }}</p>
      <div class="flex items-end">
        <p class="text-nowrap text-xs custom-text-2">{{ millisecondsToTimeString(props.chat.milliseconds) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myWidth {
  max-width: 500px;
}
</style>