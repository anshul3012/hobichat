<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { API } from '@/fake/apis'
import img from '@/assets/logo.jpg'
import { store } from '@/stores/store'
const myStore = store()
const useApi = API()
const router = useRouter()

const email = ref('')
const emailErrors = ref<string | string[]>([])

const emailRule = computed(() => [
  (value: string) => !!value || '*please choose a user name',
  (value: string) => /.+@.+\..+/.test(value) || '*Please enter a valid email',
])

const attemptLogin = async () => {
  const errors: string[] = []
  emailRule.value.forEach(rule => {
    const result = rule(email.value)
    if (typeof result === 'string') {
      errors.push(result)
    }
  })

  emailErrors.value = errors

  if (!emailErrors.value.length) {
    myStore.setLoading(true)
    try {
      await useApi.login()
      myStore.onLogin(email.value)
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      myStore.setLoading(false)
    }
  } 
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="grid grid-cols-12 justify-items-center items-center justify-center h-screen">
      <div class="col-start-2 col-span-10">
        <v-img
          :height="205"
          :width="216"
          :src="img" />
      </div>
      <div class="col-start-2 col-span-10 grid gap-6 text-center">
        <p class="font-bold text-5xl">Let's Connect</p>
        <p class="font-semi-bold text-3xl">One click away from your Circle!!</p>
        <p>Nisi nunc et mi egestas nibh eget. Est cras suspendisse id erat elit felis, eu. Sollicitudin ullamcorper massa dictum enim id malesuada orci nibh pulvinar. Sed at feugiat arcu lorem et porttitor. Scelerisque amet orci congue dignissim.</p>
      </div>
    </div>
    <div class="grid grid-cols-8 justify-items-center items-center justify-center h-screen custom-backgroud-2">
      <div class="w-full col-start-2 col-span-6">
        <v-card>
          <template #text>
            <div class="grid gap-8">
              <p class="font-semibold text-xl">Log in</p>
              <v-text-field
                v-model="email"
                :rules="emailRule"
                variant="outlined"
                label="Email"
                @keydown.enter="attemptLogin"
                :error-messages="emailErrors" />
              <v-btn
                class="w-full"
                text="Log in"
                color="primary"
                @click="attemptLogin" />
              <hr />
            </div>
          </template>
        </v-card>
      </div>
    </div>
  </div>
</template>
