// ------------------------------------
// 取得瘋殺資料, 本機端&雲端
// ------------------------------------
import axios from 'axios';

export async function fetchOnSaleData() {
    const nowUrl = window.location.href;
    const serchWord = nowUrl.indexOf('24h.pchome');
    let dataURL = '';

    // 檢查網址是否包含關鍵字
    dataURL = (serchWord < 0) 
        ? 'js/onsale.json' // 本機端
        : 'https://ecapi-cdn.pchome.com.tw/fsapi/cms/onsale'; // 雲端

    try {
        const response = await axios.get(dataURL);
        return response.data.data;
    } catch (error) {
        console.error('API 請求失敗:', error);
        throw error;
    }
}
