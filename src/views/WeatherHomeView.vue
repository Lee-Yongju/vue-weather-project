<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

import { useCityStore } from '@/stores/cityStore'

const router = useRouter()
const route = useRoute()

const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const isLoading = ref(false)

const cityStore = useCityStore() // City 정보를 모아두는 store
const isAddDialogVisible = ref(false) // 추가 도시 입력 다이얼로그 표시 여부
const newCityForm = ref({ name: '', english: '' }) // 새로운 도시 정보를 담을 객체

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const fetchRealTimeWeather = async () => {
  // 새로 만든 store를 활용하도록 수정
  isLoading.value = true
  try {
    const response = await Promise.all(
      // CityStore에 있는 도시 이름을 활용하여 API를 호출하도록 수정
      cityStore.cities.map((city) =>
        axios.get(`${BASE_URL}?q=${city.english}&appid=${API_KEY}&units=metric&lang=kr`),
      ),
    )

    // API 호출 결과를 weatherList에 저장
    weatherList.value = response.map((res, index) => ({
      id: cityStore.cities[index].id,
      name: cityStore.cities[index].name,
      temp: res.data.main.temp,
      status: res.data.weather[0].description,
    }))
  } catch (error) {
    console.error('날씨 API 연동 실패:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }

  fetchRealTimeWeather()
})

watch(searchQuery, (newQuery) => {
  router.push({ path: route.path, query: { search: newQuery || undefined } })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) {
    return weatherList.value
  }
  return weatherList.value.filter((city) => city.name.includes(query))
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}

const handleAddCity = async () => {
  if (!newCityForm.value.name || !newCityForm.value.english) {
    alert('도시 이름과 영어 이름을 모두 입력해주세요.')
    return
  }
  cityStore.addCity(newCityForm.value.name, newCityForm.value.english) // 새로운 도시를 store에 추가
  newCityForm.value = { name: '', english: '' } // 입력 폼 초기화
  isAddDialogVisible.value = false // 다이얼로그 닫기
  await fetchRealTimeWeather() // 새로운 도시 추가 후 날씨 정보를 다시 가져오기
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="section-header">
        <h3>지역별 날씨 현황</h3>

        <el-button type="success" size="small" @click="isAddDialogVisible = true"
          >+ 도시 추가</el-button
        >
      </div>

      <el-dialog v-model="isAddDialogVisible" title="새 도시 추가" width="360px">
        <el-form :model="newCityForm" label-width="80px">
          <el-form-item label="한글 이름">
            <el-input v-model="newCityForm.name" placeholder="도시의 한글 이름을 입력하세요" />
          </el-form-item>
          <el-form-item label="영문 이름">
            <el-input v-model="newCityForm.english" placeholder="도시의 영문 이름을 입력하세요." />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="isAddDialogVisible = false">취소</el-button>
          <el-button type="primary" @click="handleAddCity">추가</el-button>
        </template>
      </el-dialog>

      <p
        v-if="isLoading"
        style="text-align: center; color: #3498db; font-weight: bold; padding: 20px 0"
      >
        글로벌 기상 위성으로부터 실시간 기상 데이터를 수신 중입니다...
      </p>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump(item.id)"
        />

        <p
          v-if="filteredWeatherList.length === 0"
          style="text-align: center; color: #e74c3c; padding: 10px 0"
        >
          검색 결과가 없습니다.
        </p>
      </template>
    </BaseDashboardCard>
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>
