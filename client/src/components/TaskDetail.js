import React from "react";
import { Modal, Button } from "react-bootstrap";

const TaskDetail = ({ task, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {task.name}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>State:</strong> {task.state}</p>
        <p><strong>Time:</strong> {task.time}</p>
        <p><strong>Tags:</strong> {task.tags}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetail;