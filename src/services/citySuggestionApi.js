import axios from 'axios';

const AMAP_KEY = '97d3af1a238197633e3a43f293662a93'; // 高德API密钥

// 获取城市提示
export async function fetchCitySuggestions(keywords) {
  try {
    const response = await axios.get('https://restapi.amap.com/v3/assistant/inputtips', {
      params: {
        key: AMAP_KEY,
        keywords,
        types: 'city',
        output: 'json'
      }
    });
    return response.data.tips;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
}
