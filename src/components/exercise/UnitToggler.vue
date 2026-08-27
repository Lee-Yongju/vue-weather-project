<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
const configStore = useConfigStore()

const isFahrenheit = computed({
  get: () => configStore.units === 'fahrenheit',
  set: () => configStore.toggleUnit(),
})
</script>

<template>
  <div
    style="
      text-align: center;
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    "
  >
    <!-- <span
      >날씨단위: <strong>{{ configStore.units === 'celsius' ? '섭씨' : '화씨' }}</strong></span
    > -->
    <el-switch
      v-model="isFahrenheit"
      active-text="화씨"
      inactive-text="섭씨"
      active-color="#409EFF"
      inactive-color="#67C23A"
    />
    <!-- <el-button type="primary" round @click="configStore.toggleUnit" class="toggle-btn"
      >단위 변경</el-button
    > -->
  </div>
</template>

<style scoped>
.toggle-btn {
  padding: 6px 10px;
  background-color: #4b6584;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
