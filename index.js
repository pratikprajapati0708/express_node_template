const express= require('express');
const app = express();
const zod = require("zod");
const schema = zod.array(zod.number());

app.use(express.json())

// const schema = zod.object({
//     email : zod.string(), //email
//     password : zod.string(),// pass-altlest 8 char
//      country : z.literal("IN").or(z.literal("US")), //  IN,US
//     country: z.array(z.number())
// })

app.post('/heath-checkup',(req,res)=>{
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(response.success){
        res.send({
            response
        })
    }
    else{
        res.status(411).send({
            message : "Please provide valid inputs"
        })
    }

});
app.listen(3000)