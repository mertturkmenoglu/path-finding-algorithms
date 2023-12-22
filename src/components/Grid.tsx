import { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/useWindow';
import { Grid } from '../../lib/Grid';
import { astar } from '../../lib/algorithms';
import { Pos, posEq } from '../../lib/Pos';

const resolution = 32;

function useGrid() {
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

function GridComponent(): React.ReactElement {
  const { g, trigger } = useGrid();
  const [start, setStart] = useState<Pos | null>(null);
  const [end, setEnd] = useState<Pos | null>(null);

  const change = (r: number, c: number) => {
    if (start === null) {
      setStart([r, c]);
      g.set(r, c, 'Start');
      trigger((x) => x + 1);
      return;
    }

    if (end === null) {
      setEnd([r, c]);
      g.set(r, c, 'End');
      trigger((x) => x + 1);
      return;
    }

    const prev = g.at(r, c);

    if (prev === 'Start') {
      setStart(null);
      g.set(r, c, 'Empty');
      trigger((x) => x + 1);
      return;
    }

    if (prev === 'End') {
      setEnd(null);
      g.set(r, c, 'Empty');
      trigger((x) => x + 1);
      return;
    }

    const next = prev === 'Empty' ? 'Block' : 'Empty';

    g.set(r, c, next);
    trigger((x) => x + 1);
  };

  const astarStart = () => {
    g.clearPath();
    const res = astar(g, start!, end!, 'euclidean', 'astar');
    for (const p of res) {
      if (posEq(p.pos, start!) || posEq(p.pos, end!)) {
        continue;
      }
      g.setPos(p.pos, 'Path');
    }
    trigger((x) => x + 1);
  };

  const mtr = g.rows();

  return (
    <div className="text-black mx-auto mt-2">
      <button onClick={astarStart}>Dijkstra</button>
      {mtr.map((row, r) => (
        <div
          className="flex"
          key={`row-${r}`}
        >
          {row.map((_, c) => (
            <div
              key={`row-${r}-col-${c}`}
              className="border border-black flex justify-center items-center"
              style={{
                width: resolution,
                height: resolution,
                background:
                  g.at(r, c) === 'Block'
                    ? '#2a2a2a'
                    : g.at(r, c) === 'Path'
                      ? '#ffff00'
                      : 'white',
              }}
              onClick={() => change(r, c)}
              draggable={true}
              onDragEnter={() => change(r, c)}
            >
              {!['B', 'P'].includes(g.getSingleCharAt(r, c))
                ? g.getSingleCharAt(r, c)
                : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridComponent;
