import { Grid } from '../../lib/Grid';

interface BoxProps {
  row: number;
  col: number;
  res: number;
  g: Grid;
  change: (row: number, col: number) => void;
}

function Box({ row, col, res, g, change }: BoxProps): React.ReactElement {
  const bgColor = (() => {
    const b = g.at(row, col);

    if (b === 'Block') {
      return '#2a2a2a';
    }

    return b === 'Path' ? '#FFFF00' : '#FFF';
  })();

  const char = (() => {
    const ch = g.getSingleCharAt(row, col);
    return !['B', 'P'].includes(ch) ? ch : '';
  })();

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
