
import { useDispatch } from 'react-redux';
import './App.css';
import LogViewerComponent from './pages/LogViewerComponent';
import { useEffect } from 'react';
// import { fetchLogs } from './api/longViewer';

function App() {
  const dispatch = useDispatch();

  // Dispatch an action to fetch logs when the component mounts
  useEffect(() => {
    // dispatch(fetchLogs());
  }, [dispatch]);

  return (
    <div className="App">
      <LogViewerComponent />
    </div>
  );
}

export default App;
