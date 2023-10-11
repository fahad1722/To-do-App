import React, { useState } from 'react';
import {
    Box,
    Stack,
    Typography,
    TextField,
    Checkbox,
    Button,
    Container,
    IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Title = () => {
    return (
        <Box
            bgcolor="primary.main"
            padding="8px"
            borderRadius="8px"
            boxShadow="4px 4px 4px 4px rgba(0, 0, 0, 0.25)"
            marginTop="10px"
            marginBottom="30px"
        >
            <Typography variant="h3" align="center" color="white">
                To-Do App
            </Typography>
        </Box>
    );
};

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        setEditMode(false);
    };

    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditMode(true);
        setNewTask(tasks[index].text);
    };

    const updateTask = () => {
        if (editIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex].text = newTask;
            setTasks(updatedTasks);
            setEditMode(false);
            setEditIndex(-1);
            setNewTask('');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'done') return task.done;
        if (filter === 'notdone') return !task.done;
        return true;
    });

    const handleTextFieldKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (editMode) {
                updateTask();
            }
            else {
                addTask();
            }
        }
    };

    return (
        <Container>
            <Title />

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <TextField
                    label={editMode ? 'Edit task' : 'Add a task'}
                    variant="outlined"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleTextFieldKeyPress}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={editMode ? updateTask : addTask}
                >
                    {editMode ? 'Update' : 'Add'}
                </Button>
            </Stack>

            <Stack
                direction="row"
                marginY="20px"
                alignItems="center"
                justifyContent="flex-end"
            >
                <Typography sx={{
                    fontFamily: 'inherit',
                    fontSize: { xs: '18px', md: '35px' },
                    fontWeight: 'bold',
                    marginRight: 'auto'
                }}>
                    Tasks
                </Typography>

                <Typography sx={{
                    fontFamily: 'inherit',
                    fontSize: { xs: '15px' },
                    marginRight: '8px'
                }}
                >Filters:
                </Typography>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'default'}
                    onClick={() => setFilter('all')}
                    sx={{
                        fontSize: { xs: '10px', md: '12px' },
                    }}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'done' ? 'outlined' : 'default'}
                    onClick={() => setFilter('done')}
                    sx={{
                        fontSize: { xs: '10px', md: '12px' }
                    }}
                >
                    Done
                </Button>
                <Button
                    variant={filter === 'notdone' ? 'outlined' : 'default'}
                    onClick={() => setFilter('notdone')}
                    sx={{
                        fontSize: {
                            xs: '10px', md: '12px'
                        }
                    }}
                >
                    Not Done
                </Button>
            </Stack>

            <Box>
                {filteredTasks.map((task, index) => (
                    <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        bgcolor={task.done ? 'lightgrey' : 'white'}
                        borderRadius="8px"
                        boxShadow="4px 4px 4px 4px rgba(0, 0, 0, 0.25)"
                        p={0.8}
                        marginY={1}
                    >
                        <Checkbox checked={task.done} onChange={() => toggleTask(index)} />
                        <Typography
                            variant="body1"
                            sx={{ textDecoration: task.done ? 'line-through' : 'none' }}
                        >
                            {task.text}
                        </Typography>

                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton color="primary" onClick={() => handleEdit(index)}>
                                <Edit />
                            </IconButton>
                            <IconButton color="error" onClick={() => deleteTask(index)}>
                                <Delete />
                            </IconButton>
                        </div>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default TodoApp;
