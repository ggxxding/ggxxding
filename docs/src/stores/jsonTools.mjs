import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const quotientStore = defineStore('quotientStore', () => {
  const dividend = ref(0)
  const divisor = ref(30)
  const quotient  = computed(() => parseInt(dividend.value / divisor.value))
  const remainder = computed(() => dividend.value % divisor.value)
  function clear() {
    dividend.value = 0
    divisor.value = 0
  }

  return { dividend, divisor, quotient, remainder, clear }
})