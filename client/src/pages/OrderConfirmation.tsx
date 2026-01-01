import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

export default function OrderConfirmation() {
  const [, navigate] = useLocation();

  const orderNumber = "MV-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString("en-AU");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-slate-600">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Order Number */}
          <Card className="p-6 bg-white border-0">
            <h2 className="text-sm font-semibold text-slate-600 uppercase mb-2">
              Order Number
            </h2>
            <p className="text-3xl font-bold text-blue-600">{orderNumber}</p>
            <p className="text-sm text-slate-600 mt-2">Placed on {orderDate}</p>
          </Card>

          {/* Estimated Delivery */}
          <Card className="p-6 bg-white border-0">
            <h2 className="text-sm font-semibold text-slate-600 uppercase mb-2">
              Estimated Delivery
            </h2>
            <p className="text-3xl font-bold text-green-600">3-5 Days</p>
            <p className="text-sm text-slate-600 mt-2">
              Standard shipping to NSW
            </p>
          </Card>
        </div>

        {/* What's Next */}
        <Card className="p-8 bg-white border-0 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What's Next?</h2>
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Confirmation Email",
                description:
                  "You'll receive an order confirmation email shortly with your order details and tracking information.",
              },
              {
                icon: Package,
                title: "Order Processing",
                description:
                  "Your order will be carefully packed and prepared for shipment within 24 hours.",
              },
              {
                icon: Truck,
                title: "Shipping & Tracking",
                description:
                  "Once shipped, you'll receive a tracking number via email to monitor your delivery status.",
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Information */}
        <Card className="p-6 bg-blue-50 border border-blue-200 mb-8">
          <h3 className="font-semibold text-slate-900 mb-3">
            ⚠️ Important Information
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              • All products are for adult use only (18+). Age verification may be
              required upon delivery.
            </li>
            <li>
              • Please keep your order number for reference and tracking purposes.
            </li>
            <li>
              • If you have any questions, contact our support team at
              support@manusvape.com.au
            </li>
            <li>
              • Review our return policy and terms of service on the Compliance
              page.
            </li>
          </ul>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/products")}
            variant="outline"
            className="flex-1 py-3 text-lg font-semibold rounded-lg"
          >
            Continue Shopping
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
          >
            Back to Home
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How can I track my order?",
                a: "You'll receive a tracking number via email once your order ships. You can use this to monitor your delivery status.",
              },
              {
                q: "Can I modify or cancel my order?",
                a: "Orders can be modified or cancelled within 2 hours of placement. Contact support@manusvape.com.au immediately.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unopened products. See our Compliance page for full details.",
              },
              {
                q: "Do you ship internationally?",
                a: "Currently, we only ship within Australia. International shipping may be available in the future.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
