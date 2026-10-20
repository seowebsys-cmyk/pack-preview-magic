import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logoAsset}
            alt="RoasterPack"
            className="h-9 w-auto invert"
          />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Premium custom coffee packaging for roasters. Sleek, sustainable
            pouches that keep beans fresh and make your brand stand out.
          </p>
          <p className="mt-4 text-sm font-bold tracking-[0.25em] uppercase">
            Packed for the planet
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary-foreground/60 uppercase">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <Link to="/shop" search={{ type: "all" }} className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" hash="studio" className="hover:underline">
                3D Studio
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-primary-foreground/60 uppercase">
            Get in touch
          </p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <a href="mailto:info@roasterpack.com" className="hover:underline">
                info@roasterpack.com
              </a>
            </li>
            <li>
              <a href="tel:+37126497846" className="hover:underline">
                +371 26497846
              </a>
            </li>
            <li className="text-primary-foreground/70">
              Dzirnavu iela 66 – 31,
              <br />
              Rīga, LV-1010
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:px-6">
          <span>© {new Date().getFullYear()} RoasterPack. All rights reserved.</span>
          <span>BRC · FSSC 22000 · ISO 22000 · HACCP certified</span>
        </div>
      </div>
    </footer>
  );
}
