// src/services/cityEnvironmentApi.js

/**
 * 获取城市的adcode（行政区划代码）
 * @param {string} cityName - 城市名称
 * @returns {Promise<string>} - 返回城市的adcode
 */
export async function fetchCityAdcode(cityName) {
    const apiKey = '97d3af1a238197633e3a43f293662a93'; 
    const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${encodeURIComponent(cityName)}&key=${apiKey}`;
  
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
  
      if (data.geocodes.length > 0) {
        return data.geocodes[0].adcode;  // 返回城市的adcode
      } else {
        throw new Error('City adcode not found');
      }
    } catch (error) {
      console.error('Error fetching city adcode:', error);
      throw error;
    }
  }
  
  /**
   * 根据adcode获取城市的实时天气和空气质量信息
   * @param {string} adcode - 城市的adcode
   * @returns {Promise<object>} - 返回天气的详细信息
   */
  export async function fetchCityEnvironment(adcode) {
    const apiKey = '97d3af1a238197633e3a43f293662a93'; 
    const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${apiKey}&extensions=base`;
  
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
  
      if (data.status === '1' && data.lives.length > 0) {
        return data.lives[0];  // 返回实时天气信息
      } else {
        throw new Error('Failed to retrieve environment data');
      }
    } catch (error) {
      console.error('Error fetching city environment info:', error);
      throw error;
    }
  }
  