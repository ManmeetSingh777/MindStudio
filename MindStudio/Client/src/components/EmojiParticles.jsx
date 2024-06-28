import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const EmojiParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: "#ffffff",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#f39c12", "#e74c3c", "#9b59b6", "#3498db"],
      },
      shape: {
        type: "image",
        image: [
          {
            src: "https://twemoji.maxcdn.com/2/72x72/1f600.png",
            width: 72,
            height: 72,
          },
          {
            src: "https://twemoji.maxcdn.com/2/72x72/1f601.png",
            width: 72,
            height: 72,
          },
          {
            src: "https://twemoji.maxcdn.com/2/72x72/1f602.png",
            width: 72,
            height: 72,
          },
          {
            src: "https://twemoji.maxcdn.com/2/72x72/1f603.png",
            width: 72,
            height: 72,
          },
        ],
      },
      opacity: {
        value: 0.8,
      },
      size: {
        value: 30,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
};

export default EmojiParticles;
