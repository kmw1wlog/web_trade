import Link from "next/link";
import { notFound } from "next/navigation";
import { EbookMockup } from "@/components/products/EbookMockup";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { getProduct, productDisclaimer } from "@/content/products";

const waitlistProducts = new Set(["course", "app"]);

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const primaryHref =
    product.slug === "web-tools"
      ? "/tools"
      : product.slug === "mock-league"
        ? "/waitlist?product=mock-league"
        : waitlistProducts.has(product.slug)
          ? `/waitlist?product=${product.slug}`
          : `/waitlist?product=${product.slug}`;

  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_360px] md:items-center">
          <div>
            <p className="text-sm font-black text-gold">{product.type}</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight text-navy">{product.name}</h1>
            <p className="mt-5 text-2xl font-black text-charcoal">{product.priceLabel}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{product.hero}</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{product.detailDescription}</p>
            <Link href={primaryHref} className="mt-8 inline-flex rounded-lg bg-navy px-6 py-4 text-sm font-black text-white transition hover:bg-green">
              {product.slug === "ebook" ? "전자책 구매하기" : product.cta}
            </Link>
            {product.slug !== "web-tools" ? <p className="mt-3 text-sm font-semibold text-muted">결제 준비 중입니다. 오픈 시 알려드릴게요.</p> : null}
          </div>
          {product.slug === "ebook" ? (
            <EbookMockup />
          ) : (
            <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <p className="text-sm font-black text-gold">PRODUCT</p>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight text-navy">{product.type}</h2>
              <p className="mt-5 text-sm leading-6 text-muted">{product.shortDescription}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <Panel title="포함 내용" items={product.includes} />
          <Panel title="제공하지 않는 것" items={product.notIncluded} />
        </div>
      </section>

      {product.slug === "mock-league" ? (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-3xl font-black text-navy">평가 기준</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {["수익률", "MDD 관리", "손절 준수", "진입 근거 명확성", "복기 성실도", "과도한 레버리지 감점"].map((item) => (
                <p key={item} className="rounded-lg border border-line bg-cream px-4 py-3 text-sm font-bold text-charcoal">{item}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-lg border border-gold/30 bg-gold/10 p-5 text-sm leading-6 text-charcoal">{productDisclaimer}</div>
          <div className="mt-6">
            <DisclosureBanner />
          </div>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="font-display text-3xl font-black text-navy">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-lg bg-cream px-4 py-3 text-sm font-semibold text-charcoal">{item}</p>
        ))}
      </div>
    </section>
  );
}
