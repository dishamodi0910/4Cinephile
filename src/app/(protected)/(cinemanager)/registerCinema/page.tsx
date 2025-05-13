"use client"
import { getVerifiedCinemas } from '@/actions/cinemanager_features/getVerifiedCinemas'
import RoleTabs from '@/components/features/RoleTabs'
import AddNewCinema from '@/components/features/cinemanager_features/AddNewCinema'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const RegisterCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getVerifiedMoviesList = async () => {
      getVerifiedCinemas(session?.user?.id).then((data) => {
        setCinemas(data);
      });
    }
    getVerifiedMoviesList();
  }, [session?.user.id]);
  
  return (
    <div className="container">
      <div className="header">
        <RoleTabs role={"CINEMANAGER"} />
      </div>
           
      <div className="cinemas-list">
      <h2 className="text-center mb-4 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Your Verified Cinemas!</span></h2>
        <table className="cinemas-table">
          <thead className='bg-red-300 text-red-800'>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Tagline</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map((cinema) => (
              <tr key={cinema.id}>
                <td>{cinema.name_of_cinema}</td>
                <td>{cinema.address_of_cinema}</td>
                <td>{cinema.city_of_cinema}</td>
                <td>{cinema.country_of_cinema}</td>
                <td>{cinema.tagline_of_cinema}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-cinema">
        <AddNewCinema />
      </div>
    </div>
  )
}

export default RegisterCinema;
