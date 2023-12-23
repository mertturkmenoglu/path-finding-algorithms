import { useContext } from 'react';
import Box from './Box';
import { AppContext } from '../contexts/AppContext';

function GridComponent(): React.ReactElement {
  const ctx = useContext(AppContext);

  const change = (r: number, c: number) => {
    if (ctx.start === null) {
      ctx.setStart([r, c]);
      ctx.g.set(r, c, 'Start');
      ctx.trigger();
      return;
    }

    if (ctx.end === null) {
      ctx.setEnd([r, c]);
      ctx.g.set(r, c, 'End');
      ctx.trigger();
      return;
    }

    const prev = ctx.g.at(r, c);

    if (prev === 'Start') {
      ctx.setStart(null);
      ctx.g.set(r, c, 'Empty');
      ctx.trigger();
      return;
    }

    if (prev === 'End') {
      ctx.setEnd(null);
      ctx.g.set(r, c, 'Empty');
      ctx.trigger();
      return;
    }

    const next = prev === 'Empty' ? 'Block' : 'Empty';

    ctx.g.set(r, c, next);
    ctx.trigger();
  };

  const mtr = ctx.g.rows();

  return (
    <div className="text-black mx-auto mt-2">
      {mtr.map((row, r) => (
        <div
          className="flex"
          key={`row-${r}`}
        >
          {row.map((_, c) => (
            <Box
              key={`row-${r}-col-${c}`}
              row={r}
              col={c}
              change={change}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridComponent;
