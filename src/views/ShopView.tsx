import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Check, 
  SlidersHorizontal, 
  Star, 
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryId, Product } from '../types';

interface ShopViewProps {
  initialCategory?: CategoryId;
}

export const ShopView: React.FC<ShopViewProps> = ({ initialCategory = 'all' }) => {
  const { products, setCurrentView } = useStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique sizes and colors across catalog
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.colors.forEach(c => set.add(c.colorName)));
    return Array.from(set);
  }, [products]);

  // Subcategories mapping
  const subCategoryOptions: Record<string, string[]> = {
    school: ["Boys' School Shoes", "Girls' School Shoes", 'Velcro School Shoes', 'Lace-Up School Shoes', 'Junior School Shoes'],
    men: ['Formal Shoes', 'Casual Shoes', 'Boots', 'Trainers'],
    women: ['Flats', 'Loafers', 'Boots', 'Trainers', 'Smart Shoes'],
    kids: ['School Shoes', 'Casual Shoes', 'Trainers', 'Boots'],
    boots: ['Chelsea Boots', 'Ankle Boots', 'Casual Boots'],
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedSizes([]);
    setSelectedColor('all');
    setMaxPrice(100);
    setOnlySale(false);
    setSortBy('featured');
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category check
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'sale') {
          if (!p.originalPrice || p.originalPrice <= p.price) return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // SubCategory
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) {
        return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = p.sizes.some(s => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Color
      if (selectedColor !== 'all') {
        const hasMatchingColor = p.colors.some(c => c.colorName.toLowerCase() === selectedColor.toLowerCase());
        if (!hasMatchingColor) return false;
      }

      // Price
      if (p.price > maxPrice) return false;

      // Only sale
      if (onlySale && (!p.originalPrice || p.originalPrice <= p.price)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSubCategory, selectedSizes, selectedColor, maxPrice, onlySale, sortBy]);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'school': return 'School Shoes Collection';
      case 'men': return "Men's Footwear";
      case 'women': return "Women's Footwear";
      case 'kids': return "Kids' Footwear";
      case 'boots': return 'Boots & Chelsea Styles';
      case 'sale': return 'Special Offers & Clearance';
      default: return 'Shop All Shoes';
    }
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'school': return 'Smart, durable, uniform-approved school shoes built for active playground days and comfort in the classroom.';
      case 'men': return "Refined formal Derby shoes, handcrafted leather Chelsea boots, and everyday cushioned trainers.";
      case 'women': return "Cushioned loafers, versatile ankle boots, and comfortable flats made for long days on your feet.";
      case 'kids': return 'Practical, sturdy footwear designed to support growing feet with easy-fastening velcro straps.';
      case 'boots': return 'Weather-resistant British leather boots crafted to handle wet sidewalks and cold London mornings.';
      case 'sale': return 'Exceptional value footwear from our Camberwell store with reductions on discontinued sizes and season styles.';
      default: return 'Explore our complete collection of family footwear, school essentials, and everyday comfort shoes.';
    }
  };

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (selectedColor !== 'all' ? 1 : 0) +
    (onlySale ? 1 : 0) +
    (maxPrice < 100 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-slate-900">
          Home
        </button>
        <span>/</span>
        <button onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }} className="hover:text-slate-900">
          Shop
        </button>
        {selectedCategory !== 'all' && (
          <>
            <span>/</span>
            <span className="font-semibold text-slate-900 capitalize">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Category Header Banner */}
      <div className="bg-slate-950 text-white rounded-xl p-6 sm:p-10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
            A.F Elite Shoes • Camberwell Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {getCategoryTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {getCategoryDescription()}
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Quick Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Footwear' },
          { id: 'school', label: 'School Shoes' },
          { id: 'men', label: "Men's" },
          { id: 'women', label: "Women's" },
          { id: 'kids', label: "Kids'" },
          { id: 'boots', label: 'Boots' },
          { id: 'sale', label: 'Sale' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id as CategoryId);
              setSelectedSubCategory('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subcategory Pills if in dedicated category */}
      {selectedCategory !== 'all' && subCategoryOptions[selectedCategory] && (
        <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
          <span className="font-bold text-slate-700 mr-1">Types:</span>
          <button
            onClick={() => setSelectedSubCategory('all')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              selectedSubCategory === 'all'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All {selectedCategory}
          </button>
          {subCategoryOptions[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedSubCategory === sub
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Main Catalogue Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-950">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-amber-800 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2">
              <span>Max Price:</span>
              <span className="text-amber-800">£{maxPrice.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-950"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>£20</span>
              <span>£100</span>
            </div>
          </div>

          {/* Sizes Filter */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              UK Shoe Size
            </div>
            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {allSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-1.5 px-1 text-center text-xs font-bold rounded border transition-all ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Colour
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto">
              <button
                onClick={() => setSelectedColor('all')}
                className={`w-full text-left px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedColor === 'all' ? 'font-bold bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Colours
              </button>
              {allColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`w-full text-left px-2.5 py-1 text-xs rounded transition-colors flex items-center justify-between ${
                    selectedColor === col ? 'font-bold bg-amber-50 text-amber-950' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{col}</span>
                  {selectedColor === col && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sale Items Only */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="rounded accent-slate-950 w-4 h-4"
              />
              <span>Sale & Special Offers Only</span>
            </label>
          </div>

          {/* In-Store Pickup Callout */}
          <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-bold block">Need shoes today?</span>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Order online and choose Click & Collect to pick up from 30 Camberwell Church St in as little as 2 hours.
            </p>
          </div>
        </aside>

        {/* MAIN PRODUCT CATALOG AREA */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* Top Bar: Count, Mobile filter button, Sorting dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-600">
              Showing <strong className="text-slate-950">{filteredProducts.length}</strong> styles
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-100 rounded border border-slate-300 text-slate-800"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900"
                >
                  <option value="featured">Featured Styles</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated (4.9★)</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-600">×</button>
                </span>
              )}
              {selectedSubCategory !== 'all' && (
                <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory('all')} className="hover:text-rose-600">×</button>
                </span>
              )}
              {selectedSizes.map(size => (
                <span key={size} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  Size: {size}
                  <button onClick={() => toggleSize(size)} className="hover:text-rose-600">×</button>
                </span>
              ))}
              {selectedColor !== 'all' && (
                <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  Colour: {selectedColor}
                  <button onClick={() => setSelectedColor('all')} className="hover:text-rose-600">×</button>
                </span>
              )}
              {onlySale && (
                <span className="bg-rose-50 text-rose-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-rose-200">
                  Sale Only
                  <button onClick={() => setOnlySale(false)} className="hover:text-rose-900">×</button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-slate-500 hover:text-slate-900 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">
                No styles match your filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Try widening your price range, selecting different shoe sizes, or clearing your active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* SEO Content Section at bottom */}
          <div className="mt-12 bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-3">
            <h3 className="font-serif font-bold text-sm text-slate-900">
              Quality UK Footwear & School Shoes in Camberwell, South London
            </h3>
            <p className="leading-relaxed">
              At A.F Elite Shoes, we supply trusted, hardwearing footwear for the entire family. Whether you are shopping for scuff-resistant school shoes for the new term, comfortable leather Chelsea boots, everyday walking trainers, or occasion wear, our store at 30 Camberwell Church St stocks an extensive range of UK sizes.
            </p>
            <p className="leading-relaxed">
              We offer free UK delivery on orders over £75, flexible 30-day returns, and rapid Click & Collect for local London customers.
            </p>
          </div>
        </main>
      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-lg text-slate-950">Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-900 mb-2">
                <span>Max Price:</span>
                <span>£{maxPrice.toFixed(0)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-950"
              />
            </div>

            {/* Sizes */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                UK Sizes
              </div>
              <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-1 px-1 text-center text-xs font-bold rounded border ${
                      selectedSizes.includes(size) ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale toggle */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded accent-slate-950 w-4 h-4"
                />
                <span>Sale Items Only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider py-3 rounded"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full text-center text-xs font-semibold text-slate-600 py-1.5"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
