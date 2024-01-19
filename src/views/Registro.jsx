import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

/* importando hook de autenticacion */
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    /* Leer los inputs, accedemos a la informacionde cada uno de los inputs */
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        /* Almacenamos los datos de los inputs, esto ira hacia laravel */
        const datos = {
            name : nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }
    return (
        <>
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name">
                            Nombre:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="name" type="text"
                            name="name"
                            placeholder="Tu nombre"
                            ref={nameRef} />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email">
                            Email:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="email" type="email"
                            name="email"
                            placeholder="Tu Email"
                            ref={emailRef} />
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
                            ref={passwordRef} />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password_confirmation">
                            Repetir Contraseñaa:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="password_confirmation" type="password"
                            name="password_confirmation"
                            placeholder="Repetir Contraseña"
                            ref={passwordConfirmationRef} />
                    </div>
                    <input type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" />
                </form>
            </div>
            <nav className='mt-5'>
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}
