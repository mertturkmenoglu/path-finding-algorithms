import { useMemo } from 'react';
import { Grid } from '../../lib/Grid';

interface BoxProps {
  row: number;
  col: number;
  res: number;
  g: Grid;
  change: (row: number, col: number) => void;
}

function Box({ row, col, res, g, change }: BoxProps): React.ReactElement {
  const bgColor = useMemo(() => {
    if (g.at(row, col) === 'Block') {
      return '#2a2a2a';
    }

    return g.at(row, col) === 'Path' ? '#ffff00' : '#FFF';
  }, [g, row, col]);

  const char = useMemo(() => {
    const ch = g.getSingleCharAt(row, col);
    return !['B', 'P'].includes(ch) ? ch : '';
  }, [g, row, col]);

  return (
    <div
      key={`row-${row}-col-${col}`}
      className="border border-black flex justify-center items-center"
      style={{
        width: res,
        height: res,
        background: bgColor,
      }}
      onClick={() => change(row, col)}
      draggable={true}
      onDragEnter={() => change(row, col)}
    >
      {char}
    </div>
  );
}

export default Box;
