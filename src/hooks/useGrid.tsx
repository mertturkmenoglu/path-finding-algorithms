import { useState, useEffect } from 'react';
import { Grid } from '../../lib/Grid';
import { useWindowSize } from './useWindow';

export function useGrid(resolution: number) {
  const { height, width } = useWindowSize();
  const [, trigger] = useState(0);
  const [g] = useState(() => new Grid());

  useEffect(() => {
    const rows = Math.floor((height - 100) / resolution);
    const cols = Math.floor(width / resolution);

    if (rows > 0 && cols > 0) {
      g.init(rows, cols, 'Empty');
      trigger((x) => x + 1);
    }
  }, [width, height]);

  return { g, trigger };
}
