import { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';
import { AppContext } from '../contexts/AppContext';
import {
  BfsNode,
  GraphNode,
  TAlgorithm,
  THeuristic,
} from '../../lib/GraphNode';
import {
  PathFindingResult,
  astar,
  bfs,
  dfs,
  dijkstra,
} from '../../lib/algorithms';
import { posEq } from '../../lib/Pos';

function AppBar(): React.ReactElement {
  const ctx = useContext(AppContext);

  const start = () => {
    ctx.g.clearPathAndVisited();

    if (ctx.start === null) {
      alert('Select a start point');
      return;
    }

    if (ctx.end === null) {
      alert('Select an end point');
      return;
    }

    let res: PathFindingResult<GraphNode> | PathFindingResult<BfsNode> | null =
      null;

    if (ctx.algorithm === 'astar') {
      res = astar(ctx.g, ctx.start, ctx.end, ctx.heuristic, 'astar');
    } else if (ctx.algorithm === 'dijkstra') {
      res = dijkstra(ctx.g, ctx.start, ctx.end);
    } else {
      res = bfs(ctx.g, ctx.start, ctx.end);
    }

    if (res.path.length === 0) {
      alert('Cannot find a path');
      return;
    }

    for (const p of res.path) {
      if (posEq(p.pos, ctx.start!) || posEq(p.pos, ctx.end!)) {
        continue;
      }
      ctx.g.setPos(p.pos, 'Path');
    }

    for (const p of res.visited) {
      if (posEq(p.pos, ctx.start!) || posEq(p.pos, ctx.end!)) {
        continue;
      }
      if (res.path.find((v) => posEq(v.pos, p.pos))) {
        continue;
      }
      ctx.g.setPos(p.pos, 'Visited');
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
    ctx.g.clearPathAndVisited();
    ctx.trigger();
  };

  const maze = () => {
    reset();
    dfs(ctx.g);
    ctx.trigger();
  };

  return (
    <header className="flex items-center justify-between w-full bg-black/80 text-white py-2 px-8">
      <div className="flex items-center ">
        <div className="flex items-center space-x-2">
          <span>Algorithm:</span>
          <Select
            onValueChange={(val: TAlgorithm) => ctx.setAlgorithm(val)}
            value={ctx.algorithm}
          >
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
            <Select
              onValueChange={(val: THeuristic) => ctx.setHeuristic(val)}
              value={ctx.heuristic}
            >
              <SelectTrigger
                className="w-[180px]"
                defaultValue={ctx.heuristic}
              >
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
        <button onClick={maze}>Generate Maze</button>
        <button onClick={reset}>Reset</button>
        <button onClick={clear}>Clear</button>
        <button onClick={start}>Start</button>
        <button>Help</button>
      </div>
    </header>
  );
}

export default AppBar;
