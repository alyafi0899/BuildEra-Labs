import { useState } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import CMS from './pages/CMS';

type View = 'site' | 'cms';

export default function App() {
  const [view, setView] = useState<View>('site');

  if (view === 'cms') {
    return <CMS onBack={() => setView('site')} />;
  }

  return (
    <>
      <Nav onCMSClick={() => setView('cms')} />
      <Home onCMSClick={() => setView('cms')} onBuildEraClick={() => window.open('/buildera/', '_blank')} />
    </>
  );
}
