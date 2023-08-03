import './Detalles.scss';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Detalles = () => {
  const { id } = useParams(); // Obtener el ID del Pokémon seleccionado de la ruta
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const pokemonDocRef = doc(db, 'Pokemones', id);
        const pokemonDocSnap = await getDoc(pokemonDocRef);
        if (pokemonDocSnap.exists()) {
          setPokemonData(pokemonDocSnap.data());
          setIsLoading(false);
        } else {
          console.log('No se encontró el Pokémon');
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error al obtener los detalles del Pokémon:', error);
        setIsLoading(false);
      }
    };

    getPokemonDetails();
  }, [id]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!pokemonData) {
    return <p>No se encontró el Pokémon</p>;
  }

  return (
    <div className="DetallesContainer">
      <h2>{pokemonData.Nombre}</h2>
      <p>ID: {id}</p>
      <p>Descripción: {pokemonData.Descripcion}</p>
      <p>Precio: ${pokemonData.Precio}</p>
      <p>Stock: {pokemonData.Stock}</p>
      <img src={pokemonData.Img} alt={pokemonData.Nombre} />
      <Link to="/Productos"> -- Volver a Productos -- </Link>
    </div>
  );
};

export default Detalles;







