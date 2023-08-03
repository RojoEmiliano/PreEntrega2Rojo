import React, { createContext, useState, useContext } from 'react';


export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);



export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (pokemon, quantity) => {
    setCartItems([...cartItems, { pokemon, quantity }]);
    console.log('Agregado al carrito:', pokemon);
    console.log('Cantidad:', quantity);
  
    const updatedCount = cartCount + quantity;
    const updatedTotalPrice = totalPrice + pokemon.Precio * quantity;
  
    setCartCount(updatedCount);
    setTotalPrice(updatedTotalPrice);
  };
  
  const finalPrice = () => {
    return cartItems.reduce((acc, prod) => acc + item.pokemon.precio * item.quantity, 0)
}

  const resetCart = () => {
    setCartItems([]);
    setCartCount(0);
    setTotalPrice(0);
    localStorage.setItem('cartCount', 0);
    localStorage.setItem('totalPrice', 0);
  };

  const removeFromCart = (id) => {
    setCartItems( cartItems.filter((pokemon) => pokemon.id !== id) )
}

  const cartContextValue = {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    resetCart,
    removeFromCart,
    finalPrice,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};


