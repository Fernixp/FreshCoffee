import useQuiosco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {
    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { icono, id, nombre } = categoria

    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : 'bg-white'
    return (
        /* Movimos el onlcick al div, ya que si lo ponemos en el button
        solo obedece cunado le damos click a las letras */
        <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400
        cursor-pointer`} onClick={() => handleClickCategoria(id)}>
            <img src={`/img/icono_${icono}.svg`} 
            alt="Imagen Icono" 
            className="w-12" />
            <button className="text-lg font-bold cursor-pointer truncate" type="button"
            >{nombre}</button>
        </div>
        
    )
}
