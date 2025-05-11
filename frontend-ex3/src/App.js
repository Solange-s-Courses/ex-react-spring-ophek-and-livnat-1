import Header from "./components/header/Header";
import LeaderboardPage from "./components/leaderboard/LeaderboardPage";
import HomePage from "./components/homePage/HomePage";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';


/**
 * Root component of the application.
 * Manages cities state using useReducer and provides routing for different views.
 *
 * @returns {JSX.Element} The main application component.
 * @constructor
 */
function App() {


  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header/>}>
              <Route index element={<HomePage/>}/>
              <Route path="/Leaderboard" element = {<LeaderboardPage/>}/>
              <Route path="/About" element={<About/>}/>
              <Route path={"*"} element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}


export default App;