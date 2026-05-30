import { beforeEach, describe, expect, it, vi } from "vitest";
import { BENEFIT_WALLET_KEY, claimCouponInWallet, getCouponDaysLeft, readBenefitWallet, saveBenefitToWallet } from "@/lib/benefitWallet";

describe("benefit wallet", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it("saves a clicked benefit and dedupes by id", () => {
    saveBenefitToWallet({ id: "free-kit", title: "무료 지표·전자책", href: "#free-kit" });
    saveBenefitToWallet({ id: "free-kit", title: "무료 지표·전자책", href: "#free-kit" });

    const wallet = readBenefitWallet();
    expect(wallet.benefits).toHaveLength(1);
    expect(wallet.benefits[0]).toMatchObject({ id: "free-kit", title: "무료 지표·전자책", href: "#free-kit" });
  });

  it("claims coupon with three days and ten uses", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-30T00:00:00.000Z"));

    const wallet = claimCouponInWallet(["무료자료", "앱베타"]);

    expect(wallet.coupon?.usesTotal).toBe(10);
    expect(wallet.coupon?.usesLeft).toBe(10);
    expect(getCouponDaysLeft(wallet.coupon)).toBe(3);
    expect(wallet.benefits.map((benefit) => benefit.id)).toEqual(["coupon", "free-kit", "app-beta"]);
    expect(localStorage.getItem(BENEFIT_WALLET_KEY)).toContain("3일 무료 이용 10회권");
  });
});
