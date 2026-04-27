import { useRef, useState } from "react"
import DeleteConfirmModal from "./DeleteConfirmModal"
import EditPokemonModal from "./EditPokemonModal"
import { usePokemons } from "../hooks/usePokemons"
import type { Pokemon } from "../types/pokemon"
import { Plus } from "lucide-react"
import { useSelector } from "react-redux"
import Pagination from "./Pagination"
import type { RootState } from "../store"

const PokemonList = () => {
    const { page, limit } = useSelector((state: RootState) => state.pagination.pokemonPagination)
    const { data: { pokemons = [], totalPages = 1 } = {} , isLoading, isError } = usePokemons(page, limit)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
    const [isEdit, setIsEdit] = useState(false)
    const deleteModalRef = useRef<HTMLDialogElement>(null)
    const editModalRef = useRef<HTMLDialogElement>(null)

    if (isLoading)
        return <span className="loading loading-spinner loading-md"></span>

    if (isError)
        return (
            <div role="alert" className="alert alert-error">
                 <span>Henüz Pokemon Yok</span>
            </div>
        )
    
    const openDeleteModal = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon)
        deleteModalRef.current?.showModal()
    }

    const openEditCreateModal = (pokemon?: Pokemon ) => {
        if (pokemon) {
            setSelectedPokemon(pokemon)
            setIsEdit(true)
        } else {
            setSelectedPokemon(null)
            setIsEdit(false)
        }
        editModalRef.current?.showModal()
    }

    return (
        <div className="py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFE699]">
                    Pokemon Koleksiyon Kartları
                </h1>
                <p className="text-gray-500 mt-2">
                    Favori Pokemonlarını ekle, düzenle veya sil!
                </p>
                <button
                    className="btn btn-outline btn-warning mt-4 gap-2"
                    onClick={() => openEditCreateModal()}
                >
                    <Plus className="w-5 h-5" />
                    Yeni Pokemon
                </button>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-3">
                {pokemons?.map((pokemon) => (
                    <div 
                        className="card w-full shadow-sm border-3 border-[#D4AF37] bg-gradient-to-r from-[#FFD700] to-[#FFE699] p-3 text-gray-800" 
                        key={pokemon.id}>
                        <h2 className="card-title">{pokemon.name}</h2>
                        <figure className="px-10 pt-10">
                            <img
                            src={pokemon?.imageUrl}
                            alt={pokemon.name}
                            className="rounded-sm border-3 border-[#D4AF37]" />
                        </figure>
                        <div className="card-body">
                            <p>Level: {pokemon.level}</p>
                            <p>Type: {pokemon.type}</p>
                            <div className="card-actions justify-center gap-2 mt-4">
                                <button
                                    className="btn btn btn-outline btn-info btn-sm"
                                    onClick={() => openEditCreateModal(pokemon)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn btn-outline btn-error btn-sm"
                                    onClick={() => openDeleteModal(pokemon)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-span-full">
                    <Pagination
                    paginationKey="pokemonPagination"
                    totalPages={totalPages}
                    />
                </div>
            </div>
            <DeleteConfirmModal
                ref={deleteModalRef}
                pokemon={selectedPokemon}
            />

            <EditPokemonModal
                ref={editModalRef}
                pokemon={selectedPokemon}
                isEdit={isEdit}
            />
        </div>
  )
}

export default PokemonList
