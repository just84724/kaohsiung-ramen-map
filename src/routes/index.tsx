import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { ALL_TAGS, ramenShops, type RamenTag } from "@/data/ramen-shops";

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
        content: "精選高雄市拉麵店地圖,可依店名搜尋、湯頭類型篩選,並查看好評推薦。",
      },
    ],
  }),
});

function Index() {
  const [onlyRated, setOnlyRated] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<RamenTag[]>([]);

  const toggleTag = (t: RamenTag) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const shops = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ramenShops.filter((s) => {
      if (onlyRated && !s.highlyRated) return false;
      if (activeTags.length && !activeTags.every((t) => s.tags.includes(t))) return false;
      if (q && !`${s.name} ${s.address}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [onlyRated, query, activeTags]);

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

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] items-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              🔍
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋店名或地址(例:一蘭、左營區)"
              className="w-full pl-9 pr-9 py-2.5 rounded-full bg-white border border-border shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="清除搜尋"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyRated(false)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                !onlyRated
                  ? "bg-foreground text-background shadow"
                  : "bg-white border border-border text-foreground hover:bg-accent"
              }`}
            >
              全部
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
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">湯頭/類型:</span>
          {ALL_TAGS.map((t) => {
            const active = activeTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                  active
                    ? "bg-rose-600 text-white border-rose-600 shadow"
                    : "bg-white text-foreground border-border hover:border-rose-300"
                }`}
              >
                #{t}
              </button>
            );
          })}
          {(activeTags.length > 0 || query || onlyRated) && (
            <button
              onClick={() => {
                setActiveTags([]);
                setQuery("");
                setOnlyRated(false);
              }}
              className="ml-1 text-xs text-rose-600 hover:underline"
            >
              清除全部
            </button>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            符合 {shops.length} 間
          </span>
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
            <RamenMap shops={shops} />
          </Suspense>
        </section>

        <aside className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4 max-h-[70vh] overflow-y-auto">
          <h2 className="font-bold text-foreground mb-3">店家清單</h2>
          {shops.length === 0 ? (
            <p className="text-sm text-muted-foreground">沒有符合條件的店家,試試清除篩選。</p>
          ) : (
            <ul className="space-y-2">
              {shops.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/shops/$shopId"
                    params={{ shopId: s.id }}
                    className="block p-3 rounded-xl border border-border hover:border-rose-300 hover:bg-rose-50/40 transition"
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
                        <div className="mt-1 flex flex-wrap gap-1">
                          {s.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                        {s.note && (
                          <p className="text-xs text-foreground/80 mt-1 italic">{s.note}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      <footer className="text-center text-xs text-muted-foreground pb-8">
        資料僅供參考 · 地圖 © OpenStreetMap 貢獻者
      </footer>
    </div>
  );
}
