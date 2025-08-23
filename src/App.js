import { UseState } from './UseState';
import { UseReducer, useReducer } from './useReducer';

import './App.css';

function App() {
  return (
    <div className="App">
     <UseState name="UseState"/>
     <UseReducer name="use Reducer"/>
    </div>
  );
}

export default App;
