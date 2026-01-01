import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText, Shield, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";

type ComplianceType = "health_warning" | "terms_of_service" | "privacy_policy" | "tga_statement";

export default function Compliance() {
  const [activeTab, setActiveTab] = useState<ComplianceType>("health_warning");

  const { data: content, isLoading } = trpc.compliance.getComplianceContent.useQuery(activeTab);

  const tabs: Array<{
    id: ComplianceType;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: "health_warning", label: "Health Warning", icon: <AlertCircle className="w-4 h-4" /> },
    { id: "terms_of_service", label: "Terms of Service", icon: <FileText className="w-4 h-4" /> },
    { id: "privacy_policy", label: "Privacy Policy", icon: <Shield className="w-4 h-4" /> },
    { id: "tga_statement", label: "TGA Statement", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Legal & Compliance</h1>
          <p className="text-lg text-slate-600">
            Important information about our products and your rights
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <Card className="bg-white border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading content...</p>
            </div>
          ) : (
            <div className="p-8">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                  {content?.content}
                </pre>
              </div>
            </div>
          )}
        </Card>

        {/* Footer Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border border-blue-200 p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Age Verification</h3>
            <p className="text-sm text-blue-800">
              All customers must be 18+ to purchase. We verify age at checkout.
            </p>
          </Card>

          <Card className="bg-green-50 border border-green-200 p-4">
            <h3 className="font-semibold text-green-900 mb-2">TGA Compliant</h3>
            <p className="text-sm text-green-800">
              All products comply with Australian Therapeutic Goods Administration regulations.
            </p>
          </Card>

          <Card className="bg-purple-50 border border-purple-200 p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Data Protection</h3>
            <p className="text-sm text-purple-800">
              Your personal data is protected under Australian Privacy Act 1988.
            </p>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Have questions? Contact us at{" "}
            <a href="mailto:compliance@manusvape.com.au" className="text-blue-600 hover:text-blue-700 font-medium">
              compliance@manusvape.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
