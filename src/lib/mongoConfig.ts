import mongoose from "mongoose"
export default async function connectWithMongo() {
    try{
        await mongoose.connect("mongodb+srv://dishamodi9000:Dmodi%400910@dishacluster.q3eiurk.mongodb.net/4Cinephile");
        const connection = mongoose.connection;
        console.log("Collection names : ", connection.collections);
        connection.on("error", () => {
            console.log("Error while connecting to MongoDb");
            process.exit();
        });
        
        connection.on("open" , ()=>{
            console.log("Mongoose successfully connected");
        })
        
        console.log("In Moongoose connection check");
        return connection;
    }
    catch(error)
    {
        console.log("Error while connecting to MongoDb");
        console.log(error);
    }
}