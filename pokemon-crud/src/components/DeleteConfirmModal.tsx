import { forwardRef, type RefObject } from "react";
import type { Pokemon } from "../types/pokemon";
import { useDeletePokemon } from "../hooks/usePokemons";

const DeleteConfirmModal = forwardRef<HTMLDialogElement, { pokemon: Pokemon | null }>(
    ({ pokemon }, ref) => {
        const { mutate: deletePokemon, isPending } = useDeletePokemon();

        const handleDelete = () => {
            if (!pokemon) return
            deletePokemon(pokemon.id, {
                onSuccess: () => {
                    (ref as RefObject<HTMLDialogElement>).current?.close()
                },
            })
        }
  return (
    <dialog ref={ref} id="delete_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Pokemon Sil</h3>
            <p className="py-4">{pokemon?.name} pokemonu silmek istediğinden emin misin ?</p>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-outline">Vazgeç</button>
                </form>
                <button 
                    onClick={handleDelete}
                    className="btn btn-error"
                    disabled={isPending}
                    >
                    {isPending ? "Siliniyor..." : "Evet, sil"}
                </button>
            </div>
        </div>
    </dialog>
  );
});

export default DeleteConfirmModal
