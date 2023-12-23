import React from 'react';
import { TAlgorithm, THeuristic } from '../../lib/GraphNode';
import { Grid } from '../../lib/Grid';
import { Pos } from '../../lib/Pos';

interface AppContextState {
  g: Grid;
  algorithm: TAlgorithm;
  setAlgorithm: React.Dispatch<React.SetStateAction<TAlgorithm>>;
  heuristic: THeuristic;
  setHeuristic: React.Dispatch<React.SetStateAction<THeuristic>>;
  animSpeed: string;
  resolution: number;
  start: Pos | null;
  setStart: React.Dispatch<React.SetStateAction<Pos | null>>;
  end: Pos | null;
  setEnd: React.Dispatch<React.SetStateAction<Pos | null>>;
  t: number;
  trigger: React.Dispatch<React.SetStateAction<number>>;
}

export const appContextDefaultValues: AppContextState = {
  g: new Grid(),
  algorithm: 'astar',
  heuristic: 'manhattan',
  animSpeed: '',
  resolution: 32,
  start: null,
  end: null,
  t: 0,
  setAlgorithm: () => {},
  setHeuristic: () => {},
  setStart: () => {},
  setEnd: () => {},
  trigger: () => {},
};

export const AppContext = React.createContext<AppContextState>(
  appContextDefaultValues
);
