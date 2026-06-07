import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { ALL_TAGS, ramenShops, type RamenTag, type RamenShop } from "@/data/ramen-shops";
import { haversineKm, formatKm } from "@/lib/geo";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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

type ShopWithDist = RamenShop & { _dist?: number };

function Index() {
  const isMobile = useIsMobile();
  const [onlyRated, setOnlyRated] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<RamenTag[]>([]);
  const [focusedShopId, setFocusedShopId] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [sortByDist, setSortByDist] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleTag = (t: RamenTag) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleLocate = () => {
    setLocError(null);
    if (!("geolocation" in navigator)) {
      setLocError("此瀏覽器不支援定位");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSortByDist(true);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setLocError("無法取得您的位置,請允許瀏覽器存取定位");
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const shops: ShopWithDist[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: ShopWithDist[] = ramenShops.filter((s) => {
      if (onlyRated && !s.highlyRated) return false;
      if (activeTags.length && !activeTags.every((t) => s.tags.includes(t))) return false;
      if (q && !`${s.name} ${s.address}`.toLowerCase().includes(q)) return false;
      return true;
    });
    if (userLoc) {
      list = list.map((s) => ({ ...s, _dist: haversineKm(userLoc, s) }));
      if (sortByDist) list.sort((a, b) => (a._dist! - b._dist!));
    }
    return list;
  }, [onlyRated, query, activeTags, userLoc, sortByDist]);

  const ratedCount = ramenShops.filter((s) => s.highlyRated).length;

  const handleSelectShop = (id: string) => {
    setFocusedShopId(id);
    if (isMobile) setSheetOpen(false);
  };

  const listContent = (
    <>
      {shops.length === 0 ? (
        <p className="text-sm text-muted-foreground">沒有符合條件的店家,試試清除篩選。</p>
      ) : (
        <ul className="space-y-2">
          {shops.map((s) => {
            const active = focusedShopId === s.id;
            return (
              <li key={s.id}>
                <div
                  className={`block p-3 rounded-xl border transition cursor-pointer active:scale-[0.99] ${
                    active
                      ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200"
                      : "border-border hover:border-rose-300 hover:bg-rose-50/40"
                  }`}
                  onClick={() => handleSelectShop(s.id)}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xl leading-none">🍜</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-foreground break-words">{s.name}</span>
                        {s.highlyRated && (
                          <span className="text-[10px] font-bold bg-yellow-300 text-yellow-900 px-1.5 py-0.5 rounded-full">
                            ★ 好評
                          </span>
                        )}
                        {typeof s._dist === "number" && (
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                            📍 {formatKm(s._dist)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 break-words">{s.address}</p>
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
                      <Link
                        to="/shops/$shopId"
                        params={{ shopId: s.id }}
                        className="inline-block mt-2 text-xs font-semibold text-rose-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        查看詳情 →
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-amber-50 via-background to-rose-50">
      <header className="max-w-6xl mx-auto px-4 pt-6 md:pt-10 pb-4 md:pb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl md:text-4xl">🍜</div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
              高雄拉麵地圖
            </h1>
            <p className="text-xs md:text-base text-muted-foreground mt-0.5 md:mt-1">
              共 {ramenShops.length} 間 · ⭐ 好評 {ratedCount} 間
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-5 flex flex-col md:grid md:grid-cols-[1fr_auto] gap-2 md:gap-3 md:items-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              🔍
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋店名或地址"
              className="w-full pl-9 pr-9 py-2.5 rounded-full bg-white border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="清除搜尋"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLocate}
              disabled={locating}
              className={`px-3 md:px-4 py-2 rounded-full text-sm font-semibold transition disabled:opacity-60 ${
                userLoc
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
              }`}
            >
              {locating ? "定位中…" : userLoc ? "✓ 附近" : "📍 附近的店"}
            </button>
            {userLoc && (
              <button
                onClick={() => setSortByDist((v) => !v)}
                className="px-3 py-2 rounded-full text-xs font-semibold bg-white border border-border hover:bg-accent"
              >
                {sortByDist ? "依距離 ✓" : "距離排序"}
              </button>
            )}
            <button
              onClick={() => setOnlyRated((v) => !v)}
              className={`px-3 md:px-4 py-2 rounded-full text-sm font-semibold transition ${
                onlyRated
                  ? "bg-rose-600 text-white shadow"
                  : "bg-white border border-border text-foreground hover:bg-accent"
              }`}
            >
              ⭐ 只看好評
            </button>
          </div>
        </div>

        {locError && (
          <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 inline-block">
            {locError}
          </p>
        )}

        {/* 標籤篩選:手機橫向捲動,桌面 wrap */}
        <div className="mt-3 -mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible no-scrollbar pb-1">
            <span className="text-xs text-muted-foreground mr-1 shrink-0">湯頭:</span>
            {ALL_TAGS.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
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
                className="shrink-0 ml-1 text-xs text-rose-600 hover:underline"
              >
                清除
              </button>
            )}
          </div>
          <div className="mt-1 text-xs text-muted-foreground text-right">
            符合 {shops.length} 間
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 grid lg:grid-cols-[1fr_320px] gap-4 md:gap-6">
        <section className="h-[60vh] md:h-[70vh] min-h-[360px] rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden bg-white relative">
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                載入地圖中…
              </div>
            }
          >
            <RamenMap
              shops={shops}
              focusedShopId={focusedShopId}
              userLocation={userLoc}
            />
          </Suspense>
        </section>

        {/* 桌面側欄 */}
        <aside className="hidden lg:block bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4 max-h-[70vh] overflow-y-auto">
          <h2 className="font-bold text-foreground mb-3">店家清單</h2>
          {listContent}
        </aside>
      </main>

      {/* 手機底部抽屜按鈕 */}
      {isMobile && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button
              className={`lg:hidden fixed safe-fab-bottom left-1/2 -translate-x-1/2 bg-rose-600 text-white font-semibold px-5 py-3 rounded-full shadow-2xl z-[1000] flex items-center gap-2 active:scale-95 transition ${
                sheetOpen ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              🍜 店家清單 ({shops.length})
            </button>

          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-3xl px-4 pt-5 pb-8 safe-bottom">
            <SheetHeader>
              <SheetTitle>店家清單 · {shops.length} 間</SheetTitle>
            </SheetHeader>
            <div className="mt-3">{listContent}</div>
          </SheetContent>
        </Sheet>
      )}

      <footer className="text-center text-xs text-muted-foreground pb-8">
        資料僅供參考 · 地圖 © OpenStreetMap 貢獻者
      </footer>
    </div>
  );
}
