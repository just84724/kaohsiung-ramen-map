export type RamenShop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  highlyRated: boolean;
  note?: string;
};

// 高雄知名拉麵店資料（座標為公開資訊近似值）
export const ramenShops: RamenShop[] = [
  {
    id: "1",
    name: "拉麵公子",
    address: "高雄市新興區民生一路56號",
    lat: 22.6298,
    lng: 120.3076,
    highlyRated: true,
    note: "濃郁豚骨，排隊名店",
  },
  {
    id: "2",
    name: "豚骨家 拉麵",
    address: "高雄市苓雅區青年一路141號",
    lat: 22.6225,
    lng: 120.3147,
    highlyRated: true,
    note: "湯頭濃厚",
  },
  {
    id: "3",
    name: "麵屋輝 高雄店",
    address: "高雄市新興區六合一路55號",
    lat: 22.6347,
    lng: 120.3055,
    highlyRated: true,
    note: "日本來台名店",
  },
  {
    id: "4",
    name: "花月嵐拉麵 夢時代店",
    address: "高雄市前鎮區中華五路789號",
    lat: 22.5956,
    lng: 120.3068,
    highlyRated: false,
  },
  {
    id: "5",
    name: "屯京拉麵 漢神巨蛋店",
    address: "高雄市左營區博愛二路777號",
    lat: 22.6680,
    lng: 120.3024,
    highlyRated: true,
    note: "東京池袋名店",
  },
  {
    id: "6",
    name: "一蘭拉麵 高雄店",
    address: "高雄市新興區中山一路115號",
    lat: 22.6310,
    lng: 120.3020,
    highlyRated: true,
    note: "天然豚骨，個人座位",
  },
  {
    id: "7",
    name: "鷹流東京醬油拉麵 蘭丸",
    address: "高雄市苓雅區三多三路213號",
    lat: 22.6116,
    lng: 120.3145,
    highlyRated: false,
  },
  {
    id: "8",
    name: "麵屋千雲",
    address: "高雄市鼓山區裕誠路1217號",
    lat: 22.6859,
    lng: 120.2958,
    highlyRated: true,
    note: "雞白湯系，在地人氣",
  },
  {
    id: "9",
    name: "拉麵 拓海家",
    address: "高雄市三民區義華路216號",
    lat: 22.6491,
    lng: 120.3094,
    highlyRated: false,
  },
  {
    id: "10",
    name: "山禾堂拉麵",
    address: "高雄市新興區林森一路165號",
    lat: 22.6275,
    lng: 120.3080,
    highlyRated: true,
    note: "台灣本土人氣品牌",
  },
  {
    id: "11",
    name: "町田商店 高雄夢時代店",
    address: "高雄市前鎮區中華五路789號",
    lat: 22.5953,
    lng: 120.3070,
    highlyRated: true,
    note: "日本家系拉麵",
  },
  {
    id: "12",
    name: "豚骨拉麵 暖暮",
    address: "高雄市左營區高鐵路123號",
    lat: 22.6873,
    lng: 120.3094,
    highlyRated: false,
  },
];
