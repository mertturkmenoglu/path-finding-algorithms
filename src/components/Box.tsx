import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import anime from 'animejs/lib/anime.es';
import { posEq } from '../../lib/Pos';

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
      return '#2a2a2a';
    }

    if (b === 'Visited') {
      return '#cbd5e1';
    }

    if (b === 'Path') {
      return '#db2777';
    }

    return '#FFF';
  })();

  const char = (() => {
    const ch = ctx.g.getSingleCharAt(row, col);
    return !['B', 'P', 'V'].includes(ch) ? ch : '';
  })();

  useEffect(() => {
    const dur = () => {
      if (char === '') {
        return 0;
      }

      if (char === 'P') {
        const index = ctx.result?.path.findIndex((v) =>
          posEq(v.pos, [row, col])
        );
        return (index ?? 0) * 10;
      }

      if (char === 'V') {
        const index = ctx.result?.visited.findIndex((v) =>
          posEq(v.pos, [row, col])
        );

        return (index ?? 0) * 10;
      }

      return 1;
    };

    if (ref.current !== null) {
      anime
        .timeline({
          targets: ref.current,
          duration: 2000,
        })
        .add({ targets: ref.current, background: bgColor }, dur());
    }
  }, [bgColor, ctx.result, char]);

  return (
    <div
      ref={ref}
      key={`row-${row}-col-${col}`}
      className="border border-black flex justify-center items-center"
      style={{
        width: ctx.resolution,
        height: ctx.resolution,
        // background: bgColor,
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
