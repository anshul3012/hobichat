<script lang="ts" setup>
import { computed, ref } from 'vue'
import { store } from '@/stores/store'
import { API } from '@/fake/apis'
import ChatRow from '@/components/ChatRow.vue'

const myStore = store()
const useApi = API()

const myChat = ref('')

const customHeight = computed(() => {
  return `calc(100vh - 64px)`
})
const customChatHeight = computed(() => {
  return `calc(100vh - 250px)`
})
const chatId = computed(() => {
  return myStore.chatId
})
const chatDeatils = computed(() => {
  return useApi.fetchChatLogs(chatId.value)
})

const sendChat = () => {
  if (!myChat.value) return
  useApi.sentChat(myStore.userEmail, chatId.value, myChat.value)
  myChat.value = ''
}
</script>

<template>
  <div class="custom-backgroud-2"
    :style="{ height: customHeight }">
    <div v-if="chatId"
      class="flex flex-col mx-6">
      <div class="flex-none flex justify-between items-center mt-6">
        <p class="font-bold text-3xl">{{ chatDeatils.name || '' }}</p>
        <v-icon icon="fa-info-circle" />
      </div>
      <div class="flex-grow my-6"
        :style="{ height: customChatHeight }">
        <div v-if="chatDeatils.logs.length" class="flex flex-col gap-2 h-inherit overflow-y-auto">
          <ChatRow v-for="(chat, idx) in chatDeatils.logs"
            :key="idx" :chat="chat" />
        </div>
      </div>
      <div class="flex-none flex justify-between items-center gap-x-3">
        <v-icon class="rotate-45 -translate-y-3" icon="fa-paperclip fa-2x" />
        <v-text-field v-model.trim="myChat" variant="solo" @keydown.enter="sendChat" />
        <v-btn class="-translate-y-3" color="primary" :disabled="!myChat"
          icon="fa-paper-plane fa-lg" elevation="0"  @click="sendChat" />
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-center h-screen">
        <v-icon icon="fa-hand-o-left fa-5x" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-inherit {
  height: inherit;
}
</style>