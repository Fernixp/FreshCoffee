import React from 'react'
import { Outlet } from 'react-router-dom'
import Modal from 'react-modal'
/* Toastify para los alerts */
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css" //Estilos

import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import ModalProducto from '../components/ModalProducto'
import useQuiosco from '../hooks/useQuiosco'

/* importando el hook de autenticacion */
import { useAuth } from '../hooks/useAuth'

/* Css para el modal */
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')
export default function Layout() {

  const { user, error } = useAuth({ middleware: 'auth' })
  const { modal } = useQuiosco();


  console.log(user)
  console.log(error)
  return (

    <>
      <div className='md:flex'>
        <Sidebar />
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>
        <Resumen />
      </div>

      {/* Aca abrimos el modal de agregarProducto */}
      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto></ModalProducto>
      </Modal>

      <ToastContainer />

    </>
  )
}
