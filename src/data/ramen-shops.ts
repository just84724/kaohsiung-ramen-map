export type RamenTag =
  | "豚骨"
  | "雞白湯"
  | "家系"
  | "醬油"
  | "味噌"
  | "沾麵"
  | "鹽味"
  | "魚介"
  | "牛骨";

export type RamenShop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  highlyRated: boolean;
  tags: RamenTag[];
  note?: string;
  description?: string;
  reviewHighlights?: string[];
  signature?: string;
  hours?: string;
};

// 高雄真實存在的拉麵店（資料整理自 Google 評論與在地美食部落格,座標為近似值)
// 建議點擊「在 Google 地圖開啟」以確認最新地址與營業時間
export const ramenShops: RamenShop[] = [
  {
    id: "1",
    name: "山禾堂拉麵 高雄總本店",
    address: "高雄市新興區林森一路165號",
    lat: 22.6305,
    lng: 120.3042,
    highlyRated: true,
    tags: ["豚骨", "味噌", "沾麵"],
    note: "台灣本土起家、紅到日本",
    signature: "白味噌豚骨拉麵",
    hours: "11:30 – 14:30 / 17:30 – 21:30",
    description:
      "從高雄起家、進軍東京的台灣品牌,招牌白味噌豚骨湯頭濃郁滑順,沾麵也是人氣選項。",
    reviewHighlights: [
      "白味噌湯頭超有特色",
      "麵條Q彈、叉燒厚實",
      "店內氛圍很道地",
    ],
  },
  {
    id: "2",
    name: "一風堂 漢神巨蛋店",
    address: "高雄市左營區博愛二路777號 漢神巨蛋B1",
    lat: 22.6698,
    lng: 120.3024,
    highlyRated: true,
    tags: ["豚骨"],
    note: "日本福岡博多名店",
    signature: "白丸元味 / 赤丸新味",
    hours: "11:00 – 22:00",
    description:
      "日本福岡發跡的世界級豚骨拉麵品牌,白丸湯頭溫潤、赤丸辣味更有層次。",
    reviewHighlights: ["豚骨湯頭乾淨不腥", "細麵口感極佳", "百貨內方便用餐"],
  },
  {
    id: "3",
    name: "一風堂 SKM Park店",
    address: "高雄市前鎮區中安路1-1號 SKM Park 草衙",
    lat: 22.5816,
    lng: 120.3296,
    highlyRated: true,
    tags: ["豚骨"],
    signature: "赤丸新味",
    hours: "11:00 – 22:00",
    description: "一風堂在草衙道(SKM Park)的分店,逛街吃拉麵的好選擇。",
    reviewHighlights: ["環境舒適", "適合家庭聚餐", "服務細心"],
  },
  {
    id: "4",
    name: "屯京拉麵 漢神巨蛋店",
    address: "高雄市左營區博愛二路777號 漢神巨蛋B1",
    lat: 22.6698,
    lng: 120.3024,
    highlyRated: true,
    tags: ["豚骨", "魚介"],
    note: "東京池袋名店",
    signature: "東京豚骨拉麵",
    hours: "11:00 – 22:00",
    description: "源自東京池袋的人氣品牌,豚骨融合魚介湯頭,醇厚帶有海味。",
    reviewHighlights: ["湯頭層次豐富", "魚介香氣明顯", "份量飽足"],
  },
  {
    id: "5",
    name: "花月嵐拉麵 夢時代店",
    address: "高雄市前鎮區中華五路789號 統一夢時代3F",
    lat: 22.595,
    lng: 120.307,
    highlyRated: false,
    tags: ["豚骨"],
    signature: "嵐拉麵 / 元祖蒜油拳骨拉麵",
    description: "日本連鎖品牌,主打蒜香豚骨拉麵,逛街順路用餐選擇。",
  },
  {
    id: "6",
    name: "町田商店 高雄夢時代店",
    address: "高雄市前鎮區中華五路789號 統一夢時代",
    lat: 22.595,
    lng: 120.307,
    highlyRated: true,
    tags: ["家系", "豚骨", "醬油"],
    note: "日本家系拉麵連鎖",
    signature: "家系豚骨醬油拉麵",
    hours: "11:00 – 22:00",
    description: "日本家系拉麵連鎖,湯頭濃厚、配海苔包飯經典。",
    reviewHighlights: ["道地家系風味", "白飯吃到飽", "口味濃郁過癮"],
  },
  {
    id: "7",
    name: "初代花山拉麵",
    address: "高雄市新興區民族二路86號",
    lat: 22.6333,
    lng: 120.3139,
    highlyRated: true,
    tags: ["豚骨"],
    note: "排隊名店、老闆出身一本拉麵",
    signature: "濃厚豚骨拉麵 / 鮮蝦雲吞",
    hours: "11:30 – 14:00 / 17:30 – 20:30(週二公休)",
    description:
      "2023 年開業的高雄排隊店,老闆曾在新崛江老牌「一本拉麵」歷練多年,豚骨湯頭奶白濃厚。",
    reviewHighlights: ["湯頭濃郁香氣足", "舒肥雙叉燒入口即化", "鮮蝦雲吞驚艷"],
  },
  {
    id: "8",
    name: "獺鯌拉麵",
    address: "高雄市鹽埕區大公路78號",
    lat: 22.6243,
    lng: 120.2856,
    highlyRated: true,
    tags: ["豚骨", "醬油"],
    note: "鹽埕區人氣平價拉麵",
    signature: "炙燒叉燒拉麵",
    hours: "11:30 – 14:30 / 17:30 – 20:30",
    description: "鹽埕區拉麵控必訪,Google 4.4 顆星,炙燒叉燒香氣十足、價格親民。",
    reviewHighlights: ["炙燒叉燒香嫩", "湯頭順口", "CP值超高"],
  },
  {
    id: "9",
    name: "拳麵",
    address: "高雄市新興區六合一路55號",
    lat: 22.633,
    lng: 120.301,
    highlyRated: true,
    tags: ["豚骨", "沾麵"],
    note: "高雄拉麵四天王之一",
    signature: "豚骨沾麵",
    hours: "11:30 – 14:30 / 17:30 – 21:00",
    description: "高雄老字號拉麵店,被在地人封為「拉麵四天王」之一,沾麵湯頭濃厚。",
    reviewHighlights: ["沾麵湯頭驚人", "麵體粗實有嚼勁", "內行人才知道"],
  },
  {
    id: "10",
    name: "麵屋祥",
    address: "高雄市鼓山區裕興路213號",
    lat: 22.668,
    lng: 120.2953,
    highlyRated: true,
    tags: ["豚骨", "雞白湯"],
    note: "鼓山在地人氣",
    signature: "豚骨拉麵",
    hours: "11:30 – 14:00 / 17:30 – 21:00(週三公休)",
    description: "鼓山區隱藏版拉麵,湯頭細膩、用料實在,在地人口袋名單。",
    reviewHighlights: ["湯頭溫潤回甘", "叉燒處理用心", "店主很有想法"],
  },
  {
    id: "11",
    name: "吉胤家 橫浜家系ラーメン",
    address: "高雄市三民區義華路216號",
    lat: 22.6432,
    lng: 120.3387,
    highlyRated: true,
    tags: ["家系", "豚骨"],
    note: "正統橫浜家系",
    signature: "家系豚骨醬油拉麵",
    hours: "11:30 – 14:00 / 17:30 – 21:00",
    description: "走正統橫浜家系路線,湯頭厚實鹹香,海苔包飯是必點吃法。",
    reviewHighlights: ["道地家系味道", "海苔包白飯一絕", "份量大"],
  },
  {
    id: "12",
    name: "田介拉麵",
    address: "高雄市鹽埕區大義街2-2號 駁二藝術特區",
    lat: 22.6185,
    lng: 120.2849,
    highlyRated: true,
    tags: ["豚骨", "雞白湯"],
    note: "駁二低調人氣店",
    signature: "雞豚骨拉麵",
    hours: "11:30 – 14:00 / 17:30 – 20:30",
    description: "藏在鹽埕的低調拉麵,湯頭以雞豚骨慢熬,清爽中帶濃郁可以喝光。",
    reviewHighlights: ["湯頭可以喝光", "叉燒軟嫩", "氣氛舒服"],
  },
  {
    id: "13",
    name: "鬼川拉麵丼飯",
    address: "高雄市鳳山區青年路二段331號",
    lat: 22.6308,
    lng: 120.353,
    highlyRated: false,
    tags: ["豚骨", "醬油"],
    signature: "豚骨拉麵 / 丼飯",
    description: "鳳山區人氣拉麵丼飯店,選擇多元、份量實在。",
  },
  {
    id: "14",
    name: "初代 拉麵公子",
    address: "高雄市新興區民生一路56號",
    lat: 22.628,
    lng: 120.3104,
    highlyRated: true,
    tags: ["豚骨"],
    signature: "濃厚豚骨拉麵",
    hours: "11:30 – 21:00",
    description: "高雄人氣豚骨拉麵店,湯頭濃郁、叉燒軟嫩。",
    reviewHighlights: ["湯頭濃厚", "叉燒入口即化", "麵條Q彈"],
  },
  {
    id: "15",
    name: "初代花山拉麵 牛骨白湯專門",
    address: "高雄市新興區民生路與民族二路口",
    lat: 22.6325,
    lng: 120.305,
    highlyRated: true,
    tags: ["牛骨"],
    note: "高雄唯一牛骨白湯專門店",
    signature: "牛骨白湯拉麵",
    hours: "11:30 – 14:00 / 17:30 – 20:30",
    description:
      "全高雄少見以牛骨慢熬白湯為主軸的拉麵店,湯頭奶白香醇,風格獨特。",
    reviewHighlights: ["牛骨白湯非常少見", "湯頭乳白濃郁", "風格強烈"],
  },
];

export const ALL_TAGS: RamenTag[] = [
  "豚骨",
  "雞白湯",
  "家系",
  "醬油",
  "味噌",
  "魚介",
  "沾麵",
  "鹽味",
  "牛骨",
];

export function getShopById(id: string) {
  return ramenShops.find((s) => s.id === id);
}

/** 產生 Google 地圖搜尋連結(以店名+地址搜尋,可確認真實位置) */
export function googleMapsSearchUrl(shop: { name: string; address: string }) {
  const q = encodeURIComponent(`${shop.name} ${shop.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
