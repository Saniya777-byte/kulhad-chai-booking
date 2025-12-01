"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
export function Navbar({
  cartItemCount = 0,
  showCart = true,
  showAdmin = false,
  onCartClick
}) {
  return <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top" role="navigation" aria-label="Main navigation">
    <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
      <Link href="/" className="flex items-center space-x-2 focus-ring rounded-lg">
        <Image src="/logo_with_name.png" alt="Kulhad Chai Restaurant - Home" width={150} height={24} priority /></Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary focus-ring rounded px-3 py-2">
          Menu
        </Link>
        {showAdmin && <Link href="/shop-portal" className="text-sm font-medium transition-colors hover:text-primary focus-ring rounded px-3 py-2">
          Admin
        </Link>}
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {showCart && <Button variant="outline" size="sm" className="relative min-w-[44px] min-h-[44px] focus-ring" onClick={onCartClick} aria-label={`Shopping cart with ${cartItemCount} items`} type="button">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          {cartItemCount > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center animate-pulse" aria-label={`${cartItemCount} items`}>
            {cartItemCount}
          </span>}
        </Button>}

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" className="min-w-[44px] min-h-[44px] focus-ring" aria-label="Open navigation menu" type="button">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Navigate through our restaurant
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/" className="text-base font-medium transition-colors hover:text-primary focus-ring rounded px-3 py-3 min-h-[48px] flex items-center">
                Menu
              </Link>
              {showAdmin && <Link href="/shop-portal" className="text-base font-medium transition-colors hover:text-primary focus-ring rounded px-3 py-3 min-h-[48px] flex items-center">
                Admin
              </Link>}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </nav>;
}
