import React from 'react';
import { API_URL } from '../../Config';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SingleMovie.module.css';
import DeleteMovie from './DeleteMovie';


const SingleMovie = () => {
    const [movie, setMovie] = useState([]);
    const { _id } = useParams();
    const navigate = useNavigate();


useEffect(() => {
    fetch(`${API_URL}/movies/${_id}`)
    .then(res => res.json())
    .then(data => setMovie(data));
}, [_id]);

if (!movie) {
    return <h2>Coming soon..</h2>;
}

const editMovie = () => {
    navigate(`/movies/${_id}/edit`);
}

return (
<>
    <div className="movie-item">
        <div className={styles.card}>
            <h2 className={styles.title}>{movie.title}</h2>
            <p>Description: {movie.description}</p>
            <p>Release date: {movie.release_date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
            <p>Runtime: {movie.runtime} minutes</p>
            <iframe
                width="560"
                height="315"
                src={movie.trailer}
            ></iframe>
            <a className={styles.button} target='_' href={movie.trailer}>Click If Player Not Working</a>
            <button className={styles.edit} onClick={editMovie}>Edit</button>
            <DeleteMovie id={_id} />
        </div>
    </div>
</>
);
}

export default SingleMovie;