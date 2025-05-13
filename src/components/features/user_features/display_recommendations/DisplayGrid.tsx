"use client"
import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material';

const DisplayGrid = ({ recommendations }) => {
  return (
    <Grid container spacing={2} className='ml-2 mt-3 mr-3'>
      {recommendations.map((recommendation, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card variant="outlined" className='border-red-400'>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <div className='heading_movie_name'>{recommendation.name}</div> 
              </Typography>
              <Typography variant="body2">
                <div className="text-lg">Year: {recommendation.year}</div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};


export default DisplayGrid
