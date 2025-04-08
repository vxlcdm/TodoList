import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const todoKey = 'keyOfTodos';

const Todox = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [viewContent, setViewContent] = useState('');

   
    
   
    const showTodoList=() => {
        const storedTodos = localStorage.getItem(todoKey);
        if (storedTodos) {
            try {
                const parsed = JSON.parse(storedTodos);
                if (Array.isArray(parsed)) setTodos(parsed);
            } catch (err) {
                console.error('Invalid localStorage JSON:', err);
            }
        }
    }

       

    useEffect(()=>{
        showTodoList();
    },[])

    
    


    const handleAddOrUpdate = () => {
        if (!input.trim()) return;

        if (editIndex !== null) {
            const updated = [...todos];
            updated[editIndex] = input;
            setTodos(updated);
            localStorage.setItem(todoKey, JSON.stringify(updated));
            setEditIndex(null);
        } else {
            const updated = [...todos, input];
            setTodos(updated);
            localStorage.setItem(todoKey, JSON.stringify(updated));
            

        }

        setInput('');
    };

    const handleDelete = (index) => {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated);
        localStorage.setItem(todoKey, JSON.stringify(updated));
    };

    const handleEdit = (index) => {
        setInput(todos[index]);
        setEditIndex(index);
    };

    const handleView = (todo) => {
        setViewContent(todo);
        setViewOpen(true);

    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 ,
            // border: "1px solid red"
        }}>
            <Typography variant="h4" align="center" gutterBottom>
                TASK MASTER
            </Typography>




            <Stack direction="row" spacing={2} sx={{ mb: 4 ,
            }}>
                <TextField
                    fullWidth
                    label="Enter a todo"
                    variant="outlined"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddOrUpdate}>
                    ADD {/* {editIndex !== null ? 'Update' : 'Add'} */}
                </Button>
            </Stack>




            <List>
                {todos.map((todo, index) => {
                    return(
                        <>
                    <ListItem
                        key={index}
                        sx={{
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            mb: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <ListItemText primary={todo} />
                        <Stack direction="row" spacing={1}>
                            <Button size="small" variant="outlined" onClick={() => handleView(todo)}>
                                View
                            </Button>
                            <Button size="small" variant="outlined" onClick={() => handleEdit(index)}>
                                Edit
                            </Button>
                            <Button size="small" variant="outlined" onClick={() => handleDelete(index)}>
                                Delete
                            </Button>
                        </Stack>
                    </ListItem>
                    </>)  })}
            </List>



            <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
                <DialogTitle>Todo</DialogTitle>
                <DialogContent>
                    <Typography>{viewContent}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>



        </Container>
    );
};

export default Todox;
