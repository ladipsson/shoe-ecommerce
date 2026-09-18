import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { SizeGuideView } from './views/SizeGuideView';
import { PolicyViews } from './views/PolicyViews';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useStore();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView initialCategory="all" />;
      case 'school':
        return <ShopView initialCategory="school" />;
      case 'men':
        return <ShopView initialCategory="men" />;
      case 'women':
        return <ShopView initialCategory="women" />;
      case 'kids':
        return <ShopView initialCategory="kids" />;
      case 'boots':
        return <ShopView initialCategory="boots" />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      case 'about':
        return <AboutView />;
      case 'contact':
      case 'store-locator':
        return <ContactView />;
      case 'size-guide':
        return <SizeGuideView />;
      case 'delivery':
        return <PolicyViews initialTab="delivery" />;
      case 'returns':
        return <PolicyViews initialTab="returns" />;
      case 'faqs':
        return <PolicyViews initialTab="faqs" />;
      case 'privacy':
      case 'cookies':
        return <PolicyViews initialTab="privacy" />;
      case 'terms':
        return <PolicyViews initialTab="terms" />;
      case 'account':
        return <AccountView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Header with UK store announcement bar and navigation */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16">
        {renderView()}
      </main>

      {/* Comprehensive British Footwear Retailer Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-2xl border border-slate-700 flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
