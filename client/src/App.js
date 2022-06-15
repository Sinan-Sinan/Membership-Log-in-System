import './App.css';
import Reader from './components/reader.js'
import Spreadsheet from './components/spreadsheet.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div id="app">
      <Router>
        <h1>SparQ Studios</h1>
        <Switch>
          <Route path="/" exact component={() => <Reader />} />
          <Route path="/sheet" exact component={() => <Spreadsheet />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
