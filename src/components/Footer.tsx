import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Settings
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, storeSettings } = useStore();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Free UK Delivery Over £75
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Fast dispatched via Royal Mail Tracked.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                30-Day Easy UK Returns
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Return online or drop by our Camberwell store.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                4.9★ Local Reputation
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                11 genuine 5-star Google customer reviews.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Camberwell High Street
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Try on in-store at 30 Camberwell Church St.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12">
          {/* Column 1 — Shop */}
          <div>
            <h3 className="font-serif font-bold text-base text-white mb-4 tracking-wide">
              Shop Collections
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('school')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="font-semibold text-white">School Shoes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('men')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Men's Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('women')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Women's Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('kids')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kids' Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('boots')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Boots & Chelsea
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-amber-400 transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-amber-400 transition-colors text-amber-300 font-medium"
                >
                  Special Offers & Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2 — Help */}
          <div>
            <h3 className="font-serif font-bold text-base text-white mb-4 tracking-wide">
              Customer Help
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('delivery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Delivery Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('returns')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('size-guide')}
                  className="hover:text-amber-400 transition-colors"
                >
                  UK Footwear Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faqs')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — About */}
          <div>
            <h3 className="font-serif font-bold text-base text-white mb-4 tracking-wide">
              About The Store
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About A.F Elite Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('store-locator')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Camberwell Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Customer Reviews (4.9★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  UK Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('cookies')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="font-serif font-bold text-base text-white mb-4 tracking-wide">
              Visit or Call Us
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">A.F Elite Shoes</strong>
                  30 Camberwell Church St<br />
                  London SE5 8QZ<br />
                  United Kingdom
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`tel:${storeSettings.storePhone}`}
                  className="hover:text-amber-300 font-semibold text-white transition-colors"
                >
                  {storeSettings.storePhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`mailto:${storeSettings.storeEmail}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {storeSettings.storeEmail}
                </a>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>{storeSettings.openingHoursWeekday}</div>
                <div>{storeSettings.openingHoursSunday}</div>
              </div>

              {/* Social Media Links */}
              <div className="pt-3 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 A.F Elite Shoes. All Rights Reserved. Registered Footwear Retailer in England & Wales.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Payment via GBP (£) • Visa, Mastercard, Apple Pay, PayPal
            </span>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700"
              title="Store Owner CMS Management"
            >
              <Settings className="w-3 h-3" />
              <span>Store Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
