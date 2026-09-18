import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView 
  } = useStore();

  const product = quickViewProduct;
  if (!product) return null;

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'UK 7');
  const [quantity, setQuantity] = useState(1);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor.colorName, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    setCurrentView('product-detail', product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div 
          className="inline-block w-full max-w-3xl bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all relative z-10 border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-slate-50 flex flex-col justify-between">
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-white border border-slate-200/80 mb-3 relative">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {hasSale && (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    Sale
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 bg-white ${
                        selectedImgIdx === idx ? 'border-slate-950 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Free UK delivery on orders over £75</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In stock at 30 Camberwell Church St</span>
                </div>
              </div>
            </div>

            {/* Product Details Right */}
            <div className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                  {product.subCategory}
                </div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-950 mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 font-semibold">
                    {product.rating} ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-slate-950">
                    £{product.price.toFixed(2)}
                  </span>
                  {hasSale && (
                    <span className="text-sm text-slate-400 line-through">
                      £{product.originalPrice!.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    VAT Included
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                  {product.description}
                </p>

                {/* Colour selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Colour: <span className="text-slate-900 font-normal">{activeColor.colorName}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.colorName}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColorIdx === idx 
                            ? 'border-slate-950 ring-2 ring-amber-400 ring-offset-1 scale-105' 
                            : 'border-slate-200'
                        }`}
                        style={{ backgroundColor: color.colorHex }}
                        title={color.colorName}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Select UK Size:
                    </label>
                    <button 
                      onClick={() => {
                        setQuickViewProduct(null);
                        setCurrentView('size-guide');
                      }}
                      className="text-xs text-amber-800 hover:underline font-semibold"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-bold rounded border transition-all ${
                          selectedSize === size
                            ? 'bg-slate-950 text-white border-slate-950'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-slate-300 rounded text-xs font-semibold">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Add to Bag • £{(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded border transition-colors cursor-pointer ${
                      inWishlist 
                        ? 'border-rose-300 bg-rose-50 text-rose-600' 
                        : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullPage}
                  className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 flex items-center justify-center gap-1 hover:underline"
                >
                  <span>View full product specifications & customer reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
