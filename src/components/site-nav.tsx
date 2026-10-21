import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="RoasterPack home">
          <img src={logoAsset} alt="RoasterPack" className="h-7 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <Link to="/shop" search={{ type: "all" }} className="text-foreground/80 transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link to="/" hash="studio" className="text-foreground/80 transition-colors hover:text-foreground">
            3D Studio
          </Link>
          <Link to="/" hash="work" className="text-foreground/80 transition-colors hover:text-foreground">
            Our work
          </Link>
          <Link to="/blog" className="text-foreground/80 transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link to="/about" className="text-foreground/80 transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="md:hidden">
            <Link to="/shop" search={{ type: "all" }} aria-label="Shop" title="Shop"><ShoppingBag /></Link>
          </Button>
          <Link
            to="/shop"
            search={{ type: "all" }}
            className="hidden items-center justify-center rounded-full border border-foreground/30 px-4 py-2 text-xs font-bold tracking-wide uppercase transition-colors hover:bg-secondary sm:inline-flex"
          >
            Order now
          </Link>
          <Link
            to="/"
            hash="sample"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Get a Sample
          </Link>
        </div>
      </div>
    </header>
  );
}
