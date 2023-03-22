import express from 'express';
import { addNote, deleteNote, getAllNotes, getById, updateNote } from '../controllers/Notes-controller';

const router = express.Router();

router.get('/',getAllNotes)
router.post('/add',addNote)
router.put('/update/:id',updateNote)
router.get('/:id',getById)
router.delete('/:id',deleteNote)

export default router;

