import React from 'react';
import { MapPin, Star, ShieldCheck, Heart, Users, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
          Our Heritage & Story
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight">
          Crafting Trust on Camberwell High Street
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          A.F Elite Shoes was established with a simple, genuine mission: to provide families across South London and the UK with footwear that combines craftsmanship, lasting comfort, and accessible pricing.
        </p>
      </div>

      {/* Hero Banner with Store Imagery */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[380px] flex items-end">
        <img
          src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=1600&q=80"
          alt="A.F Elite Shoes Camberwell shopfront"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="relative z-10 p-8 sm:p-12 max-w-2xl bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
          <div className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>30 Camberwell Church St, London SE5 8QZ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            A Friendly Independent Footwear Retailer
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In an era of impersonal giant online warehouses, we cherish the traditional art of in-person fitting, genuine customer care, and selecting shoes built to last through English rain and school playgrounds.
          </p>
        </div>
      </div>

      {/* 4 Pillars of A.F Elite Shoes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <Heart className="w-8 h-8 text-amber-700 mb-3" />
          <h3 className="font-serif font-bold text-base text-slate-950 mb-1">
            Comfort That Lasts
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every shoe in our shop is assessed for cushioned footbeds, supportive arches, and blister-free leather collars.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <ShieldCheck className="w-8 h-8 text-amber-700 mb-3" />
          <h3 className="font-serif font-bold text-base text-slate-950 mb-1">
            School Uniform Ready
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We are Camberwell's go-to destination for durable, scuff-resistant school shoes that adhere strictly to strict school dress codes.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <Star className="w-8 h-8 text-amber-700 mb-3" />
          <h3 className="font-serif font-bold text-base text-slate-950 mb-1">
            4.9★ Google Reputation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rated 4.9/5 by 11 Google reviewers who praise our patient service, wide choice of UK sizes, and fair pricing.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <Users className="w-8 h-8 text-amber-700 mb-3" />
          <h3 className="font-serif font-bold text-base text-slate-950 mb-1">
            Community First
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We believe in honest advice and fair prices for local parents, workers, and families across South East London.
          </p>
        </div>
      </div>

      {/* Story Text Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">
            The Camberwell Community
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
            More Than Just a Shoe Store
          </h2>
          <p>
            Camberwell Church Street has always been a bustling hub of diverse culture, independent businesses, and community spirit. When we opened our doors at number 30, our vision was to create a warm and welcoming space where parents wouldn't feel stressed shopping for back-to-school shoes, and where anyone could find quality leather footwear without an exorbitant price tag.
          </p>
          <p>
            Whether you pop in during lunch for shoe advice, bring your children in for our friendly measure-and-fit service, or order online for delivery anywhere in the UK, you receive the exact same standard of heartfelt British customer care.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('contact')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:text-amber-800"
            >
              <span>Get in touch with our team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
            alt="Handmade quality shoes"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
