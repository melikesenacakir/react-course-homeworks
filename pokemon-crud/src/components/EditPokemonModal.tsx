import { forwardRef } from "react"
import type { RefObject } from "react"
import type { Pokemon } from "../types/pokemon"
import PokemonForm from "./PokemonForm"


const EditPokemonModal = forwardRef<HTMLDialogElement, { pokemon: Pokemon | null, isEdit: boolean }>(
    ({ pokemon, isEdit }, ref) => { //I combined them edit and create in here

    const handleSuccess = () => {
        (ref as RefObject<HTMLDialogElement>).current?.close()
    }

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-4">
            Pokemon {isEdit ? "Ekle" : "Güncelle"}
          </h3>
          <PokemonForm
            pokemon={pokemon}
            onSuccess={handleSuccess}
            isEdit={isEdit}
          />
        </div>
      </dialog>
    )
  }
)
export default EditPokemonModal
