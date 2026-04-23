"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-black tracking-tight mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              Last updated: April 2025
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, update your profile, use our services, or communicate with us. This may include your wallet address, name, email address, and any other information you choose to provide.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services. We also use it to communicate with you, monitor and analyze trends, and personalize your experience on the Phygital platform.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy, such as with your consent, to comply with laws, or to protect our rights. Blockchain transactions are public by nature.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">4. Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
