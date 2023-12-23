import AppBar from './components/AppBar';
import Grid from './components/Grid';
import { AppContextProvider } from './contexts/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <div className="w-full h-full flex flex-col">
        <AppBar />
        <Grid />
      </div>
    </AppContextProvider>
  );
}

export default App;
