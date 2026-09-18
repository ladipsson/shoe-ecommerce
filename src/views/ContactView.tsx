import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Bus, Train, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { storeSettings, showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'School Shoes Sizing & Availability',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our Camberwell store team!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
          Get in Touch & Visit
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950 mt-1">
          Contact A.F Elite Shoes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Have a question about shoe sizes, school uniform footwear requirements, or an online order? We're here to help you six days a week in Camberwell.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Contact Information & Travel Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-xl space-y-6">
            <h2 className="font-serif font-bold text-xl text-white border-b border-slate-800 pb-3">
              Store Information
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-semibold text-white">A.F Elite Shoes</strong>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    30 Camberwell Church St<br />
                    London SE5 8QZ<br />
                    United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Telephone:</span>
                  <a href={`tel:${storeSettings.storePhone}`} className="text-white hover:text-amber-300 font-bold text-sm">
                    {storeSettings.storePhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Email:</span>
                  <a href={`mailto:${storeSettings.storeEmail}`} className="text-white hover:text-amber-300 font-medium">
                    {storeSettings.storeEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold mb-1">Opening Hours:</strong>
                  <div className="text-slate-300 space-y-1 text-[11px]">
                    <div>{storeSettings.openingHoursWeekday}</div>
                    <div>{storeSettings.openingHoursSunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Reach Us */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-slate-950">
              How To Find Us in Camberwell
            </h3>
            
            <div className="flex items-start gap-2.5 text-slate-700">
              <Bus className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong>By Bus:</strong> Routes 12, 35, 36, 40, 42, 45, 68, 171, 468, 484 stop just 1-2 minutes walk away at Camberwell Church Street or Camberwell Green.
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-slate-700">
              <Train className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong>By Train / Tube:</strong> Denmark Hill Station (London Overground / Southeastern / Thameslink) is an 8-minute walk. Oval Underground (Northern Line) is a 10-minute bus ride.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact Form & Google Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <h2 className="font-serif font-bold text-xl text-slate-950 mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Our store staff usually reply within 24 hours during working days.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-emerald-800">
                  Thank you, <strong>{formData.name}</strong>. A member of our Camberwell store team will contact you shortly regarding "{formData.subject}".
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold underline text-emerald-950"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.co.uk"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-slate-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 07912 345678"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-slate-950"
                    >
                      <option value="School Shoes Sizing & Availability">School Shoes Sizing & Availability</option>
                      <option value="In-Store Fitting Appointment">In-Store Fitting Appointment</option>
                      <option value="Online Order Tracking">Online Order Tracking</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="General Footwear Question">General Footwear Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what style, size, or service you need help with..."
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-slate-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Map Preview */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs h-72">
            <iframe
              title="A.F Elite Shoes Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.4414981146313!2d-0.0903823229988165!3d51.46840741421448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876046e7e0bc275%3A0xebc95fa4ef9b222a!2s30%20Camberwell%20Church%20St%2C%20London%20SE5%208QZ%2C%20UK!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
