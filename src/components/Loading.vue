<script lang="ts" setup>
import { computed } from 'vue'
import { store } from '@/stores/store'

const dialog = computed(() => {
  return store().isLoading
})
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :scrim="true"
      persistent
      width="auto">
      <v-card color="primary">
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
@/stores/store