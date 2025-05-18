import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateProject({ show, handleClose, handleCreate }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleCreateClick = () => {
    handleCreate(newProjectName, newProjectDescription);
    setNewProjectName('');
    setNewProjectDescription('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newProjectName">
            <Form.Label style={{ fontSize: '1.5rem' }}>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newProjectDescription">
            <Form.Label style={{ fontSize: '1.5rem' }}>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              style={{ fontSize: '1.2rem', height: '100px' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProject;