import dotenv from 'dotenv';
import ConnectDB from './database/Database_index.js';
import { app } from './app.js';

dotenv.config({
    path:'./.env'
})


ConnectDB()
.then(()=>{
    app.on("error",(err)=>{
     console.log(err);
     throw err;
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Moogbodb Connection failed!!!",err);
})
    