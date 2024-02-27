

let express = require("express");
let fs = require("fs")

let app = express();

app.use(express.json())


app.post("/register", (req, res) => {

    const { username, password, email } = req.body

    fs.readFile("./local.json", (err, data) => {

        if (!username || !password || !email) {

            res.status(404).send("error")
        } else {

            const user = JSON.parse(data);

            const fund = user.find((item) => item.username === username && item.password === password)

            if (fund) {
                res.send("username and password already exit")
            } else {
                user.push(req.body)

                fs.writeFile("./local.json", JSON.stringify(user, null, 2), (err) => {

                    res.send("successful")
                })

            }
        }

    })

})


app.get("/login",(req,res)=>{

    fs.readFile("./local.json",(err,data)=>{
        
       const user=JSON.parse(data);
        const {username,password}=req.body
        // console.log(req.body);
       let userData=user.find((item)=>item.username===username && item.password===password)

       if(userData){
        res.send("login success");
       }else{
        res.json({message:"invalid"})
       }
   
    })

})

app.listen(3143, () => {

    console.log("server running");
})
