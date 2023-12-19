import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

function AppBar(): React.ReactElement {
  const [algorithm, setAlgorithm] = useState<string | null>(null);
  const [heuristic, setHeuristic] = useState('manhattan');
  const [speed, setSpeed] = useState('normal');

  return (
    <header className="flex items-center justify-between w-full bg-black/80 text-white py-2 px-8">
      <div className="flex items-center ">
        <div className="flex items-center space-x-2">
          <span>Algorithm:</span>
          <Select onValueChange={(val) => setAlgorithm(val)}>
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

        {algorithm === 'astar' && (
          <div className="ml-8 flex items-center space-x-2">
            <span>Heuristic</span>
            <Select onValueChange={(val) => setHeuristic(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Heuristic" />
              </SelectTrigger>
              <SelectContent defaultValue={heuristic}>
                <SelectItem value="manhattan">Manhattan</SelectItem>
                <SelectItem value="euclidian">Euclidian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="ml-8 flex items-center space-x-2">
          <span>Speed:</span>
          <Select onValueChange={(val) => setSpeed(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent defaultValue={speed}>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button>Generate Maze</button>
        <button>Reset</button>
        <button>Clear</button>
        <button>Start</button>
        <button>Help</button>
      </div>
    </header>
  );
}

export default AppBar;
