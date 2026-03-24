import { useState, useCallback } from 'react';
import Loader from './components/Loader';
import Experience from './components/Experience';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}
      {!loading && <Experience />}
    </>
  );
}

export default App;
