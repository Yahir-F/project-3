import Main from './components/Main'
import React from 'react';
import Particles from "react-particles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { useCallback } from 'react';


function App() {
  async function customInit(engine){
    await loadStarsPreset(engine)
    
  }
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
    document.querySelector("#tsparticles canvas").style.zIndex = -10;
  }, []);

  const options = {
    preset: "stars",
  };

  return (<div><Particles loaded={particlesLoaded} options={options} init={customInit} />
  <Main></Main></div>)
}

export default App;
