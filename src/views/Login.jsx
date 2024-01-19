import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';

/* importando el hook de autenticacion */
import { useAuth } from '../hooks/useAuth';

export default function login() {

  /* Leer los inputs, accedemos a la informacionde cada uno de los inputs */

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([])
  const {login} = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();

    /* Almacenamos los datos de los inputs, esto ira hacia laravel */
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    login(datos, setErrores)

  }

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="email">
              Email:
            </label>
            <input className="mt-2 w-full p-3 bg-gray-100" id="email" type="email"
              name="email"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="password">
              Contraseña:
            </label>
            <input className="mt-2 w-full p-3 bg-gray-100" id="password" type="password"
              name="password"
              placeholder="Tu password"
              ref={passwordRef}
            />
          </div>
          <input type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
        </form>
      </div>
      <nav className='mt-5'>
        <Link to="/auth/registro">
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
