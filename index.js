const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const authRouter = require('./routers/auth');
const { authenticate } = require('./middleware')
const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use(express.static('public'));
app.use(authenticate);

app.use((req, res) => {
  if(!req.user){
    return res.send("Invalid username or password.");
  }
  const thing = req.path.replace('/','');
  let things = req.user[thing];
  if(!things){
    things = [];
    req.user[thing] = things;
  }
  if(req.method === "POST"){
    things.push(req.body);
    return res.json(req.body);
  }
  if(req.method === "GET"){
    return res.json(things);
  }
  return res.send("not found");
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
