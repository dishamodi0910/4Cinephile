import mongoose from 'mongoose';

const movieDataSchema = new mongoose.Schema({
    date:{
        type : String,
        required : true
    },
    func_name : {
        type : String,
        required : true
    },
});


const MovieData = mongoose.models.tempdata || mongoose.model('tempdata', movieDataSchema);

export default MovieData;
