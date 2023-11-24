import { Link } from 'react-router-dom'

export default function Registro() {
    return (
        <>
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu cuenta llenando el formulario</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form action="">
                <div className="mb-4">
                        <label
                        className="text-slate-800"
                        htmlFor="name">
                            Nombre:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="name" type="text"
                        name="name" 
                        placeholder="Tu nombre"/>
                    </div>

                    <div className="mb-4">
                        <label
                        className="text-slate-800"
                        htmlFor="email">
                            Email:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="email" type="email"
                        name="email" 
                        placeholder="Tu Email"/>
                    </div>

                    <div className="mb-4">
                        <label
                        className="text-slate-800"
                        htmlFor="password">
                            Contraseña:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="password" type="password"
                        name="password" 
                        placeholder="Tu password"/>
                    </div>

                    <div className="mb-4">
                        <label
                        className="text-slate-800"
                        htmlFor="password_confirmation">
                            Repetir Contraseñaa:
                        </label>
                        <input className="mt-2 w-full p-3 bg-gray-100" id="password_confirmation" type="password"
                        name="password_confirmation" 
                        placeholder="Repetir Contraseña"/>
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
