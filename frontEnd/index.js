const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const app = express()
//*midleware - intermediarios
app.use(cors())
//*Es para servir archvios statics
app.use('/uploads',express.static('uploads/'))

const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post('/api/upload-image',upload.single('image'),(req,res)=>{
    const {filename} = req.file
    const imageUrl = `http://localhost:3000/uploads/${filename}`;
    return res.json({ imageUrl });
})

app.listen(3000,()=>{
    console.log("Corriendo en el puerto 3000");
})





