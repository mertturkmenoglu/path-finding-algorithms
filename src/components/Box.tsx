import { useContext, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';

interface BoxProps {
  row: number;
  col: number;
  change: (row: number, col: number) => void;
}

function Box({ row, col, change }: BoxProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(AppContext);

  const bgColor = (() => {
    const b = ctx.g.at(row, col);

    if (b === 'Block') {
      return '#2A2A2A';
    }

    if (b === 'Visited') {
      return '#CBD5E1';
    }

    if (b === 'Path') {
      return '#DB2777';
    }

    return '#FFFFFF';
  })();

  const char = (() => {
    const ch = ctx.g.getSingleCharAt(row, col);
    return !['B', 'P', 'V'].includes(ch) ? ch : '';
  })();

  return (
    <div
      ref={ref}
      key={`row-${row}-col-${col}`}
      className="border border-zinc-700 flex justify-center items-center"
      style={{
        width: ctx.resolution,
        height: ctx.resolution,
        backgroundColor: bgColor,
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
