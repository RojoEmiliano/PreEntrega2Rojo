import './PokeApi.scss';
import React, { useEffect, useState } from 'react';
import Carrito from '../Carrito/Carrito';
import { FaShoppingCart, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCartContext } from '../CartContext/CartContext';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addedToCartProducts, setAddedToCartProducts] = useState([]);
  const { cartCount, totalPrice, addToCart, resetCart } = useCartContext();

  const handleReset = () => {
    resetCart();
    setAddedToCartProducts([]);
  };



  const handleCarrito = (pokemon, quantity, Id, Precio) => {
    if (!addedToCartProducts.includes(pokemon.Nombre)) {
      addToCart(pokemon, quantity, Id, Precio);
      setAddedToCartProducts([...addedToCartProducts, pokemon.Nombre, pokemon.Id, pokemon.Precio, pokemon.quantity]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const prodRef = collection(db, "Pokemones");
  
    getDocs(prodRef)
      .then((resp) => {
        const items = resp.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id; // Agregar el Id del documento como una propiedad "id" en el objeto
          return data;
        });
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
          <FaShoppingCart />:{cartCount}
        </p>
        <p className="CarritoItem">
          <FaDollarSign />: {totalPrice}
        </p>
      </div>
      <div className="CarritoInfo">
        <button onClick={handleReset}>
          <FaTrashAlt />
        </button>
      </div>
      <div className="CarritoInfo">
        <button className="checkOut">
          <Link className='Btn' to="/Productos/Cart">Finalizar compra</Link>
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
              <Carrito
                className="AgregarCarrito"
                pokemon={pokemon}
                onAddToCart={handleCarrito}
                disabled={addedToCartProducts.includes(pokemon.Nombre)}
              />
              <Link className="Precio" to={`/Productos/Detalles/${pokemon.id}`}>Detalles</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;


