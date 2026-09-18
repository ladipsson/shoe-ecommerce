import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, StoreSettings, CategoryId, UKAddress } from '../types';
import { initialProducts, initialStoreSettings } from '../data/mockProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  currentView: string;
  viewPayload: any;
  setCurrentView: (view: string, payload?: any) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon
  appliedCoupon: { code: string; discountPercent: number; freeShipping: boolean } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders & Checkout
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  resetToDefaultData: () => void;
  
  // User Account
  user: {
    name: string;
    email: string;
    phone: string;
    isLoggedIn: boolean;
    addresses: UKAddress[];
  };
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (name: string, phone: string) => void;
  addAddress: (address: UKAddress) => void;

  // Settings & CMS
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: StoreSettings) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state (persisted so store owner edits persist)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('af_elite_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialProducts;
  });

  // Settings state
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('af_elite_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialStoreSettings;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('af_elite_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('af_elite_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['prod-1', 'prod-2'];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('af_elite_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'AFE-94821',
        date: '14 Sep 2026',
        items: [
          {
            id: 'prod-1-UK 4-Polished Black',
            productId: 'prod-1',
            name: 'Classic Black School Shoes',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
            price: 34.99,
            selectedSize: 'UK 4',
            selectedColor: 'Polished Black',
            quantity: 1,
          }
        ],
        subtotal: 34.99,
        shippingCost: 3.99,
        discount: 0,
        total: 38.98,
        deliveryMethod: 'standard',
        status: 'Dispatched',
        trackingNumber: 'RM492049182GB',
        shippingAddress: {
          fullName: 'Eleanor Vance',
          phone: '+44 7912 345678',
          addressLine1: '42 Grove Lane',
          city: 'London',
          postcode: 'SE5 8ST',
          country: 'United Kingdom'
        },
        paymentMethod: 'Credit/Debit Card (•••• 4242)'
      }
    ];
  });

  // User state
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
    isLoggedIn: boolean;
    addresses: UKAddress[];
  }>(() => {
    const saved = localStorage.getItem('af_elite_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.co.uk',
      phone: '+44 7912 345678',
      isLoggedIn: true,
      addresses: [
        {
          fullName: 'Eleanor Vance',
          phone: '+44 7912 345678',
          addressLine1: '42 Grove Lane',
          city: 'London',
          postcode: 'SE5 8ST',
          country: 'United Kingdom'
        }
      ]
    };
  });

  // UI state
  const [currentView, setCurrentViewState] = useState<string>('home');
  const [viewPayload, setViewPayload] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; freeShipping: boolean } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('af_elite_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('af_elite_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem('af_elite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('af_elite_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('af_elite_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('af_elite_user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const setCurrentView = (view: string, payload?: any) => {
    setCurrentViewState(view);
    setViewPayload(payload || null);
    if (view === 'product-detail' && payload) {
      setSelectedProduct(payload);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number = 1) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const colorObj = product.colors.find((c) => c.colorName === selectedColor);
      const chosenImage = colorObj?.image || product.images[0];
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          image: chosenImage,
          price: product.price,
          originalPrice: product.originalPrice,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });
    showToast(`Added ${product.name} (${selectedSize}) to your bag`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, storeSettings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / storeSettings.freeShippingThreshold) * 100);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CAMBERWELL10') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10, freeShipping: false });
      showToast('10% discount applied!');
      return { success: true, message: '10% discount applied successfully!' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 0, freeShipping: true });
      showToast('Free UK shipping applied!');
      return { success: true, message: 'Free shipping coupon applied!' };
    }
    if (cleanCode === 'SCHOOL20') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 15, freeShipping: false });
      showToast('15% Back to School discount applied!');
      return { success: true, message: '15% Back to School promotion applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try CAMBERWELL10 or FREESHIP.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed');
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `AFE-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: orderData.deliveryMethod === 'collect' ? 'Ready for Collection' : 'Processing',
      trackingNumber: orderData.deliveryMethod === 'collect' ? undefined : `RM${Math.floor(100000000 + Math.random() * 900000000)}GB`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  // User
  const loginUser = (email: string, name?: string) => {
    setUser({
      name: name || email.split('@')[0] || 'Valued Customer',
      email,
      phone: user.phone || '+44 7900 000000',
      isLoggedIn: true,
      addresses: user.addresses.length > 0 ? user.addresses : [
        {
          fullName: name || 'Valued Customer',
          phone: '+44 7900 000000',
          addressLine1: '12 Church Street',
          city: 'London',
          postcode: 'SE5 8TR',
          country: 'United Kingdom'
        }
      ]
    });
    showToast(`Welcome back, ${name || email}!`);
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('You have signed out');
  };

  const updateUserProfile = (name: string, phone: string) => {
    setUser((prev) => ({ ...prev, name, phone }));
    showToast('Profile details updated');
  };

  const addAddress = (address: UKAddress) => {
    setUser((prev) => ({ ...prev, addresses: [...prev.addresses, address] }));
    showToast('New UK address added');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order ${orderId} marked as ${status}`);
  };

  const resetToDefaultData = () => {
    localStorage.removeItem('af_elite_products');
    localStorage.removeItem('af_elite_settings');
    localStorage.removeItem('af_elite_cart');
    localStorage.removeItem('af_elite_wishlist');
    localStorage.removeItem('af_elite_orders');
    setProducts(initialProducts);
    setStoreSettings(initialStoreSettings);
    setCart([]);
    setWishlist(['prod-1', 'prod-2']);
    showToast('Catalog and store settings reset to defaults');
  };

  // CMS
  const updateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    showToast('Store settings saved');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated`);
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New product "${newProduct.name}" added`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        currentView,
        viewPayload,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingRemaining,
        freeShippingProgress,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        updateOrderStatus,
        resetToDefaultData,
        user,
        loginUser,
        logoutUser,
        updateUserProfile,
        addAddress,
        storeSettings,
        updateStoreSettings,
        updateProduct,
        addProduct,
        deleteProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
