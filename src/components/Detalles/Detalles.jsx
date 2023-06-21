import './Detalles.scss'
import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

const Detalles = () => {
  const gifUrl = 'https://media.giphy.com/media/fSvqyvXn1M3btN8sDh/giphy.gif';

  return (
    <div className='DetallesContainer'>
      <h1 >Detalles</h1>
      <h2>No hay detalles, era un chiste. </h2>
      <img src={gifUrl} alt="Gif" />
      <Link to='/Productos'> -- Volver a Productos -- </Link>
    </div>
  );
};

export default Detalles;









