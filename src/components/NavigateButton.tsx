import { useState } from "react";

type Props = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Origin = { lat: number; lng: number } | null;

export function NavigateButton({ name, address, lat, lng }: Props) {
  const [origin, setOrigin] = useState<Origin>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = (from: Origin) => {
    const dest = `${lat},${lng}`;
    const params = new URLSearchParams({
      api: "1",
      destination: dest,
      destination_place_id: "",
      travelmode: "driving",
    });
    if (from) params.set("origin", `${from.lat},${from.lng}`);
    // remove empty key
    params.delete("destination_place_id");
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  };

  const openWith = (from: Origin) => {
    window.open(buildUrl(from), "_blank", "noopener,noreferrer");
  };

  const handleClick = () => {
    setError(null);
    if (!("geolocation" in navigator)) {
      openWith(null);
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const from = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setOrigin(from);
        setLoading(false);
        openWith(from);
      },
      () => {
        setLoading(false);
        setError("無法取得您的位置,將開啟未指定起點的路線");
        openWith(null);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-5 py-3 shadow-md transition"
        aria-label={`導航到 ${name}`}
      >
        <span aria-hidden>🧭</span>
        {loading ? "取得位置中…" : "導航到這家店"}
      </button>
      <p className="text-xs text-muted-foreground">
        目的地:{address}
        {origin && " · 已使用您的目前位置"}
      </p>
      {error && <p className="text-xs text-amber-600">{error}</p>}
    </div>
  );
}
