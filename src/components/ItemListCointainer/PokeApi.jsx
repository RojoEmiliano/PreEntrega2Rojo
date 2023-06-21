import './PokeApi.scss'
import React, { useEffect, useState } from 'react';
import Carrito from '../Carrito/Carrito'
import { FaShoppingCart, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleReset = () => {
    setResetClicked(true);
    setCartCount(0);
    setTotalPrice(0);
  };

  const handleDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
  };
  
  
const handleCarrito = (pokemon, quantity) => {
  console.log('Adding to cart:', pokemon.name);
  console.log('Quantity:', quantity);
  
  const updatedCount = cartCount + quantity;
  const updatedTotalPrice = totalPrice + (pokemon.price * quantity);
  
  setCartCount(updatedCount);
  setTotalPrice(updatedTotalPrice);
};


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => {
        const modifiedData = data.results.map((pokemon, index) => ({
          ...pokemon,
          price: Math.floor(Math.random() * 100) + 1 // Generar un precio aleatorio entre 1 y 100
        }));
        setPokemonData(modifiedData);
      })
      .catch(error => console.log(error));
  }, []);
  

  return (
    <div className='List'>
        <h1 className='ListContainer'>Pokémon List</h1>
        <hr />
        <div className='CarritoInfo'>
          <p className='CarritoItem'><FaShoppingCart />: {cartCount}</p>
          <p className='CarritoItem'><FaDollarSign/>: {totalPrice}</p>
        </div>
        <div className='CarritoInfo'>
        <button onClick={handleReset}> <FaTrashAlt/>   </button>
        </div>
      <div className='ListItems'>
        {pokemonData.map((pokemon, index) => (
          <div className='ListaPokemones' key={pokemon.name}>
            <h4 className='Nombre'>{pokemon.name}</h4>
            <p className='Precio'>Price: {pokemon.price}</p>
            <img className='Img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
            <Carrito pokemon={pokemon} onAddToCart={handleCarrito} />
            <Link className='Precio' to="/Productos/Detalles">Detalles</Link>
          </div>
        ))}
      {selectedPokemon && (
  <div className="DetallesPokemon">
    <h2>Detalles de {selectedPokemon.name}</h2>
    <p></p>
  </div>
)}

      </div>
    </div>
  );
};

export default PokemonList;

