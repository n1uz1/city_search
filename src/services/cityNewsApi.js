// src/services/cityNewsApi.js

/**
 * 获取与城市相关的最新新闻
 * @param {string} cityName - 城市名称
 * @returns {Promise<Array>} - 返回新闻数组
 */
export async function fetchCityNews(cityName) {
    const apiKey = '8dd4febc63764884905a4d029b222e0b'; // https://newsapi.org
    const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(cityName)}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(newsUrl);
      const data = await response.json();
  
      if (data.status === 'ok') {
        return data.articles;  // 返回与城市相关的新闻
      } else {
        throw new Error('Failed to retrieve city news');
      }
    } catch (error) {
      console.error('Error fetching city news:', error);
      throw error;
    }
  }
  