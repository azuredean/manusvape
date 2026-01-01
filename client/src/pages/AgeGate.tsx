import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type VerificationMethod = "birthdate" | "checkbox";

export default function AgeGate() {
  const [, navigate] = useLocation();
  const [method, setMethod] = useState<VerificationMethod>("checkbox");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyByBirthdateMutation = trpc.compliance.verifyAgeByBirthdate.useMutation();
  const verifyByCheckboxMutation = trpc.compliance.verifyAgeByCheckbox.useMutation();

  const handleBirthdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!year || !month || !day) {
      toast.error("Please enter your complete date of birth");
      return;
    }

    setIsLoading(true);
    try {
      await verifyByBirthdateMutation.mutateAsync({
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
      });

      // Store verification in localStorage
      localStorage.setItem("ageVerified", "true");
      localStorage.setItem("ageVerificationTime", new Date().toISOString());

      toast.success("Age verification successful");
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Age verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmed) {
      toast.error("You must confirm that you are 18 years or older");
      return;
    }

    setIsLoading(true);
    try {
      await verifyByCheckboxMutation.mutateAsync({
        confirmed: true,
      });

      // Store verification in localStorage
      localStorage.setItem("ageVerified", "true");
      localStorage.setItem("ageVerificationTime", new Date().toISOString());

      toast.success("Age verification successful");
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Age verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Age Verification</h1>
          <p className="text-slate-400">
            You must be 18 years or older to access this site
          </p>
        </div>

        {/* Health Warning */}
        <Card className="bg-red-50 border-red-200 mb-6 p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Health Warning</p>
              <p className="text-xs text-red-800 mt-1">
                This product contains nicotine. Nicotine is highly addictive. Not for use by
                minors, pregnant women, or persons with heart disease.
              </p>
            </div>
          </div>
        </Card>

        {/* Verification Methods */}
        <div className="space-y-4">
          {/* Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod("checkbox")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                method === "checkbox"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Quick Verify
            </button>
            <button
              onClick={() => setMethod("birthdate")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                method === "birthdate"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Birthdate
            </button>
          </div>

          {/* Checkbox Method */}
          {method === "checkbox" && (
            <form onSubmit={handleCheckboxSubmit} className="space-y-4">
              <Card className="bg-slate-800 border-slate-700 p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="age-confirm"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="w-5 h-5 mt-1 rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="age-confirm" className="text-slate-200 cursor-pointer">
                    <span className="font-medium">I confirm that I am 18 years of age or older</span>
                    <p className="text-xs text-slate-400 mt-1">
                      By checking this box, you confirm that you are legally able to purchase
                      nicotine products in Australia.
                    </p>
                  </label>
                </div>
              </Card>

              <Button
                type="submit"
                disabled={!confirmed || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </form>
          )}

          {/* Birthdate Method */}
          {method === "birthdate" && (
            <form onSubmit={handleBirthdateSubmit} className="space-y-4">
              <Card className="bg-slate-800 border-slate-700 p-6">
                <p className="text-slate-300 text-sm mb-4">Enter your date of birth:</p>

                <div className="grid grid-cols-3 gap-3">
                  {/* Day */}
                  <div>
                    <Label htmlFor="day" className="text-slate-300 text-xs">
                      Day
                    </Label>
                    <Input
                      id="day"
                      type="number"
                      min="1"
                      max="31"
                      placeholder="DD"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>

                  {/* Month */}
                  <div>
                    <Label htmlFor="month" className="text-slate-300 text-xs">
                      Month
                    </Label>
                    <Input
                      id="month"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="MM"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <Label htmlFor="year" className="text-slate-300 text-xs">
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      placeholder="YYYY"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 mt-1"
                    />
                  </div>
                </div>
              </Card>

              <Button
                type="submit"
                disabled={!year || !month || !day || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify Age"}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            By accessing this site, you confirm that you have read and agree to our{" "}
            <a href="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
