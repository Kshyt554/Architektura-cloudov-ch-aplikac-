import React, { useState, useEffect } from "react";
import { Button, ListGroup, Form, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Projects from '../project_data.json';
import Tasks from '../task_data.json';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskDetail from '../components/TaskDetail';
import EditTaskForm from "../components/EditTaskForm";
import CommentForm from  '../components/Comment';

const TaskPage = () => {
  const { projectId } = useParams();
  const selectedProject = Projects.find((project) => project.id === projectId && project !== null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate fetching tasks data
    setTimeout(() => {
      if (projectId) {
        // Fetch tasks for a specific project
        setTasks(Tasks.filter((task) => task.projectId === Number(projectId)));
      } else {
        // Fetch all tasks
        setTasks(Tasks);
      }
      setLoading(false);
    }, 1000); 
  }, [projectId]);

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowCreateModal(false);
  };

  const handleTaskDetail = (task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    // Close the detail modal if the deleted task was open
    setSelectedTask(null);
    setShowTaskDetail(false);
  };

  const handleEditTask = (editTask) => {
    const updatedTasks = tasks.map((task) =>
    task.id === editTask.id ? { ...task, ...editTask } : task
  );
  setTasks(updatedTasks);
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    setShowCreateModal(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const stateFilter = selectedState === 'all' || task.state === selectedState;
    const priorityFilter = selectedPriority === 'all' || task.priority === selectedPriority;
    return stateFilter && priorityFilter;
  });

  const stateOptions = ['Waiting', 'InProgress', 'Solved','all'];
  const priorityOptions = ['Must Have', 'Should Have', 'Could Have','Dont Have','all'];

  return (
    <div style={{ padding: '20px', maxWidth: '1450px', margin: 'auto' }}>
      <h2>Tasks Page</h2>
      {projectId && <h5>projectId {projectId}</h5>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {selectedProject && projectId && (
            <>
              <h3>Project Details</h3>
              <p>Name: {selectedProject.name}</p>
              <p>Description: {selectedProject.description}</p>
            </>
          )}

          <Form>
            <Form.Group className="mb-3">
              <DropdownButton
                as={ButtonGroup}
                title={`State: ${selectedState}`}
                id="state-dropdown"
                onSelect={(state) => setSelectedState(state)}
                style={{ fontSize: "1.1rem", minWidth: "150px", marginBottom: "0px", }}
              >
                {stateOptions.map((state) => (
                  <Dropdown.Item key={state} eventKey={state}>
                    {state}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group className="mb-3">
              <Dropdown
                onSelect={(priority) => setSelectedPriority(priority)}
                style={{ fontSize: "1.1rem", marginBottom: "40px" }}
              >
                <Dropdown.Toggle variant="primary"  style={{ padding: "14px 22px" }}>
                  {`Priority: ${selectedPriority}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {priorityOptions.map((priority) => (
                    <Dropdown.Item key={priority} eventKey={priority}> 
                      {priority}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>

          <h3>Tasks</h3>
          <Button
      
            style={{ fontSize: "1.1rem", marginLeft: "1300px", marginTop:"-100px" }}
            class="btn btn-primary btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            Create Task
          </Button>
          <ListGroup>
            {filteredTasks.map((task) => (
              <ListGroup.Item key={task.id} style={{fontSize:"1.2rem", borderWidth:"2.5px"}}>
                {task.name } 
                <div>
                  <p>Description: {task.description}</p>
                  </div> 
                  <div class="text-primary">
                   <p>Priority: {task.priority}</p>
                    </div> 
                    <div class="text-warning">
                     <p>State: {task.state}</p> 
                      </div>
                <div class="float-right">
                <Button variant="primary" style={{ fontSize: "1.1rem", padding: "5px 12px" }} class="btn btn-info"  onClick={() => handleTaskDetail(task)}>
                  Details
                </Button>{" "}
                <Button variant="danger" style={{ fontSize: "1.1rem", padding: "5px 12px" }} onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>{" "}
                <Button variant="warning" style={{ fontSize: "1.1rem", padding: "5px 12px" }} onClick={() => setShowEditModal(true)}>
                  Edit
                </Button>
               
                <Button variant="info" style={{ fontSize: "1.1rem", padding: "5px 12px", marginLeft: "5px" }} onClick={() => setShowCommentModal(true)}>
                  Comment
                </Button>
              
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <CreateTaskForm
            show={showCreateModal}
            handleClose={() => {
              setShowCreateModal(false);
              setSelectedTask(null);
            }}
            handleCreateTask={handleCreateTask}
            handleUpdateTask={handleUpdateTask}
            task={selectedTask}
          />

          <CommentForm
           show={showCommentModal}
           handleClose={() => {
            setShowCommentModal(false);
            setSelectedTask(null);
          }}
          />

          <EditTaskForm
         show={showEditModal}
         handleClose={() => {
           setShowEditModal(false);
           setSelectedTask(null);
         }}
         handleEditTask={handleEditTask}
         handleUpdateTask={handleUpdateTask}
         task={selectedTask}
          />
          {selectedTask && (
            <TaskDetail
              task={selectedTask}
              show={showTaskDetail}
              handleClose={handleCloseTaskDetail}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaskPage;