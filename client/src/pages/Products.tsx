import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { getAllActiveProducts, getUniqueBrands, BRANDS } from "@/data/products";
import { Search, Filter, X } from "lucide-react";
import type { Product } from "@/data/products";

export default function Products() {
  const allProducts = getAllActiveProducts();
  const brands = getUniqueBrands();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category)));
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.flavor.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "puffs":
        filtered.sort((a, b) => b.puffs - a.puffs);
        break;
      case "featured":
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [searchQuery, selectedBrand, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log("Added to cart:", product);
  };

  const handleWishlist = (product: Product) => {
    // TODO: Implement wishlist functionality
    console.log("Wishlist toggled:", product);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || selectedBrand || selectedCategory;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Products</h1>
          <p className="text-lg text-slate-600">
            Discover our premium selection of vaping products from top global brands
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 p-4 bg-white">
          <div className="flex gap-3">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0 mt-2.5" />
            <Input
              placeholder="Search by product name, flavor, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </Card>

        {/* Filters & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Brand
            </label>
            <Select value={selectedBrand || ""} onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category
            </label>
            <Select value={selectedCategory || ""} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="puffs">Highest Puffs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
          <span className="font-semibold">{allProducts.length}</span> products
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Brand Showcase */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(BRANDS).map(([key, brand]) => (
              <Card
                key={key}
                className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedBrand(brand.name)}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-24 object-contain mb-4"
                />
                <h3 className="font-bold text-slate-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{brand.description}</p>
                <Button variant="outline" className="w-full">
                  View Products
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
