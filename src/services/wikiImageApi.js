import axios from 'axios';

// 从维基百科获取城市图片
export async function fetchCityImages(city) {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${city}&pithumbsize=500&origin=*`
    );
    const pages = response.data.query.pages;
    const imageUrls = [];

    for (let pageId in pages) {
      if (pages[pageId].thumbnail) {
        imageUrls.push(pages[pageId].thumbnail.source);
      }
    }

    return imageUrls;
  } catch (error) {
    console.error('Error fetching city images from Wikipedia:', error);
    return [];
  }
}
