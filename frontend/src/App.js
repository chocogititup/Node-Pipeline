import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell" style={{ padding: 12 }}>
      <div className="panel">
        <PipelineToolbar />
      </div>
      <div className="panel">
        <PipelineUI />
      </div>
      <div className="panel" style={{ padding: 12, display: 'flex', justifyContent: 'center' }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
