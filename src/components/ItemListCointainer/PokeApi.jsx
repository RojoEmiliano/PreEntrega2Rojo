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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para almacenar la categoría seleccionada

  const handleReset = () => {
    setResetClicked(true);
    setCartCount(0);
    setTotalPrice(0);
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

    localStorage.setItem('cartCount', updatedCount);
    localStorage.setItem('totalPrice', updatedTotalPrice);

    setCartCount(updatedCount);
    setTotalPrice(updatedTotalPrice);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const prodRef = collection(db, "Pokemones");

    getDocs(prodRef)
      .then((resp) => {
        const items = resp.docs.map((doc) => doc.data());
        setPokemonData(items);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  const filteredPokemonData = selectedCategory
    ? pokemonData.filter((pokemon) => pokemon.Categoria === selectedCategory)
    : pokemonData;

  return (
    <div className="List">
      <h1 className="ListContainer">Lista de Pokémon</h1>
      <h2 className="ListContainer">Categorias</h2>
      <div className="ListContainer">
        <button className="Btn" onClick={() => handleCategoryChange("")}>
          Todos los pokemones
        </button>
        <button className="Btn" onClick={() => handleCategoryChange("Agua")}>
          Pokemons de Agua
        </button>
        <button className="Btn" onClick={() => handleCategoryChange("Fuego")}>
          Pokemons de Fuego
        </button>
        <button className="Btn" onClick={() => handleCategoryChange("Planta/veneno")}>
          Pokemons de Planta/Veneno
        </button>
        <button className="Btn" onClick={() => handleCategoryChange("Electrico")}>
          Pokemons de Eléctricos
        </button>
      </div>
      <hr />
      <div className="CarritoInfo">
        <p className="CarritoItem">
          <FaShoppingCart />:{localStorage.getItem('cartCount')}
        </p>
        <p className="CarritoItem">
          <FaDollarSign />: {localStorage.getItem('totalPrice')}
        </p>
      </div>
      <div className="CarritoInfo">
        <button onClick={handleReset}>
          <FaTrashAlt />
        </button>
      </div>
      <div className="CarritoInfo">
        <button className="checkOut">
          <Link className='Btn' to="/Productos/FinalizarCompra">Finalizar compra</Link>
        </button>
      </div>
      {isLoading ? (
        <p className="ListContainer">Cargando...</p>
      ) : (
        <div className="ListItems">
          {filteredPokemonData.map((pokemon, index) => (
            <div className="ListaPokemones" key={index}>
              <h4 className="Nombre">{pokemon.Nombre}</h4>
              <p className="Precio">Precio: ${pokemon.Precio}</p>
              <p className="Precio">Stock: {pokemon.Stock}</p>
              <img className="Img" src={pokemon.Img} alt={pokemon.name} />
              <Carrito className="AgregarCarrito" pokemon={pokemon} onAddToCart={handleCarrito} />
              <Link className="Precio" to="/Productos/Detalles" onClick={() => handleDetails(pokemon)}>Detalles</Link>
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

