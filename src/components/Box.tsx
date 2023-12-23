import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface BoxProps {
  row: number;
  col: number;
  change: (row: number, col: number) => void;
}

function Box({ row, col, change }: BoxProps): React.ReactElement {
  const ctx = useContext(AppContext);

  const bgColor = (() => {
    const b = ctx.g.at(row, col);

    if (b === 'Block') {
      return '#2a2a2a';
    }

    if (b === 'Visited') {
      return '#0000dd';
    }

    return b === 'Path' ? '#FFFF00' : '#FFF';
  })();

  const char = (() => {
    const ch = ctx.g.getSingleCharAt(row, col);
    return !['B', 'P', 'V'].includes(ch) ? ch : '';
  })();

  return (
    <div
      key={`row-${row}-col-${col}`}
      className="border border-black flex justify-center items-center"
      style={{
        width: ctx.resolution,
        height: ctx.resolution,
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
