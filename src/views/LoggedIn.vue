<script lang="ts" setup>
import img from '@/assets/Logo.jpg'
import { computed, onMounted, ref } from 'vue'
import { store } from '@/stores/store'
import { API } from '@/fake/apis'
import { useRouter } from 'vue-router'
import ChatItem from '@/components/ChatItem.vue'
import ChatArena from '@/views/ChatArena.vue'
import Avtar from '@/components/Avtar.vue'
const myStore = store()
const router = useRouter()
const useApi = API()

const groups = ref<{ id: string; name: string; createdDate: string; }[]>([])
const dialog = ref(false)
const searchKey = ref('')
const newChat = ref('')
const chatNameErros = ref<string | string[]>([])

onMounted(() => {
  groups.value = useApi.getChatGroups()
})

const logout = () => {
  myStore.onLogout()
  router.push('/login')
}

const filteredChats = computed(() => {
  if (!searchKey.value) return groups.value
  return groups.value.filter(group => {
    if (group.name.toLowerCase().includes(searchKey.value.toLowerCase())) return true
    return false
  })
})


const newChatRules = computed(() => [
  (value: string) => !!value || 'Select a group name',
])

const createNewChat = async () => {
  const errors: string[] = []
  newChatRules.value.forEach(rule => {
    const result = rule(newChat.value)
    if (typeof result === 'string') {
      errors.push(result)
    }
  })

  chatNameErros.value = errors
  if (newChat.value.length) {
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate)
    const year = currentDate.getFullYear()
    const formattedDate: string = `${day} ${month} ${year}`

    myStore.setLoading(true)
    try {
      await useApi.addGroup({
        name: newChat.value,
        createdDate: formattedDate
      })
      newChat.value = ''
      dialog.value = false
      groups.value = useApi.getChatGroups()
    } catch (error) {
      console.error(error)
    } finally {
      myStore.setLoading(false)
    }
  }
}

const eraseAll = () => {
  myStore.eraseAll()
  router.push('/login')
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar
        prominent>
        <v-img
          :height="48"
          :max-width="90"
          :src="img"
          @click="eraseAll" />
        <div class="w-96 translate-y-3">
          <v-text-field
            density="compact"
            variant="solo-filled"
            v-model="searchKey"
            placeholder="Search"
            append-inner-icon="fa-search" />
        </div>
        <v-spacer />
        <Avtar class="mr-6" :email="myStore.userEmail" size="big" @click="logout" />
      </v-app-bar>
      <v-navigation-drawer width="400">
        <v-list-item>
          <div class="flex justify-between py-4">
            <p class="font-bold text-2xl">Chats</p>
            <v-btn
              size="compact"
              color="primary"
              text="+"
              elevation="0"
              class="h-10 w-10"
              @click="dialog = true" />
          </div>
        </v-list-item>
        <v-divider />
        <div class="grid gap-2">
          <ChatItem
            v-for="(group, idx) in filteredChats"
            class="py-2"
            :key="idx"
            :name="group.name"
            :createdDate="group.createdDate"
            @click="myStore.updateChatId(group.id)" />
        </div>
      </v-navigation-drawer>
      <v-main>
        <ChatArena />
      </v-main>
    </v-layout>
    <v-dialog
      v-model="dialog"
      persistent
      height="312"
      width="580">
      <v-card>
        <v-card-title>
          <div class="flex">
            <p class="text-center w-full">Create a chat</p>
            <v-btn
              text="x"
              elevation="0"
              size="compact"
              class="text-xs p-2"
              @click="dialog = false; newChat = ''; chatNameErros = []">
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="space-y-8">
            <p class="text-center text-sm">
              Chats are where your circle communicates. They’re best when<br />organized around a topic — #Writing, for example.
            </p>
            <div class="space-y-2">
              <p class="text-center text-sm font-semibold">Name</p>
              <v-text-field
                v-model="newChat"
                :rules="newChatRules"
                :error-messages="chatNameErros"
                variant="outlined"
                placeholder="# e.g. Writing" />
            </div>
          </div>
        </v-card-text>
        <v-card-actions> 
          <v-btn
            variant="flat"
            class="w-full"
            text="Create"
            color="primary"
            @click="createNewChat" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
