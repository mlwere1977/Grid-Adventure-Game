// Import render and screen utilities from React Testing Library
// - `render` lets us mount a React component for testing purposes
// - `screen` provides convenient queries to find elements in the rendered output
import { render, screen } from '@testing-library/react';

// Import the top-level App component that we want to test
import App from './App';

// Define a test case (a named, isolated unit of testing)
// The test's name describes what we expect: "renders learn react link"
test('renders learn react link', () => {
  // Render the App component into a virtual DOM environment
  render(<App />);

  // Use the screen object to query the DOM for an element containing text
  // This uses a case-insensitive regex to find some text matching "learn react"
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element was found and is actually in the document
  // This checks that our UI rendered the expected content
  expect(linkElement).toBeInTheDocument();
});
