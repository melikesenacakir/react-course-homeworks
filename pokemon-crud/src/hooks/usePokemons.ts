import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Pokemon, PokemonList } from "../types/pokemon"
import { api } from "../api/axios"


export const usePokemons = (_page: number, _limit: number) => {
    return useQuery<PokemonList>({
        queryKey: ["pokemons", _page, _limit],
        queryFn: (): Promise<PokemonList> => 
            api.get(`/pokemons?_page=${_page}&_limit=${_limit}`)
                .then(res => ({
                    pokemons: res.data,
                    totalPages: Math.ceil(Number(res.headers["x-total-count"]) / _limit)
                })),
        staleTime: 3 * 60 * 1000,
    })
}

export const usePokemon = (id: number) => {
    return useQuery({
        queryKey: ["pokemon", id],
        queryFn: () => api.get<Pokemon>(`/pokemons/${id}`).then(res => res.data),
        staleTime: 3 * 60 * 1000,
        enabled: !!id
    })
}


export const useCreatePokemon = () => {
    const { invalidateList } = useInvalidatePokemons();
    return useMutation({
        mutationFn: (m: Omit<Pokemon, "id">) => 
            api.post<Pokemon>("pokemons", m).then(res => res.data),
        onSuccess: () => {
            invalidateList();
        },
    })
}

export const useDeletePokemon = () => {
    const { invalidateList } = useInvalidatePokemons();
    return useMutation({
        mutationFn: (id: string) => 
            api.delete(`/pokemons/${id}`).then(res => res.data),
        onSuccess: () => {
            invalidateList();
        }
    })
}

export const useUpdatePokemon = () => {
    const { invalidateList } = useInvalidatePokemons();
    return useMutation({
        mutationFn: (m: Pokemon) => 
            api.put(`/pokemons/${m.id}`, m).then(res => res.data),
        onSuccess: () => {
            invalidateList();
        }
    })
}

const useInvalidatePokemons = () => { //I added ths function because this field was repeating in most of the functions and I think this is a cleaner code
    const queryClient = useQueryClient();
    const invalidateList = () => 
        queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    return { invalidateList };
}