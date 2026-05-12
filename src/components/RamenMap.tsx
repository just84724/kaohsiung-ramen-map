import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "@tanstack/react-router";
import { ramenShops, type RamenShop } from "@/data/ramen-shops";

const bowlSvg = (color: string, ring: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
  <defs>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.35"/>
    </filter>
  </defs>
  <g filter="url(#s)">
    <path d="M22 52 L10 36 H34 Z" fill="${color}"/>
    <circle cx="22" cy="22" r="20" fill="${color}" stroke="${ring}" stroke-width="2"/>
    <path d="M9 20 Q22 32 35 20 Q33 30 22 30 Q11 30 9 20Z" fill="#fff"/>
    <path d="M9 20 H35" stroke="#fff" stroke-width="2"/>
    <path d="M13 18 Q17 14 21 18 T29 18" stroke="#f5d061" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M13 22 Q17 18 21 22 T29 22" stroke="#f5d061" stroke-width="2" fill="none" stroke-linecap="round"/>
    <line x1="26" y1="6" x2="34" y2="20" stroke="#8b5a2b" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="29" y1="5" x2="36" y2="19" stroke="#8b5a2b" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M18 10 q-2 -3 0 -6" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.85"/>
    <path d="M22 9 q-2 -3 0 -6" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.85"/>
  </g>
</svg>`;

const makeIcon = (highly: boolean) =>
  L.divIcon({
    className: "ramen-marker",
    html: `<div style="position:relative">${bowlSvg(
      highly ? "#e11d48" : "#1f2937",
      highly ? "#fde68a" : "#9ca3af",
    )}${
      highly
        ? `<div style="position:absolute;top:-6px;right:-6px;background:#fde047;color:#7c2d12;border-radius:9999px;font-size:10px;font-weight:800;padding:2px 5px;box-shadow:0 1px 4px rgba(0,0,0,.3);border:1.5px solid #fff;">★</div>`
        : ""
    }</div>`,
    iconSize: [44, 54],
    iconAnchor: [22, 52],
    popupAnchor: [0, -46],
  });

type Props = { shops?: RamenShop[] };

export function RamenMap({ shops = ramenShops }: Props) {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <MapContainer
      center={[22.633, 120.305]}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full rounded-2xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={makeIcon(s.highlyRated)}>
          <Popup>
            <div className="space-y-1.5 min-w-[180px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-foreground">{s.name}</span>
                {s.highlyRated && (
                  <span className="text-[10px] font-bold bg-yellow-300 text-yellow-900 px-1.5 py-0.5 rounded-full">
                    ★ 好評
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{s.address}</div>
              {s.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <Link
                  to="/shops/$shopId"
                  params={{ shopId: s.id }}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  查看詳情 →
                </Link>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-foreground hover:underline"
                >
                  🧭 導航
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
