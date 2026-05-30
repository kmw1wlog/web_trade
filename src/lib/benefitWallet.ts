export const BENEFIT_WALLET_KEY = "benefit_wallet_v1";

export type BenefitId = "coupon" | "free-kit" | "premium-trial" | "web-tools" | "app-beta" | "preorder";

export type WalletBenefit = {
  id: BenefitId;
  title: string;
  href: string;
  savedAt: string;
};

export type CouponState = {
  claimedAt: string;
  expiresAt: string;
  usesTotal: number;
  usesLeft: number;
};

export type BenefitWallet = {
  benefits: WalletBenefit[];
  coupon?: CouponState;
  updatedAt: string;
};

export const benefitLabels: Record<BenefitId, string> = {
  coupon: "3일 무료 이용 10회권",
  "free-kit": "무료 지표·전자책",
  "premium-trial": "무료 1개월 프리미엄",
  "web-tools": "무료 웹 기능",
  "app-beta": "무료 앱 베타",
  preorder: "강의·도구 사전예약"
};

const emptyWallet = (): BenefitWallet => ({
  benefits: [],
  updatedAt: new Date().toISOString()
});

export function readBenefitWallet(): BenefitWallet {
  if (typeof window === "undefined") return emptyWallet();

  try {
    const raw = window.localStorage.getItem(BENEFIT_WALLET_KEY);
    if (!raw) return emptyWallet();
    const parsed = JSON.parse(raw) as Partial<BenefitWallet>;

    return {
      benefits: Array.isArray(parsed.benefits) ? parsed.benefits.filter(isWalletBenefit) : [],
      coupon: isCouponState(parsed.coupon) ? parsed.coupon : undefined,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString()
    };
  } catch {
    return emptyWallet();
  }
}

export function saveBenefitToWallet(input: { id: BenefitId; title?: string; href: string }) {
  if (typeof window === "undefined") return emptyWallet();

  const wallet = readBenefitWallet();
  const savedAt = new Date().toISOString();
  const nextBenefit: WalletBenefit = {
    id: input.id,
    title: input.title || benefitLabels[input.id],
    href: input.href,
    savedAt
  };

  const benefits = [nextBenefit, ...wallet.benefits.filter((benefit) => benefit.id !== input.id)];
  const nextWallet = persistWallet({ ...wallet, benefits, updatedAt: savedAt });
  announceWalletChange();
  return nextWallet;
}

export function claimCouponInWallet(selectedBenefits: string[] = []) {
  if (typeof window === "undefined") return emptyWallet();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const wallet = readBenefitWallet();
  const coupon: CouponState = {
    claimedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    usesTotal: 10,
    usesLeft: 10
  };

  const benefitIds = new Set<BenefitId>(["coupon"]);
  selectedBenefits.forEach((benefit) => {
    if (benefit === "무료자료") benefitIds.add("free-kit");
    if (benefit === "앱베타") benefitIds.add("app-beta");
    if (benefit === "사전예약") benefitIds.add("preorder");
    if (benefit === "프리미엄") benefitIds.add("premium-trial");
  });

  const nowIso = now.toISOString();
  const newBenefits: WalletBenefit[] = Array.from(benefitIds).map((id) => ({
    id,
    title: benefitLabels[id],
    href: id === "coupon" ? "#coupon" : id === "web-tools" ? "#tools-preview" : `#${id}`,
    savedAt: nowIso
  }));

  const dedupedBenefits = [
    ...newBenefits,
    ...wallet.benefits.filter((benefit) => !benefitIds.has(benefit.id))
  ];

  const nextWallet = persistWallet({
    ...wallet,
    benefits: dedupedBenefits,
    coupon,
    updatedAt: nowIso
  });
  announceWalletChange();
  return nextWallet;
}

export function getCouponDaysLeft(coupon?: CouponState) {
  if (!coupon) return null;
  const remainingMs = new Date(coupon.expiresAt).getTime() - Date.now();
  if (remainingMs <= 0) return 0;
  return Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
}

function persistWallet(wallet: BenefitWallet) {
  window.localStorage.setItem(BENEFIT_WALLET_KEY, JSON.stringify(wallet));
  return wallet;
}

function announceWalletChange() {
  window.dispatchEvent(new CustomEvent("benefit-wallet-change"));
}

function isWalletBenefit(value: unknown): value is WalletBenefit {
  const benefit = value as WalletBenefit;
  return Boolean(
    benefit &&
      typeof benefit.id === "string" &&
      Object.prototype.hasOwnProperty.call(benefitLabels, benefit.id) &&
      typeof benefit.title === "string" &&
      typeof benefit.href === "string" &&
      typeof benefit.savedAt === "string"
  );
}

function isCouponState(value: unknown): value is CouponState {
  const coupon = value as CouponState;
  return Boolean(
    coupon &&
      typeof coupon.claimedAt === "string" &&
      typeof coupon.expiresAt === "string" &&
      typeof coupon.usesTotal === "number" &&
      typeof coupon.usesLeft === "number"
  );
}
