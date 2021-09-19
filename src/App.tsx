import React from 'react';
import GameState from './models/game-state';
import objects from './example/objects';
import DefaultDisplay from './display/DefaultDisplay';

const App = () => {
  const state = new GameState(...objects);

  return (
    <div>
      {state.gameObjects.map((obj) => (
        <DefaultDisplay gameObject={obj} />
      ))}
    </div>
  );
};

export default App;
