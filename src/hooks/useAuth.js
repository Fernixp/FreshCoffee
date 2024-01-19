
import { useEffect } from 'react';
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/axios";


export const useAuth = ({ middleware, url }) => {

    /* La autenticacion no tiene que ser global */
    /* Obteniendo el token */
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.reponse?.data?.errors)
            })

    )

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            /* Limpiamos mensajes */
            setErrores([])
            /* mutate, lo que hace ees forzar, revalidar la autenticacion */
            await mutate()
        } catch (error) {

            setErrores(Object.values(error.response.data.errors))
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos )
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            // Verificar si `error.response.data.errors` está definido antes de acceder a sus propiedades
            const erroresResponse = error.response?.data?.errors;
            if (erroresResponse) {
                setErrores(Object.values(erroresResponse));
            } else {
                // Si no hay errores específicos, mostrar un mensaje genérico
                setErrores(['Ocurrió un error al procesar la solicitud.']);
            }
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            /* Una vez cerrado la sesion, eliminamos el token */
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.reponse?.data?.errors)
        }
    }


    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            /* Redireccionamos al usuario */
            navigate(url)
        }

        /* Si el usuario es admin 1, lo redireccionamos al panel de administracion */
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        
        /* Si no es administrador, lo redireccionamos a donde pertenece, este es un middleware
        para proteger la ruta del panel administrador */
        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        /* Si el middleware es de auth y hay un error, quiere decir que no esta autenticado, por lo tanto
        lo redireccionamos a login */
        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    return {
        login,
        registro,
        logout,
        user,
        error
    }

}