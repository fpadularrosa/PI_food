import './css/App.css';
import LandingPage from './components/LandingPage';
import RouteIndex from './components/RouteIndex';
import { Route, Switch } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import { Provider } from 'react-redux';
import store from './redux/store';
import CreateRecipe from './components/CreateRecipe';
import { Link } from "react-router-dom";

function App() {

  return (
    <Provider store={store}>
    <div className="App">
    <Link style={{'text-decoration': 'none'}} to='/home'>
        <h1 className='henry'>Henry Food</h1> <br></br>
      </Link>
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route path='/home'>
          <SearchBar/>
          <RouteIndex/>
        </Route>
        <Route exact path='/recipe/:recipeId' render={ ({ match }) => <RecipeDetails recipeId={match.params.recipeId}/> }>
        </Route>
        <Route exact path='/recipe'>
          <CreateRecipe/>
        </Route>
      </Switch>
    </div>
    </Provider>
  );
}

export default App;
