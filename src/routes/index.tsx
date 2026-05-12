import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { ramenShops } from "@/data/ramen-shops";

const RamenMap = lazy(() =>
  import("@/components/RamenMap").then((m) => ({ default: m.RamenMap })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "高雄拉麵地圖 | Kaohsiung Ramen Map" },
      {
        name: "description",
        content: "精選高雄市拉麵店地圖，標示店名與好評推薦，找到最對味的一碗。",
      },
    ],
  }),
});

function Index() {
  const [onlyRated, setOnlyRated] = useState(false);
  const shops = useMemo(
    () => (onlyRated ? ramenShops.filter((s) => s.highlyRated) : ramenShops),
    [onlyRated],
  );
  const ratedCount = ramenShops.filter((s) => s.highlyRated).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-background to-rose-50">
      <header className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🍜</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              高雄拉麵地圖
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              共 {ramenShops.length} 間店家 · ⭐ 好評 {ratedCount} 間
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOnlyRated(false)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              !onlyRated
                ? "bg-foreground text-background shadow"
                : "bg-white border border-border text-foreground hover:bg-accent"
            }`}
          >
            全部店家
          </button>
          <button
            onClick={() => setOnlyRated(true)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              onlyRated
                ? "bg-rose-600 text-white shadow"
                : "bg-white border border-border text-foreground hover:bg-accent"
            }`}
          >
            ⭐ 只看好評
          </button>
          <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-rose-600 ring-2 ring-yellow-300" />
              好評
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-800 ring-2 ring-gray-300" />
              一般
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="h-[70vh] min-h-[480px] rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white">
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                載入地圖中…
              </div>
            }
          >
            <RamenMap key={onlyRated ? "rated" : "all"} />
          </Suspense>
        </section>

        <aside className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4 max-h-[70vh] overflow-y-auto">
          <h2 className="font-bold text-foreground mb-3">店家清單</h2>
          <ul className="space-y-2">
            {shops.map((s) => (
              <li
                key={s.id}
                className="p-3 rounded-xl border border-border hover:border-rose-300 hover:bg-rose-50/40 transition"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl leading-none">🍜</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-foreground">{s.name}</span>
                      {s.highlyRated && (
                        <span className="text-[10px] font-bold bg-yellow-300 text-yellow-900 px-1.5 py-0.5 rounded-full">
                          ★ 好評
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.address}</p>
                    {s.note && (
                      <p className="text-xs text-foreground/80 mt-1 italic">{s.note}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="text-center text-xs text-muted-foreground pb-8">
        資料僅供參考 · 地圖 © OpenStreetMap 貢獻者
      </footer>
    </div>
  );
}
