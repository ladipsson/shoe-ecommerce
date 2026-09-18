import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    setIsCartOpen, 
    setIsSearchOpen, 
    wishlist,
    storeSettings 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'School Shoes', view: 'school', highlight: true },
    { label: 'Men', view: 'men' },
    { label: 'Women', view: 'women' },
    { label: 'Kids', view: 'kids' },
    { label: 'Boots', view: 'boots' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div 
        id="announcement-bar"
        className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-medium tracking-wide">
          <div className="flex items-center gap-2 text-center mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs">
              {storeSettings.announcementText}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-5 text-[11px] text-slate-300">
            <button 
              onClick={() => setCurrentView('store-locator')}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>30 Camberwell Church St, London</span>
            </button>
            <a 
              href={`tel:${storeSettings.storePhone}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{storeSettings.storePhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled 
            ? 'shadow-md shadow-slate-900/5 border-b border-slate-200 py-3' 
            : 'border-b border-slate-100 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-800 hover:text-amber-600 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-800 hover:text-amber-600 focus:outline-none"
              aria-label="Search shoes"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button 
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')} 
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-950 text-amber-400 font-serif font-bold text-lg flex items-center justify-center rounded-sm tracking-tighter border border-amber-500/30 group-hover:border-amber-400 transition-colors">
                  AF
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-2xl font-bold tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors leading-none">
                    A.F ELITE SHOES
                  </span>
                  <span className="block text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest text-slate-500 mt-0.5">
                    London • Camberwell
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold tracking-wide">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  id={`nav-link-${link.view}`}
                  onClick={() => handleNavClick(link.view)}
                  className={`px-3 py-1.5 rounded-full transition-all relative cursor-pointer ${
                    isActive 
                      ? 'text-slate-950 font-bold bg-slate-100' 
                      : link.highlight
                      ? 'text-amber-800 hover:text-amber-950 bg-amber-50/80 hover:bg-amber-100/70'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.highlight && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 align-middle"></span>
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Desktop */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-100/80 hover:bg-slate-200/70 rounded-full border border-slate-200 transition-colors cursor-pointer mr-1"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="pr-2">Search shoes...</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-400 border border-slate-200">⌘K</kbd>
            </button>

            {/* Account */}
            <button
              id="header-account-btn"
              onClick={() => setCurrentView('account')}
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => setCurrentView('wishlist')}
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-950 text-amber-400 text-[10px] font-bold rounded-full flex items-center justify-center border border-amber-400/40 animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Shop Now CTA Button */}
            <button
              id="header-shop-now-cta"
              onClick={() => setCurrentView('shop')}
              className="hidden sm:inline-flex items-center justify-center bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors border border-slate-950 ml-1 cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white text-slate-950 font-serif font-bold text-sm flex items-center justify-center rounded-xs">
                  AF
                </div>
                <span className="font-serif font-bold text-base tracking-wide">
                  A.F ELITE SHOES
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-md"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-3 pt-2 pb-1">
                Collections
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between transition-colors ${
                    currentView === link.view 
                      ? 'bg-slate-950 text-white' 
                      : link.highlight
                      ? 'text-amber-800 bg-amber-50 font-bold'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-200 mt-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-3 pb-1">
                  Customer Care
                </div>
                <button
                  onClick={() => handleNavClick('store-locator')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Visit Camberwell Store</span>
                </button>
                <button
                  onClick={() => handleNavClick('size-guide')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  UK Shoe Size Guide
                </button>
                <button
                  onClick={() => handleNavClick('delivery')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  Delivery & Returns
                </button>
                <button
                  onClick={() => handleNavClick('account')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  My Account / Orders
                </button>
              </div>
            </div>

            {/* Mobile Footer Contact */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-900">Store Hours: Mon - Sat 9:30am - 6pm</div>
              <a 
                href={`tel:${storeSettings.storePhone}`} 
                className="flex items-center gap-2 text-amber-800 font-bold hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {storeSettings.storePhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
