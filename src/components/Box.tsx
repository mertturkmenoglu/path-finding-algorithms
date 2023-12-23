import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useBoxColor } from '../hooks/useBoxColor';
import { posEq } from '../../lib/Pos';
import anime from 'animejs';
import { useBoxElement } from '../hooks/useBoxElement';

interface BoxProps {
  row: number;
  col: number;
  change: (row: number, col: number) => void;
}

function Box({ row, col, change }: BoxProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(AppContext);
  const color = useBoxColor();
  const element = useBoxElement();
  const [, setPrevBgColor] = useState('#FFFFFF');

  const bgColor = (() => {
    const el = ctx.g.at(row, col);
    return color(el);
  })();

  const inner = (() => {
    const ch = ctx.g.getSingleCharAt(row, col);
    return element(ch);
  })();

  useEffect(() => {
    const el = ctx.g.at(row, col);

    if (ref.current === null) {
      return;
    }

    if (el === 'Block' || el === 'Empty' || ctx.result === null) {
      const duration = el === 'Block' || el === 'Empty' ? 200 : 2;
      anime
        .timeline({
          duration,
          easing: 'linear',
        })
        .add(
          {
            targets: ref.current,
            background: bgColor,
          },
          0
        );
      setPrevBgColor(bgColor);
      return;
    }

    const arr = el === 'Path' ? ctx.result.path : ctx.result.visited;
    const coef = el === 'Path' ? 25 : 2;
    const index = arr.findIndex((v) => posEq(v.pos, [row, col]));
    const len = ctx.result.visited.length - ctx.result.path.length;
    let offset = index * coef;

    if (el === 'Path') {
      offset += len * 2;
    }

    anime
      .timeline({
        duration: 200,
      })
      .add(
        {
          targets: ref.current,
          easing: 'linear',
          background: bgColor,
        },
        offset
      );
    setPrevBgColor(bgColor);
  }, [bgColor, ref.current, ctx.result]);

  return (
    <div
      ref={ref}
      className="border border-zinc-700 flex justify-center items-center"
      style={{
        width: ctx.resolution,
        height: ctx.resolution,
      }}
      onClick={() => change(row, col)}
      draggable={true}
      onDragEnter={() => change(row, col)}
    >
      {inner}
    </div>
  );
}

export default Box;
