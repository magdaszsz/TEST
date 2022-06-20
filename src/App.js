import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {Routes, Route} from 'react-router-dom';

import FavoriteContextProvider from "./contexts/FavoriteMoviesContext";
import ThemeContextProvider from "./contexts/ThemeContext";




function App() {

  return (
    <FavoriteContextProvider>
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </ThemeContextProvider>
    </FavoriteContextProvider>
  );
}

export default App;
