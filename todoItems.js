import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Container, Form, Button } from 'react-bootstrap';

const TodoList = () => {
  // Initial static array of todos
  const [todos, setTodos] = useState([
    { title: 'Todo 1', description: 'Lorem ipsum dolor sit amet...', dueDate: '2024-04-03' },
    { title: 'Todo 2', description: 'Sed auctor nunc nec nisi...', dueDate: '2024-04-06' },
    { title: 'Todo 3', description: 'Pellentesque habitant morbi...', dueDate: '2024-04-09' },
    { title: 'Todo 4', description: 'Suspendisse potenti...', dueDate: '2024-04-11' },
  ]);

  // Function to determine Bootstrap variant based on due date
  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  return (
    <Container>
      <h1>Assignment 2: Brian's ToDo List</h1>

      {/* Tab container for the ToDo items */}
      <Tab.Container id="todo-list" defaultActiveKey="#link0">
        <Row>
          <Col sm={4}>
            {/* ListGroup for todo titles */}
            <ListGroup>
              {todos.map((todo, index) => (
                <ListGroup.Item
                  action
                  href={`#link${index}`}
                  variant={getVariant(todo.dueDate)}
                  key={index}
                >
                  {todo.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col sm={8}>
            {/* Tab content for todo descriptions */}
            <Tab.Content>
              {todos.map((todo, index) => (
                <Tab.Pane eventKey={`#link${index}`} key={index}>
                  <h4>{todo.title}</h4>
                  <p contentEditable>{todo.description}</p>
                  <Form.Control type="date" defaultValue={todo.dueDate} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Form to add a new ToDo item */}
      <h2>Add a new ToDo</h2>
      <Form>
        <Form.Group controlId="formTodoTitle">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control type="text" placeholder="Add todo item" />
        </Form.Group>

        <Form.Group controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Todo
        </Button>
      </Form>
    </Container>
  );
};

export default TodoList;
