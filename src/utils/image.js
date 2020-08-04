const multer= require('multer')
const sharp = require('sharp')
const avatar = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG)$/)){
            return cb(new Error('Please upload an image.'))
        }
        cb(undefined,true)
    }

})
router.post('/users/me/avatar', auth, avatar.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
    req.user.avatar= buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})



router.get('/users/:id/avatar', async (req,res) =>{
    try{
        const user=  await Users.findById(req.params.id)
        if (!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e){
        res.status(404).send()
    }
})