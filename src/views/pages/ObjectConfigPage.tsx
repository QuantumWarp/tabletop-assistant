import React from 'react';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';

const ObjectConfigPage = () => {
  const gameObjects = useAppSelector(selectGameObjects);

  return (
    <div>
      {gameObjects.map((x) => (
        <div>{x.name}</div>
      ))}
    </div>
  );
};

export default ObjectConfigPage;
