import React, { useState } from 'react';
import './Carrito.scss'

const Carrito = ({ pokemon, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = event => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(pokemon, quantity);
  };

  return (
    <div >
      <label className='Cantidad'>
        Cantidad:
      </label>
      <input className='Input'
          type="number"
          min="1"
          max="5"
          value={quantity}
          onChange={handleQuantityChange}
        />
      <button onClick={handleAddToCart}>Agregar al Carrito</button>
    </div>
  );
};

export default Carrito;

