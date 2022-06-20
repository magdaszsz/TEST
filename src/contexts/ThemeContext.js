import React, {createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState(getLocalTheme());
  

  useEffect(()=> {
    localStorage.setItem('theme', theme)
  }, [theme])

  function getLocalTheme() {
    let theme = 'light';
    if(localStorage.getItem('theme')){
      theme = localStorage.getItem('theme')
    }
    return theme;
  }

  function toggleTheme(){
    if(theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
      </ThemeContext.Provider>
  )
}

export default ThemeContextProvider