import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  Truck,
  Award,
  Lock,
  Zap,
  Leaf,
} from "lucide-react";
import { BRANDS, PRODUCTS } from "@/data/products";

export default function Home() {
  const [, navigate] = useLocation();

  const featuredProducts = PRODUCTS.slice(0, 4);
  const brandList = Object.values(BRANDS);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-block">
                <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-400/30">
                  🇦🇺 Australia's Premium Vape Retailer
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Experience Premium
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {" "}
                  Vaping
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-lg">
                Discover the world's leading vape brands. Authentic products, competitive prices, and fast delivery across Australia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate("/products")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg gap-2 group"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => navigate("/compliance")}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg"
                >
                  Legal Info
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-8 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-400" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Right - Product Showcase */}
            <div className="relative h-96 lg:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative h-full flex items-center justify-center">
                <img
                  src="/products/relx/infinity-plus.jpg"
                  alt="Featured Product"
                  className="h-96 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose ManusVape?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're committed to delivering the best vaping experience with premium products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Selection",
                description: "Curated collection of top global brands including RELX, IGET, ALIBARBAR, and BIMO.",
              },
              {
                icon: Zap,
                title: "Fast Shipping",
                description: "Same-day dispatch for orders before 2 PM. Delivery across Australia in 1-3 business days.",
              },
              {
                icon: Leaf,
                title: "Legal Compliance",
                description: "100% compliant with Australian regulations. Age verification and health warnings included.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow border-0 bg-slate-50"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Featured Brands
            </h2>
            <p className="text-xl text-slate-600">
              Trusted by millions worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandList.map((brand) => (
              <Card
                key={brand.name}
                onClick={() => navigate(`/products?brand=${brand.name}`)}
                className="p-8 hover:shadow-xl transition-all cursor-pointer border-0 bg-white hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-24 object-contain mb-4"
                />
                <h3 className="font-bold text-slate-900 text-center text-sm">
                  {brand.name}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">
                Featured Products
              </h2>
              <p className="text-lg text-slate-600">
                Best sellers and customer favorites
              </p>
            </div>
            <Button
              onClick={() => navigate("/products")}
              variant="outline"
              className="gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all group border-0"
              >
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                    <img
                      src={product.logoUrl}
                      alt={product.brand}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                    {product.brand}
                  </p>
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      A${(product.price / 100).toFixed(2)}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to Upgrade Your Vaping Experience?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of satisfied customers across Australia. Browse our full collection today.
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg font-semibold rounded-lg gap-2 group"
          >
            Explore Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}
