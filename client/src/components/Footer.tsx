import { useLocation } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [, navigate] = useLocation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">MV</span>
              </div>
              <span className="font-bold text-white">ManusVape</span>
            </div>
            <p className="text-sm text-slate-400">
              Premium vaping products from Australia's trusted online retailer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/compliance")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Legal & Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>support@manusvape.com.au</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>1800 VAPE AU</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>Sydney, NSW, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {currentYear} ManusVape. All rights reserved. ABN: XX XXX XXX XXX
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:text-blue-400">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-blue-400">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-blue-400">
              <Twitter className="w-5 h-5" />
            </Button>
          </div>

          {/* Age Verification Badge */}
          <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded">
            ⚠️ 18+ Only
          </div>
        </div>
      </div>
    </footer>
  );
}
