import { expect, test } from "@playwright/test";

test("home shows six benefit cards first and supports coupon claims", async ({ page }) => {
  await page.route("**/api/events", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true, message: "자료 신청이 접수되었습니다." }) });
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  await expect(page.getByTestId("benefit-card-coupon")).toBeVisible();
  await expect(page.getByTestId("benefit-card-free-kit")).toBeVisible();
  await expect(page.getByTestId("benefit-card-premium-trial")).toBeVisible();
  await expect(page.getByTestId("benefit-card-web-tools")).toBeVisible();
  await expect(page.getByTestId("benefit-card-app-beta")).toBeVisible();
  await expect(page.getByTestId("benefit-card-preorder")).toBeVisible();
  await expect(page.getByTestId("benefit-wallet")).toHaveCount(0);

  const cardTops = await Promise.all(
    ["coupon", "free-kit", "premium-trial", "web-tools", "app-beta", "preorder"].map(async (id) => {
      const box = await page.getByTestId(`benefit-card-${id}`).boundingBox();
      return box?.y || 0;
    })
  );
  expect(Math.max(...cardTops) - Math.min(...cardTops)).toBeLessThan(8);

  await page.getByTestId("benefit-card-coupon").click();
  const couponSection = page.locator("#coupon");
  await couponSection.getByPlaceholder("이메일").fill("tester@example.com");
  await couponSection.getByPlaceholder("인스타 아이디 선택 입력").fill("tester");
  await couponSection.getByPlaceholder("관심사 선택 입력").fill("CVD 지표");
  await couponSection.getByRole("button", { name: "무료 쿠폰 보관하기" }).click();

  await expect(page.getByText("쿠폰이 보관되었습니다.")).toBeVisible();

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByText("처음 오셨다면 이 순서대로 보세요")).toBeVisible();

  await page.getByTestId("benefit-card-free-kit").click();
  await expect(page).toHaveURL(/\/ebooks/);
  await expect(page.getByTestId("ebook-shelf")).toContainText("CVD 초보 가이드");

  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByTestId("benefit-card-web-tools").click();
  await expect(page).toHaveURL(/\/tools\/cvd/);
  await expect(page.getByTestId("cvd-dashboard")).toBeVisible();
});
