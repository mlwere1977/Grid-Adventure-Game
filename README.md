# Grid Adventure Game

- Welcome to **Grid Adventure Game** a fun, interactive React-based web app where you navigate an emoji character through a grid filled with obstacles to reach a goal. 
- Along the way, you get to experience smooth keyboard and button controls, sound effects, feedback submission, and a contact form—all demonstrating modern JavaScript, React hooks, and thoughtful UX.

## Project Summary

- This project is all about building a dynamic, interactive web app from the ground up, showcasing core JavaScript skills alongside modern React best practices. 
- You play by moving a little player emoji across a grid avoiding mountain-like obstacles to reach a finish flag.

What makes it stand out? It combines meaningful interactivity (keyboard + on-screen controls), real-time sound feedback, form processing with validation, local draft saving, dynamic component loading, and accessibility considerations.

It’s designed as a clean, readable, and nicely documented codebase, perfect for demonstrating coding mastery of:

- Functional programming concepts
- React component-based design with hooks
- DOM rendering and manipulation via state and props
- Form validation and user feedback
- Asynchronous loading for optimized performance

## Key Features and Functionality

- **Grid-Based Movement**: Move the player using W/A/S/D keys or on-screen arrow buttons.
- **Obstacles & Goal**: Avoid impassable grid cells symbolized by mountains and race to the flag to win.
- **Audio Feedback**: Hear different beeps when moving, hitting an obstacle, or winning.
- **Victory & Feedback Flow**: After winning, a nicely aligned victory message appears, prompting the player to submit feedback.
- **Interactive Feedback Form**: Rate the game with interactive stars and leave comments; feedback drafts auto-save in localStorage.
- **Dynamic Contact Form**: After feedback submission, a contact form loads using React lazy/Suspense for efficient resource loading.
- **Responsive and Accessible**: UI elements are keyboard navigable and styled for readability with meaningful ARIA labels.
- **State Persistence**: Draft feedback and ratings are saved and restored automatically.
- **Sound Defensive Coding**: Audio plays reliably but silently fails on unsupported browsers.
- **Clean UI Design**: Uses monospace fonts for grid display and consistent, approachable form styling.

## Technologies Used

- **React** (v19+) — functional components, hooks (`useState`, `useEffect`, `useCallback`), lazy loading
- **JavaScript ES6+** — arrow functions, template literals, Sets, and other modern syntax
- **CSS Modules** — scoped styling for the contact form with clean, user-friendly styles
- **Web Audio API** — simple sound generation for game feedback
- **React Testing Library** — for unit testing of components and UI rendering
- **localStorage API** — to persist form draft data across page reloads
- **Asynchronous Programming** — dynamic import of contact form with React Suspense
- **Accessibility best practices** — ARIA labels, keyboard event handling, reduced motion support (in base CSS)

## Instructions for Use

1. **Clone or Download** the repository to tge local machine.

2. **Install dependencies**  
   Open the terminal and run:
   ```
   npm install
   ```
   This will grab all the packages necessary for running and testing the app.

3. **Start the development server**  
   Run:
   ```
   npm start
   ```
   This opens the app in the browser, usually at `http://localhost:3000`.

4. **Play the game:**  
   Use the keyboard controls:
   - W: Move up  
   - A: Move left  
   - S: Move down  
   - D: Move right  

   Or click the on-screen arrow buttons to move the smiley player across the grid.

5. **Avoid the obstacles** (mountain emojis ⛰️) and reach the finish flag (🏁) to win.

6. **After winning**, a victory message and a "Give feedback" button appear centered above the grid.  
   Click the button to open a feedback form.

7. **Fill out the feedback and rate the game** using the star rating component; drafts save automatically. Submit the feedback to see a thank-you message.

8. **Once feedback is submitted**, the contact form loads dynamically so that the player can send there contact details or message.

9. **Restart the game** anytime with the "Restart Game" button that resets the grid and all form states.

## Additional Notes

- The players feedback and rating drafts are auto-saved, so if the player reloads the page mid-typing, the input is preserved.
- The contact form validates inputs like email format and phone number length to encourage quality submissions.
- The grid game provides audio cues for moves, obstacles, and victory, adding a bit of fun immersion.
- All UI elements are styled for accessibility and responsiveness, ensuring a comfortable experience on most devices.

Enjoy exploring this React-powered grid adventure! Whether you’re here to study the code structure, learn React hooks, or just have fun navigating and submitting feedback, this project pulls together many modern JavaScript and web development skills in a simple package.

If you want to extend it, consider adding animations, more obstacles, scoring, or multiplayer support — the foundation is ready for it.

Happy coding! 🚀