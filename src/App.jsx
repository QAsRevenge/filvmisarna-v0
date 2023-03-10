import { useStates } from './utilities/states';
import { useEffect } from 'react';
import { kebabify } from './utilities/kebabify';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './Home';
import FilmsAndTrailers from './FilmsAndTrailers';
import AboutUs from './AboutUs';
import Navbar from './Navbar';
import MovieDetail from './MovieDetail';
import Tickets from './Tickets';

export default function App() {

  // Declare a state "main" that we can use in as many components as we want
  const s = useStates('main', {
    // A menu used for the main menu and for routing
    menu: [
      { label: 'FilmVisarna', path: '/home', Component: Home },
      { label: 'Biljetter', path: '/tickets', Component: Tickets },
      { label: 'Filmer & Trailer', path: '/films-and-trailers', Component: FilmsAndTrailers },
      { label: 'Om oss', path: '/about-us', Component: AboutUs },
      { path: '/movie/:moviePath', Component: MovieDetail }
    ],
    movies: []
  });

  // Read the movies from json to the state
  useEffect(() => {
    (async () => {
      let movies = await (await fetch('/json/movies.json')).json();
      for (let movie of movies) {
        movie.path = '/movie/' + kebabify(movie.title);
      }
      s.movies = movies;
    })();
  }, []);

  return <BrowserRouter>
    <header>
      <Navbar />
    </header>
    <main>
      {/* Routing - display the correct component */}
      <Routes>
        {s.menu.map(({ path, Component }) =>
          <Route path={path} element={<Component />} />
        )}
      </Routes>
    </main>
    <footer></footer>
  </BrowserRouter>;
}