import { expect, test } from "@playwright/test";

test("home benefit wallet saves card clicks and coupon claims", async ({ page }) => {
  await page.route("**/api/events", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true, message: "자료 신청이 접수되었습니다." }) });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  await expect(page.getByTestId("benefit-wallet")).toBeVisible();
  await expect(page.getByTestId("benefit-wallet")).toHaveAttribute("data-wallet-ready", "true");
  await expect(page.getByTestId("benefit-card-coupon")).toBeVisible();
  await expect(page.getByTestId("benefit-card-free-kit")).toBeVisible();
  await expect(page.getByTestId("benefit-card-premium-trial")).toBeVisible();
  await expect(page.getByTestId("benefit-card-web-tools")).toBeVisible();
  await expect(page.getByTestId("benefit-card-app-beta")).toBeVisible();
  await expect(page.getByTestId("benefit-card-preorder")).toBeVisible();
  await expect(page.getByTestId("wallet-empty")).toBeVisible();

  await page.getByTestId("benefit-card-coupon").click();
  const couponSection = page.locator("#coupon");
  await couponSection.getByPlaceholder("이메일").fill("tester@example.com");
  await couponSection.getByPlaceholder("인스타 아이디 선택 입력").fill("tester");
  await couponSection.getByPlaceholder("관심사 선택 입력").fill("CVD 지표");
  await couponSection.getByRole("button", { name: "무료 쿠폰 보관하기" }).click();

  await expect(page.getByText("쿠폰이 보관되었습니다.")).toBeVisible();
  await expect(page.getByTestId("wallet-coupon-days")).toHaveText("3일");
  await expect(page.getByTestId("wallet-coupon-uses")).toHaveText("10회");
  await expect(page.getByTestId("wallet-benefit-list")).toContainText("3일 무료 이용 10회권");

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByTestId("wallet-coupon-days")).toHaveText("3일");
  await expect(page.getByTestId("wallet-benefit-list")).toContainText("3일 무료 이용 10회권");

  await page.getByTestId("benefit-card-free-kit").click();
  await expect(page).toHaveURL(/\/guide-map/);
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("wallet-benefit-list")).toContainText("무료 지표·전자책");
});
