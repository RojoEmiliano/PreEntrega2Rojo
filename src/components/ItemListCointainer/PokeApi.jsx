import './PokeApi.scss';
import React, { useEffect, useState } from 'react';
import Carrito from '../Carrito/Carrito';
import { FaShoppingCart, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const handleReset = () => {
    setResetClicked(true);
    setCartCount(0);
    setTotalPrice(0);
    // Borrar la data del localStorage
    localStorage.setItem('cartCount', 0);
    localStorage.setItem('totalPrice', 0);
  };

  const handleDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCarrito = (pokemon, quantity) => {
    console.log('Adding to cart:', pokemon.Nombre);
    console.log('Quantity:', quantity);

    const updatedCount = cartCount + quantity;
    const updatedTotalPrice = totalPrice + (pokemon.Precio * quantity);

    // Guardar en el localStorage
    localStorage.setItem('cartCount', updatedCount);
    localStorage.setItem('totalPrice', updatedTotalPrice);

    setCartCount(updatedCount);
    setTotalPrice(updatedTotalPrice);
  };

  useEffect(() => {
    const prodRef = collection(db, "Pokemones");

    getDocs(prodRef)
      .then((resp) => {
        const items = resp.docs.map((doc) => doc.data());
        setPokemonData(items); // Guardar los datos obtenidos en el estado
        setIsLoading(false); // Cambiar el estado de carga a false cuando se obtengan los datos
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false); // Cambiar el estado de carga a false si ocurre un error
      });
  }, []);

  return (
    <div className='List'>
      <h1 className='ListContainer'>Lista de Pokémon</h1>
      <hr />
      <div className='CarritoInfo'>
        <p className='CarritoItem'><FaShoppingCart />:{localStorage.getItem('cartCount')} </p>
        <p className='CarritoItem'><FaDollarSign />: {localStorage.getItem('totalPrice')}</p>
      </div>
      <div className='CarritoInfo'>
        <button onClick={handleReset}> <FaTrashAlt /> </button>
      </div>
      <div className='CarritoInfo'>
        <button className='checkOut'> <Link to="/Productos/FinalizarCompra">Finalizar compra</Link></button>
      </div>
      {isLoading ? (
        <p className=''>Cargando...</p> // Mensaje de carga mientras se obtienen los datos
      ) : (
        <div className='ListItems'>
          {pokemonData.map((pokemon, index) => (
            <div className='ListaPokemones' key={index}>
              <h4 className='Nombre'>{pokemon.Nombre}</h4>
              <p className='Precio'>Precio: {pokemon.Precio}</p>
              
              <img className='Img' src={pokemon.Img} alt={pokemon.name} />
              <Carrito className='AgregarCarrito' pokemon={pokemon} onAddToCart={handleCarrito} />
              <Link className='Precio' to="/Productos/Detalles" onClick={() => handleDetails(pokemon)}>Detalles</Link>
            </div>
          ))}
          {selectedPokemon && (
            <div className="DetallesPokemon">
              <h2>Detalles de {selectedPokemon.name}</h2>
              <p></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
