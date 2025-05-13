import React, { useEffect, useState } from 'react';
import { getAllPosts } from '@/actions/admin_features/getAllPosts';
import { deletePost } from '@/actions/admin_features/deletePost'; 
import { Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
const ViewPostsAdmin = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setError("");
    setSuccess("")
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

  const handleDelete = async (postId) => {
    try {
      const data = await deletePost(postId); 
      setSuccess(data.success);
      setError(data.error);
      fetchData(); 
    } catch (error) {
      console.error('Error deleting post:', error);
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
                <div className='content'> {post.post_description} </div>
                </Typography>
                <Typography variant="body2" color="GrayText">
                 <div className='pt-2 text-sm content_email mb-3' >Post Made by : {post.publisher_email}</div> 
                </Typography>
                <Typography variant="body2" color="GrayText">
                  <span><span className=" text-center w-1/2 p-2 bg-red-200 text-red-900 like_dislike">👍 {post.number_of_likes}</span> &nbsp;&nbsp;    <span className=" text-center w-1/2 p-2 bg-red-200 text-red-900 like_dislike"> 👎 {post.number_of_dislikes}</span></span>
                </Typography>
                <br/>
                <Button onClick={() => handleDelete(post.id)} variant={'outline_red'} color="error">Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewPostsAdmin;
