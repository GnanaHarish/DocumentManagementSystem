import mongoose from 'mongoose';


const fileSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    folder_id:{
        type: String,
    },
    owner:{
        type: String,
        ref: 'User',
        path: 'id',
        required: true,
    }
});

fileSchema.index({owner: 1});
fileSchema.index({folder_id: 1});


const File = mongoose.model('File', fileSchema);

export default File;