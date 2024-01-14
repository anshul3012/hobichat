import { ref } from 'vue'
import { defineStore } from 'pinia'
import { clearDB } from '@/fake/DB'

export const store = defineStore('store', () => {
  const localStorageKey = 'hobichat'
  const emailFromLocalStorage = window.localStorage.getItem(localStorageKey)
  const isLoggedIn = ref(!!emailFromLocalStorage)
  const isLoading = ref(false)
  const userEmail = ref(emailFromLocalStorage || '')
  const chatId = ref<string>('')

  const setLoading = (boolean: boolean) => {
    isLoading.value = boolean
  }

  const updateChatId = (id: string) => {
    chatId.value = id
  }

  const onLogin = (email: string) => {
    window.localStorage.setItem(localStorageKey, email)
    userEmail.value = email
    isLoggedIn.value = true
  }

  const onLogout = () => {
    window.localStorage.removeItem(localStorageKey)
    userEmail.value = ''
    chatId.value = ''
    isLoggedIn.value = false
  }

  const eraseAll = () => {
    onLogout()
    window.localStorage.removeItem('DB')
    clearDB()
  }

  return {
    isLoggedIn,
    isLoading,
    userEmail,
    chatId,
    setLoading,
    updateChatId,
    onLogin,
    onLogout,
    eraseAll
  }
})
