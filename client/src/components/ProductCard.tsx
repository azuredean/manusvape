import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(product);
  };

  const priceAUD = (product.price / 100).toFixed(2);

  return (
    <Card className="group overflow-hidden bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Brand Logo Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <img
            src={product.logoUrl}
            alt={product.brand}
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {product.brand}
          </span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-slate-500">Puffs</p>
            <p className="font-semibold text-slate-900">{product.puffs.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-slate-500">Nicotine</p>
            <p className="font-semibold text-slate-900">{product.nicotineContent}</p>
          </div>
        </div>

        {/* Flavor */}
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1">Flavor</p>
          <p className="text-sm font-medium text-slate-900">{product.flavor}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-500">Price</p>
            <p className="text-lg font-bold text-slate-900">
              A${priceAUD}
            </p>
          </div>
          <Button
            onClick={() => onAddToCart?.(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 gap-2"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
