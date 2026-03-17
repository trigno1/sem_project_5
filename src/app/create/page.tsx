"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { QrCode, Sparkles, PartyPopper, Calendar, ImageIcon, ArrowLeft, ArrowRight, Download, CheckCircle2, Tag } from "lucide-react";
import Link from "next/link";

// --- Step Types ---
type Purpose = "fun" | "event" | "other" | null;

interface FormData {
  name: string;
  description: string;
  image: string;
  issuedAt: string;
  expiresAt: string;
  otherPurpose: string;
}

const PURPOSE_OPTIONS = [
  {
    id: "fun" as Purpose,
    icon: <PartyPopper className="h-8 w-8 mb-3 text-amber-500" />,
    label: "For Fun",
    description: "A collectible to share with friends or fans",
    color: "border-amber-200 hover:border-amber-400 hover:bg-amber-50/50",
    selected: "border-amber-500 bg-amber-50/80 shadow-amber-200/50",
  },
  {
    id: "event" as Purpose,
    icon: <Calendar className="h-8 w-8 mb-3 text-indigo-500" />,
    label: "For an Event",
    description: "A proof-of-attendance token for a gathering",
    color: "border-stone-200 hover:border-indigo-400 hover:bg-indigo-50/50",
    selected: "border-indigo-500 bg-indigo-50/80 shadow-indigo-200/50",
  },
  {
    id: "other" as Purpose,
    icon: <Sparkles className="h-8 w-8 mb-3 text-fuchsia-500" />,
    label: "Something Else",
    description: "Tell us what you have in mind",
    color: "border-stone-200 hover:border-fuchsia-400 hover:bg-fuchsia-50/50",
    selected: "border-fuchsia-500 bg-fuchsia-50/80 shadow-fuchsia-200/50",
  },
];

export default function CreatePage() {
  const router = useRouter();
  const account = useActiveAccount();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [purpose, setPurpose] = useState<Purpose>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    image: "",
    issuedAt: "",
    expiresAt: "",
    otherPurpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ id: string; qrDataUrl: string; claimUrl: string } | null>(null);
  const [error, setError] = useState("");

  const selectedOption = PURPOSE_OPTIONS.find((p) => p.id === purpose);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.image) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/create-nft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          image: form.image,
          category: purpose === "other" ? form.otherPurpose : purpose,
          issuedAt: form.issuedAt || undefined,
          expiresAt: form.expiresAt || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setStep(3);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.qrDataUrl;
    a.download = `phygital-qr-${result.id.slice(0, 8)}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-stone-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
            <QrCode className="h-5 w-5 text-indigo-600" />
            Create QR
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all ${s === step ? "w-6 bg-indigo-600" : s < step ? "w-2 bg-indigo-300" : "w-2 bg-stone-200"}`} />
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-12 pb-24">

        {/* ─── STEP 1: Purpose ─── */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" /> New NFT Drop
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4 leading-tight">
              Want to create your<br />own NFT to share?
            </h1>
            <p className="text-stone-500 text-lg mb-12 max-w-lg">
              Create a physical QR code that anyone can scan to instantly claim a unique digital asset — no wallet needed.
            </p>

            <p className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-6">What is this NFT for?</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
              {PURPOSE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPurpose(option.id)}
                  className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm ${
                    purpose === option.id
                      ? option.selected + " shadow-lg"
                      : option.color + " bg-white"
                  }`}
                >
                  {option.icon}
                  <h3 className="font-bold text-stone-900 mb-1">{option.label}</h3>
                  <p className="text-xs text-stone-500">{option.description}</p>
                </button>
              ))}
            </div>

            {purpose === "other" && (
              <input
                type="text"
                value={form.otherPurpose}
                onChange={(e) => setForm({ ...form, otherPurpose: e.target.value })}
                placeholder="Tell us about your NFT..."
                className="w-full max-w-md px-4 py-3 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-8"
              />
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!purpose || (purpose === "other" && !form.otherPurpose)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Continue <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* ─── STEP 2: NFT Details ─── */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-sm font-medium mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {selectedOption?.icon}
                <span className="text-sm font-semibold text-stone-400 uppercase tracking-widest">{selectedOption?.label}</span>
              </div>
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Tell us about your NFT</h2>
              <p className="text-stone-500 mt-2">Fill in the details — this is exactly what collectors will see when they scan your QR code.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  NFT Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Summer Vibes Drop #1"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the story behind your NFT..."
                  rows={4}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white/80"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4 text-indigo-500" /> Image URL <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://... (link to your image)"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
                  required
                />
                {form.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-stone-100 w-32 h-32 bg-stone-50">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-500" /> Available From
                  </label>
                  <input
                    type="datetime-local"
                    value={form.issuedAt}
                    onChange={(e) => setForm({ ...form, issuedAt: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
                  />
                  <p className="text-xs text-stone-400 mt-1">When scanning becomes active (optional)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-red-400" /> Expires On
                  </label>
                  <input
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
                  />
                  <p className="text-xs text-stone-400 mt-1">Last date to claim (optional)</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-wait text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                      Generating QR Code...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-5 w-5" /> Generate QR Code
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── STEP 3: Success ─── */}
        {step === 3 && result && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-4 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-3">Your QR is ready!</h2>
            <p className="text-stone-500 mb-8 max-w-md leading-relaxed">
              Print it, share it, hide it in the wild. Anyone who scans it will be able to claim <strong>{form.name}</strong> to their invisible wallet.
            </p>

            {/* QR Display */}
            <div className="bg-white border-2 border-stone-100 rounded-3xl p-8 shadow-2xl mb-8 inline-flex flex-col items-center">
              <img src={result.qrDataUrl} alt="QR Code" className="w-56 h-56 rounded-xl" />
              <p className="mt-4 text-xs text-stone-400 font-mono break-all max-w-xs">{result.claimUrl}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-all shadow-md hover:shadow-lg"
              >
                <Download className="h-5 w-5" /> Download QR
              </button>
              <button
                onClick={() => { setStep(1); setPurpose(null); setForm({ name: "", description: "", image: "", issuedAt: "", expiresAt: "", otherPurpose: "" }); setResult(null); }}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold py-3 rounded-2xl transition-all"
              >
                <Sparkles className="h-5 w-5 text-indigo-500" /> Create Another
              </button>
            </div>

            <Link href="/dashboard" className="mt-6 text-stone-400 hover:text-stone-700 text-sm font-medium transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
