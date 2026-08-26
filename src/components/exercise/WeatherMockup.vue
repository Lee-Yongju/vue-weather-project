<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '부산', temp: 24, status: '흐림' },
  { id: 'city_03', name: '대구', temp: 32, status: '비' },
  { id: 'city_04', name: '광주', temp: 20, status: '눈' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요.')
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="serach-box">
      <h3>도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="
          (e) => {
            searchQuery = e.target.value
          }
        "
        placeholder="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h2>지역별 날씨 현황</h2>
      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h4>{{ item.name }} {{ item.status }}</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">더움 (25도 이상)</span>
        <span v-else class="badge cool">선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetails(item.name, item.status)">
          상세보기
        </button>
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
