import BootScreen from './components/boot/BootScreen';
import Desktop from './components/desktop/Desktop';
import useBootSequence from './hooks/useBootSequence';
import './App.css';

function App() {
  const { status, progress } = useBootSequence();

  if (status === 'DESKTOP') {
    return <Desktop />;
  }

  return <BootScreen statusOverride={status} progressOverride={progress} />;
}

export default App;
