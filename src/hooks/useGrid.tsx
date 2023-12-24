import { useState, useEffect } from 'react';
import { Grid } from '../../lib/Grid';
import { useWindowSize } from './useWindow';

export function useGrid(resolution: number) {
  const { height, width } = useWindowSize();
  const [, trigger] = useState(0);
  const [g] = useState(() => new Grid());

  useEffect(() => {
    const el = document.getElementById('grid-start');
    const top = el ? el.offsetTop + resolution : 100;
    let rows = Math.floor((height - top) / resolution);
    let cols = Math.floor(width / resolution);

    rows = rows % 2 !== 0 ? rows : rows - 1;
    cols = cols % 2 !== 0 ? cols : cols - 1;

    if (rows > 0 && cols > 0) {
      g.init(rows, cols, 'Empty');
      trigger((x) => x + 1);
    }
  }, [width, height]);

  return { g, trigger };
}
