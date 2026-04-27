import { Moon, Sun } from "lucide-react"
import PokemonList from "./components/PokemonList"
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/theme/themeSlice";
import type { RootState } from "./store";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <div data-theme={theme}>
      <div className="flex justify-end p-4">
        <label className="toggle text-base-content">
          <input 
            type="checkbox" 
            className="theme-controller" 
            checked={theme === "synthwave"}
            onChange={() => dispatch(toggleTheme())}
            />
          <Sun className="w-5 h-5" />
          <Moon className="w-5 h-5" />
        </label>
      </div>
      <PokemonList />
    </div>
  )
}

export default App
