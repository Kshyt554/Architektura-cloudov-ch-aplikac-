import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditTaskForm = ({ show, handleClose, handleEditTask }) => {
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("must-have");
  const [editTaskState, setEditTaskState] = useState("in-progress");
  const [editTaskTime, setEditTaskTime] = useState(""); 
  const [editTaskTags, setEditTaskTags] = useState(""); 

  const handleEditClick = () => {
    handleEditTask({
      name: editTaskName,
      description: editTaskDescription,
      priority: editTaskPriority,
      state: editTaskState,
      time: editTaskTime, 
      tags: editTaskTags, 
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={editTaskDescription}
              onChange={(e) => setEditTaskDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTaskPriority">
            <Form.Label>Task Priority</Form.Label>
            <Form.Control
              as="select"
              value={editTaskPriority}
              onChange={(e) => setEditTaskPriority(e.target.value)}
            >
              <option value="must-have">Must Have</option>
              <option value="should-have">Should Have</option>
              <option value="could-have">Could Have</option>
              <option value="dont-have">Don't Have</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTaskState">
            <Form.Label>Task State</Form.Label>
            <Form.Control
              as="select"
              value={editTaskState}
              onChange={(e) => setEditTaskState(e.target.value)}
            >
              <option value="in-progress">In Progress</option>
              <option value="solved">Solved</option>
              <option value="waiting">Waiting</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTaskTime">
            <Form.Label>Time (hours)</Form.Label>
            <Form.Control
              type="number"
              value={editTaskTime}
              onChange={(e) => setEditTaskTime(e.target.value)}
              placeholder="Enter time in hours"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editTaskTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={editTaskTags}
              onChange={(e) => setEditTaskTags(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditClick}>
          Edit Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskForm;