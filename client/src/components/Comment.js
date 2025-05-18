import React, { useState } from 'react';
import { Modal, Button, ModalFooter} from 'react-bootstrap';


const Chat = ({show, handleClose}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };
  return (
  <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title style={{ fontSize: '2rem' }}>Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <div>
      <div> 
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'} class="alert alert-dark" role="alert">
            {message.text}
          </div>
          
        ))}
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          value={newMessage}
          aria-label="Recipient's username" 
          aria-describedby="basic-addon2"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <div class="input-group-append">
        <button class="btn btn-outline-secondary" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
    <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
    </ModalFooter>
      </Modal.Body>
      </Modal>
  );
};

export default Chat;
