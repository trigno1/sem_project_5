"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-stone-800">
      <header className="relative z-10 border-b border-stone-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium text-sm">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Link href="/" className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity">
            <Image src="/phygital_ultra_logo.png" alt="Phygital" width={26} height={26} className="object-contain" />
            <span className="font-bold text-stone-900 tracking-tight text-lg">{t("foot.brandName") || "Phygital"}</span>
          </Link>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto py-16 px-6">
        <div className="bg-white rounded-[32px] p-10 sm:p-16 shadow-2xl shadow-stone-200/50 border border-stone-100">
          <h1 className="text-4xl font-black tracking-tight mb-8">Terms of Service</h1>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              Last updated: April 2025
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Phygital platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">2. Description of Service</h2>
            <p>
              Phygital provides a platform for creating, claiming, and managing digital assets (NFTs) on the Base blockchain network. We provide the tools, but you remain responsible for your own digital assets.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">3. User Conduct</h2>
            <p>
              You agree not to engage in any activity that interferes with or disrupts the Services. You must not use the platform for any illegal or unauthorized purpose.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Phygital and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
