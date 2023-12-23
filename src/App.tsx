import AppBar from './components/AppBar';
import Grid from './components/Grid';
import Legend from './components/Legend';
import { AppContextProvider } from './contexts/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <div className="w-full h-full flex flex-col">
        <AppBar />
        <Legend />
        <div id="grid-start" />
        <Grid />
      </div>
    </AppContextProvider>
  );
}

export default App;
