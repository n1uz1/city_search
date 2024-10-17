<template>
  <div class="city-search-page">
    <div class="hero">
      <h1>City Explorer</h1>
      <p>Discover detailed information about cities around the world</p>

      <!-- 搜索框 -->
      <div class="search-container">
        <input 
          v-model="city" 
          @input="getCitySuggestions" 
          placeholder="Enter city name" 
          class="search-input" 
        />
        <button @click="searchCity" class="search-button">Search</button>
      </div>

      <!-- 城市下拉提示 -->
      <ul v-if="suggestions && suggestions.length > 0" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion.name" @click="selectCity(suggestion.name)">
          {{ suggestion.name }}
        </li>
      </ul>
    </div>

    <!-- 卡片布局 -->
    <div class="card-layout" v-if="cityInfo || environmentInfo || cityImages.length > 0">
      <!-- 左侧：圆形卡片 (image -> map) -->
      <div class="flip-card circle-card" @click="toggleCard('image')">
        <div :class="['flip-card-inner', { flipped: flippedCards.image }]">
          <div class="flip-card-front">
            <img v-if="cityImages.length > 0" :src="cityImages[0]" alt="City Image" class="city-image" />
          </div>
          <div class="flip-card-back">
            <img v-if="mapUrl" :src="mapUrl" alt="City Map" class="city-map" />
          </div>
        </div>
      </div>

      

      <!-- 右侧：方形卡片 (information -> news) -->
      <div class="flip-card info-card" @click="toggleCard('info')">
        <div :class="['flip-card-inner', { flipped: flippedCards.info }]">
          <div class="flip-card-front">
            <h3>City Information</h3>
            <p v-if="cityInfo" v-html="cityInfo"></p>
          </div>
          <div class="flip-card-back">
            <h3>Latest News</h3>
            <ul>
            <li v-for="article in news.slice(0, 3)" :key="article.url">
            <a :href="article.url" target="_blank">{{ article.title }}</a>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      

    <!-- 底部的小卡片 -->
    <div class="bottom-card-container" v-if="cityPopulation || environmentInfo">
      <!-- 流行度卡片 -->
      <div class="popularity-card">
        <h3>Popularity</h3>
        <p v-if="cityPopulation">City Popularity Index: {{ cityPopulation }}</p>
      </div>

      <!-- 天气卡片 -->
      <div class="weather-card" v-if="environmentInfo">
        <h3>Weather</h3>
        <p>Temperature: {{ environmentInfo.temperature }}°C</p>
        <p>Humidity: {{ environmentInfo.humidity }}%</p>
        <p>Wind: {{ environmentInfo.winddirection }} {{ environmentInfo.windpower }}级</p>
      </div>
    </div>
  </div>
</template>

<script>
// 导入封装的 API 调用
import { fetchCityInfo } from '../services/cityApi';
import { fetchCityLocation, generateMapUrl } from '../services/cityMapApi';
import { fetchCityAdcode, fetchCityEnvironment } from '../services/cityEnvironmentApi';
import { fetchCityNews } from '../services/cityNewsApi';
import { fetchCityImages } from '../services/wikiImageApi';
import { fetchCitySuggestions } from '../services/citySuggestionApi';
import { fetchCityPopulation } from '../services/cityPopulationApi';  // 新增人口数据查询导入
import { translateText } from '../services/translationApi'; // 导入城市名称翻译

export default {
  name: 'CitySearch',
  data() {
    return {
      city: '',
      cityInfo: null,
      mapUrl: null,
      environmentInfo: null,
      news: [],
      cityImages: [],
      cityPopulation: null,  // 保存城市人口
      suggestions: [],  // 初始化为空数组
      flippedCards: {
        image: false,
        info: false
      }
    };
  },
  methods: {
    async searchCity() {
      if (this.city) {
        const translatedCity = translateText(this.city);  // 调用翻译功能转换中文名称

        // 获取城市概述信息
        this.cityInfo = await fetchCityInfo(translatedCity);

        try {
          const location = await fetchCityLocation(translatedCity);
          const [lng, lat] = location.split(',');
          this.mapUrl = generateMapUrl(lng, lat);
        } catch (error) {
          console.error('Error fetching city location or map:', error);
          this.mapUrl = null;
        }

        try {
          const adcode = await fetchCityAdcode(translatedCity);
          this.environmentInfo = await fetchCityEnvironment(adcode);
        } catch (error) {
          console.error('Error fetching environment info:', error);
          this.environmentInfo = null;
        }

        try {
          this.news = await fetchCityNews(translatedCity);
        } catch (error) {
          console.error('Error fetching city news:', error);
          this.news = [];
        }

        try {
          this.cityImages = await fetchCityImages(translatedCity);
        } catch (error) {
          console.error('Error fetching city images:', error);
          this.cityImages = [];
        }

        // 获取城市人口
        try {
          this.cityPopulation = await fetchCityPopulation(translatedCity);
        } catch (error) {
          console.error('Error fetching city population:', error);
          this.cityPopulation = 'Population data not available';
        }
      }
    },
    async getCitySuggestions() {
      if (this.city.length > 0) {
        this.suggestions = await fetchCitySuggestions(this.city);
      } else {
        this.suggestions = [];
      }
    },
    selectCity(cityName) {
      this.city = cityName;
      this.suggestions = [];
    },
    toggleCard(card) {
      this.flippedCards[card] = !this.flippedCards[card];
    }
  }
};
</script>

<style scoped> 
/* 全局背景图 */
.city-search-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-image: url('@/picture/background.png');
  background-size: cover;
  background-attachment: fixed;
  padding: 20px;
  min-height: 100vh;
}

/* 顶部区域 */
.hero {
  text-align: center;
  padding: 50px 0;
  background-color: rgba(74, 144, 226, 0.8);
  color: white;
  margin-bottom: 40px;
  border-radius: 8px;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

/* 搜索框设计 */
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 1em;
  margin-right: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-button {
  padding: 15px 30px;
  background-color: #47a447;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #3b8b3b;
}

/* 卡片布局 */
.card-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start; /* 确保卡片对齐 */
}

/* 卡片的翻转动画 */
.flip-card {
  perspective: 1000px;
  width: 600px; 
  height: 300px;
  cursor: pointer;
}

.circle-card {
  position: relative; /* 让这个卡片相对于自身进行移动 */
  top: 100px; /* 控制向下移动的距离，调整这个值来实现你想要的位置 */ 
  border-radius: 50%; /* 将卡片变为圆形 */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* 翻转后背景颜色改为白色 */
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-card:not(.info-card) .flip-card-front,
.flip-card:not(.info-card) .flip-card-back {
  background-color: transparent; /* 使图片和地图卡片的背景透明 */
}

/* 保持 info 卡片的白色背景 */
.flip-card.info-card .flip-card-front,
.flip-card.info-card .flip-card-back {
  background-color: #fff; /* 维持 info 卡片的白色背景 */
}

/* 底部的小卡片布局 */
.bottom-card-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 两个卡片之间的间隙 */
  margin-top: 20px;
  margin-left: 620px; /* 向右移动以使布局对齐 */
}

/* 流行度卡片 */
.popularity-card {
  background-color: white;
  padding: 50px;
  border-radius: 8px;
  width: 200px; 
  height: 150px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 天气卡片 */
.weather-card {
  background-color: white;
  padding: 50px;
  border-radius: 8px;
  width: 200px;
  height: 150px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 圆形图片和地图 */
.city-image,
.city-map {
  width: 100%;
  height: 180%;
  border-radius: 50%;
  margin-top: 300px；
}
</style>
