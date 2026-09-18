import React, { useState } from 'react';
import { Ruler, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideView: React.FC = () => {
  const { setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<'kids' | 'women' | 'men'>('kids');

  const kidsSizes = [
    { uk: 'UK 8 (Junior)', eu: 'EU 25', us: 'US 8.5', cm: '15.5 cm', inches: '6.1"' },
    { uk: 'UK 9 (Junior)', eu: 'EU 27', us: 'US 9.5', cm: '16.5 cm', inches: '6.5"' },
    { uk: 'UK 10 (Junior)', eu: 'EU 28', us: 'US 10.5', cm: '17.3 cm', inches: '6.8"' },
    { uk: 'UK 11 (Junior)', eu: 'EU 29', us: 'US 11.5', cm: '18.1 cm', inches: '7.1"' },
    { uk: 'UK 12 (Junior)', eu: 'EU 31', us: 'US 12.5', cm: '19.0 cm', inches: '7.5"' },
    { uk: 'UK 13 (Junior)', eu: 'EU 32', us: 'US 13.5', cm: '19.8 cm', inches: '7.8"' },
    { uk: 'UK 1 (Senior)', eu: 'EU 33', us: 'US 1.5', cm: '20.6 cm', inches: '8.1"' },
    { uk: 'UK 2 (Senior)', eu: 'EU 34', us: 'US 2.5', cm: '21.5 cm', inches: '8.5"' },
    { uk: 'UK 3 (Senior)', eu: 'EU 36', us: 'US 3.5', cm: '22.3 cm', inches: '8.8"' },
    { uk: 'UK 4 (Senior)', eu: 'EU 37', us: 'US 4.5', cm: '23.1 cm', inches: '9.1"' },
    { uk: 'UK 5 (Senior)', eu: 'EU 38', us: 'US 5.5', cm: '24.0 cm', inches: '9.4"' },
  ];

  const womenSizes = [
    { uk: 'UK 3', eu: 'EU 36', us: 'US 5.5', cm: '22.0 cm', inches: '8.7"' },
    { uk: 'UK 4', eu: 'EU 37', us: 'US 6.5', cm: '22.9 cm', inches: '9.0"' },
    { uk: 'UK 5', eu: 'EU 38', us: 'US 7.5', cm: '23.7 cm', inches: '9.3"' },
    { uk: 'UK 6', eu: 'EU 39', us: 'US 8.5', cm: '24.6 cm', inches: '9.7"' },
    { uk: 'UK 7', eu: 'EU 41', us: 'US 9.5', cm: '25.4 cm', inches: '10.0"' },
    { uk: 'UK 8', eu: 'EU 42', us: 'US 10.5', cm: '26.2 cm', inches: '10.3"' },
  ];

  const menSizes = [
    { uk: 'UK 6', eu: 'EU 40', us: 'US 7', cm: '25.0 cm', inches: '9.8"' },
    { uk: 'UK 7', eu: 'EU 41', us: 'US 8', cm: '25.5 cm', inches: '10.0"' },
    { uk: 'UK 8', eu: 'EU 42', us: 'US 9', cm: '26.5 cm', inches: '10.4"' },
    { uk: 'UK 9', eu: 'EU 43', us: 'US 10', cm: '27.5 cm', inches: '10.8"' },
    { uk: 'UK 10', eu: 'EU 44', us: 'US 11', cm: '28.5 cm', inches: '11.2"' },
    { uk: 'UK 11', eu: 'EU 45', us: 'US 12', cm: '29.5 cm', inches: '11.6"' },
    { uk: 'UK 12', eu: 'EU 46', us: 'US 13', cm: '30.5 cm', inches: '12.0"' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-bold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <Ruler className="w-3.5 h-3.5" />
          <span>Accurate UK Sizing</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
          UK Footwear Size & Fitting Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Finding the right fit is crucial for growing children's feet and everyday comfort. Use our conversion charts below or drop by our Camberwell store for complimentary fitting.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-slate-200 gap-4">
        {[
          { id: 'kids', label: "Children & School Shoes" },
          { id: 'women', label: "Women's Footwear" },
          { id: 'men', label: "Men's Footwear" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-sm font-serif font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Size Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">UK Size (Standard)</th>
                <th className="py-3 px-4">European (EU)</th>
                <th className="py-3 px-4">US Equivalent</th>
                <th className="py-3 px-4">Foot Length (CM)</th>
                <th className="py-3 px-4">Foot Length (Inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activeTab === 'kids' ? kidsSizes : activeTab === 'women' ? womenSizes : menSizes).map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="py-3 px-4 font-bold text-slate-950">{row.uk}</td>
                  <td className="py-3 px-4 font-medium text-slate-600">{row.eu}</td>
                  <td className="py-3 px-4 text-slate-500">{row.us}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{row.cm}</td>
                  <td className="py-3 px-4 text-slate-500">{row.inches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Measure at Home */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-6">
        <h2 className="font-serif font-bold text-2xl text-slate-950">
          How to Measure Your Child's Feet at Home
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs">1</span>
            <h3 className="font-bold text-slate-950">Paper on Flat Floor</h3>
            <p className="text-slate-600">Place a sheet of A4 paper on a hard, uncarpeted floor against a straight wall.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs">2</span>
            <h3 className="font-bold text-slate-950">Stand with Socks</h3>
            <p className="text-slate-600">Have your child stand with their heel touching the wall, wearing the socks they wear to school.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs">3</span>
            <h3 className="font-bold text-slate-950">Mark the Longest Toe</h3>
            <p className="text-slate-600">Mark the tip of the longest toe with a pencil held straight. Measure both feet.</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs">4</span>
            <h3 className="font-bold text-slate-950">Add Growing Room</h3>
            <p className="text-slate-600">Add 10mm-12mm (approx half an inch) of wiggle room for growth and natural foot flexing.</p>
          </div>
        </div>

        {/* Camberwell Store In-person invitation */}
        <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-amber-950">
                Prefer In-Person Fitting?
              </h4>
              <p className="text-xs text-amber-800">
                Bring your family to 30 Camberwell Church St. Our staff have measured thousands of school feet and ensure a zero-pressure, perfectly fitted experience.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('contact')}
            className="shrink-0 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-colors"
          >
            Visit Our Shop
          </button>
        </div>
      </div>
    </div>
  );
};
