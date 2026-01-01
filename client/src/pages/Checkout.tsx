import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

interface CheckoutStep {
  step: 1 | 2 | 3;
  completed: boolean;
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToAge, setAgreeToAge] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    suburb: "",
    state: "NSW",
    postcode: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>

          <Card className="p-12 text-center bg-white border-0">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Cart is Empty</h1>
            <p className="text-lg text-slate-600 mb-8">
              Please add items to your cart before checking out.
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

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = () => {
    if (!address.firstName || !address.lastName || !address.email || !address.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = () => {
    if (!address.streetAddress || !address.suburb || !address.postcode) {
      toast.error("Please fill in all address fields");
      return;
    }
    setCurrentStep(3);
  };

  const handleStep3Submit = () => {
    if (!agreeToTerms || !agreeToAge) {
      toast.error("Please agree to the terms and age verification");
      return;
    }
    // Here you would normally process the payment
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/order-confirmation");
  };

  const shippingCost = shippingMethod === "express" ? 1500 : 0;
  const totalWithShipping = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      step <= currentStep
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }`}
                  >
                    {step < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <div className="flex-1 h-1 bg-slate-200 mx-2">
                    {step < currentStep && (
                      <div className="h-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-slate-300">
                3
              </div>
            </div>

            {/* Step 1: Contact & Shipping Address */}
            {currentStep === 1 && (
              <Card className="p-8 bg-white border-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Contact & Shipping Address
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        First Name *
                      </label>
                      <Input
                        value={address.firstName}
                        onChange={(e) =>
                          handleAddressChange("firstName", e.target.value)
                        }
                        placeholder="John"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={address.lastName}
                        onChange={(e) =>
                          handleAddressChange("lastName", e.target.value)
                        }
                        placeholder="Doe"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={address.email}
                      onChange={(e) =>
                        handleAddressChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      value={address.phone}
                      onChange={(e) =>
                        handleAddressChange("phone", e.target.value)
                      }
                      placeholder="+61 2 XXXX XXXX"
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={handleStep1Submit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg mt-6"
                  >
                    Continue to Address
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Shipping Address Details */}
            {currentStep === 2 && (
              <Card className="p-8 bg-white border-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Shipping Address
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Street Address *
                    </label>
                    <Input
                      value={address.streetAddress}
                      onChange={(e) =>
                        handleAddressChange("streetAddress", e.target.value)
                      }
                      placeholder="123 Main Street"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Suburb/City *
                      </label>
                      <Input
                        value={address.suburb}
                        onChange={(e) =>
                          handleAddressChange("suburb", e.target.value)
                        }
                        placeholder="Sydney"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        State
                      </label>
                      <select
                        value={address.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Postcode *
                    </label>
                    <Input
                      value={address.postcode}
                      onChange={(e) =>
                        handleAddressChange("postcode", e.target.value)
                      }
                      placeholder="2000"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-slate-900">
                          Standard Shipping (3-5 business days)
                        </p>
                        <p className="text-sm text-slate-600">Free</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-slate-900">
                          Express Shipping (1-2 business days)
                        </p>
                        <p className="text-sm text-slate-600">A$15.00</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="flex-1 py-3 text-lg font-semibold rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleStep2Submit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
                  >
                    Continue to Review
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <Card className="p-8 bg-white border-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Review Order
                </h2>

                {/* Shipping Address Summary */}
                <div className="bg-slate-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-sm text-slate-700">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-sm text-slate-700">{address.streetAddress}</p>
                  <p className="text-sm text-slate-700">
                    {address.suburb}, {address.state} {address.postcode}
                  </p>
                  <p className="text-sm text-slate-700 mt-2">{address.email}</p>
                  <p className="text-sm text-slate-700">{address.phone}</p>
                </div>

                {/* Shipping Method Summary */}
                <div className="bg-slate-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Shipping Method
                  </h3>
                  <p className="text-sm text-slate-700">
                    {shippingMethod === "standard"
                      ? "Standard Shipping (3-5 business days) - Free"
                      : "Express Shipping (1-2 business days) - A$15.00"}
                  </p>
                </div>

                {/* Terms & Age Verification */}
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToAge}
                      onChange={(e) => setAgreeToAge(e.target.checked)}
                      className="w-4 h-4 mt-1"
                    />
                    <span className="text-sm text-slate-700">
                      I confirm that I am <strong>18 years or older</strong> and
                      understand the health risks associated with vaping products.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-4 h-4 mt-1"
                    />
                    <span className="text-sm text-slate-700">
                      I agree to the{" "}
                      <a href="/compliance" className="text-blue-600 hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/compliance" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 py-3 text-lg font-semibold rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleStep3Submit}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg"
                  >
                    Complete Order
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border-0 sticky top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Order Summary
                </h2>
              </div>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto border-b border-slate-200 pb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-slate-700">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-semibold text-slate-900">
                      A${((item.product.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>A${(totalPrice / 100).toFixed(2)}</span>
                </div>
                {shippingMethod === "express" && (
                  <div className="flex justify-between text-slate-600">
                    <span>Express Shipping</span>
                    <span>A$15.00</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  A${((totalWithShipping) / 100).toFixed(2)}
                </span>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-slate-700">
                <p>
                  ⚠️ <strong>Age Verification:</strong> You must be 18+ to complete
                  your purchase.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
