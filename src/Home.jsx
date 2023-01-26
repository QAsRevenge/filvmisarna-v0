import { useStates } from './utilities/states';
import { Link } from 'react-router-dom';


export default function Home() {

  // Connect to the main state so we can read the movies
  // (that have been fetched an put in the state in the App component)
  const s = useStates('main');

  return <>
    <h2>Topplistan</h2>
    {s.movies.map(({ path, images }) =>
      <Link to={path} className="movie">
        <img src={'/images/' + images[0]} />
      </Link>
    )}
  </>;
}