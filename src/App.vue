<script setup>
// import WeatherMockup from './components/exercise/WeatherMockup.vue'
// import WeatherComposition from './components/exercise/WeatherComposition.vue'
// import WeatherParent from './components/exercise/WeatherParent.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <!-- <div class="app-container">
    <h2>과제 1: 날씨 (Mockup)</h2>
    <hr />
    <WeatherMockup />
  </div>

  <div class="app-container">
    <h2>과제 2: 날씨 (컴포지션)</h2>
    <hr />
    <WeatherComposition />
  </div>

  <div class="app-container">
    <h2>과제 3: 날씨(컴포넌트)</h2>
    <hr />
    <WeatherParent />
  </div> -->

  <!-- <div class="app-container">
    <h2>과제 4: Router적용</h2>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="navi-item">날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="navi-item">서비스 소개</RouterLink>
      </nav>
      <main>
        <RouterView />
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>
    </div>
  </div> -->

  <!-- <div class="app-container">
    <h2>과제 5: 스토어적용</h2>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="navi-item">날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="navi-item">서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>
    </div>
  </div> -->

  <!-- <div class="app-container">
    <h2>과제 6: Axios적용</h2>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="navi-item">날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="navi-item">서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </main>
    </div>
  </div> -->

  <div class="app-container">
    <h2>과제 7: Element Plus적용</h2>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="navi-item">날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="navi-item">서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
        <!-- <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView> -->
      </main>
    </div>
  </div>
</template>

<style>
@import '@/assets/excercise.css';
</style>
