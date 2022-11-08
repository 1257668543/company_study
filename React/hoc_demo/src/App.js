import './App.css';
import * as crypto from 'crypto-js';

function App() {
  return (
    <div className="App">
      <h1>origin paramStr：</h1>
      <p>appSource=ai_vision_machine_platform&key=921b7a3e56b246a5a89b1d14146f3a64&t=1666163684</p>
      <h1>generate sign：</h1>
      <p>{crypto.MD5('appSource=ai_vision_machine_platform&key=921b7a3e56b246a5a89b1d14146f3a64&t=1666163684').toString().toLowerCase()}</p>
    </div>
  );
}

export default App;
