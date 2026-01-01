import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/products";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductDetail() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/product/:id");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? PRODUCTS.find((p) => p.id === productId) : null;

  if (!match || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <Card className="p-12 text-center bg-white border-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Not Found</h1>
            <p className="text-lg text-slate-600 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Back to Products
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`);
    setQuantity(1);
  };

  const priceAUD = (product.price / 100).toFixed(2);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.brand === product.brand && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Card className="w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 border-0 flex items-center justify-center rounded-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase mb-2">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-slate-600">{product.flavor}</p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-slate-600">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900">
                  A${priceAUD}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  A${(product.price / 100 * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-slate-900">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Puffs</p>
                  <p className="font-semibold text-slate-900">{product.puffs}</p>
                </div>
                <div>
                  <p className="text-slate-600">Nicotine Content</p>
                  <p className="font-semibold text-slate-900">
                    {product.nicotineContent}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Flavor</p>
                  <p className="font-semibold text-slate-900">{product.flavor}</p>
                </div>
                <div>
                  <p className="text-slate-600">Category</p>
                  <p className="font-semibold text-slate-900">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-900">
                  Quantity:
                </label>
                <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">
                  <strong>Free Shipping</strong> on orders over A$50
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">
                  <strong>100% Authentic</strong> guaranteed
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-green-600" />
                <span className="text-slate-700">
                  <strong>30-day Returns</strong> policy
                </span>
              </div>
            </div>

            {/* Age Verification */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">
                ⚠️ <strong>Age Verification Required:</strong> You must be 18+ to purchase this product.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <Card className="p-8 bg-white border-0">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Product Description
            </h2>
            <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <p>
                Experience the premium quality of {product.name} from {product.brand}. This
                product is designed to deliver an exceptional vaping experience with high-quality
                materials and advanced technology.
              </p>
              <p>
                With {product.puffs} puffs and {product.nicotineContent} nicotine content, this
                device offers a perfect balance of performance and satisfaction. The {product.flavor}{" "}
                flavor provides a smooth and enjoyable taste profile.
              </p>
              <p>
                All products are 100% authentic and sourced directly from authorized distributors.
                We guarantee the quality and authenticity of every product sold.
              </p>
            </div>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              More from {product.brand}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-0"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                      {relatedProduct.brand}
                    </p>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        A${(relatedProduct.price / 100).toFixed(2)}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
