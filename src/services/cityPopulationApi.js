import axios from 'axios';

const API_KEY = '175da24c86msh33d3cbd73c96bbap1c0a5ejsn49ca9bd1786a';  
const API_HOST = 'wft-geo-db.p.rapidapi.com';

export async function fetchCityPopulation(cityName) {
  try {
    const response = await axios.get(`https://${API_HOST}/v1/geo/cities`, {
      params: { namePrefix: cityName },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });
    
    const cityData = response.data.data[0];
    if (cityData && cityData.population) {
      return cityData.population;
    } else {
      return 'Population data not found';
    }
  } catch (error) {
    console.error('Error fetching city population:', error);
    throw error;
  }
}
