"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { getRecommendationsOfUserBasedOnId } from '@/actions/getRecommendationsOfUserBasedOnId'
import DisplayGrid from '@/components/features/user_features/display_recommendations/DisplayGrid'

const DisplayRecommendationsBasedOnHistory = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const [recommendations, setRecommendations] = useState([{}]);

  useEffect(() => {
    const fetchRecommendations = async () => {
        let recommended_movies : any[] = [];
        if (userId) {
        const searchedMovies = await getRecommendationsOfUserBasedOnId(userId);

        console.log(searchedMovies);
        console.log(searchedMovies[0]);
        const movie1 = searchedMovies[0];
        const movie2 = searchedMovies[1];

        const response = await fetch(`http://127.0.0.1:5000/recommendations/?search=${movie1}`);
        const data = await response.json();
        recommended_movies = recommended_movies.concat(data.recommendations);
        
        const response2 = await fetch(`http://127.0.0.1:5000/recommendations/?search=${movie2}`);
        const data2 = await response2.json();
        recommended_movies = recommended_movies.concat(data2.recommendations);

        console.log("Recommended movies are : ",recommended_movies);

        var abc = parseMovies(recommended_movies);
        setRecommendations(abc);

      }
    };

    fetchRecommendations();
  }, [userId]);

  const parseMovies = (input : any[]) => {
    const parsedMovies : any[] = [];
    input.forEach((movie) => {
      const [name, year] = movie.split('(');
      const trimmedName = name.trim();
      const trimmedYear = year.trim().replace(/\D/g, ''); 
      parsedMovies.push({
        name: trimmedName,
        year: trimmedYear
      });
    });

    return parsedMovies;
};

  return (
    <div>
      {/* <h1>Recommendations Based on Search History</h1> */}
      <DisplayGrid recommendations={recommendations} />
    </div>
  )
}

export default DisplayRecommendationsBasedOnHistory
