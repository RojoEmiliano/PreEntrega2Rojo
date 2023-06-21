import React from 'react';
import { FaInstagramSquare, FaWhatsappSquare, FaFacebookSquare } from "react-icons/fa";
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <FaInstagramSquare className='icon'/>
        <FaWhatsappSquare className='icon'/>
        <FaFacebookSquare className='icon'/>
      </div>
      <p className="rights">Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
