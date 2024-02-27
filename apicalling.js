const express = require('express');
const axios = require("axios");
const app = express();


app.listen(3003,()=>{

    console.log("server Running");
})


app.get("/",async(req,res)=>{

    try{
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
        res.json(data);
    }catch (error){
        res.json({ error : 'internal server error'})
    }
})

app.get("/:id",async(req,res)=>{

    const ProductId=req.params.id;
    try{
        const response = await axios.get(`https://fakestoreapi.com/products/${ProductId}`);
        const data = response.data;
        res.json(data);
    }catch(error){
        res.json({error:"product not found"})
    }
})


