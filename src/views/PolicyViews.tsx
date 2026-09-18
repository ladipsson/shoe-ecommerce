import React, { useState } from 'react';
import { 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  MapPin,
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PolicyViewProps {
  initialTab?: 'delivery' | 'returns' | 'faqs' | 'privacy' | 'terms' | 'cookies';
}

export const PolicyViews: React.FC<PolicyViewProps> = ({ initialTab = 'delivery' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const { storeSettings, setCurrentView } = useStore();

  const faqs = [
    {
      q: 'Do you offer in-store foot measurement for children’s school shoes?',
      a: 'Yes! We love welcoming families to our store at 30 Camberwell Church St. Our team will measure both length and width with zero rush or pressure to buy.'
    },
    {
      q: 'How long does UK delivery take and what does it cost?',
      a: 'Standard UK delivery takes 2–4 working days via Royal Mail Tracked. It costs £3.99 or is completely FREE on orders over £75. Express delivery (1–2 days) is available for £5.99.'
    },
    {
      q: 'How does Free Click & Collect in Camberwell work?',
      a: 'Select "Click & Collect" at checkout. We will prepare your footwear at 30 Camberwell Church St, London SE5 8QZ, typically within 2 hours during store hours. We will email you the moment it is ready.'
    },
    {
      q: 'What is your returns policy if the shoes don’t fit?',
      a: 'We offer a 30-day UK returns policy. As long as the shoes are unworn with original tags and box, you can return them via post or drop them in person into our Camberwell shop for an instant refund or size swap.'
    },
    {
      q: 'Are your school shoes compliant with strict UK school uniform policies?',
      a: 'Yes, our school shoe collection features all-black matte and polished leather, plain black soles, and no prominent external logos, making them compliant with local Southwark and wider UK school uniform guidelines.'
    },
    {
      q: 'Do you stock wide-fit school shoes for growing children?',
      a: 'Yes, many of our styles feature broader toe-boxes and adjustable velcro straps specifically designed for wider feet and high insteps.'
    },
    {
      q: 'What payment methods do you accept online and in-store?',
      a: 'We accept all major UK debit and credit cards (Visa, Mastercard, Maestro), Apple Pay, Google Pay, PayPal, and contactless payment in our Camberwell store.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navigation Pills */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-4 pb-0">
        {[
          { id: 'delivery', label: 'Delivery Information', icon: Truck },
          { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
          { id: 'faqs', label: 'Frequently Asked Questions', icon: HelpCircle },
          { id: 'privacy', label: 'Privacy Policy (UK GDPR)', icon: ShieldCheck },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs sm:text-sm font-serif font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
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

      {/* TAB 1: DELIVERY INFORMATION */}
      {activeTab === 'delivery' && (
        <div className="space-y-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
              UK Delivery Information
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              We dispatch orders daily from our South London store to all addresses across England, Wales, Scotland, and Northern Ireland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Most Popular</span>
              <h3 className="font-serif font-bold text-lg text-slate-950">Standard UK Delivery</h3>
              <p className="text-2xl font-bold text-slate-950">£3.99</p>
              <p className="text-xs text-emerald-700 font-semibold">FREE on orders over £75</p>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                Delivered in 2–4 working days via Royal Mail Tracked 48. Full SMS & email tracking updates provided.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Fast Dispatch</span>
              <h3 className="font-serif font-bold text-lg text-slate-950">Express Priority</h3>
              <p className="text-2xl font-bold text-slate-950">£5.99</p>
              <p className="text-xs text-slate-500 font-semibold">Order by 2pm for same-day dispatch</p>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                Delivered in 1–2 working days via DPD or Royal Mail Tracked 24.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-amber-300 shadow-xs space-y-2 bg-amber-50/30">
              <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">Zero Shipping Cost</span>
              <h3 className="font-serif font-bold text-lg text-slate-950">Click & Collect (Camberwell)</h3>
              <p className="text-2xl font-bold text-emerald-700">FREE</p>
              <p className="text-xs text-slate-700 font-semibold">Ready in 2 hours</p>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                Pick up at 30 Camberwell Church St, London SE5 8QZ. Try them on in-store with our assistance!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RETURNS & REFUNDS */}
      {activeTab === 'returns' && (
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
              30-Day Returns & Exchanges
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              We want you to be completely satisfied with your footwear. If the size isn't right or you've changed your mind, our return process is simple.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-4">
            <h3 className="font-bold text-slate-950">Return Conditions:</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Footwear must be returned within 30 days of purchase or delivery.</li>
              <li>Shoes must be completely unworn, unmarked, and in their original shoe box.</li>
              <li>Please try shoes on indoors on a clean, carpeted surface.</li>
            </ul>

            <h3 className="font-bold text-slate-950 pt-2">How to Return:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <strong className="block text-slate-950 mb-1">Option 1: In Our Camberwell Shop (Free)</strong>
                <p className="text-slate-600">
                  Bring the shoes and your order confirmation to 30 Camberwell Church St. We can immediately exchange the size or issue a full refund to your original payment card.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <strong className="block text-slate-950 mb-1">Option 2: Return By Royal Mail Post</strong>
                <p className="text-slate-600">
                  Package the shoe box inside a protective mailing bag and post to: A.F Elite Shoes Returns, 30 Camberwell Church St, London SE5 8QZ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding our Camberwell store, school shoe fittings, delivery, and online orders.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-950 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {isOpen && (
                    <div className="p-4.5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
            UK Privacy & Data Protection Policy
          </h1>
          <p className="text-slate-500 text-[11px]">Last Updated: January 2026 | UK GDPR Compliant</p>
          <p>
            A.F Elite Shoes ("we", "our", or "us"), trading at 30 Camberwell Church St, London SE5 8QZ, is committed to safeguarding your personal data in strict compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>
          <h3 className="font-bold text-slate-950 text-sm pt-2">1. Data We Collect</h3>
          <p>
            When you purchase footwear or contact us, we collect information including your name, delivery address, email, telephone number, and payment details processed securely via encrypted payment gateways.
          </p>
          <h3 className="font-bold text-slate-950 text-sm pt-2">2. How We Use Your Information</h3>
          <p>
            Your information is used strictly to process orders, deliver footwear, provide order tracking, notify you of Click & Collect readiness, and respond to your customer queries. We never sell your personal data to third parties.
          </p>
          <h3 className="font-bold text-slate-950 text-sm pt-2">3. Your Rights Under UK Law</h3>
          <p>
            You have the right to request access to your stored personal data, request corrections, or request deletion of your account. Contact us at contact@afeliteshoes.co.uk.
          </p>
        </div>
      )}

      {/* TAB 5: TERMS & CONDITIONS */}
      {activeTab === 'terms' && (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
            Terms & Conditions of Sale
          </h1>
          <p className="text-slate-500 text-[11px]">Governed by the laws of England and Wales</p>
          <p>
            Welcome to A.F Elite Shoes. By using our website or placing an order with our store, you agree to comply with these terms and our delivery and return policies under the Consumer Rights Act 2015.
          </p>
          <h3 className="font-bold text-slate-950 text-sm pt-2">1. Pricing & Currency</h3>
          <p>
            All prices are stated in British Pounds Sterling (£ GBP) and include UK Value Added Tax (VAT) where applicable.
          </p>
          <h3 className="font-bold text-slate-950 text-sm pt-2">2. Contract Formation</h3>
          <p>
            Your order constitutes an offer to purchase footwear. A binding contract is formed when we dispatch your shoes or confirm they are ready for Click & Collect.
          </p>
        </div>
      )}
    </div>
  );
};
