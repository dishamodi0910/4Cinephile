"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { addMovieInSearchHistory } from '@/actions/admin_features/addMovieInSearchHistory';
import { useSession } from 'next-auth/react';

const Page = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();

    const fetchData = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/recommendations/?search=${query}`);
            const data = await response.json();
            setRecommendations(data.recommendations);
            if (data.recommendations) {
                addMovieInSearchHistory(session?.user.id, query);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
        setLoading(false);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchData(searchQuery);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="container mx-auto p-4">
             <h2 className="text-center mb-4 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Movie Recommendations!</span></h2>
             <br/>
            <form onSubmit={handleSearchSubmit} className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for a movie..."
                    className="border border-gray-300 px-4 py-2 rounded-md mr-2 focus:outline-none"
                />
                <Button variant={"outline_red"} type="submit">Get Recommendations</Button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading...</p>
                ) : recommendations.length > 0 ? (
                    recommendations.map((movie, index) => (
                        <div key={index} className="border border-red-400 p-4 rounded-md">
                            <h2 className="text-xl font-semibold">{movie}</h2>
                        </div>
                    ))
                ) : (
                    <p className="text-red-500">No recommendations found. Try searching for a different movie.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
