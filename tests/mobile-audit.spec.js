import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/services.html",
  "/pricing.html",
  "/about.html",
  "/process.html",
  "/customers.html",
  "/resources.html",
  "/results.html",
  "/contact.html",
  "/privacy.html",
  "/terms.html",
  "/packages/presence/",
  "/packages/capture/",
  "/packages/flow/",
  "/packages/growth/",
  "/packages/partner/",
  "/solutions/hvac/",
  "/solutions/plumbing/",
  "/solutions/roofing/",
  "/solutions/electrical/",
  "/resources/stop-losing-leads-after-hours-calgary/",
  "/resources/website-mistakes-cost-local-service-businesses-jobs/",
  "/resources/what-ai-chat-can-do-small-business-website/",
  "/resources/missed-call-text-back-contractors/",
  "/resources/follow-up-process-costing-leads/",
  "/resources/automating-lead-response-without-losing-human-touch/",
  "/locations/airdrie/",
  "/locations/cochrane/",
  "/locations/okotoks/",
  "/locations/chestermere/"
];

const mobileViewports = [
  { width: 390, height: 844 },
  { width: 320, height: 720 }
];

async function collectPageErrors(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

for (const route of routes) {
  for (const viewport of mobileViewports) {
    test(`mobile page health ${route} at ${viewport.width}px`, async ({ page }) => {
      const errors = await collectPageErrors(page);
      await page.setViewportSize(viewport);
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.locator("body > header")).toBeVisible();
      await expect(page.locator("body > main")).toBeVisible();
      await expect(page.locator("body > footer")).toBeVisible();
      await expect(page.locator(".mobile-menu-btn")).toBeVisible();

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        return Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth;
      });
      expect(overflow, `horizontal overflow on ${route} at ${viewport.width}px`).toBeLessThanOrEqual(3);
      expect(errors, `browser errors on ${route} at ${viewport.width}px`).toEqual([]);
    });
  }
}

test("mobile navigation opens, solutions expands, and links are usable", async ({ page }) => {
  const errors = await collectPageErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await page.locator(".mobile-menu-btn").click();
  await expect(page.locator("#nav-links")).toHaveClass(/nav-open/);
  await expect(page.locator(".nav-mobile-primary")).toBeVisible();

  await page.locator(".nav-dropdown-toggle").click();
  await expect(page.locator(".nav-solutions-menu")).toBeVisible();
  await expect(page.locator(".solution-item")).toHaveCount(4);

  await page.locator(".solution-item").first().click();
  await expect(page).toHaveURL(/\/solutions\/hvac\/$/);
  expect(errors).toEqual([]);
});

test("contact form validation is visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact.html", { waitUntil: "networkidle" });
  await page.locator("form button[type='submit']").click();
  await expect(page.locator("#formStatus")).toContainText("Please fill in all required fields.");
});

test("package checkout actions are above the fold where expected", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("/packages/presence/", { waitUntil: "networkidle" });
  await expect(page.locator(".package-page-actions a", { hasText: "Pay $997 Setup" })).toBeVisible();
  await expect(page.locator(".package-page-actions a", { hasText: "Book a Call" })).toBeVisible();

  await page.goto("/packages/capture/", { waitUntil: "networkidle" });
  await expect(page.locator(".package-page-actions a", { hasText: "Pay $1,497 Setup" })).toBeVisible();

  await page.goto("/packages/growth/", { waitUntil: "networkidle" });
  await expect(page.locator(".package-page-actions a", { hasText: "Pay" })).toHaveCount(0);
  await expect(page.locator(".package-page-actions a", { hasText: "Book a Call" })).toBeVisible();
});
