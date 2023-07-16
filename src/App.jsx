import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/NavBar'
import PokemonList from './components/ItemListCointainer/PokeApi'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Index from './components/Inicio/Index'
import Footer from './components/Footer/Footer'
import { SobreNosotros } from './components/SobreNosotros/SobreNosotros'
import Contacto from './components/Contacto/Contacto'
import Detalles from './components/Detalles/Detalles'
import Checkout from './components/CheckOut/CheckOut'

function App() {
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes> 
        <Route path='/' element={<Index/>} />
        <Route path="*" element={<Navigate to={"/"}/>} />
        <Route path='/Productos' element={<PokemonList/>} />
        <Route path='/SobreNosotros' element={<SobreNosotros/>} />
        <Route path='/Contacto' element={<Contacto/>} />
        <Route path='/Productos/Detalles' element={<Detalles/>} />
        <Route path='/Productos/FinalizarCompra' element={<Checkout/>} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
