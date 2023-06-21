import React, { useState } from 'react';
import './Contacto.scss'

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar los datos aquí
    if (nombre && apellido && mail && motivo) {
      // Aquí puedes realizar las acciones adicionales para enviar los datos o realizar otras operaciones
      console.log('Datos enviados correctamente');
      // Resetear los valores del formulario
      setNombre('');
      setApellido('');
      setMail('');
      setMotivo('');
    } else {
      console.log('Por favor, complete todos los campos');
    }
  };

  return (
    <div className='Contacto'>
        <h2>Contacto</h2>
        <hr />
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="mail">Mail:</label>
        <input
          type="email"
          id="mail"
          name="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="motivo">Motivo:</label>
        <textarea
          id="motivo"
          name="motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
    </div>
  );
};

export default Contacto;
