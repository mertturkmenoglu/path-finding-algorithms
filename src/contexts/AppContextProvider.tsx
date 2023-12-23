import { useState } from 'react';
import { useGrid } from '../hooks/useGrid';
import { AppContext, appContextDefaultValues } from './AppContext';
import { Pos } from '../../lib/Pos';
import { Res } from '../../lib/algorithms';

interface AppContextProviderProps {
  children: React.ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const { g } = useGrid(appContextDefaultValues.resolution);
  const [algorithm, setAlgorithm] = useState(appContextDefaultValues.algorithm);
  const [heuristic, setHeuristic] = useState(appContextDefaultValues.heuristic);
  const [start, setStart] = useState<Pos | null>(null);
  const [end, setEnd] = useState<Pos | null>(null);
  const [t, trigger] = useState(appContextDefaultValues.t);
  const [result, setResult] = useState<Res>(appContextDefaultValues.result);

  return (
    <AppContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        heuristic,
        setHeuristic,
        g,
        animSpeed: appContextDefaultValues.animSpeed,
        resolution: appContextDefaultValues.resolution,
        start,
        setStart,
        end,
        setEnd,
        t,
        trigger: () => trigger((x) => x + 1),
        result,
        setResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
