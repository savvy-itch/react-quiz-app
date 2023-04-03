import React, { useEffect, useState } from 'react';
import "./ThemeToggle.css";
import { MdNightlightRound, MdSunny } from 'react-icons/md';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  function handleToggle(e) {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
  }

  useEffect(() => {
    document.body.dataset.bsTheme = theme;
  }, [theme])

  return (
    <label className="switch">
      <input type="checkbox" onClick={handleToggle} />
      <span className="slider round">
        <div className="toggle-icons">
          <MdSunny />
          <MdNightlightRound />
        </div>
      </span>
    </label>
  )
}
