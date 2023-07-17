import './Index.scss'

const Index = () => {

    return(
        <div className='IndexContainer'>
            <h1>Bienvenido al proyecto final de Rojo Emiliano</h1>
            <hr />
            <h2>SIMULADOR ECOMMERCE DE POKEMONS</h2>
            <p>Que busco en este sitio web?</p>
            <hr />
            <div>
                <li>Productos: Mediante Firebase database, traigo los Pokemones a mi Ecommerce.</li>
                <li>Sobre nosotros: Contar un poco sobre mi</li>
                <li>Contacto: Formulario que me permita recibir informacion de los potenciales compradores.</li>
                <li>Inicio: Brinda informacion sobre el sitio web y su funcionamiento</li>
            </div>
        </div>
    )
};

export default Index