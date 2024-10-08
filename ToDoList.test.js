import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('renders without crashing', () => {
    render(<TodoList />);
  });

  test('renders the title', () => {
    render(<TodoList />);
    const titleElement = screen.getByText(/Assignment 2: ToDo List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders form elements', () => {
    render(<TodoList />);
    const todoInput = screen.getByPlaceholderText(/Add todo item/i);
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const addButton = screen.getByText(/Add Todo/i);

    expect(todoInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('renders todo items', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('tab');
    expect(todoItems.length).toBe(4); 
  });

  test('renders todo items with correct titles', () => {
    render(<TodoList />);
    const todoTitles = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4'];
    todoTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); ]

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  test('applies correct variant based on due date', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('tabpanel');
    const todoTabs = screen.getAllByRole('tab');
    let variants = [];
    todoItems.forEach((item) => {
      const input = item.querySelector('input[type="date"]');
      const dueDate = input.value; 
      const expectedVariant = getVariant(dueDate); 
      variants.push(expectedVariant);
    });
    todoTabs.forEach((item, index) => {
      expect(item).toHaveClass(`list-group-item-${variants[index]}`);
    });
  });
});
