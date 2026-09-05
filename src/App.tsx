import { useState } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import CMS from './pages/CMS';
import BuildEra from './pages/BuildEra';

type View = 'site' | 'cms' | 'buildera';

export default function App() {
  const [view, setView] = useState<View>('site');

  if (view === 'cms') {
    return <CMS onBack={() => setView('site')} />;
  }

  if (view === 'buildera') {
    return <BuildEra onBack={() => setView('site')} />;
  }

  return (
    <>
      <Nav onCMSClick={() => setView('cms')} />
      <Home onCMSClick={() => setView('cms')} onBuildEraClick={() => setView('buildera')} />
    </>
  );
}
