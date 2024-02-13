const express = require("express");
const app = express();

const port = 3002;

app.use(express.json());

//storing data temporarily
const users = [{
    name : "John",
    kidneys : [{
        healthy : true
    }]
}];

//query params 
// function calculateSum(n){
//     let ans = 0;
//     for(let i = 0;i<n;i++){
//         ans = ans +i;
//     }
//     return ans;
// }
app.get('/',(req,res)=>{
    // const n = req.query.n;
    // const ans = calculateSum(n);
    // res.send(ans.toString());
    const johnkidneys =  users[0].kidneys;
    const numberofkidneys = johnkidneys.length;
    let noofhealthykidneys = 0;
    for(let i=0; i< johnkidneys.length;i++){
        if(johnkidneys[i].healthy){
            noofhealthykidneys = noofhealthykidneys+1;
        }
    }
    const numberofunhealthykidneys = numberofkidneys - noofhealthykidneys;
    res.json({
        numberofkidneys,noofhealthykidneys,numberofunhealthykidneys
    })
})

//for post send in body
app.post('/',(req,res)=>{
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy : ishealthy
    })
    res.json({
        message : 'DONE !'
    })
})

app.put('/',(req,res)=>{
    for(let i =0;i< users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({})
})

app.delete('/',(req,res)=>{
if(isAtleastOneHealthyKidney()){
    const newkidneys= [];
    for(let i =0;I<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newkidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newkidneys;
    res.json({msg : "done"})
}else{
    res.status(411).json({
        msg: "You have no bad kidneys"
    })
}
})
function isAtleastOneHealthyKidney(){
    let atleaseoneUnhealthykindey = false;
    for(let i =0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleaseoneUnhealthykindey = true;
        }
    }
    return atleaseoneUnhealthykindey
}

app.listen(port);