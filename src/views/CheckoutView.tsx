import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  Store,
  Printer
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { UKAddress, Order } from '../types';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    storeSettings, 
    placeOrder, 
    setCurrentView,
    user 
  } = useStore();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'collect'>('delivery');
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const [paymentType, setPaymentType] = useState<'card' | 'applepay' | 'paypal'>('card');
  
  // Form fields
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '+44 7912 345678');
  const [fullName, setFullName] = useState(user.name || '');
  const [addressLine1, setAddressLine1] = useState(user.addresses[0]?.addressLine1 || '42 Grove Lane');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState(user.addresses[0]?.city || 'London');
  const [postcode, setPostcode] = useState(user.addresses[0]?.postcode || 'SE5 8ST');
  const [country, setCountry] = useState('United Kingdom');

  // Dummy Card state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('789');

  // Confirmation state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const discountAmount = appliedCoupon?.discountPercent 
    ? (cartSubtotal * appliedCoupon.discountPercent) / 100 
    : 0;

  let shippingCost = 0;
  if (deliveryType === 'collect') {
    shippingCost = 0;
  } else if (appliedCoupon?.freeShipping || cartSubtotal >= storeSettings.freeShippingThreshold) {
    shippingCost = shippingSpeed === 'express' ? 2.00 : 0;
  } else {
    shippingCost = shippingSpeed === 'express' ? storeSettings.expressShippingFee : storeSettings.standardShippingFee;
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shippingAddress: UKAddress = {
      fullName,
      phone,
      addressLine1: deliveryType === 'collect' ? 'Store Pickup: 30 Camberwell Church St' : addressLine1,
      addressLine2,
      city: deliveryType === 'collect' ? 'London' : city,
      postcode: deliveryType === 'collect' ? 'SE5 8QZ' : postcode,
      country: 'United Kingdom'
    };

    const newOrder = placeOrder({
      items: [...cart],
      subtotal: cartSubtotal,
      shippingCost,
      discount: discountAmount,
      total: finalTotal,
      deliveryMethod: deliveryType === 'collect' ? 'collect' : shippingSpeed,
      shippingAddress,
      paymentMethod: paymentType === 'card' ? `Visa / Debit Card ending in ${cardNumber.slice(-4)}` : paymentType === 'applepay' ? 'Apple Pay' : 'PayPal',
    });

    setCompletedOrder(newOrder);
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We have received your order and sent a confirmation email to <strong>{email}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">UK Order Reference:</span>
              <span className="font-bold text-slate-950 font-mono text-sm">{completedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Order Date:</span>
              <span className="font-semibold text-slate-800">{completedOrder.date}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Delivery Option:</span>
              <span className="font-semibold text-slate-800 capitalize">
                {completedOrder.deliveryMethod === 'collect' ? 'Click & Collect (Camberwell Store)' : `${completedOrder.deliveryMethod} UK Delivery`}
              </span>
            </div>
            {completedOrder.trackingNumber && (
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Tracking Reference:</span>
                <span className="font-mono text-amber-800 font-bold">{completedOrder.trackingNumber}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Address / Location:</span>
              <span className="font-semibold text-slate-800 text-right">
                {completedOrder.shippingAddress.fullName}<br />
                {completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.postcode}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-slate-950">
              <span>Paid in GBP (£):</span>
              <span>£{completedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print UK Receipt</span>
            </button>
            <button
              onClick={() => setCurrentView('account')}
              className="px-6 py-2.5 rounded bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider"
            >
              View In My Account
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Return button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Checkout Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-800 font-bold">
                Distraction-Free Checkout
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                Secure UK Checkout
              </h1>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL</span>
            </div>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            
            {/* 1. Contact Information */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                1. Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@example.co.uk"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">UK Telephone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07912 345678"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>
              </div>
            </div>

            {/* 2. Fulfilment Mode (Home Delivery or Click & Collect) */}
            <div className="pt-4 border-t border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                2. Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'border-slate-950 bg-slate-50 ring-1 ring-slate-950'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Truck className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-slate-950">UK Home Delivery</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Royal Mail Tracked (2-4 working days)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('collect')}
                  className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryType === 'collect'
                      ? 'border-slate-950 bg-slate-50 ring-1 ring-slate-950'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Store className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-slate-950 flex items-center gap-1">
                      <span>Click & Collect (FREE)</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">30 Camberwell Church St, London SE5</div>
                  </div>
                </button>
              </div>

              {/* Delivery Speed Selector if Delivery */}
              {deliveryType === 'delivery' && (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 mb-4">
                  <span className="text-xs font-bold text-slate-800 block">Choose Dispatch Speed:</span>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingSpeed === 'standard'}
                        onChange={() => setShippingSpeed('standard')}
                        className="accent-slate-950"
                      />
                      <span>Standard UK Tracked (2-4 days)</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {cartSubtotal >= storeSettings.freeShippingThreshold ? 'FREE' : `£${storeSettings.standardShippingFee}`}
                    </span>
                  </label>

                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer pt-1 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingSpeed === 'express'}
                        onChange={() => setShippingSpeed('express')}
                        className="accent-slate-950"
                      />
                      <span>Express Priority DPD / Royal Mail 24 (1-2 days)</span>
                    </div>
                    <span className="font-bold text-slate-900">£{storeSettings.expressShippingFee}</span>
                  </label>
                </div>
              )}
            </div>

            {/* 3. Address Section (Only needed for home delivery) */}
            {deliveryType === 'delivery' ? (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  3. UK Delivery Address
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="Flat / House number and Street name"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. London"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">UK Postcode *</label>
                    <input
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="e.g. SE5 8QZ"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 uppercase font-mono focus:outline-none focus:border-slate-950"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value={country}
                      className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-2 text-xs text-slate-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Collection Address:</span>
                <p>A.F Elite Shoes, 30 Camberwell Church St, London SE5 8QZ</p>
                <p className="text-[11px] text-amber-800">
                  Please bring photo ID or order confirmation email. Ready in 2 hours during store opening times.
                </p>
              </div>
            )}

            {/* 4. Payment Options */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                4. Payment Method
              </h2>

              <div className="flex gap-2">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Apple Pay / GPay', icon: ShieldCheck },
                  { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentType(pm.id as any)}
                    className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentType === pm.id
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <pm.icon className="w-3.5 h-3.5" />
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              {paymentType === 'card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Security Code (CVV)</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Place Order CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Authorise & Pay £{finalTotal.toFixed(2)}</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                By placing this order you agree to A.F Elite Shoes Terms & Conditions and 30-day return policy.
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-5 sticky top-24">
          <h2 className="font-serif font-bold text-lg text-slate-950 border-b border-slate-200 pb-3">
            Order Summary ({cart.length} items)
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded bg-slate-100 shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 line-clamp-1">{item.name}</div>
                    <div className="text-slate-500 text-[11px]">Size: {item.selectedSize} • Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-slate-950">£{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">£{cartSubtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-£{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>UK Delivery</span>
              <span className="font-semibold text-slate-900">
                {shippingCost === 0 ? <span className="text-emerald-700 font-bold uppercase">Free</span> : `£${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200">
              <span>Total to pay</span>
              <span className="text-lg">£{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="font-semibold text-slate-900">Camberwell Store Customer Guarantee</div>
            <p>Need fitting adjustments? Visit our shop on Camberwell Church St with your order receipt for free exchange or advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
