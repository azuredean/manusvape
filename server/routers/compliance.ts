import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { recordAgeVerification, getLatestAgeVerification } from "../db";

/**
 * Compliance Router - handles age verification and legal compliance
 */
export const complianceRouter = router({
  /**
   * Verify age via birthdate input
   * Returns true if user is 18+, false otherwise
   */
  verifyAgeByBirthdate: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(1900).max(new Date().getFullYear()),
        month: z.number().int().min(1).max(12),
        day: z.number().int().min(1).max(31),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const birthDate = new Date(input.year, input.month - 1, input.day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      const isVerified = age >= 18;

      // Record verification in audit log
      try {
        await recordAgeVerification({
          userId: ctx.user?.id,
          verificationMethod: "birthdate",
          verifiedAt: new Date(),
          ipAddress: ctx.req.headers["x-forwarded-for"] as string | undefined,
          userAgent: ctx.req.headers["user-agent"],
          isVerified: isVerified ? 1 : 0,
        });
      } catch (error) {
        console.error("[Compliance] Failed to record age verification:", error);
        // Don't fail the verification if audit logging fails
      }

      if (!isVerified) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must be 18 years or older to access this site",
        });
      }

      return {
        success: true,
        isVerified: true,
        age,
      };
    }),

  /**
   * Verify age via checkbox confirmation
   * User confirms they are 18+ by checking a box
   */
  verifyAgeByCheckbox: publicProcedure
    .input(
      z.object({
        confirmed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.confirmed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must confirm that you are 18 years or older",
        });
      }

      // Record verification in audit log
      try {
        await recordAgeVerification({
          userId: ctx.user?.id,
          verificationMethod: "checkbox",
          verifiedAt: new Date(),
          ipAddress: ctx.req.headers["x-forwarded-for"] as string | undefined,
          userAgent: ctx.req.headers["user-agent"],
          isVerified: 1,
        });
      } catch (error) {
        console.error("[Compliance] Failed to record age verification:", error);
      }

      return {
        success: true,
        isVerified: true,
      };
    }),

  /**
   * Get the latest age verification for the current user
   */
  getLatestVerification: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    try {
      const verification = await getLatestAgeVerification(ctx.user.id);
      return verification;
    } catch (error) {
      console.error("[Compliance] Failed to get verification:", error);
      return null;
    }
  }),

  /**
   * Get legal compliance content (health warnings, terms, privacy policy)
   */
  getComplianceContent: publicProcedure
    .input(
      z.enum(["health_warning", "terms_of_service", "privacy_policy", "tga_statement"])
    )
    .query(({ input }) => {
      const content: Record<string, string> = {
        health_warning: `
⚠️ HEALTH WARNING

This product contains nicotine. Nicotine is highly addictive.

• Do not use if you are pregnant or breastfeeding
• Do not use if you have heart disease or high blood pressure
• May cause dependence
• Keep out of reach of children and pets

For more information, visit the Australian Therapeutic Goods Administration (TGA) website.
        `,
        terms_of_service: `
TERMS OF SERVICE

Last Updated: January 1, 2026

1. AGE RESTRICTION
You must be 18 years of age or older to purchase products from ManusVape. By accessing this website, you confirm that you meet this requirement.

2. PRODUCT RESTRICTIONS
• Products are for use by adults only
• Not for sale to minors
• Resale or distribution to minors is prohibited

3. AUSTRALIAN COMPLIANCE
All products comply with Australian Therapeutic Goods Administration (TGA) regulations. These products are intended for adult consumers only.

4. LIMITATION OF LIABILITY
ManusVape is not responsible for misuse of products or failure to comply with local laws.

5. TERMINATION
We reserve the right to refuse service to anyone who violates these terms.
        `,
        privacy_policy: `
PRIVACY POLICY

Last Updated: January 1, 2026

1. INFORMATION WE COLLECT
• Personal information (name, email, address)
• Payment information (processed securely)
• Age verification data
• Purchase history

2. HOW WE USE YOUR INFORMATION
• To process orders and payments
• To comply with legal obligations
• To improve our services
• To send order updates and promotional content (with consent)

3. DATA PROTECTION
We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

4. YOUR RIGHTS
You have the right to access, correct, or delete your personal information. Contact us at privacy@manusvape.com.au.

5. COMPLIANCE
This privacy policy complies with the Australian Privacy Act 1988 and the Privacy Principles.
        `,
        tga_statement: `
TGA STATEMENT

These products are regulated by the Australian Therapeutic Goods Administration (TGA) as therapeutic goods containing nicotine.

• TGA Registration Required: All products sold must be registered with the TGA
• Age Restriction: Sale to persons under 18 years is prohibited
• Health Warnings: Must be clearly displayed
• Reporting: Adverse events should be reported to the TGA

For more information, visit: https://www.tga.gov.au/

ManusVape is committed to full compliance with all TGA regulations and Australian law.
        `,
      };

      return {
        type: input,
        content: content[input],
      };
    }),
});
