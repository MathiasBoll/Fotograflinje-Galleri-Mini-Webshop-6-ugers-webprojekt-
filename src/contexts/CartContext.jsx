import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, saveCart, clearCart as clearStorageCart } from '../utils/storage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (photo) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === photo.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === photo.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...photo, quantity: 1 }];
    });
  };

  const removeFromCart = (photoId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== photoId));
  };

  const updateQuantity = (photoId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(photoId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === photoId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    clearStorageCart();
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

