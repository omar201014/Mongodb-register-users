const express = require('express');   // import express//
const app = express();              // create an instance of express //
const port = process.env.PORT || 3000;      // set the port to listen to //
const users = require('./routers/user');  // import the user router //
const tasks = require('./routers/tasks');  // import the tasks router //

require('./db/mongoose');
app.use(express.json());
app.use(users);
app.use(tasks);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



