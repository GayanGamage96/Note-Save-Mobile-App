import Notes from "../models/Notes";

export const getAllNotes = async (req,res,next)=>{
    let notes;
    try{
        notes = await Notes.find();
    }catch(err){
        return console.log(err);
    }
    if(!notes){
        return res.status(404).json({message:"No notes found"})
    }
    else{
        return res.status(200).json({notes})
    }
};

export const addNote = async ( req,res,next) =>{
     const {title , description} = req.body;
     const note = new Notes({
        title,description
     });

     try{
        await note.save()
     }catch(err){
        return console.log(err);
     }
     
     return res.status(200).json({note})
     
};


export const updateNote = async(req,res,next)=>{
    const {title,description}=req.body;
    const noteId = req.params.id;
    let note;
    try{
         note = await Notes.findByIdAndUpdate(noteId,{
            title,description
         })
    }catch(err){
          return console.log(err);
    }
    if(!note){
        return res.status(500).json({message:"unable to update"})
    }else{
        return res.status(200).json({note})
    }
    

};

export const deleteNote = async (req,res,next) =>{
    const noteId = req.params.id;
    let note;
    try{
        note = await Notes.findByIdAndRemove(noteId)
    }catch(err){
        console.log(err);
    }
    if(!note){
        return res.status(500).json({message:'unable to delete'})
    }else{
        return res.status(200).json({message:'successfully deleted'})
    }
}


export const getById = async(req,res,next)=>{
    const id = req.params.id;
    let note;
    try{
          note = await Notes.findById(id);
    }catch(err){
        return console.log(err);
    }

    if(!note){
        return res.status(404).json({message:"No note Found"});
    }
    else{
        return res.status(200).json({note});
    }
}