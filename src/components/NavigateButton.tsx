import { useEffect, useMemo, useState } from "react";

type Props = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Origin = { lat: number; lng: number } | null;

function buildGoogleWebUrl(destination: string, from: Origin) {
  const params = new URLSearchParams({
    api: "1",
    destination,
    travelmode: "driving",
  });
  if (from) params.set("origin", `${from.lat},${from.lng}`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

// Google Maps App scheme (iOS/Android 已安裝 App 時會直接開啟)
function buildGoogleAppUrl(destination: string, from: Origin) {
  const saddr = from ? `${from.lat},${from.lng}` : "";
  return `comgooglemaps://?daddr=${encodeURIComponent(destination)}${saddr ? `&saddr=${saddr}` : ""}&directionsmode=driving`;
}

function buildAppleMapsUrl(destination: string, from: Origin) {
  const params = new URLSearchParams({ daddr: destination, dirflg: "d" });
  if (from) params.set("saddr", `${from.lat},${from.lng}`);
  return `https://maps.apple.com/?${params.toString()}`;
}

function buildOsmUrl(lat: number, lng: number, from: Origin) {
  const fromStr = from ? `${from.lat},${from.lng}` : "";
  // OSM directions: route=from;to (空起點代表讓使用者後續設定)
  return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${fromStr};${lat},${lng}`;
}

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAppleUA() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
}

export function NavigateButton({ name, address, lat, lng }: Props) {
  const [origin, setOrigin] = useState<Origin>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"google" | "osm" | "apple" | null>(null);
  const [fallback, setFallback] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobileUA());
  }, []);

  const destination = `${name} ${address}`;
  const googleUrl = useMemo(() => buildGoogleWebUrl(destination, origin), [destination, origin]);
  const googleAppUrl = useMemo(() => buildGoogleAppUrl(destination, origin), [destination, origin]);
  const appleUrl = useMemo(() => buildAppleMapsUrl(destination, origin), [destination, origin]);
  const osmUrl = useMemo(() => buildOsmUrl(lat, lng, origin), [lat, lng, origin]);

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

  const copy = async (url: string, key: "google" | "osm" | "apple") => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
    } catch {
      // 後備:選取一個臨時 textarea
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(key);
        setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
      } catch {
        setError("複製失敗,請手動長按連結複製");
      }
      document.body.removeChild(ta);
    }
  };

  // 點擊 Google 後,若視窗在數百毫秒內仍可見 → 推測被封鎖,自動切到 OSM 提示
  const handleGoogleClick = () => {
    setError(null);
    const start = Date.now();
    // 透過 visibilitychange 判斷是否成功跳出
    let switched = false;
    const onVis = () => {
      if (document.visibilityState === "hidden") switched = true;
    };
    document.addEventListener("visibilitychange", onVis);
    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVis);
      if (!switched && Date.now() - start >= 1200) {
        setFallback(true);
        setError("看起來 Google 地圖被封鎖,已為您準備 OpenStreetMap 替代方案 ↓");
      }
    }, 1500);
  };

  return (
    <div className="space-y-3">
      {/* 起點按鈕 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleLocate}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-60 font-semibold px-4 py-2 text-sm transition"
        >
          {loading ? "取得位置中…" : origin ? "✓ 已使用您的位置" : "📍 使用我目前位置"}
        </button>
        {mobile && (
          <span className="inline-flex items-center text-xs text-muted-foreground">
            已偵測為行動裝置 · 將優先嘗試開啟地圖 App
          </span>
        )}
      </div>

      {/* 主要導航選項 */}
      <div className="grid sm:grid-cols-3 gap-2">
        <a
          href={mobile ? googleAppUrl : googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGoogleClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-3 shadow-md transition text-sm"
          aria-label={`用 Google 地圖導航到 ${name}`}
        >
          🧭 Google 地圖
        </a>
        <a
          href={appleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-4 py-3 shadow-md transition text-sm"
          aria-label={`用 Apple 地圖導航到 ${name}`}
        >
          🍎 Apple 地圖
        </a>
        <a
          href={osmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-4 py-3 shadow-md transition text-sm ${
            fallback
              ? "bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300"
              : "bg-emerald-100 hover:bg-emerald-200 text-emerald-900"
          }`}
          aria-label={`用 OpenStreetMap 導航到 ${name}`}
        >
          🗺️ OpenStreetMap
        </a>
      </div>

      {/* 推薦提示 */}
      {!mobile && isAppleUA() && (
        <p className="text-xs text-muted-foreground">
          偵測到 Apple 裝置 · Apple 地圖通常能直接在系統開啟
        </p>
      )}

      {/* 完整 URL + 複製 */}
      <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3">
        <p className="text-xs font-semibold text-muted-foreground">
          若連結被封鎖,可手動複製貼到新分頁開啟:
        </p>

        <UrlRow
          label="Google 地圖"
          url={googleUrl}
          copied={copied === "google"}
          onCopy={() => copy(googleUrl, "google")}
        />
        <UrlRow
          label="OpenStreetMap"
          url={osmUrl}
          copied={copied === "osm"}
          onCopy={() => copy(osmUrl, "osm")}
        />
        <UrlRow
          label="Apple 地圖"
          url={appleUrl}
          copied={copied === "apple"}
          onCopy={() => copy(appleUrl, "apple")}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        目的地:{address}
        {origin && " · 將從您目前位置出發"}
      </p>
      {error && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}

function UrlRow({
  label,
  url,
  copied,
  onCopy,
}: {
  label: string;
  url: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
      <span className="text-[11px] font-semibold text-muted-foreground sm:w-24 shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-2 min-w-0">
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="flex-1 min-w-0 text-xs bg-background border border-border rounded-md px-2 py-1.5 font-mono"
        />
        <button
          type="button"
          onClick={onCopy}
          className={`text-xs font-semibold px-3 py-1.5 rounded-md transition shrink-0 ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-foreground text-background hover:opacity-90"
          }`}
        >
          {copied ? "✓ 已複製" : "複製"}
        </button>
      </div>
    </div>
  );
}

