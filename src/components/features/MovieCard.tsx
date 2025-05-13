"use client"
import Image from "next/image"
import React, { useState, useEffect } from 'react';

const MovieCard = ({ title }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=2e15e7ec&t=${title}}`);
        const data = await response.json();
        console.log(data);
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [title]);

  return (
    <>

      {movieDetails ? (
        <>
        <div className='flex flex-col mx-auto p-5'>
        <img src={movieDetails.Poster} width={300} height={300} className='rounded-lg'></img>
       
       <div className="text-white text-center text-2xl pt-1.5">
         <b>{movieDetails.title}</b></div>
       
        <span className="text-white pt-1.5">{movieDetails.Released}</span>
        
          <p className="mb-1"><strong>Released:</strong> {movieDetails.Released}</p>
          <p className="mb-1"><strong>Genre:</strong> {movieDetails.Genre}</p>
          <p className="mb-1"><strong>Director:</strong> {movieDetails.Director}</p>
          <p className="mb-1"><strong>Actors:</strong> {movieDetails.Actors}</p>
          <p className="mb-1"><strong>Plot:</strong> {movieDetails.Plot}</p>
          </div>
        </>
      ) : (
        <p className="mt-2 text-gray-600">Loading...</p>
      )}
    </>
  );
};

export default MovieCard;
