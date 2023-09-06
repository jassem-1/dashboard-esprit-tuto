import React, { useState, useEffect, useRef } from 'react';
import './NotesComponent.css';

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  // Use refs to access the dialog elements
  const userDialogRef = useRef(null);
  const noteDialogRef = useRef(null);

  useEffect(() => {
    // Fetch the list of users from your backend API when the component mounts
    fetchUsersFromBackend()
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    // Fetch the list of notes from your backend API when the component mounts
    fetchNotesFromBackend()
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  useEffect(() => {
    // Add event listeners to close dialogs when clicking outside
    const handleClickOutside = (event) => {
      if (
        userDialogRef.current &&
        !userDialogRef.current.contains(event.target) &&
        noteDialogRef.current &&
        !noteDialogRef.current.contains(event.target)
      ) {
        setIsUserDialogOpen(false);
        setIsNoteDialogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotesFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/notes'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return [];
    }
  };

  const fetchUsersFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/users'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const handleAddNoteClick = () => {
    setIsUserDialogOpen(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsUserDialogOpen(false);
    setIsNoteDialogOpen(true);
  };

  const handleNoteSubmit = () => {
    if (newNote.trim() !== '') {
      const noteData = {
        title: selectedUser.name,
        content: newNote,
      };

      // Make a POST request to save the note
      fetch('http://localhost:8080/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      })
        .then(response => response.json())
        .then(savedNote => {
          // Add the saved note to the notes state
          setNotes([...notes, savedNote]);
        })
        .catch(error => console.error('Error saving note:', error));

      setNewNote('');
      setSelectedUser(null);
      setIsNoteDialogOpen(false);
    }
  };

  const handleCloseUserDialog = () => {
    setIsUserDialogOpen(false);
  };

  const handleCloseNoteDialog = () => {
    setIsNoteDialogOpen(false);
  };

  return (
    <div className="notes-box">
      <div className="notes-header">
        <h2>My Notes</h2>
      </div>
      <div className="notes-content">
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note.title}: {note.content}
          </div>
        ))}
      </div>
      <div className="add-note">
        <button onClick={handleAddNoteClick}>Add a Note</button>
      </div>

      {/* User Selection Dialog */}
      {isUserDialogOpen && (
        <div className="user-dialog" ref={userDialogRef}>
          <h3>Select a User</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => handleUserSelect(user)}>
                {user.name}
              </li>
            ))}
          </ul>
          <button onClick={handleCloseUserDialog}>Cancel</button>
        </div>
      )}

      {/* Note Input Dialog */}
      {isNoteDialogOpen && (
        <div className="note-dialog" ref={noteDialogRef}>
          <h3>Add a Note for {selectedUser.name}</h3>
          <input
            type="text"
            placeholder="Write your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={handleNoteSubmit}>Submit</button>
          <button onClick={handleCloseNoteDialog}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default NotesComponent;
