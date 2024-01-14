<script lang="ts" setup>
import { defineProps, computed, type PropType } from 'vue'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<'small' | 'big'>,
    default: 'small',
  },
  shape: {
    type: String as PropType<'round' | 'smooth-square'>,
    default: 'round',
  },
})

const initials = computed(() => {
  const userName = props.email.split('@')
  return userName[0].substring(0, 2).toUpperCase()
})

const sizeClass = computed(() => {
  return props.size === 'big' ? 'w-12 h-12 text-sm' : 'w-9 h-9 text-xs'
})

const shapeClass = computed(() => {
  return props.shape === 'round' ? 'rounded-full' : 'rounded-md'
})
</script>

<template>
  <div class="custom-backgroud-text-2" :class="shapeClass">
    <div class="flex items-center text-white justify-center p-1" :class="sizeClass">
      {{ initials }}
    </div>
  </div>
</template>

