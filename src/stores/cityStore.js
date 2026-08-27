import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('city', () => {
  const cities = ref([
    { id: 'city_01', name: '서울', english: 'Seoul' },
    { id: 'city_02', name: '수원', english: 'Suwon' },
    { id: 'city_03', name: '부산', english: 'Busan' },
  ])

  function addCity(name, english) {
    const nextIndex = cities.value.length + 1
    const id = `city_${String(nextIndex).padStart(2, '0')}`
    cities.value.push({ id, name, english })
  }

  return { cities, addCity }
})
