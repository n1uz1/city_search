// src/services/cityMapApi.js

/**
 * 获取城市的地理编码（经纬度）
 * @param {string} cityName - 城市名称
 * @returns {Promise<object>} - 返回经纬度
 */
export async function fetchCityLocation(cityName) {
    const apiKey = '97d3af1a238197633e3a43f293662a93'; //https://console.amap.com/dev/key/app
    const geocodeUrl = `https://restapi.amap.com/v3/geocode/geo?address=${cityName}&key=${apiKey}`;
    
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
  
      if (data.geocodes && data.geocodes.length > 0) {
        const location = data.geocodes[0].location; // 获取经纬度
        return location;  // 以 "lng,lat" 形式返回
      } else {
        throw new Error('No location found for this city');
      }
    } catch (error) {
      console.error('Error fetching city location:', error);
      throw error;
    }
  }
  
  /**
   * 生成高德静态地图的 URL
   * @param {string} lng - 经度
   * @param {string} lat - 纬度
   * @returns {string} - 返回静态地图的 URL
   */
  export function generateMapUrl(lng, lat) {
    const apiKey = '97d3af1a238197633e3a43f293662a93'; 
    const zoom = 10;
    const size = '750*300';
    return `https://restapi.amap.com/v3/staticmap?location=${lng},${lat}&zoom=${zoom}&size=${size}&key=${apiKey}`;
  }
  