export type Pokemon = {
  id: string;
  name: string;
  type: string;
  level: number;
  imageUrl?: string;
}

export type PokemonList = {
  pokemons: Pokemon[];
  totalPages: number;
}