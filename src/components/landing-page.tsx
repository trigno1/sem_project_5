"use client";

import Link from "next/link";
import {
  ArrowRight,
  QrCode,
  Smartphone,
  Wallet,
  Zap,
  Menu,
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

export function LandingPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const { connect } = useConnectModal();

  const handleConnect = async () => {
    await connect({
      client,
      size: "compact",
      theme: lightTheme(),
      chain,
      wallets: [
        inAppWallet({
          auth: {
            options: [
              "google",
              "coinbase",
              "discord",
              "farcaster",
              "email",
              "passkey",
              "guest",
            ],
          },
        }),
        createWallet("io.metamask"),
      ],
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ✅ AutoConnect keeps wallet connected between reloads */}
      <AutoConnect client={client} />

      {/* ===== Header ===== */}
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <QrCode className="h-6 w-6 text-gray-800" />
          <span className="ml-2 text-lg font-bold text-gray-900">
            NFT QR Scanner
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          {account ? (
            <>
              <Link href="/dashboard" className="hidden sm:inline-block">
                <Button
                  className="text-gray-900 border-gray-400"
                  variant="outline"
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>

              {/* Mobile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <Menu className="h-4 w-4 text-gray-800" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => disconnect(wallet!)}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Desktop Sign Out */}
              <Button
                onClick={() => disconnect(wallet!)}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleConnect}
                variant="outline"
                className="rounded-4 text-gray-900 font-medium"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                  Scan. Collect. Own.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Find our QR codes in the wild and claim your NFTs! Own what
                  you find and trade with friends.
                </p>
              </div>
              <div>
                <Button variant="outline" className="text-gray-900 font-medium">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                    Revolutionize Your NFT Collection
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                    Our app combines cutting-edge technology with user-friendly
                    design to make NFT collecting a breeze.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4 mx-auto">
                {[
                  {
                    icon: Smartphone,
                    title: "Easy Scanning",
                    desc: "Instantly add NFTs to your collection with a quick scan",
                  },
                  {
                    icon: Wallet,
                    title: "Secure Wallet",
                    desc: "Store your NFTs safely with top-notch security features",
                  },
                  {
                    icon: Zap,
                    title: "Instant Trades",
                    desc: "Exchange NFTs seamlessly within the app",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center space-y-2 border border-gray-200 p-4 rounded-lg bg-white"
                  >
                    <span className="p-2 bg-gray-900 text-white rounded-full">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-black">
                  Ready to Start Your NFT Collection?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your account now and dive into the world of scannable
                  NFTs. It's quick, easy, and free to get started.
                </p>
              </div>
              <Button asChild className="bg-primary text-primary-foreground">
                <Link href="#">
                  Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">
          © 2025 NFT QR Scanner. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-900"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-900"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
