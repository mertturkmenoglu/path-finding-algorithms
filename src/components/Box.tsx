import { useContext, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useBoxColor } from '../hooks/useBoxColor';

interface BoxProps {
  row: number;
  col: number;
  change: (row: number, col: number) => void;
}

function Box({ row, col, change }: BoxProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(AppContext);
  const color = useBoxColor();

  const bgColor = (() => {
    const b = ctx.g.at(row, col);
    return color(b);
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
