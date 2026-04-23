"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LegalPage() {
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
          <h1 className="text-4xl font-black tracking-tight mb-8">Legal Disclaimers</h1>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              Last updated: April 2025
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">1. No Investment Advice</h2>
            <p>
              The information provided on the Phygital platform does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the platform's content as such.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">2. Blockchain Risks</h2>
            <p>
              Using blockchain technology involves significant risks. Smart contracts may contain vulnerabilities. The Phygital platform is provided "as is" without any guarantees or warranties regarding the security or continuous availability of the network.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">3. Open Source Licences</h2>
            <p>
              The Phygital platform incorporates various open-source software projects. The full source code of the platform is available on GitHub under the MIT License.
            </p>
            <h2 className="text-2xl font-bold text-stone-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Phygital, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
