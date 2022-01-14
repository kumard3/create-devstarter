
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export const Homepage = () => {
return (
  <h1>hello </h1>
)
}

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/"   element={  <HomePage />}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
