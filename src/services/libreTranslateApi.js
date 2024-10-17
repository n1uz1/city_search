import axios from 'axios';

const LIBRE_TRANSLATE_API_URL = 'https://libretranslate.de/translate';

export async function translateTextLibre(query, sourceLang = 'zh', targetLang = 'en') {
  try {
    const response = await axios.post(LIBRE_TRANSLATE_API_URL, {
      q: query,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return query;  // 翻译失败时返回原始文本
  }
}
