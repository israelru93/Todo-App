const mongoose= require('mongoose');

const conectMongodb=async ()=>{
 
    try{
        await mongoose.connect(process.env.CONECTION_URL)
        console.log('Db conected succ')

    }
    catch(error)
    {
        console.log(error)
        process.exit(1);
    }
}

module.exports=conectMongodb;