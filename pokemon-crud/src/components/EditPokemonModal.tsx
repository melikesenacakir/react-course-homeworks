import { forwardRef } from "react"
import type { RefObject } from "react"
import type { Pokemon } from "../types/pokemon"
import PokemonForm from "./PokemonForm"


const EditPokemonModal = forwardRef<HTMLDialogElement, { pokemon: Pokemon | null, actionType: string }>(
    ({ pokemon, actionType }, ref) => { //I combined them edit and create in here

    const handleSuccess = () => {
        (ref as RefObject<HTMLDialogElement>).current?.close()
    }

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-4">
            Pokemon {actionType === "create" ? "Ekle" : "Güncelle"}
          </h3>
          <PokemonForm
            actionType={actionType as "create" | "update"}
            pokemon={pokemon}
            onSuccess={handleSuccess}
          />
        </div>
      </dialog>
    )
  }
)
export default EditPokemonModal
