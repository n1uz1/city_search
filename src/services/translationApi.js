// translationApi.js
const cityPinyinMap = {
    '北京': 'beijing',
    '北京市': 'beijing',
    '上海': 'shanghai',
    '上海市': 'shanghai',
    '广州': 'guangzhou',
    '广州市': 'guangzhou',
    '深圳': 'shenzhen',
    '深圳市': 'shenzhen',
    '成都': 'chengdu',
    '成都市': 'chengdu',
    '重庆': 'chongqing',
    '重庆市': 'chongqing',
    '天津': 'tianjin',
    '天津市': 'tianjin',
    '武汉': 'wuhan',
    '武汉市': 'wuhan',
    '西安': 'xian',
    '西安市': 'xian',
    '杭州': 'hangzhou',
    '杭州市': 'hangzhou',
    '南京': 'nanjing',
    '南京市': 'nanjing',
    '长沙': 'changsha',
    '长沙市': 'changsha',
    '合肥': 'hefei',
    '合肥市': 'hefei',
    '济南': 'jinan',
    '济南市': 'jinan',
    '郑州': 'zhengzhou',
    '郑州市': 'zhengzhou',
    '青岛': 'qingdao',
    '青岛市': 'qingdao',
    '宁波': 'ningbo',
    '宁波市': 'ningbo',
    // 添加更多城市映射
  };
  
  export function translateText(query) {
    return cityPinyinMap[query] || query;  // 未找到时返回原始查询
  }
  