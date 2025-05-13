import React, { useEffect, useState } from 'react';
import { getAllPosts } from '@/actions/admin_features/getAllPosts';
import { updatePostLikes } from '@/actions/user_features/updatePostLikes';
import { updatePostDislikes } from '@/actions/user_features/updatePostDislikes';
import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {Button} from '@/components/ui/button';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import Image from 'next/image';

const ViewPosts = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLike = async (postId : any) => {
    try {
      await updatePostLikes(postId);
      fetchData();
    } catch (error) {
      console.error('Error updating post likes:', error);
    }
  };

  const handleDislike = async (postId : any) => {
    try {
      await updatePostDislikes(postId);
      fetchData();
    } catch (error) {
      console.error('Error updating post dislikes:', error);
    }
  };

  return (
    <div className='m-6'>
       <h2 className="text-center mb-4 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Latest Posts!</span></h2>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card className='border-red-300 border-2'>
              <CardContent>
                <Typography variant="h6" component="h2">
                <div className='heading_movie_name'>{post.post_title}</div>
                </Typography>
                <Image src={post.post_image_url} width={500} height={400} alt={'Post Image missing'} />
                <Typography variant="body2" color="GrayText">
                <div className='content'>  {post.post_description} </div>
                </Typography>
                <Typography variant="body2" color="GrayText">
                <div className='pt-2 text-sm content_email mb-3' > {post.publisher_email} </div>
                </Typography>
                <Button onClick={() => handleLike(post.id)} variant={'outline_red'} className='w-1/2 text-2xl p-3'>👍 {post.number_of_likes}</Button> 
                <Button onClick={() => handleDislike(post.id)} variant={'outlined_red_bordered'} className='w-1/2 text-2xl p-3'>👎 {post.number_of_dislikes}</Button> 
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewPosts;
