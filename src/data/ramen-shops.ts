export type RamenTag =
  | "豚骨"
  | "雞白湯"
  | "家系"
  | "醬油"
  | "味噌"
  | "沾麵"
  | "鹽味"
  | "魚介";

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

// 高雄知名拉麵店資料（座標為公開資訊近似值）
export const ramenShops: RamenShop[] = [
  {
    id: "1",
    name: "拉麵公子",
    address: "高雄市新興區民生一路56號",
    lat: 22.6298,
    lng: 120.3076,
    highlyRated: true,
    tags: ["豚骨"],
    note: "濃郁豚骨，排隊名店",
    signature: "濃厚豚骨拉麵",
    hours: "11:30 – 21:00",
    description:
      "高雄人氣豚骨拉麵代表，湯頭以豬骨長時間熬煮，奶白濃郁、入口香氣十足，搭配自製細麵與軟嫩叉燒。",
    reviewHighlights: [
      "湯頭濃郁不死鹹，超有層次",
      "叉燒入口即化，份量很實在",
      "麵條Q彈，吸湯能力一流",
    ],
  },
  {
    id: "2",
    name: "豚骨家 拉麵",
    address: "高雄市苓雅區青年一路141號",
    lat: 22.6225,
    lng: 120.3147,
    highlyRated: true,
    tags: ["豚骨", "家系"],
    note: "湯頭濃厚",
    signature: "家系豚骨拉麵",
    hours: "11:00 – 22:00",
    description: "走家系風格的豚骨拉麵，湯頭厚實鹹香，海苔配飯是吃家系的標配。",
    reviewHighlights: ["濃厚不膩", "海苔包飯一絕", "份量大、CP值高"],
  },
  {
    id: "3",
    name: "麵屋輝 高雄店",
    address: "高雄市新興區六合一路55號",
    lat: 22.6347,
    lng: 120.3055,
    highlyRated: true,
    tags: ["醬油", "豚骨"],
    note: "日本來台名店",
    signature: "醬油豚骨拉麵",
    hours: "11:30 – 21:30",
    description: "從日本登台的人氣品牌，醬油基底搭配豚骨湯頭，香氣明亮、尾韻乾淨。",
    reviewHighlights: ["湯頭很細緻", "叉燒處理得很好", "店內氛圍道地"],
  },
  {
    id: "4",
    name: "花月嵐拉麵 夢時代店",
    address: "高雄市前鎮區中華五路789號",
    lat: 22.5956,
    lng: 120.3068,
    highlyRated: false,
    tags: ["豚骨"],
    description: "日本連鎖品牌，主打蒜香豚骨拉麵，逛街順路吃選擇。",
  },
  {
    id: "5",
    name: "屯京拉麵 漢神巨蛋店",
    address: "高雄市左營區博愛二路777號",
    lat: 22.668,
    lng: 120.3024,
    highlyRated: true,
    tags: ["豚骨", "魚介"],
    note: "東京池袋名店",
    signature: "東京豚骨拉麵",
    hours: "11:00 – 22:00",
    description: "源自東京池袋的人氣名店，豚骨融合魚介湯頭，醇厚帶有海味。",
    reviewHighlights: ["湯頭有層次", "魚介香氣十足", "百貨內用餐方便"],
  },
  {
    id: "6",
    name: "一蘭拉麵 高雄店",
    address: "高雄市新興區中山一路115號",
    lat: 22.631,
    lng: 120.302,
    highlyRated: true,
    tags: ["豚骨"],
    note: "天然豚骨，個人座位",
    signature: "天然豚骨拉麵",
    hours: "10:00 – 23:00",
    description: "知名連鎖品牌，個人座位、客製化口味，觀光與在地都愛。",
    reviewHighlights: ["可自選辣度與濃度", "個人座位很自在", "湯頭順口好喝"],
  },
  {
    id: "7",
    name: "鷹流東京醬油拉麵 蘭丸",
    address: "高雄市苓雅區三多三路213號",
    lat: 22.6116,
    lng: 120.3145,
    highlyRated: false,
    tags: ["醬油"],
    description: "東京風格醬油拉麵，湯頭清爽帶醬香。",
  },
  {
    id: "8",
    name: "麵屋千雲",
    address: "高雄市鼓山區裕誠路1217號",
    lat: 22.6859,
    lng: 120.2958,
    highlyRated: true,
    tags: ["雞白湯"],
    note: "雞白湯系，在地人氣",
    signature: "濃厚雞白湯拉麵",
    hours: "11:30 – 14:00 / 17:30 – 21:00",
    description: "高雄少見的雞白湯拉麵，以雞骨慢熬出乳白色湯頭，香氣清雅、回甘明顯。",
    reviewHighlights: ["雞湯濃厚不膩", "細節用心", "在地老饕的口袋名單"],
  },
  {
    id: "9",
    name: "拉麵 拓海家",
    address: "高雄市三民區義華路216號",
    lat: 22.6491,
    lng: 120.3094,
    highlyRated: false,
    tags: ["家系", "豚骨"],
    description: "家系拉麵風格，份量十足。",
  },
  {
    id: "10",
    name: "山禾堂拉麵",
    address: "高雄市新興區林森一路165號",
    lat: 22.6275,
    lng: 120.308,
    highlyRated: true,
    tags: ["豚骨", "沾麵"],
    note: "台灣本土人氣品牌",
    signature: "白味噌豚骨拉麵",
    hours: "11:30 – 21:30",
    description: "台灣本土起家、紅到日本的拉麵品牌，湯頭風味多元，沾麵也很受歡迎。",
    reviewHighlights: ["味噌湯頭很有特色", "沾麵Q彈", "店內氛圍舒服"],
  },
  {
    id: "11",
    name: "町田商店 高雄夢時代店",
    address: "高雄市前鎮區中華五路789號",
    lat: 22.5953,
    lng: 120.307,
    highlyRated: true,
    tags: ["家系", "豚骨"],
    note: "日本家系拉麵",
    signature: "家系豚骨醬油拉麵",
    hours: "11:00 – 22:00",
    description: "日本家系拉麵連鎖，湯頭濃厚、海苔配飯經典組合。",
    reviewHighlights: ["道地家系風味", "白飯吃到飽超划算", "味道濃郁過癮"],
  },
  {
    id: "12",
    name: "豚骨拉麵 暖暮",
    address: "高雄市左營區高鐵路123號",
    lat: 22.6873,
    lng: 120.3094,
    highlyRated: false,
    tags: ["豚骨"],
    description: "九州博多風豚骨拉麵，麵條偏細。",
  },
];

export const ALL_TAGS: RamenTag[] = ["豚骨", "雞白湯", "家系", "醬油", "味噌", "沾麵", "鹽味"];

export function getShopById(id: string) {
  return ramenShops.find((s) => s.id === id);
}
