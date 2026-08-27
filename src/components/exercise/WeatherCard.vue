<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.units === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div
    class="weather-card"
    :class="cityItem.temp >= 25 ? 'is-hot' : 'is-cool'"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <h4>{{ cityItem.name }}, {{ cityItem.status }}</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">더움</span>
    <span v-else class="badge cool">선선함</span>

    <el-button
      class="btn-detail"
      size="small"
      @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
    >
      상세보기
    </el-button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  border-left: 5px solid transparent;
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.weather-card.is-hot {
  border-left-color: #ff7675;
  background: linear-gradient(135deg, #fff 60%, #fff5f5 100%);
}
.weather-card.is-cool {
  border-left-color: #74b9ff;
  background: linear-gradient(135deg, #fff 60%, #f0f8ff 100%);
}
.badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 999px;
  color: #fff;
  font-weight: 600;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
}
</style>
