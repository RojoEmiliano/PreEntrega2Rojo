import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';

import './CheckOut.scss';

const Checkout = ({ pokemonData }) => {
  const [formData, setFormData] = useState({
    // Estado inicial del formulario
    // ...
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aquí puedes realizar las acciones finales para procesar la compra
    // Por ejemplo, enviar los datos a la base de datos (Firebase en este caso).
    // Puedes usar el objeto formData para obtener los datos ingresados por el usuario.
    // db.collection('compras').add(formData);

    // Acceder a la base de datos de Firebase para descontar el stock
    try {
      const pokemonesRef = db.collection('Pokemones');

      // Recorremos cada pokémon en el formulario
      for (const pokemonId in formData) {
        if (formData.hasOwnProperty(pokemonId)) {
          // Resto del código para descontar el stock (como se mostró en respuestas anteriores)
        }
      }

      // Limpiar los datos del Local Storage después de finalizar la compra
      localStorage.clear();

      // Mostrar el mensaje de compra finalizada con éxito
      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error al descontar el stock:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>¡Ya casi finalizas tu compra!</h2>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          {/* Resto del formulario */}
          {/* ... */}
          <button type="submit">Finalizar Compra</button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Compra finalizada con éxito!</h3>
          <p>En breve te enviaremos un mail con el número de seguimiento.</p>
          <Link to="/">Volver al inicio</Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;

