import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setCurrentView, setSelectedProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Global key listener for CMD+K or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter products by search term
  const query = searchTerm.toLowerCase().trim();
  const matchingProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  // Suggestions for popular search intents like "school", "boots", "loafers", "chelsea"
  const quickSuggestions = [
    { label: 'School Shoes', view: 'school' },
    { label: "Boys' School Shoes", view: 'school', sub: "Boys' School Shoes" },
    { label: "Girls' School Shoes", view: 'school', sub: "Girls' School Shoes" },
    { label: 'Velcro School Shoes', view: 'school', sub: 'Velcro School Shoes' },
    { label: 'Leather Chelsea Boots', view: 'boots' },
    { label: "Women's Loafers", view: 'women' },
    { label: 'Everyday Comfort Trainers', view: 'men' },
  ];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    setSelectedProduct(product);
    setCurrentView('product-detail', product);
  };

  const handleSelectCategory = (view: string) => {
    setIsSearchOpen(false);
    setCurrentView(view);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24">
        <div 
          className="inline-block w-full max-w-2xl bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all relative z-10 border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search school shoes, Chelsea boots, loafers, sizes..."
              className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md border border-slate-200 text-xs flex items-center gap-1 font-medium"
            >
              ESC
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
            {searchTerm.trim() === '' ? (
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Popular Searches & Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectCategory(item.view)}
                      className="text-xs bg-white hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 text-slate-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200">
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                    Camberwell Store Services
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <button 
                      onClick={() => handleSelectCategory('store-locator')}
                      className="p-2.5 rounded bg-white border border-slate-200 text-left hover:border-slate-300 font-medium"
                    >
                      📍 Free Click & Collect at 30 Camberwell Church St
                    </button>
                    <button 
                      onClick={() => handleSelectCategory('size-guide')}
                      className="p-2.5 rounded bg-white border border-slate-200 text-left hover:border-slate-300 font-medium"
                    >
                      📏 Children's UK Footwear Sizing Guide
                    </button>
                  </div>
                </div>
              </div>
            ) : matchingProducts.length > 0 ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                  <span>{matchingProducts.length} results found for "{searchTerm}"</span>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setCurrentView('shop');
                    }}
                    className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View all in shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-2">
                  {matchingProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-amber-400 hover:shadow-sm flex items-center justify-between gap-3 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-sm text-slate-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{product.subCategory}</span>
                            <span>•</span>
                            <span>{product.sizes.length} sizes available</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-slate-950">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <div className="text-[11px] text-rose-600 line-through">
                            £{product.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 text-sm mb-3">
                  No footwear found matching "{searchTerm}".
                </p>
                <div className="text-xs text-slate-400">
                  Try searching for: <button onClick={() => setSearchTerm('school')} className="text-amber-800 font-bold underline">school</button>, <button onClick={() => setSearchTerm('boots')} className="text-amber-800 font-bold underline">boots</button>, or <button onClick={() => setSearchTerm('loafers')} className="text-amber-800 font-bold underline">loafers</button>.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
