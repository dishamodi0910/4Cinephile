"use client"
import React, { useEffect, useState } from 'react';
import RoleTabs from '@/components/features/RoleTabs';
import MovieCard from '@/components/features/MovieCard';
import { getStats } from '@/actions/getStats';
import { getTheGenreBasedOutput } from '@/actions/getTheGenreBasedOutput';
import { BarChart, PieChart } from '@/components/chartNew';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);
  const [names, setNames] = useState([]);
  const [count, setCount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStats();
        console.log('The result is : ', result);
        setStats(result.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }

      try{
        const result2 = await getTheGenreBasedOutput();
        console.log("The result based on genre is : ", result2);
        setNames(result2.names);
        setCount(result2.count); 
        console.log("Names are : ", result2.names);
        console.log("Count are : ", result2.count);
      }
      catch(error)
      {
        console.log("Error is : ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
  
        <RoleTabs role={'ADMIN'} />
      </div>
      <div>
      <div className="text-center pt-6">
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Upcoming Movies</h1>
      </div>

        <div className="grid grid-cols-2 gap-5 pt-2 m-4 mr-6 pl-8">
          {stats.length ? (
            stats.map((movieTitle, index) => <MovieCard key={index} title={movieTitle} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 m-4 mr-6">
        <div className="chart-container">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Highest Voted Genres</h1>
          <BarChart labels={names} data={count} />
        </div>
        <div className="chart-container">
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Highest Watched Genres</h1>
          <PieChart labels={names} data={count} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
