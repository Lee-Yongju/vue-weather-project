# weather-project

SKALA vue.js 학습을 위한 Repository 입니다.  
Vue Compositoin API 문법, directive, bind등을 단계별로 실습힙니다.

---

## 기술 스택

- **Framework**: Vue 3(Composition API / `<script setup>`)
- **Build Tool**: Vite
- **Router / State**: Vue Router, Pinia
- **HTTP Clinet**: Axios (OpenWeatherMap API 연도)
- **UI Library**: Element Plus
- **Language / Style**: Javascript, CSS

---

## 파일 구조

```bash
.
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── README.md
├── src
│   ├── App.vue                          # 라우터 + 네비게이션 + 전역 레이아웃
│   ├── assets
│   │   ├── base.css
│   │   ├── excercise.css
│   │   └── main.css
│   ├── components
│   │   └── exercise
│   │       ├── BaseDashboardCard.vue    # 카드형 레이아웃 wrapper (slot)
│   │       ├── SearchBar.vue            # 도시 검색 입력창
│   │       ├── UnitToggler.vue          # 섭씨/화씨 단위 전환 (el-switch)
│   │       ├── WeatherCard.vue          # 도시별 날씨 카드
│   │       ├── WeatherMockup.vue        # 과제1: Mockup 컴포넌트
│   │       ├── WeatherComposition.vue   # 과제2: 디렉티브/반응형 실습
│   │       └── WeatherParent.vue        # 과제3: 부모-자식 컴포넌트 분리
│   ├── main.js
│   ├── router
│   │   └── index.js                     # 라우트 정의 (Home/About/Detail/NotFound)
│   ├── stores
│   │   ├── configStore.js               # 단위(섭씨/화씨) 전역 상태
│   │   └── cityStore.js                 # 도시 목록 전역 상태 (추가 기능 포함)
│   └── views
│       ├── WeatherHomeView.vue          # 대시보드 홈 (목록/검색/도시 추가)
│       ├── WeatherDetailView.vue        # 도시별 상세 날씨
│       ├── WeatherAboutView.vue         # 서비스 소개
│       └── NotFoundView.vue             # 404 페이지
└── vite.config.js
```

---

## 주요 학습 및 파일 설명

### 1. `WeatherMockup.vue`

기본적인 UI 레이아웃과 반응형 상태(`ref`)의 기초 구조를 잡는 Mockup 컴포넌트입니다.

### 2. `WeahterComposition.vue`

Mockup 구조를 바탕으로 실제 검색, 선택, 데이터 렌더링 동작을 구현했습니다.

- 디렉티브 활용 (`v-model`, `v-for`, `v-if`, `:style` 등)
- `watch` / `watchEffect`를 통한 반응형 데이터 변화 감지

### 3. `WeatherParent.vue` 및 하위 컴포넌트

단일 컴포넌트를 `BaseDashboardCard`, `SearchBar`, `WeatherCard`로 분리하여
props와 emit을 통한 부모-자식 간 컴포넌트 통신 구조를 구현했습니다.

### 4. Vue Router 적용 (`router/index.js`, `views/`)

- `/`, `/about`, `/weather/:cityId` 동적 라우트 구성
- URL 쿼리스트링(`?search=`)과 검색 상태 양방향 동기화(한글 입력을 위해)
- 존재하지 않는 경로를 위한 `NotFoundView`

### 5. Pinia 적용 (`stores/configStore.js`)

단위(섭씨/화씨) 상태를 스토어로 분리하여, 여러 컴포넌트가 하나의 상태를 공유하도록 구현했습니다.

### 6. Axios 적용 (`WeatherHomeView.vue`, `WeatherDetailView.vue`)

OpenWeatherMap API를 `Promise.all`로 병렬 호출하여 실시간 날씨 데이터를 가져왔습니다.
상세 페이지는 `route.params.cityId`를 `watch`하여, 같은 컴포넌트가 재사용 되는 상황에서도 최신 데이터를 다시 불러오도록 구현했습니다.

### 7. Element Plus 적용

`el-button`, `el-swtich`, `el-dialog`, `el-form`, `el-input`등을 활용했습니다.

---

## 추가적인 커스텀 기능 설명

### 1. 도시 추가하기 기능

기존 `WeatherHomeView`에서는 하드코딩하여 3개의 axios를 호출하는데 그쳤지만, `cityStore.js`(Pinia)로 도시 목록을 관리하도록 구현했습니다.
`el-dialog` + `el-form`으로 도시의 이름을 입력받아 스토어에 추가하면, 홈 화면 카드 목록과 상세 페이지 조회 로직이 새 도시를 인식할 수 있습니다.

### 2. 상세 페이지 데이터 미갱신 버그 수정

Vue Router는 동일 라우트 컴포넌트를 파라미터만 바꿔 **재사용** 하는 경우가 있어, `onMounted`에만 의존한 데이터 조회 로직이 다른 도시로 이동 시에 이전 데이터를 계속 보여주는 문제가 있었습니다.
`watch(() => route.params.cityId, ... , {imediate: true})`로 변경해 파라미터가 바뀔 때마다 재조회하도록 구현했습니다.

### 3. 라우트별 UI 요소 노출 제어 (섭씨 화씨 전환 스위치)

`/about` 페이지에서는 단위 전환 스위치가 필요하지 않다고 판단하여 숨겼습니다.
이때, 레이아웃이 흔들리지 않도록 `display` / `visibility` 대신 `opacity` + `pointere-events`로 구현했습니다.

### 4. UI 디테일 개선

- 검색창 인풋 스타일 (패딩/폰트 크기/포커스 스타일) 수정
- 날씨 카드에 기온 기준(더움/선선함) 컬러와 hover 인터랙션 추가
- 전역 레이아웃 중앙 정렬

---

## 프로젝트 실행 방법

```bash
# 의존성 패키지 설치
npm install
# 로컬 개발 서버 실행
npm run dev
# 프로덕션 빌드
npm run build
```
