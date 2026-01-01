import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createComplianceContext(): { ctx: TrpcContext } {
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

describe("Compliance Router", () => {
  describe("verifyAgeByBirthdate", () => {
    it("should verify age correctly for users 18 and older", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      // User born 18 years ago
      const today = new Date();
      const year = today.getFullYear() - 18;
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const result = await caller.compliance.verifyAgeByBirthdate({
        year,
        month,
        day,
      });

      expect(result.success).toBe(true);
      expect(result.isVerified).toBe(true);
      expect(result.age).toBeGreaterThanOrEqual(18);
    });

    it("should reject users under 18", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      // User born 17 years ago
      const today = new Date();
      const year = today.getFullYear() - 17;
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        await caller.compliance.verifyAgeByBirthdate({
          year,
          month,
          day,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("18 years or older");
      }
    });

    it("should handle leap year dates correctly", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      // Born on Feb 29, 2000 (leap year)
      const result = await caller.compliance.verifyAgeByBirthdate({
        year: 2000,
        month: 2,
        day: 29,
      });

      expect(result.success).toBe(true);
      expect(result.isVerified).toBe(true);
    });
  });

  describe("verifyAgeByCheckbox", () => {
    it("should verify age when checkbox is confirmed", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.compliance.verifyAgeByCheckbox({
        confirmed: true,
      });

      expect(result.success).toBe(true);
      expect(result.isVerified).toBe(true);
    });

    it("should reject when checkbox is not confirmed", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.compliance.verifyAgeByCheckbox({
          confirmed: false,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("must confirm");
      }
    });
  });

  describe("getComplianceContent", () => {
    it("should return health warning content", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.compliance.getComplianceContent("health_warning");

      expect(result.type).toBe("health_warning");
      expect(result.content).toBeDefined();
      expect(result.content).toContain("HEALTH WARNING");
      expect(result.content).toContain("nicotine");
    });

    it("should return terms of service content", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.compliance.getComplianceContent("terms_of_service");

      expect(result.type).toBe("terms_of_service");
      expect(result.content).toBeDefined();
      expect(result.content).toContain("TERMS OF SERVICE");
      expect(result.content).toContain("18 years");
    });

    it("should return privacy policy content", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.compliance.getComplianceContent("privacy_policy");

      expect(result.type).toBe("privacy_policy");
      expect(result.content).toBeDefined();
      expect(result.content).toContain("PRIVACY POLICY");
      expect(result.content).toContain("Privacy Act");
    });

    it("should return TGA statement content", async () => {
      const { ctx } = createComplianceContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.compliance.getComplianceContent("tga_statement");

      expect(result.type).toBe("tga_statement");
      expect(result.content).toBeDefined();
      expect(result.content).toContain("TGA STATEMENT");
      expect(result.content).toContain("Therapeutic Goods Administration");
    });
  });
});
