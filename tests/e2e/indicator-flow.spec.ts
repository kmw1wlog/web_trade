import { expect, test } from "@playwright/test";

test("user can find indicators, open a recipe, and reach cookie demo", async ({ page }) => {
  await page.route("**/api/events", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "지표 찾기 시작(무료)" }).click();
  await expect(page).toHaveURL(/\/tools\/indicator-finder/);
  await expect(page.getByRole("heading", { name: "지표/조건식 찾기" })).toBeVisible();

  await page.getByRole("button", { name: "상따" }).click();
  await page.getByPlaceholder("예: 거래량, 전고점, 눌림목").fill("거래량");
  await page.getByRole("button", { name: "추천 조건식 보기" }).click();
  await expect(page.getByTestId("indicator-results")).toContainText("상따");

  await page.getByRole("link", { name: "상세 보기" }).first().click();
  await expect(page).toHaveURL(/\/recipes\//);
  await expect(page.getByText("쿠키 적용 기능")).toBeVisible();

  await page.getByRole("link", { name: "적용 버튼 열기" }).click();
  await expect(page).toHaveURL(/\/cookies/);
  await expect(page.getByRole("heading", { name: "쿠키 충전" })).toBeVisible();
  await expect(page.getByText("10쿠키")).toBeVisible();
  await expect(page.getByText("50쿠키")).toBeVisible();
  await expect(page.getByText("100쿠키")).toBeVisible();
});

test("recipe list and guide map expose the planned utility pages", async ({ page }) => {
  await page.goto("/recipes", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "조건식 레시피 80개" })).toBeVisible();
  await expect(page.getByTestId("recipe-list")).toContainText("거래량");

  await page.goto("/guide-map", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "기술적 분석 가이드 맵" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "캔들 패턴" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "국장 단타 전략" })).toBeVisible();
});
