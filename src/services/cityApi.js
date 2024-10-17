// src/services/cityApi.js

/**
 * 获取城市的概述信息
 * @param {string} cityName - 城市名称
 * @returns {Promise<string>} - 返回城市概述的HTML
 */
export async function fetchCityInfo(cityName) {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${cityName}`);
      const data = await response.json();
  
      // 检查 API 返回的数据是否包含提要
      if (data && data.extract) {
        return data.extract_html || data.extract;  // 返回提要
      } else {
        return "No information available for this city.";
      }
    } catch (error) {
      console.error("Error fetching city info:", error);
      return "Error retrieving city information.";
    }
  }
  