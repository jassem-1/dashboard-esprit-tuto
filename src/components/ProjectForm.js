// ProjectForm.js
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ProjectForm = ({ open, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: projectName, description: projectDescription ,startDate:projectStartDate,endDate:projectEndDate});
    onClose();
   
  };
 
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            fullWidth
          />
          <TextField
          label="Start date"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
          fullWidth
        />
        <TextField
        label="Deadline (AA-MM-DD) "
        value={projectEndDate}
        onChange={(e) => setProjectEndDate(e.target.value)}
        fullWidth
      />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:"white"}} >Cancel</Button>
        <Button onClick={handleSubmit} sx={{color:"white"}} >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
