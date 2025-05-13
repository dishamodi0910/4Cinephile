import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import IntroTab from './IntroTab';
import { Grid } from '@mui/material'; 
const Introduction = () => {
  return (
    <div className="grid grid-cols-2 gap-8 py-8">
    <IntroTab heading={"🎬 Personalized Recommendations"} content={"Get tailored movie suggestions just for you, based on your preferences and viewing history. Enjoy a curated selection of films that perfectly match your taste."}></IntroTab>
    <IntroTab heading={"📰 Latest Posts"} content={"Stay updated with the latest news, interviews, and insights from the world of cinema. Dive into behind-the-scenes stories and industry developments."}></IntroTab>
    <IntroTab heading={"🎥 Discover Latest Movies"} content={" Stay ahead of the curve and explore the newest releases, upcoming films, and highly anticipated titles across various genres."}></IntroTab>
    <IntroTab heading={"🔍 Movie Analysis"} content={"Delve deeper into the cinematic experience with insightful analyses, reviews, and critiques of both classic masterpieces and contemporary works."}></IntroTab>
    </div>
  )
}

export default Introduction
