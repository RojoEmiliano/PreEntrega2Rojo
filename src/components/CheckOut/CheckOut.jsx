import React, { useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './CheckOut.scss';
import { useCartContext } from '../CartContext/CartContext';
import { Link, Navigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, resetCart } = useCartContext();
  const { totalPrice } = useCartContext();
  const [orderId, setOrderID] = useState(null)

  const [values, setValues] = useState({
    Email: '',
    Nombre: '',
    Apellido: '',
    Codigo: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar el envío del formulario

  const orden = {
    cliente: values,
    items: cartItems,
    total: totalPrice,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar si el formulario ya ha sido enviado
    if (!formSubmitted) {
      addDoc(collection(db, "orders"), orden)
        .then((doc) => {
          setOrderID(doc.id);
          resetCart()
          setFormSubmitted(true); // Marcar el formulario como enviado

        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  if (orderId) {
    return (
      <div className='FormContainer'>
        <h2 classname="Titulo">Tu compra fue realizada con exito.</h2>
        <hr />
        <h4 className='Subtitulo'>Tu numero de compra es: {orderId} </h4>
        <hr />
        <button className='Btn'><Link to="/">Volver al Inicio</Link></button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return(
      <Navigate to="/"/>
    )
  }

  return (
    <div className='Container'>
      <div className='FormContainer'>
        <h2>¡Ya casi finalizas tu compra!</h2>
        <p>Por favor completa los siguientes campos para poder finalizar la compra.</p>
        <hr />
        <form onSubmit={handleSubmit} className='Form'>
          <input
            value={values.Email}
            onChange={handleInputChange}
            className='formItem'
            type="email"
            name="Email"
            placeholder='Email'
            required
          />
          <input
            value={values.Nombre}
            onChange={handleInputChange}
            className='formItem'
            type="text"
            name="Nombre"
            placeholder='Nombre'
            required
          />
          <input
            value={values.Apellido}
            onChange={handleInputChange}
            className='formItem'
            type="text"
            name="Apellido"
            placeholder='Apellido'
            required
          />
          <input
            value={values.Codigo}
            onChange={handleInputChange}
            className='formItem'
            type="number"
            name="Codigo"
            placeholder='Codigo Postal'
            required
          />
          <button className='Btn' type="submit" disabled={formSubmitted}>
            {formSubmitted ? "Formulario enviado" : "Finalizar Compra"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

