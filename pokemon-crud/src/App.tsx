import { Moon, Sun } from "lucide-react"
import PokemonList from "./components/PokemonList"

const App = () => {
  return (
    <div>
      <div className="flex justify-end p-4">
        <label className="toggle text-base-content">
          <input type="checkbox" value="synthwave" className="theme-controller" defaultChecked/>
          <Sun className="w-5 h-5" />
          <Moon className="w-5 h-5" />
        </label>
      </div>
      <PokemonList />
    </div>
  )
}

export default App
