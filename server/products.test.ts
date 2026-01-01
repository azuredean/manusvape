import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createProductsContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {
        "x-forwarded-for": "192.168.1.1",
        "user-agent": "Mozilla/5.0",
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("Products Router", () => {
  describe("list", () => {
    it("should return products list with default pagination", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({});

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.count).toBe("number");
    });

    it("should support filtering by brand", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({
        brand: "RELX",
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should support filtering by flavor", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({
        flavor: "Mint",
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should support filtering by nicotine content", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({
        nicotineContent: "12mg",
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should support price range filtering", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({
        minPrice: 1000,
        maxPrice: 5000,
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should support pagination with limit and offset", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list({
        limit: 10,
        offset: 0,
      });

      expect(result.success).toBe(true);
      expect(result.data.length).toBeLessThanOrEqual(10);
    });
  });

  describe("getFilterOptions", () => {
    it("should return available filter options", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.getFilterOptions();

      expect(result.brands).toBeDefined();
      expect(Array.isArray(result.brands)).toBe(true);
      expect(result.brands.length).toBeGreaterThan(0);

      expect(result.flavors).toBeDefined();
      expect(Array.isArray(result.flavors)).toBe(true);

      expect(result.nicotineContent).toBeDefined();
      expect(Array.isArray(result.nicotineContent)).toBe(true);

      expect(result.categories).toBeDefined();
      expect(Array.isArray(result.categories)).toBe(true);

      expect(result.priceRanges).toBeDefined();
      expect(Array.isArray(result.priceRanges)).toBe(true);
    });

    it("should include specific brands", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.getFilterOptions();

      expect(result.brands).toContain("RELX");
      expect(result.brands).toContain("Vuse");
      expect(result.brands).toContain("JUUL");
    });

    it("should include specific flavors", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.getFilterOptions();

      expect(result.flavors).toContain("Mint");
      expect(result.flavors).toContain("Strawberry");
      expect(result.flavors).toContain("Tobacco");
    });

    it("should include specific nicotine contents", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.getFilterOptions();

      expect(result.nicotineContent).toContain("0mg");
      expect(result.nicotineContent).toContain("6mg");
      expect(result.nicotineContent).toContain("12mg");
      expect(result.nicotineContent).toContain("20mg");
    });
  });

  describe("search", () => {
    it("should search products by query", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.search({
        query: "RELX",
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.count).toBe("number");
    });

    it("should return empty results for non-matching query", async () => {
      const { ctx } = createProductsContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.search({
        query: "NonexistentProduct12345",
      });

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });
});
