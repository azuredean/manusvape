import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [, navigate] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Brands", href: "/products?brands=all" },
    { label: "Compliance", href: "/compliance" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">MV</span>
          </div>
          <span className="hidden sm:inline font-bold text-lg text-slate-900">
            ManusVape
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-9"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => navigate("/account")}
            className="hidden sm:flex p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <User className="w-5 h-5 text-slate-600" />
          </button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="space-y-4 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <hr className="my-4" />
                <button
                  onClick={() => navigate("/account")}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  My Account
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
