const express = require('express');
const bodyParser = require("body-parser")




const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/auth',require("./routes/Auth"));
app.use('/api',require("./routes/Api"));



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
