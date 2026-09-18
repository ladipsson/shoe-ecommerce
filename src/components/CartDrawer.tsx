import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Store,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingRemaining,
    freeShippingProgress,
    storeSettings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const shippingCost = appliedCoupon?.freeShipping || cartSubtotal >= storeSettings.freeShippingThreshold
    ? 0
    : cartSubtotal > 0 ? storeSettings.standardShippingFee : 0;

  const discountAmount = appliedCoupon?.discountPercent
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="font-serif font-bold text-lg text-slate-950">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-950 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>
                  {freeShippingRemaining > 0 ? (
                    <>You're <strong className="text-slate-900">£{freeShippingRemaining.toFixed(2)}</strong> away from <strong>FREE UK Delivery</strong></>
                  ) : (
                    <strong className="text-emerald-700 font-bold">✓ Congratulations! You've unlocked FREE UK Delivery</strong>
                  )}
                </span>
              </div>
              <span className="text-[11px] font-bold text-amber-800">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-amber-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                  Browse our range of school shoes, leather boots, and everyday comfort footwear.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-white transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md bg-slate-50 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                          {item.selectedSize}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded text-xs font-semibold">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-slate-900 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm text-slate-950">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/60 space-y-3">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded border border-emerald-200">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code '{appliedCoupon.code}' applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CAMBERWELL10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 uppercase focus:outline-none focus:border-slate-900"
                    />
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-950 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <div className="text-[11px] text-rose-600 mt-1">{couponError}</div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">£{cartSubtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon?.discountPercent && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Estimated UK Delivery</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      `£${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-base">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Local Click & Collect Note */}
              <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 text-[11px] text-slate-600">
                <Store className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Free Click & Collect available at our Camberwell store.</span>
              </div>

              {/* Primary Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="cart-drawer-checkout-btn"
                  onClick={handleProceedCheckout}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-950 py-1.5 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Secure UK Checkout</span>
                </span>
                <span>•</span>
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
