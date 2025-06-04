import React, { useState, useEffect } from "react";
import { Button, ListGroup, Form, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CreateTaskForm from '../components/CreateTaskForm';
import TaskDetail from '../components/TaskDetail';
import EditTaskForm from "../components/EditTaskForm";
import CommentForm from  '../components/Comment';

const TaskPage = () => {
  const { projectId } = useParams(); // projectId — строка ObjectId из URL
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [loading, setLoading] = useState(true);

  // Загрузка проектов при монтировании
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          const errorText = await response.text();  // Получаем тело ошибки для диагностики
      console.error(`Ошибка загрузки задач, статус: ${response.status}`, errorText);
          throw new Error('Ошибка при загрузке проектов');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Загрузка задач при изменении projectId
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const url = projectId ? `/api/tasks/project/${projectId}` : `/api/tasks`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке задач');
        }
        const data = await response.json();
        console.log("Задачи из API:", data); // Лог для отладки
        const tasksWithId = data.map(task => ({ ...task, id: task._id }));
        setTasks(tasksWithId);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  // Обновляем selectedProject при изменении projects или projectId
  useEffect(() => {
    if (projects.length > 0 && projectId) {
      const proj = projects.find(p => p._id === projectId);
      setSelectedProject(proj || null);
    }
  }, [projects, projectId]);

  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, projectId }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Server error details:', errData);
        throw new Error(errData.message || 'Error creating task');
      }
      const createdTask = await response.json();
      setTasks([...tasks, { ...createdTask, id: createdTask._id }]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert(`Ошибка создания задачи: ${error.message}`);
    }
  };

  const handleTaskDetail = (task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== taskId));
      setSelectedTask(null);
      setShowTaskDetail(false);
    } catch (error) {
     console.error("Error deleting task:", error);
    alert(`Ошибка удаления задачи: ${error.message}`);
    }
  };

  const handleEditTask = async (editTask) => {
    try {
      const response = await fetch(`/api/tasks/${editTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editTask),
      });

      const updated = await response.json();
      setTasks(tasks.map((task) => (task.id === updated._id ? { ...updated, id: updated._id } : task)));
      setShowEditModal(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
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

  const stateOptions = ['waiting', 'in-progress', 'solved', 'all'];
  const priorityOptions = ['must-have', 'should-have', 'could-have', 'dont-have', 'all'];

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
                style={{ fontSize: "1.1rem", minWidth: "150px", marginBottom: "0px" }}
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
                <Dropdown.Toggle variant="primary" style={{ padding: "14px 22px" }}>
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
            style={{ fontSize: "1.1rem", marginLeft: "1300px", marginTop: "-100px" }}
            className="btn btn-primary btn-lg"
            onClick={() => setShowCreateModal(true)}
          >
            Create Task
          </Button>
          <ListGroup>
            {filteredTasks.map((task) => (
              <ListGroup.Item key={task.id} style={{ fontSize: "1.2rem", borderWidth: "2.5px" }}>
                {task.name}
                <div>
                  <p>Description: {task.description}</p>
                </div>
                <div className="text-primary">
                  <p>Priority: {task.priority}</p>
                </div>
                <div className="text-warning">
                  <p>State: {task.state}</p>
                </div>
                <div className="float-right">
                  <Button
                    variant="primary"
                    style={{ fontSize: "1.1rem", padding: "5px 12px" }}
                    className="btn btn-info"
                    onClick={() => handleTaskDetail(task)}
                  >
                    Details
                  </Button>{" "}
                  <Button
                    variant="danger"
                    style={{ fontSize: "1.1rem", padding: "5px 12px" }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="warning"
                    style={{ fontSize: "1.1rem", padding: "5px 12px" }}
                    onClick={() => {
                      setSelectedTask(task);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
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
            projectId={projectId}
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
