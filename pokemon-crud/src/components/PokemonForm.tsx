import { useCreatePokemon, useUpdatePokemon } from "../hooks/usePokemons";
import type { Pokemon } from "../types/pokemon";

type PokemonFormProps = {
  actionType?: "create" | "update";
  pokemon?: Pokemon | null;
  onSuccess?: () => void;
};

const PokemonForm = ({ actionType, pokemon, onSuccess }: PokemonFormProps) => {
  const { mutate: updatePokemon } = useUpdatePokemon();
  const { mutate: createPokemon } = useCreatePokemon();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: (formData.get("name") ?? "")?.toString().trim(),
      type: (formData.get("type") ?? "")?.toString().trim(),
      level: Number(formData.get("level")),
      imageUrl: (formData.get("imageUrl") ?? "")?.toString().trim(),
    };

    if (actionType === "create") {
      createPokemon(payload, { onSuccess });
    } else if (actionType === "update" && pokemon) {
      updatePokemon({ id: pokemon.id, ...payload }, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <label className="input validator">
        <input
          type="text"
          name="name"
          required
          placeholder="Pokemon İsmi"
          minLength={1}
          defaultValue={pokemon?.name}
          title="Pokemon ismi bos birakilamaz"
        />
      </label>
      <p className="validator-hint pb-2">Pokemon ismi boş bırakılamaz</p>
      <label className="input validator">
        <input
            name="type"
            type="text"
            defaultValue={pokemon?.type}
            placeholder="Pokemon Türü"
            required
            title="Pokemon türü bos birakilamaz"
        />
      </label>
      <p className="validator-hint pb-2">Pokemon türü boş bırakılamaz</p>
      <label className="input validator">
        <input
            name="level"
            type="number"
            placeholder="Pokemon Seviyesi"
            min={1}
            defaultValue={pokemon?.level}
            required
            title="Pokemon seviyesi 1'den küçük olamaz"
        />
      </label>
      <p className="validator-hint pb-2">Pokemon seviyesi 1'den küçük olamaz</p>
      <label className="input validator">
            <input
                type="url"
                defaultValue={pokemon?.imageUrl}
                placeholder="Pokemon Görsel URL'si"
                name="imageUrl"
            />
       </label>
       <div className="card-actions justify-center gap-2 mt-4">
        <button 
            type="button"
            className="btn btn-outline btn-md mt-3"
            onClick={onSuccess}
        >
            Vazgeç
        </button>
        <button 
            type="submit"
            className="btn btn-info btn-md mt-3">
                {actionType === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default PokemonForm;
