import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  getAllProducts,
  getProductById,
  getProductsByFilters,
} from "../db";

/**
 * Products Router - handles product listing and filtering
 */
export const productsRouter = router({
  /**
   * Get all active products with optional filtering
   */
  list: publicProcedure
    .input(
      z.object({
        brand: z.string().optional(),
        flavor: z.string().optional(),
        nicotineContent: z.string().optional(),
        category: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await getProductsByFilters({
          brand: input.brand,
          flavor: input.flavor,
          nicotineContent: input.nicotineContent,
          category: input.category,
          minPrice: input.minPrice,
          maxPrice: input.maxPrice,
          limit: input.limit,
          offset: input.offset,
        });

        return {
          success: true,
          data: result,
          count: result.length,
        };
      } catch (error) {
        console.error("[Products] Failed to list products:", error);
        return {
          success: false,
          data: [],
          count: 0,
          error: "Failed to fetch products",
        };
      }
    }),

  /**
   * Get a single product by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const product = await getProductById(input.id);

        if (!product) {
          return {
            success: false,
            data: null,
            error: "Product not found",
          };
        }

        return {
          success: true,
          data: product,
        };
      } catch (error) {
        console.error("[Products] Failed to get product:", error);
        return {
          success: false,
          data: null,
          error: "Failed to fetch product",
        };
      }
    }),

  /**
   * Get available filter options
   */
  getFilterOptions: publicProcedure.query(async () => {
    return {
      brands: [
        "RELX",
        "Vuse",
        "JUUL",
        "Vaporesso",
        "Smok",
        "Aspire",
        "Innokin",
        "Lost Vape",
      ],
      flavors: [
        "Mint",
        "Menthol",
        "Strawberry",
        "Watermelon",
        "Mango",
        "Blueberry",
        "Tobacco",
        "Vanilla",
        "Coffee",
        "Fruit Mix",
      ],
      nicotineContent: ["0mg", "3mg", "6mg", "12mg", "18mg", "20mg"],
      categories: ["Pod Systems", "Disposables", "Mods", "Tanks", "Coils", "Accessories"],
      priceRanges: [
        { label: "Under $20", min: 0, max: 2000 },
        { label: "$20 - $50", min: 2000, max: 5000 },
        { label: "$50 - $100", min: 5000, max: 10000 },
        { label: "Over $100", min: 10000, max: 999999 },
      ],
    };
  }),

  /**
   * Search products by name or description
   */
  search: publicProcedure
    .input(z.object({ query: z.string().min(1).max(100) }))
    .query(async ({ input }) => {
      try {
        // This is a simplified search - in production, you'd use full-text search
        const allProducts = await getAllProducts();

        const results = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(input.query.toLowerCase()) ||
            product.description?.toLowerCase().includes(input.query.toLowerCase())
        );

        return {
          success: true,
          data: results,
          count: results.length,
        };
      } catch (error) {
        console.error("[Products] Failed to search products:", error);
        return {
          success: false,
          data: [],
          count: 0,
          error: "Failed to search products",
        };
      }
    }),
});
