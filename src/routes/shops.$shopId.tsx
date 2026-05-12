import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getShopById, ramenShops, type RamenShop } from "@/data/ramen-shops";
import { NavigateButton } from "@/components/NavigateButton";

export const Route = createFileRoute("/shops/$shopId")({
  component: ShopDetail,
  loader: ({ params }) => {
    const shop = getShopById(params.shopId);
    if (!shop) throw notFound();
    return { shop };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">找不到這家店</p>
      <Link to="/" className="underline">回到地圖</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p>{error.message}</p>
      <Link to="/" className="underline">回到地圖</Link>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.shop.name ?? "店家"} | 高雄拉麵地圖` },
      {
        name: "description",
        content:
          loaderData?.shop.description ??
          `${loaderData?.shop.name ?? ""} 店家詳情、地址與好評推薦。`,
      },
    ],
  }),
});

function ShopDetail() {
  const { shop } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-background to-rose-50">
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <Link to="/" className="text-sm text-muted-foreground hover:underline">
          ← 回到地圖
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-black/5 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🍜</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                  {shop.name}
                </h1>
                {shop.highlyRated && (
                  <span className="text-xs font-bold bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">
                    ★ 好評
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{shop.address}</p>
              {shop.hours && (
                <p className="text-sm text-foreground/80 mt-1">營業時間:{shop.hours}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {shop.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <NavigateButton
              name={shop.name}
              address={shop.address}
              lat={shop.lat}
              lng={shop.lng}
            />
          </div>

          {shop.signature && (
            <div className="mt-8">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                招牌
              </h2>
              <p className="mt-1 text-lg font-semibold text-foreground">{shop.signature}</p>
            </div>
          )}

          {shop.description && (
            <div className="mt-6">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                店家介紹
              </h2>
              <p className="mt-2 text-foreground/90 leading-relaxed">{shop.description}</p>
            </div>
          )}

          {shop.reviewHighlights && shop.reviewHighlights.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                ★ 好評重點
              </h2>
              <ul className="mt-3 space-y-2">
                {shop.reviewHighlights.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 text-sm text-foreground"
                  >
                    <span className="text-yellow-500">★</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          共 {ramenShops.length} 間店家收錄中
        </div>
      </main>
    </div>
  );
}
