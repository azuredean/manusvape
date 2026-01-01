import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <Card className="p-12 text-center bg-white border-0">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Cart is Empty</h1>
            <p className="text-lg text-slate-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="p-6 bg-white border-0 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase">
                          {item.product.brand}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        <p>{item.product.flavor}</p>
                        <p>{item.product.nicotineContent} nicotine</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-slate-600">
                          A${(item.product.price / 100).toFixed(2)} each
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          A${((item.product.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border-0 sticky top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Order Summary</h2>
              </div>

              {/* Summary Items */}
              <div className="space-y-3 border-b border-slate-200 pb-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>A${(totalPrice / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  A${(totalPrice / 100).toFixed(2)}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => navigate("/products")}
                  variant="outline"
                  className="w-full py-3 text-lg font-semibold rounded-lg"
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2 transition-colors"
              >
                Clear Cart
              </button>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  ⚠️ <strong>Age Verification Required:</strong> You must be 18+ to complete your purchase.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
