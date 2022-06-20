import React, {useContext} from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemeToggler() {
  const themeCtx = useContext(ThemeContext);


  return (
    <div className="toggle-container" onChange={themeCtx.toggleTheme}>
      <input type="checkbox" name="switch" id="switch"/>
        <label htmlFor="switch"></label>
    </div>
  )
}

export default ThemeToggler;