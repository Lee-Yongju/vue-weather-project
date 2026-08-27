# weather-project

SKALA vue.js 학습을 위한 Repository 입니다.  
Vue Compositoin API 문법, directive, bind등을 단계별로 실습힙니다.

---

## 기술 스택

- **Framework**: Vue 3(Composition API / `<script setup>`)
- **Build Tool**: Vite
- **Router / State**: Vue Router, Pinia
- **Language / Style**: Javascript, CSS

---

## 파일 구조

```bash
.
├── eslint.config.js                    # 주석적으래요
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   ├── excercise.css
│   │   └── main.css
│   ├── components
│   │   └── exercise
│   │       ├── WeatherComposition.vue  # 넵 주석적겠습니다
│   │       └── WeatherMockup.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── stores
│       └── counter.js
└── vite.config.js
```

---

## 주요 학습 및 파일 설명

### 1. `WeatherMockup.vue`

기본적인 UI 레이아웃과 반응형 상태(`ref`)의 기초 구조를 잡는 Mockup 컴포넌트입니다.

- `searchQuery`: 사용자가 입력한 검색어 상태
- `weatherList`: 도시별 기본 날씨 목업 데이터 리스트
- `selectedCityInfo`: 현재 선택된 도시의 세부 정보 상태

### 2. `WeahterComposition.vue`

Mockup 구조를 바탕으로 실제 검색, 선택, 데이터 렌더링 동작을 구현한 컴포넌트입니다.

- 디렉티브 활용 (`v-model`, `v-for`, `v-if`, `:style` 등)
- 반응형 데이터 조작 및 이벤트 핸들링

---

## 추가적인 커스텀 기능 설명

### 1. 과제 백점맞기 기능

`파일명.js` 파일에서 어느 부분을 수정해서 어떻게 했습니다.

---

## 프로젝트 실행 방법

```bash
# 의존성 패키지 설치
npm install
# 로컬 개발 서버 실행
npm run dev
```
