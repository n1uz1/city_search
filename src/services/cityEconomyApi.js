/**
 * 获取城市的详细信息（使用 Teleport API）
 * @param {string} citySlug - 城市的唯一标识符（如 beijing、san-francisco-bay-area）
 * @returns {Promise<object>} - 返回城市的详细数据
 */
export async function fetchCityDetails(citySlug) {
    const apiUrl = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details/`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.categories) {
        return data.categories;  // 返回详细数据
      } else {
        throw new Error('Failed to retrieve city details');
      }
    } catch (error) {
      console.error('Error fetching city details:', error);
      throw error;
    }
  }
  