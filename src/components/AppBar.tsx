import { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';
import { AppContext } from '../contexts/AppContext';
import { TAlgorithm, THeuristic } from '../../lib/GraphNode';
import { bfs } from '../../lib/algorithms';
import { posEq } from '../../lib/Pos';

function AppBar(): React.ReactElement {
  const ctx = useContext(AppContext);

  const start = () => {
    // temp, only bfs
    ctx.g.clearPath();
    const res = bfs(ctx.g, ctx.start!, ctx.end!);
    for (const p of res) {
      if (posEq(p.pos, ctx.start!) || posEq(p.pos, ctx.end!)) {
        continue;
      }
      ctx.g.setPos(p.pos, 'Path');
    }
    ctx.trigger();
  };

  const reset = () => {
    ctx.g.reset();
    ctx.setStart(null);
    ctx.setEnd(null);
    ctx.trigger();
  };

  const clear = () => {
    ctx.g.clearPath();
    ctx.trigger();
  };

  return (
    <header className="flex items-center justify-between w-full bg-black/80 text-white py-2 px-8">
      <div className="flex items-center ">
        <div className="flex items-center space-x-2">
          <span>Algorithm:</span>
          <Select onValueChange={(val: TAlgorithm) => ctx.setAlgorithm(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="astar">A*</SelectItem>
              <SelectItem value="dijkstra">Dijkstra</SelectItem>
              <SelectItem value="bfs">BFS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {ctx.algorithm === 'astar' && (
          <div className="ml-8 flex items-center space-x-2">
            <span>Heuristic</span>
            <Select onValueChange={(val: THeuristic) => ctx.setHeuristic(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Heuristic" />
              </SelectTrigger>
              <SelectContent defaultValue={ctx.heuristic}>
                <SelectItem value="manhattan">Manhattan</SelectItem>
                <SelectItem value="euclidian">Euclidian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button>Generate Maze</button>
        <button onClick={reset}>Reset</button>
        <button onClick={clear}>Clear</button>
        <button onClick={start}>Start</button>
        <button>Help</button>
      </div>
    </header>
  );
}

export default AppBar;
