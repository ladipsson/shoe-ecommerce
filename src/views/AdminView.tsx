import React, { useState } from 'react';
import { 
  Settings, 
  Package, 
  ShoppingBag, 
  Truck, 
  Store, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Clock, 
  RotateCcw,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, CartItem } from '../types';

export const AdminView: React.FC = () => {
  const { 
    storeSettings, 
    updateStoreSettings, 
    products, 
    orders, 
    user, 
    updateOrderStatus, 
    showToast,
    resetToDefaultData,
    setCurrentView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'orders'>('general');

  // Form states for settings
  const [announcementText, setAnnouncementText] = useState(storeSettings.announcementText);
  const [storePhone, setStorePhone] = useState(storeSettings.storePhone);
  const [storeEmail, setStoreEmail] = useState(storeSettings.storeEmail);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(storeSettings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(storeSettings.standardShippingFee);
  const [expressShippingFee, setExpressShippingFee] = useState(storeSettings.expressShippingFee);
  const [weekdayHours, setWeekdayHours] = useState(storeSettings.openingHoursWeekday);
  const [sundayHours, setSundayHours] = useState(storeSettings.openingHoursSunday);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      ...storeSettings,
      announcementText,
      storePhone,
      storeEmail,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      expressShippingFee: Number(expressShippingFee),
      openingHoursWeekday: weekdayHours,
      openingHoursSunday: sundayHours
    });
    showToast('Store settings updated successfully');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Store Owner Portal</span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-white">
            A.F Elite Shoes Management
          </h1>
          <p className="text-xs text-slate-400">
            Control Camberwell store settings, announcement text, inventory, and order dispatch.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('shop')}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
          >
            Live Shop Preview
          </button>
          <button
            onClick={() => {
              if (confirm('Reset store catalog and settings to initial defaults?')) {
                resetToDefaultData();
              }
            }}
            className="px-3 py-1.5 rounded bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800 text-xs font-medium flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        {[
          { id: 'general', label: 'Store Info & Delivery Fees', icon: Store },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: Package },
          { id: 'inventory', label: `Product Inventory (${products.length})`, icon: ShoppingBag },
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

      {/* TAB 1: GENERAL SETTINGS */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6 text-xs">
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-950 mb-1">
              Top Announcement Banner
            </h2>
            <p className="text-slate-500 mb-3">Visible across the top header on every page.</p>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950 focus:outline-none focus:border-slate-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Store Telephone (UK)</label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Store Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Free Delivery Threshold (£)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Standard Delivery Fee (£)</label>
              <input
                type="number"
                step="0.01"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Express Priority Fee (£)</label>
              <input
                type="number"
                step="0.01"
                value={expressShippingFee}
                onChange={(e) => setExpressShippingFee(Number(e.target.value))}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Weekday Opening Hours</label>
              <input
                type="text"
                value={weekdayHours}
                onChange={(e) => setWeekdayHours(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Sunday Opening Hours</label>
              <input
                type="text"
                value={sundayHours}
                onChange={(e) => setSundayHours(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-950"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
            <span className="font-semibold text-slate-800">
              Total Customer Orders: <strong>{orders.length}</strong>
            </span>
            <span className="text-slate-500">Live order status can be toggled by store team</span>
          </div>

          {orders.map((order: Order) => (
            <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <strong className="font-mono text-slate-950 text-sm">{order.id}</strong>
                  <span className="text-slate-500 ml-2">({order.date})</span>
                </div>
                
                {/* Status Toggle Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Dispatch Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-bold text-slate-950 focus:outline-none"
                  >
                    <option value="Processing">Processing / In Preparation</option>
                    <option value="Dispatched">Dispatched via Royal Mail</option>
                    <option value="Ready for Collection">Ready for Collection</option>
                    <option value="Delivered">Delivered / Collected</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-500 font-semibold mb-1">Customer & Delivery:</div>
                  <div className="text-slate-800">
                    <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.phone})<br />
                    {order.shippingAddress.addressLine1}, {order.shippingAddress.postcode}
                  </div>
                  <div className="text-slate-500 mt-1">
                    Method: <span className="font-semibold capitalize text-slate-950">{order.deliveryMethod}</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-semibold mb-1">Purchased Styles:</div>
                  {order.items.map((it: CartItem, i: number) => (
                    <div key={i} className="text-slate-800">
                      • {it.name} ({it.selectedSize}) x{it.quantity} — £{(it.price * it.quantity).toFixed(2)}
                    </div>
                  ))}
                  <div className="mt-1 font-bold text-slate-950">
                    Total: £{order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-900">Footwear Catalog ({products.length} Styles)</span>
            <span className="text-slate-500 text-[11px]">All styles available for Camberwell in-store fitting</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Style</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Price</th>
                  <th className="py-2.5 px-4">Stock</th>
                  <th className="py-2.5 px-4">School Pick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 flex items-center gap-2.5">
                      <img src={p.images[0]} alt="" className="w-9 h-9 rounded object-cover bg-slate-100 shrink-0" />
                      <span className="font-semibold text-slate-950">{p.name}</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 capitalize">{p.category}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-950">£{p.price.toFixed(2)}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {p.isSchoolPick ? '✓ Yes' : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
