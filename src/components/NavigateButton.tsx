import { useState } from "react";

type Props = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Origin = { lat: number; lng: number } | null;

function buildMapsUrl(lat: number, lng: number, from: Origin) {
  const params = new URLSearchParams({
    api: "1",
    destination: `${lat},${lng}`,
    travelmode: "driving",
  });
  if (from) params.set("origin", `${from.lat},${from.lng}`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function NavigateButton({ name, address, lat, lng }: Props) {
  const [origin, setOrigin] = useState<Origin>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const href = buildMapsUrl(lat, lng, origin);

  const handleLocate = () => {
    setError(null);
    if (!("geolocation" in navigator)) {
      setError("此瀏覽器不支援定位,將使用未指定起點的路線");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("無法取得您的位置,將使用未指定起點的路線");
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {/* 用原生 <a> 開新分頁,避免被 iframe 沙箱封鎖 window.open */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-3 shadow-md transition"
          aria-label={`在 Google 地圖開啟 ${name} 的路線`}
        >
          <span aria-hidden>🧭</span>
          在 Google 地圖開啟路線
        </a>
        <button
          type="button"
          onClick={handleLocate}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-60 font-semibold px-5 py-3 transition"
        >
          {loading ? "取得位置中…" : origin ? "✓ 已使用您的位置" : "使用我目前位置作為起點"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        目的地:{address}
        {origin && " · 將從您目前位置出發"}
      </p>
      {error && <p className="text-xs text-amber-600">{error}</p>}
      <p className="text-[11px] text-muted-foreground">
        若預覽中仍無法開啟,請在新分頁手動貼上連結,或改用手機開啟 Google 地圖 App。
      </p>
    </div>
  );
}
