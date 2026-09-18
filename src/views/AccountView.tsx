import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  ShoppingBag,
  Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Order, CartItem } from '../types';

export const AccountView: React.FC = () => {
  const { user, orders, products, wishlist, toggleWishlist, addToCart, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Info */}
      <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xl font-serif">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-white">{user.name}</h1>
            <p className="text-xs text-slate-400">{user.email} • {user.phone}</p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="bg-amber-400/20 text-amber-300 font-semibold px-2.5 py-1 rounded border border-amber-400/30">
            A.F Elite Customer Member
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        {[
          { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs sm:text-sm font-serif font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 p-8 space-y-3">
              <Package className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-slate-950">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our school shoes, boots, and everyday collection.
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order: Order) => (
              <div key={order.id} className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 text-xs">
                  <div>
                    <span className="text-slate-400">Order ID: </span>
                    <strong className="font-mono text-slate-950 font-bold">{order.id}</strong>
                    <span className="text-slate-300 mx-2">•</span>
                    <span className="text-slate-500">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : order.status === 'Dispatched'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {order.status === 'Dispatched' ? 'Dispatched via Royal Mail' : order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item: CartItem, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-slate-100 shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-slate-500 text-[11px]">
                          Size: {item.selectedSize} • Colour: {item.selectedColor} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-slate-950">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">Delivery: </span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {order.deliveryMethod === 'collect' ? 'In-store Pickup (Camberwell)' : `${order.deliveryMethod} UK Delivery`}
                    </span>
                    {order.trackingNumber && (
                      <span className="ml-3 font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 mr-2">Total Paid:</span>
                    <strong className="text-base text-slate-950 font-bold">£{order.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. WISHLIST TAB */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 p-8 space-y-3">
              <Heart className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-slate-950">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500">
                Click the heart icon on any shoe to save it to your personal wishlist for later.
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SAVED ADDRESSES TAB */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {user.addresses.map((addr, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-950 text-sm">{addr.fullName}</span>
                {idx === 0 && (
                  <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                    Default Delivery
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {addr.addressLine1}<br />
                {addr.addressLine2 && <>{addr.addressLine2}<br /></>}
                {addr.city}, {addr.postcode}<br />
                {addr.country}
              </p>
              <p className="text-slate-500 font-mono text-[11px] pt-1">
                Phone: {addr.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
