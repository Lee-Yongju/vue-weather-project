import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const units = ref('celsius')

  const unitSymbol = computed(() => {
    return units.value === 'celsius' ? '°C' : '°F'
  })

  function toggleUnit() {
    units.value = units.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { units, unitSymbol, toggleUnit }
})
