import React from 'react';
import { useCartContext } from '../CartContext/CartContext';
import { Link, Navigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, resetCart } = useCartContext();


  const handleReset = () => {
    resetCart();
  };



  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay elementos en el carrito</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.pokemon.id}>
                {item.pokemon.Nombre} - Cantidad: {item.quantity}
                <button onClick={() => removeFromCart(item.pokemon.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={handleReset}>Vaciar Carrito</button>
          <div>
            <Link to="/Productos/Checkout"> <button> Finalizar Compra </button>  </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

