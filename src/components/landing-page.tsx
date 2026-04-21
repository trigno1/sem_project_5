"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  QrCode,
  Wallet,
  Zap,
  ShieldCheck,
  Award,
  Upload,
  Lock,
  Users,
  Sparkles,
  Tag,
  Globe,
  CheckCircle2,
  ScanLine,
  Image as ImageIcon,
  Compass,
  Download,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useActiveAccount,
  useActiveWallet,
  useConnectModal,
  useDisconnect,
  AutoConnect,
  lightTheme,
} from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client, chain } from "@/app/const/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const indigoTheme = lightTheme({
  colors: {
    primaryButtonBg: "#4f46e5",
    primaryButtonText: "#ffffff",
    modalBg: "#ffffff",
    borderColor: "#e5e7eb",
  },
});

export function LandingPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { connect } = useConnectModal();
  const router = useRouter();

  useEffect(() => {
    if (account) router.push("/dashboard");
  }, [account, router]);

  const handleConnect = async () => {
    try {
      const connected = await connect({
        client,
        size: "compact",
        theme: indigoTheme,
        chain,
        wallets: [
          inAppWallet({ auth: { options: ["google", "email", "passkey", "guest"] } }),
          createWallet("io.metamask"),
        ],
      });
      if (connected) router.push("/dashboard");
    } catch (e) {
      console.error("Connection failed:", e);
    }
  };

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col min-h-screen bg-white text-stone-900 selection:bg-indigo-500/20">
      <AutoConnect client={client} />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-[#080818]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Phygital"
            width={32}
            height={32}
            className="rounded-xl"
            priority
          />
          <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            Phygital
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-auto mr-8">
          {[["How it Works", "how-it-works"], ["Create", "create"], ["Features", "features"]].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scroll(id)}
              className="text-sm font-semibold text-white/50 hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
          <Link
            href="/explore"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Explore
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {account ? (
            <Button
              onClick={() => disconnect(wallet!)}
              size="sm"
              variant="ghost"
              className="text-white/50 hover:text-red-400 font-semibold hidden sm:flex"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 h-9 text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 border border-indigo-400/20"
            >
              Get Started
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white/70">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0f0f23] border border-white/10 shadow-2xl rounded-xl p-2 w-44"
            >
              {[["How it Works", "how-it-works"], ["Create", "create"], ["Features", "features"]].map(([label, id]) => (
                <DropdownMenuItem
                  key={id}
                  onClick={() => scroll(id)}
                  className="font-medium cursor-pointer py-2.5 text-white/70 hover:text-white focus:bg-white/5"
                >
                  {label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/explore" className="py-2.5 text-indigo-400 font-semibold">
                  Explore Drops ✦
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080818]">

          {/* Aurora blobs — GPU-accelerated */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="animate-aurora will-change-transform absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="animate-aurora2 will-change-transform absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px]" />
          </div>

          {/* Dot grid (static, zero CPU) */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          <div className="container px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-28 pb-16 max-w-7xl mx-auto">

            {/* ─ Hero Text ─ */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up w-full">
              {/* Pill badge */}
              <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-6 backdrop-blur-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2 animate-pulse" />
                Live on Base Sepolia Testnet
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white max-w-2xl leading-[1.04] mb-5">
                Create drops.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                  Collect the world.
                </span>
              </h1>

              <p className="max-w-lg text-base md:text-lg text-white/60 leading-relaxed font-medium mb-8">
                Turn physical objects into on-chain NFTs. Print a QR code anywhere — let anyone claim a real ERC-1155 token with just their phone. No wallet setup needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  onClick={handleConnect}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white h-12 px-8 rounded-full text-base font-bold shadow-xl shadow-indigo-600/25 transition-all hover:-translate-y-0.5 border border-indigo-400/20"
                >
                  Start Collecting <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => scroll("create")}
                  variant="outline"
                  className="h-12 px-8 rounded-full text-base font-bold border-white/10 text-white bg-white/5 hover:bg-white/10 transition-all"
                >
                  Create a Drop
                </Button>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                {["No seed phrases", "No gas fees", "Real on-chain NFTs", "ERC-1155"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-white/50"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ─ Hero Visual — two floating cards ─ */}
            <div className="flex-shrink-0 relative w-full max-w-[320px] h-[360px] hidden lg:flex items-center justify-center">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-3xl" />

              {/* QR card */}
              <div
                className="animate-float-slow absolute -left-4 top-6 w-48 bg-[#0f0f23] border border-white/10 rounded-2xl p-4 shadow-2xl z-10"
                style={{ transform: "perspective(800px) rotateY(8deg) rotateX(-2deg)", willChange: "transform" }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-white/30 ml-2 font-mono">scan.tsx</span>
                </div>
                <div className="w-full aspect-square rounded-xl bg-white p-2">
                  <div className="w-full h-full grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${[0, 1, 5, 6, 4, 9, 10, 14, 15, 19, 20, 21, 24, 12, 7, 17].includes(i) ? "bg-indigo-900" : "bg-stone-100"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-[10px] text-white/30 mt-2 font-mono">Claim URL encoded</p>
              </div>

              {/* NFT card */}
              <div
                className="animate-float absolute -right-2 bottom-4 w-48 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 rounded-2xl shadow-2xl z-20 overflow-hidden"
                style={{ transform: "perspective(800px) rotateY(-6deg) rotateX(2deg)", willChange: "transform" }}
              >
                <div className="absolute inset-0 animate-shimmer" />
                <div className="p-4">
                  <div className="w-full aspect-square rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-4xl mb-1">⬡</div>
                      <p className="text-[10px] text-white/60 font-semibold">Red Hexagon</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-xs">Red Hexagon</p>
                      <p className="text-white/50 text-[10px]">Shapes Collection</p>
                    </div>
                    <div className="bg-emerald-400/20 border border-emerald-400/30 rounded-full px-2 py-0.5">
                      <span className="text-emerald-300 text-[10px] font-bold">Minted ✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tx badge */}
              <div className="animate-float-delayed absolute top-2 right-0 bg-emerald-900/80 border border-emerald-500/30 rounded-xl px-3 py-1.5 flex items-center gap-2 backdrop-blur-sm z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-[10px] font-bold">Tx confirmed</span>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60" />
          </div>
        </section>

        {/* ── STATS BAR ──────────────────────────────────────────────────── */}
        <section className="bg-[#0c0c1e] border-y border-white/5 py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: "ERC-1155", label: "Token Standard" },
                { val: "$0.00", label: "Gas for Claimers" },
                { val: "Base", label: "Network" },
                { val: "< 30s", label: "Claim Time" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                    {s.val}
                  </span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS: COLLECTORS ────────────────────────────────────── */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-white scroll-mt-20">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <ScanLine className="h-3.5 w-3.5" /> For Collectors
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 mb-3">
                Claim an NFT in 3 steps
              </h2>
              <p className="text-lg text-stone-500 max-w-xl mx-auto font-medium">
                No crypto experience needed. From scan to owning takes under 30 seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  icon: ScanLine,
                  color: "text-indigo-600 bg-indigo-50 border-indigo-100",
                  title: "Scan Any QR Code",
                  desc: "Find a Phygital QR on a product, event, poster or card. Open your phone camera — no app needed.",
                },
                {
                  step: "02",
                  icon: ShieldCheck,
                  color: "text-violet-600 bg-violet-50 border-violet-100",
                  title: "Connect in Seconds",
                  desc: "Sign in with Google, email, or passkey. An invisible smart wallet is created — no seed phrases.",
                },
                {
                  step: "03",
                  icon: Award,
                  color: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100",
                  title: "Own It On-Chain",
                  desc: "Tap Claim. An ERC-1155 NFT is minted to your wallet on Base. View it on your dashboard or BaseScan.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-white border border-stone-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  {/* Step connector line (desktop) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-14 -right-3 w-6 h-px bg-gradient-to-r from-stone-200 to-indigo-200 z-10" />
                  )}
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${item.color} group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="text-5xl font-black text-stone-100 mb-2 tabular-nums">{item.step}</div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOR CREATORS ────────────────────────────────────────────────── */}
        <section id="create" className="w-full py-20 md:py-28 bg-[#080818] scroll-mt-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="animate-aurora will-change-transform absolute -top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[100px]" />
            <div className="animate-aurora2 will-change-transform absolute -bottom-[10%] right-[5%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[100px]" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            aria-hidden="true"
          />

          <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <Sparkles className="h-3.5 w-3.5" /> For Creators
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
                Create your own NFT drop
              </h2>
              <p className="text-lg text-white/40 max-w-xl mx-auto font-medium">
                Design, configure, and distribute a physical NFT drop in minutes — no code required.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  icon: ImageIcon,
                  grad: "from-amber-500 to-orange-500",
                  title: "Design Your NFT",
                  desc: "Upload your image to IPFS, set a name, description, and add custom traits like event name, edition, or rarity.",
                },
                {
                  step: "02",
                  icon: Lock,
                  grad: "from-rose-500 to-fuchsia-500",
                  title: "Set the Rules",
                  desc: "Set a claim limit, add an expiry date, protect with a secret code, or mark it as soulbound.",
                },
                {
                  step: "03",
                  icon: Zap,
                  grad: "from-indigo-500 to-violet-500",
                  title: "Print & Distribute",
                  desc: "Download your unique high-res QR code and print it on cards, posters, packaging, or any physical surface.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div className="relative w-14 h-14 mb-5">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.grad} opacity-20 blur-md`} />
                    <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${item.grad} bg-opacity-10 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-5xl font-black text-white/15 mb-2">{item.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleConnect}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white h-12 px-9 rounded-full text-base font-bold shadow-xl shadow-amber-500/25 transition-all hover:-translate-y-0.5 border-0"
              >
                Create Your First Drop <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── FEATURES BENTO GRID ─────────────────────────────────────────── */}
        <section id="features" className="w-full py-20 md:py-28 bg-stone-50 scroll-mt-20">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 mb-3">
                Everything you need
              </h2>
              <p className="text-lg text-stone-500 max-w-xl mx-auto font-medium">
                Powerful tools for creators. Seamless experience for collectors.
              </p>
            </div>

            {/* Bento grid — 12-column CSS grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Big card — IPFS */}
              <div className="lg:col-span-2 group bg-white border border-indigo-100 rounded-3xl p-7 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-300 flex gap-6 items-start cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Upload className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 mb-1.5">IPFS Image Upload</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Upload images directly to IPFS. Stored permanently — your NFT artwork is immutable, censorship-resistant, and lives forever on the decentralized web.
                  </p>
                </div>
              </div>

              {/* Soulbound */}
              <div className="group bg-white border border-emerald-100 rounded-3xl p-7 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Soulbound NFTs</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Mark as non-transferable. Perfect for certificates, diplomas, and attendance records.</p>
              </div>

              {/* Invisible Wallets */}
              <div className="group bg-white border border-violet-100 rounded-3xl p-7 hover:shadow-xl hover:border-violet-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Wallet className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Invisible Wallets</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Sign in with Google or email. A self-custody smart wallet is created silently — zero crypto knowledge required.</p>
              </div>

              {/* Claim Limit */}
              <div className="group bg-white border border-amber-100 rounded-3xl p-7 hover:shadow-xl hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Claim Limits</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Set how many wallets can claim. After the cap, the QR locks itself automatically.</p>
              </div>

              {/* New: Email Receipt */}
              <div className="group bg-white border border-sky-100 rounded-3xl p-7 hover:shadow-xl hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Mail className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Email Receipts</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Get a confirmation email with your NFT, tx hash, and BaseScan link — instantly after claiming.</p>
              </div>

              {/* Secret Code Gate */}
              <div className="group bg-white border border-rose-100 rounded-3xl p-7 hover:shadow-xl hover:border-rose-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Lock className="h-5 w-5 text-rose-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Secret Code Gate</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Password-protect drops. Only people with the code can claim — perfect for exclusive events.</p>
              </div>

              {/* Big card — Explore */}
              <div className="lg:col-span-2 group bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-7 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden relative">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <div className="flex gap-6 items-start relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Compass className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">Public Explore Gallery</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Browse all active, public drops without scanning a QR code. Discover and claim NFTs from creators around the world.
                    </p>
                    <Link
                      href="/explore"
                      className="inline-flex items-center gap-1.5 mt-4 text-white font-bold text-sm hover:gap-2.5 transition-all"
                    >
                      Explore drops <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Certificate */}
              <div className="group bg-white border border-fuchsia-100 rounded-3xl p-7 hover:shadow-xl hover:border-fuchsia-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Download className="h-5 w-5 text-fuchsia-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Certificate Download</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Download a branded PNG certificate of your claim — with your name, date, and tx hash.</p>
              </div>

              {/* Printable QR */}
              <div className="group bg-white border border-stone-200 rounded-3xl p-7 hover:shadow-xl hover:border-stone-300 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <QrCode className="h-5 w-5 text-stone-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">QR Re-Download</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Lost your QR code? Re-download it anytime from your dashboard — no re-creation needed.</p>
              </div>

              {/* Zero Gas */}
              <div className="group bg-white border border-yellow-100 rounded-3xl p-7 hover:shadow-xl hover:border-yellow-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Zero Gas Fees</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Gas is sponsored. Collectors claim completely free — you set it up once, they enjoy forever.</p>
              </div>

              {/* Attributes */}
              <div className="group bg-white border border-purple-100 rounded-3xl p-7 hover:shadow-xl hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Tag className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1.5">Custom Attributes</h3>
                <p className="text-stone-500 text-sm leading-relaxed">Add unlimited traits — event name, rarity, edition — visible on every NFT marketplace.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
        <section className="w-full py-24 bg-[#080818] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="animate-aurora will-change-transform absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="animate-aurora2 will-change-transform absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[100px]" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
            aria-hidden="true"
          />

          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center flex flex-col items-center max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-6 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2 animate-pulse" />
              Ready to go Phygital?
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
              The physical world just{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                went on-chain.
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-lg font-medium mb-10">
              Create your first NFT drop or start collecting — all in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleConnect}
                className="bg-indigo-600 hover:bg-indigo-500 text-white h-13 px-10 rounded-full font-bold text-lg shadow-2xl shadow-indigo-600/25 transition-all hover:-translate-y-0.5 border border-indigo-400/10"
              >
                Collect an NFT
              </Button>
              <Button
                onClick={handleConnect}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 h-13 px-10 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5"
              >
                Create a Drop
              </Button>
            </div>

            {/* Social proof mini */}
            <div className="mt-10 flex items-center gap-3 text-white/30 text-xs font-semibold">
              <div className="flex -space-x-2">
                {["bg-amber-400", "bg-indigo-400", "bg-fuchsia-400", "bg-emerald-400"].map((c, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full border-2 border-[#080818] ${c}`} />
                ))}
              </div>
              <span>Collectors are claiming right now</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </section>
      </main>

      <Footer dark />
    </div>
  );
}
