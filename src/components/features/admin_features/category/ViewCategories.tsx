import React, { useEffect, useState } from 'react';
import { getAllCategories } from '@/actions/admin_features/get_all_categories';
import { updateCategory } from '@/actions/admin_features/edit_category'; 
import { Grid, Card, CardContent, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {Button} from '@/components/ui/button';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

const ViewCategories = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEditOpen = (category) => {
    setEditingCategory(category);
    setEditedName(category.categoryname);
    setEditedDescription(category.category_description);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingCategory(null);
    setEditedName('');
    setEditedDescription('');
    setError("");
    setSuccess("");
  };

  const handleEditSave = async () => {
    try {
      await updateCategory(editingCategory?.id, { category_name: editedName, category_description: editedDescription }).then((data)=>{
        setError(data.error);
        setSuccess(data.success);
        if (!data.error) {
          fetchData();
          handleEditClose();
        }
      })
      
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className='m-6'>
       <h2 className="text-center mb-4 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Checkout the Categories!</span></h2>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card className='border-red-300 border-2'>
              <CardContent>
                <Typography variant="h6" component="h2">
                  <div className='heading'> {category.categoryname}</div> 
                </Typography>
                <Typography variant="body2" color="GrayText">
                  <div className='content'>{category.category_description}</div>
                </Typography>
                <Button onClick={() => handleEditOpen(category)} className='mt-2' variant={'outline_red'}>Edit</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormError message={error}/>
          <FormSuccess message={success}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant={"outline_red"}>Cancel</Button>
          <Button onClick={handleEditSave} variant="outlined_red_link">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewCategories;
