import React, { useState } from "react"; 
// Import React and its useState hook for managing component state

import GridGame from "./GridGame";      
// Import your main game component that handles gameplay logic and UI

import ContactForm from "./ContactForm"; 
// Import the contact form component, shown after game completion


/**
 * App component serves as the top-level container for the application.
 * It manages which major part of the app to show: the game or the contact form.
 */
export default function App() {
  // State to keep track if the game has finished or not (initially false)
  const [gameFinished, setGameFinished] = useState(false);

  /**
   * Handler function called by GridGame when the game ends.
   * It flips the state to true, triggering the UI to switch to the contact form.
   */
  const handleGameEnd = () => {
    setGameFinished(true);
  };

  /**
   * The JSX return renders either:
   * - The GridGame component (if the game is still in progress)
   * - The ContactForm component (once the game is finished)
   * 
   * This conditional rendering reacts to the `gameFinished` state, 
   * showcasing React’s declarative UI updates based on state changes.
   */
  return (
    <div>
      {!gameFinished ? (
        // Render the grid game, passing down a prop so it can notify when it ends
        <GridGame onGameEnd={handleGameEnd} />
      ) : (
        // Render the contact form once the game is finished
        <ContactForm />
      )}
    </div>
  );
}
