import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './CheckOut.scss'

const Checkout = () => {
  const [values, setValues] = useState({
    Email: '',
    Nombre: '',
    Apellido: '',
    Codigo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guardar los datos en Firebase
      await addDoc(collection(db, "formulario"), values);

      console.log("Datos enviados correctamente a Firebase");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

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
          <button className='Btn' type="submit">Finalizar Compra</button>
        </form>
      </div>
    </div>
  )
};

export default Checkout;
