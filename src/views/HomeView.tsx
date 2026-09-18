import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Smile, 
  Layers, 
  Tag, 
  Instagram,
  Navigation,
  ExternalLink,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { initialReviews, instagramFeed } from '../data/mockProducts';

export const HomeView: React.FC = () => {
  const { products, setCurrentView, storeSettings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Featured 8 products
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  if (featuredProducts.length < 8) {
    const extra = products.filter(p => !p.isFeatured).slice(0, 8 - featuredProducts.length);
    featuredProducts.push(...extra);
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for a 10% welcome voucher.');
  };

  const categories = [
    {
      id: 'school',
      title: 'School Shoes',
      desc: 'Smart, durable and comfortable shoes for school.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestselling Range',
      view: 'school'
    },
    {
      id: 'women',
      title: "Women's Shoes",
      desc: 'Everyday styles designed for comfort and confidence.',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      badge: 'New Season',
      view: 'women'
    },
    {
      id: 'men',
      title: "Men's Shoes",
      desc: 'From smart occasions to everyday essentials.',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      badge: 'Classic Heritage',
      view: 'men'
    },
    {
      id: 'kids',
      title: "Kids' Shoes",
      desc: 'Comfortable, practical footwear for growing feet.',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
      badge: 'All Sizes',
      view: 'kids'
    },
    {
      id: 'boots',
      title: 'Boots',
      desc: 'Chelsea boots, casual boots and more.',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      badge: 'Autumn & Winter',
      view: 'boots'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative bg-slate-950 text-white overflow-hidden">
        {/* Background lifestyle image with subtle gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=2000&q=85"
            alt="British footwear lifestyle in London"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl space-y-6">
            {/* Location & Google Rating indicators */}
            <div className="inline-flex flex-wrap items-center gap-3 text-xs tracking-wide bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-slate-200">
              <span className="flex items-center gap-1.5 font-medium text-amber-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Camberwell, London SE5</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 font-semibold text-white">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9★ Rated by Local Customers</span>
              </span>
            </div>

            {/* Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Step Into Something <span className="italic font-normal text-amber-300">Exceptional</span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Quality footwear for school, work and everyday life — with great styles, comfortable fits and prices you'll love.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-shop-collection-btn"
                onClick={() => setCurrentView('shop')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-visit-store-btn"
                onClick={() => setCurrentView('store-locator')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider px-7 py-4 rounded border border-white/25 transition-all backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Visit Our Store</span>
              </button>
            </div>

            {/* Subtle store reassurance */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free UK Delivery Over £75</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Click & Collect In-Store</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>30-Day Hassle-Free Returns</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
              Curated Footwear
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
              Find Your Perfect Pair
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-amber-800 flex items-center gap-1.5 mt-3 sm:mt-0 transition-colors"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setCurrentView(cat.view)}
              className="group relative rounded-lg overflow-hidden border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                  {cat.badge}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-950 group-hover:text-amber-800 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-slate-950 group-hover:text-amber-800 transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SCHOOL SHOES FEATURE SECTION (Split Layout) */}
      <section id="school-feature-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Photo */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
                alt="Children in smart school uniform shoes ready for school"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded text-xs text-amber-300 font-semibold border border-amber-400/20">
                School Term Uniform Approved
              </div>
            </div>

            {/* Right Copy & Features */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
                Specialist School Footwear
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Back to School Starts With the Right Shoes
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
                Keep little feet comfortable and ready for the school day with our collection of smart, durable school shoes designed for everyday wear.
              </p>

              {/* 5 Feature bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'Comfortable fits with all-day arch support',
                  'Durable scuff-resistant leather designs',
                  'Smart school-ready styles (lace & velcro)',
                  'Multiple UK sizes available (Junior 8 - Adult 8)',
                  'Great value with transparent pricing'
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setCurrentView('school')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded transition-all shadow-md cursor-pointer"
                >
                  Shop School Shoes
                </button>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="text-xs text-amber-300 hover:text-white font-medium hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Need help finding the right size? Contact us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Customer Favourites) */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
            Hand-Picked Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 mb-3">
            Customer Favourites
          </h2>
          <p className="text-sm text-slate-600">
            Popular styles chosen for comfort, quality and everyday wear.
          </p>
        </div>

        {/* 8 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded transition-colors"
          >
            <span>Explore All Footwear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER */}
      <section id="promo-banner-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white">
          <img
            src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1800&q=80"
            alt="Quality leather boots crafted for British weather"
            className="w-full h-80 sm:h-96 object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent flex items-center">
            <div className="max-w-xl p-8 sm:p-14 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                The A.F Elite Promise
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Quality Shoes. Great Prices.
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                Discover footwear for the whole family, available online and in our Camberwell store.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded transition-all shadow-md"
                >
                  Explore The Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY SHOP WITH A.F ELITE SHOES? (4 Columns) */}
      <section id="why-choose-us-section" className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
              Trusted Footwear Retailer
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-950">
              Why Shop With A.F Elite Shoes?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Comfortable Choices */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-950 mb-2">
                Comfortable Choices
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Footwear selected with everyday comfort in mind, including cushioned footbeds and blister-free linings.
              </p>
            </div>

            {/* Col 2: Great Value */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-950 mb-2">
                Great Value
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quality styles at competitive prices — making durable family footwear accessible and affordable.
              </p>
            </div>

            {/* Col 3: Wide Selection */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-950 mb-2">
                Wide Selection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore footwear for school, work, occasions and everyday life, with an extensive variety of UK sizes.
              </p>
            </div>

            {/* Col 4: Friendly Service */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700 mb-4">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-950 mb-2">
                Friendly Service
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Helpful, personal service online and in-store from a family-friendly team genuinely invested in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCAL STORE SECTION (Camberwell physical shop) */}
      <section id="local-store-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Info Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
                  Our Brick-and-Mortar Shop
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                  Visit Us in Camberwell
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-8">
                  Prefer to try before you buy? Visit our store on Camberwell Church Street and explore our collection in person. Our friendly team is always happy to help you find the right pair.
                </p>

                {/* NAP Card */}
                <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-white text-base">
                        A.F Elite Shoes
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                        30 Camberwell Church St, London SE5 8QZ<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80 text-xs sm:text-sm">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-300">Telephone:</span>
                    <a 
                      href={`tel:${storeSettings.storePhone}`}
                      className="font-bold text-white hover:text-amber-300"
                    >
                      {storeSettings.storePhone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Mon - Sat: 9:30am - 6:00pm | Sun: 11:00am - 4:00pm</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=30+Camberwell+Church+St,+London+SE5+8QZ"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition-colors shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={`tel:${storeSettings.storePhone}`}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center gap-2 transition-colors border border-slate-700"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for in-person shoe fittings and free local Click & Collect</span>
              </div>
            </div>

            {/* Interactive Map Embed */}
            <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full bg-slate-950">
              <iframe
                title="A.F Elite Shoes Camberwell Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.4414981146313!2d-0.0903823229988165!3d51.46840741421448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876046e7e0bc275%3A0xebc95fa4ef9b222a!2s30%20Camberwell%20Church%20St%2C%20London%20SE5%208QZ%2C%20UK!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
                className="w-full h-full min-h-[350px] lg:min-h-[460px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (4.9★ from 11 Google Reviews) */}
      <section id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xl font-bold text-slate-950">4.9 ★</span>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                11 Google Reviews
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-slate-950">
              Loved by Our Customers
            </h2>
          </div>

          <a
            href="https://www.google.com/search?q=A.F+Elite+Shoes+30+Camberwell+Church+St+London"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 mt-4 md:mt-0 transition-colors"
          >
            <span>View All Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {rev.source} Review
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-slate-950 mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">{rev.author}</span>
                <span className="text-slate-400 text-[11px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM / SOCIAL SECTION */}
      <section id="instagram-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-widest mb-1">
            <Instagram className="w-4 h-4" />
            <span>@af_eliteshoes</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-950 mb-2">
            Step Into Our World
          </h2>
          <p className="text-xs text-slate-500">
            Follow our daily shop updates, new footwear arrivals, and Camberwell community moments.
          </p>
        </div>

        {/* 6-Image Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramFeed.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer shadow-xs"
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-[11px]">
                <p className="line-clamp-3 leading-snug">{item.caption}</p>
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-800 py-2.5 px-5 rounded-full border border-slate-300 hover:border-amber-500 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Us On Instagram</span>
          </a>
        </div>
      </section>

      {/* 10. NEWSLETTER SECTION */}
      <section id="newsletter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-2xl p-8 sm:p-12 lg:p-16 border border-slate-200">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">
              Exclusive Footwear Updates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              Stay In The Loop
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Be the first to hear about new arrivals, special offers, school shoe fitting days and seasonal collections.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 font-medium text-xs sm:text-sm">
                ✓ You're signed up! Use promo code <strong>CAMBERWELL10</strong> for 10% off your first order.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white border border-slate-300 rounded px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950"
                  />
                  <button
                    type="submit"
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded transition-colors shadow-sm cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">
                  We respect your privacy under UK GDPR regulations. Unsubscribe at any time. View our <button type="button" onClick={() => setCurrentView('privacy')} className="underline hover:text-slate-800">Privacy Policy</button>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
