import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setCurrentView, 
    setQuickViewProduct, 
    toggleWishlist, 
    isInWishlist, 
    addToCart 
  } = useStore();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [hovered, setHovered] = useState(false);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const displayImage = activeColor?.image || product.images[0];
  const inWishlist = isInWishlist(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  const handleCardClick = (e: React.MouseEvent) => {
    // don't navigate if clicking on buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.color-swatch')) return;
    setCurrentView('product-detail', product);
  };

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, activeColor.colorName, 1);
    setShowSizePicker(false);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowSizePicker(false);
      }}
      className="group bg-white rounded-md border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {hasSale && (
            <span className="bg-rose-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              Save £{(product.originalPrice! - product.price).toFixed(2)}
            </span>
          )}
          {product.isSchoolPick && (
            <span className="bg-slate-950 text-amber-300 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
              School Ready
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md backdrop-blur-xs transition-all duration-200 z-10 cursor-pointer ${
            inWishlist 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Action Bar */}
        <div className="absolute inset-x-2 bottom-2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold py-2 px-2.5 rounded shadow-sm border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>Quick View</span>
          </button>
          
          <button
            id={`quickadd-trigger-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowSizePicker(!showSizePicker);
            }}
            className="flex-1 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-2.5 rounded shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Add</span>
          </button>
        </div>

        {/* Size Picker Overlay when Quick Add clicked */}
        {showSizePicker && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-slate-950/95 text-white p-3 z-20 backdrop-blur-xs transition-all animate-fadeIn"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Select UK Size:
              </span>
              <button 
                onClick={() => setShowSizePicker(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleQuickAdd(size)}
                  className="py-1 px-1 text-center bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-[11px] font-bold rounded border border-slate-700 transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Subcategory & Star Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="truncate text-[11px] uppercase tracking-wider font-semibold">
              {product.subCategory}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Color swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color, idx) => (
                <button
                  key={color.colorName}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  title={color.colorName}
                  className={`color-swatch w-4 h-4 rounded-full border transition-all ${
                    selectedColorIdx === idx 
                      ? 'ring-2 ring-slate-900 ring-offset-1 scale-110' 
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.colorHex }}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">
                {product.colors.length} colours
              </span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-slate-950">
              £{product.price.toFixed(2)}
            </span>
            {hasSale && (
              <span className="text-xs text-slate-400 line-through">
                £{product.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            In Camberwell
          </span>
        </div>
      </div>
    </div>
  );
};
