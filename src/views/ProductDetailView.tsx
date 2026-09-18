import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  MapPin, 
  Check, 
  ChevronRight,
  Share2,
  Ruler,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView,
    showToast 
  } = useStore();

  const product = selectedProduct || products[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'UK 7');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'size-fit' | 'delivery' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState(false);

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const inWishlist = isInWishlist(product.id);
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  // Related products (same category or general)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  const handleAddToBag = () => {
    addToCart(product, selectedSize, activeColor.colorName, quantity);
  };

  const handleBuyItNow = () => {
    addToCart(product, selectedSize, activeColor.colorName, quantity);
    setCurrentView('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at A.F Elite Shoes Camberwell`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => setCurrentView('home')} className="hover:text-slate-900">
          Home
        </button>
        <span>/</span>
        <button onClick={() => setCurrentView('shop')} className="hover:text-slate-900 capitalize">
          Shop
        </button>
        <span>/</span>
        <button onClick={() => setCurrentView(product.category)} className="hover:text-slate-900 capitalize">
          {product.category} Shoes
        </button>
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout: Gallery Left, Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div 
            className="aspect-square sm:aspect-4/3 w-full bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/80 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={product.images[activeImgIdx] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
            />
            {hasSale && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-xs">
                Sale • Save £{(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
            {product.isSchoolPick && (
              <span className="absolute top-4 right-4 bg-slate-950 text-amber-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded shadow-xs">
                Official School Uniform Standard
              </span>
            )}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[11px] font-medium text-slate-600 px-2.5 py-1 rounded shadow-xs">
              {isZoomed ? 'Click to reset' : 'Click to zoom'}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImgIdx(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-white shrink-0 transition-all ${
                    activeImgIdx === idx 
                      ? 'border-slate-950 ring-2 ring-slate-950/20' 
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Purchasing Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span className="uppercase tracking-widest text-amber-800">
                {product.subCategory}
              </span>
              <button 
                onClick={handleShare}
                className="hover:text-slate-900 flex items-center gap-1"
                title="Share product"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-slate-950">
                £{product.price.toFixed(2)}
              </span>
              {hasSale && (
                <span className="text-lg text-slate-400 line-through">
                  £{product.originalPrice!.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                UK VAT Included
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 font-light">
              {product.description}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-5 space-y-5">
            {/* Colour Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Colour: <span className="font-normal text-slate-600">{activeColor.colorName}</span>
              </label>
              <div className="flex gap-2.5">
                {product.colors.map((col, idx) => (
                  <button
                    key={col.colorName}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColorIdx === idx 
                        ? 'border-slate-950 ring-2 ring-amber-400 ring-offset-2 scale-105' 
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.colorHex }}
                    title={col.colorName}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Select UK Size:
                </label>
                <button
                  onClick={() => setCurrentView('size-guide')}
                  className="text-xs text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fitting Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-bold rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Quantity:
              </span>
              <div className="flex items-center border border-slate-300 rounded text-xs font-semibold">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-slate-900 min-w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-500">
                {product.stock} pairs left in stock
              </span>
            </div>

            {/* Purchasing Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex gap-2">
                <button
                  id="add-to-bag-primary-btn"
                  onClick={handleAddToBag}
                  className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add to Bag • £{(product.price * quantity).toFixed(2)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded border transition-colors cursor-pointer ${
                    inWishlist 
                      ? 'bg-rose-50 border-rose-300 text-rose-600' 
                      : 'border-slate-300 text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                id="buy-it-now-btn"
                onClick={handleBuyItNow}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded transition-colors shadow-xs cursor-pointer"
              >
                Buy It Now
              </button>
            </div>

            {/* Store Pickup & UK Reassurance Info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 text-slate-700">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Free Click & Collect:</strong> Pick up today at 30 Camberwell Church St, London SE5.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Fast UK Delivery:</strong> Free on orders over £75 (Royal Mail Tracked).
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>30-Day UK Returns:</strong> In-store or via Royal Mail postage.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Authentic Quality Guaranteed:</strong> Verified British retailer.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT TABS (Description, Size & Fit, Delivery & Returns, Reviews) */}
      <div className="border-t border-slate-200 pt-10">
        <div className="flex border-b border-slate-200 gap-6 overflow-x-auto pb-0">
          {[
            { id: 'description', label: 'Product Description' },
            { id: 'size-fit', label: 'Size & Fit Advice' },
            { id: 'delivery', label: 'Delivery & Returns' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-serif font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-slate-950 text-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs pt-2">
                Key Features & Construction:
              </h4>
              <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-600">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
                <li><strong>Upper Material:</strong> {product.material}</li>
                <li><strong>Outsole:</strong> {product.sole}</li>
                <li><strong>Fastening:</strong> {product.closure}</li>
              </ul>
            </div>
          )}

          {activeTab === 'size-fit' && (
            <div className="space-y-4">
              <p>
                This style is crafted according to standard British sizing. If your child or you typically fall between sizes, we recommend selecting the larger size to allow room for growth or thicker winter socks.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-900 text-xs">
                <strong>Fitting in Camberwell:</strong> You can visit our shop at 30 Camberwell Church St for complimentary foot measurement and width checks by our team.
              </div>
              <button
                onClick={() => setCurrentView('size-guide')}
                className="text-amber-800 underline font-semibold text-xs"
              >
                View our full adult and junior UK size comparison chart →
              </button>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-950">UK Shipping Options:</h4>
              <ul className="space-y-2 text-xs">
                <li>• <strong>Standard UK Delivery (2-4 Working Days):</strong> £3.99 (FREE on orders over £75)</li>
                <li>• <strong>Express UK Tracked (1-2 Working Days):</strong> £5.99</li>
                <li>• <strong>Click & Collect (Camberwell Store):</strong> FREE — usually ready within 2 hours during store opening times</li>
              </ul>
              <h4 className="font-bold text-slate-950 pt-2">30-Day Returns Policy:</h4>
              <p className="text-xs text-slate-600">
                Shoes must be in unworn condition with original packaging. Return by post or bring them into our Camberwell store with your order confirmation.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-center pr-4 border-r border-slate-200">
                  <div className="text-2xl font-serif font-bold text-slate-950">{product.rating}</div>
                  <div className="flex text-amber-400 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{product.reviewCount} reviews</div>
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">Rated Excellent by Local Camberwell Customers</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Verified buyers praise durability, comfortable fit, and reasonable UK prices.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* YOU MAY ALSO LIKE (4 Related Products) */}
      <div className="pt-8 border-t border-slate-200">
        <h3 className="font-serif text-2xl font-bold text-slate-950 mb-6">
          You May Also Like
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
