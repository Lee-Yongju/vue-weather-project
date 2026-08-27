<script setup>
defineEmits(['update-query'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h2>도시 검색</h2>
    <input
      type="text"
      class="search-input"
      :value="currentQuery"
      @input="$emit('update-query', $event.target.value)"
      placeholder="검색할 도시 이름 입력"
    />
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.search-inner h2 {
  font-size: 1.3rem;
  margin: 0;
}
.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  transition: border-color 0.2s;
}
.search-input:focus {
  outline: none;
  border-color: #409eff;
}
.search-inner p {
  margin: 0;
  font-size: 14px;
  color: #606266;
}
</style>
