import { API_KEY, BASE_API_URL } from "../config/config";

const getMovies= async()=>{
    //const resultMovies = await( await fetch(`${BASE_API_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`)).json() as IMoviesResult;

   /* return {
        ...resultMovies,
        results : [...resultMovies.results.slice(0,19)] 
    };*/
    return await( await fetch(`${BASE_API_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`)).json();
}

export { getMovies };