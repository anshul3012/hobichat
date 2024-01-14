<script lang="ts" setup>
import Avtar from '@/components/Avtar.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  }
})

</script>

<template>
  <v-list-item
    link>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Avtar :email="props.name" :shape="'smooth-square'" />
        <p>{{ props.name }}</p>
      </div>
      <p class="text-xs custom-text-2">Created {{ props.createdDate }}</p>
    </div>
  </v-list-item>
</template>