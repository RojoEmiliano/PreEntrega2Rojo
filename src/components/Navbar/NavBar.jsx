import { FaShoppingCart } from "react-icons/fa";
import './NavBar.scss'
import { Link } from "react-router-dom";
import PokemonList from "../Pokeapi/PokeApi";
import { useEffect, useState } from "react";
import Carrito from "../Carrito/Carrito";
import { useCartContext } from "../CartContext/CartContext";

function Navbar() {

  const { cartCount } = useCartContext();

    return (
  <header className="header">
    <div className="header__container">
      <h1 className="header__logo">LOGO</h1>
      <nav className="header__nav">
          <Link className="header__link" to="/">Inicio</Link>
          <Link className="header__link" to="/Productos">Productos</Link>
          <Link className="header__link" to="/SobreNosotros">Sobre Nosotros</Link>
          <Link className="header__link" to="/Contacto">Contacto</Link>
          <Link className="header__link" to="/Productos/Cart"> <FaShoppingCart/> { cartCount } </Link>
          
      </nav>
    </div>
  </header>
  );
}

export default Navbar;