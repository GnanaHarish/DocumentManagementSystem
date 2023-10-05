import bodyParser from 'body-parser';
import express from 'express';

import fileRoute from '../client/routes/fileRoute.js'
import folderRoute from '../client/routes/folderRoute.js'



const app = express();

app.use(express.json());

app.use("/api/file", fileRoute);
app.use("/api/folder", folderRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

