// GridGame.js
// =======================================
// 🌟 FINAL PROJECT: GRID ADVENTURE GAME 🌟
//
// This interactive web application showcases your understanding of core JavaScript,
// React, DOM manipulation, interactivity, and modern best practices. Navigate
// through the grid to reach the goal, avoid obstacles, provide feedback, and contact us!
// =======================================

import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";

// --- GAME CONFIGURATION CONSTANTS ---

// The dimensions of the grid
const ROWS = 10;
const COLS = 15;

// Goal location (player must reach to win)
const GOAL_X = 14;
const GOAL_Y = 10;

// Pre-defined obstacle positions stored for fast lookup using Set (for efficiency)
const OBSTACLE_POSITIONS = new Set([
  "2,1", "3,2", "5,3", "7,4", "9,5", "11,6", "13,7", "5,8", "8,9", "10,10"
]);

// Symbols for the grid
const PLAYER = "😀";
const GOAL = "🏁";
const OBSTACLE = "⛰️";
const EMPTY = "▫️";

// --- LAZY LOADING CONTACT FORM ---
// Contact form is only loaded if and when needed (after game victory & feedback submission)
const LazyContactForm = lazy(() => import("./ContactForm"));

/**
 * Small beep function plays different sound frequencies for events.
 * Uses the Web Audio API for real-time sound synthesis.
 * Defensive coding ensures no crash on unsupported browsers.
 */
function beep(frequency, duration = 150) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = "square";
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration / 1000);
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    // Ignore if audio context fails (e.g., in some browsers/environments)
  }
}

/**
 * Helper function to build a visual string row for each line of the grid.
 * This is a pure function, does not alter state.
 * Uses grid coordinates and places the right symbol for player, obstacle, empty, or goal.
 */
function buildRow(row, playerX, playerY) {
  let result = "";
  for (let x = 1; x <= COLS; x++) {
    const key = `${x},${row}`;
    if (x === playerX && row === playerY) result += PLAYER; // Draw player at its location
    else if (x === GOAL_X && row === GOAL_Y) result += GOAL; // Draw goal
    else if (OBSTACLE_POSITIONS.has(key)) result += OBSTACLE; // Draw obstacles
    else result += EMPTY; // Fill every other cell
  }
  return result;
}

/**
 * MAIN COMPONENT: GridGame
 * Contains all logic, state, event handlers, rendering, and UI flow.
 * Demonstrates React's hooks for managing component state and effects.
 */
export default function GridGame() {
  // --- GAME STATE HOOKS ---

  // Track the player's current coordinates
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  // Track if the player has won
  const [won, setWon] = useState(false);

  // For feedback & contact forms display logic
  const [showForm, setShowForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // A string for error/status messages
  const [status, setStatus] = useState("");

  // --- FEEDBACK FORM STATE ---
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  // Holds feedback after successful submission
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  /**
   * Resets the game & all forms.
   * Demonstrates useCallback for event handler stability and React best practice.
   */
  const resetGame = useCallback(() => {
    setX(1);
    setY(1);
    setWon(false);
    setShowForm(false);
    setShowContactForm(false);
    setStatus("");
    setFeedback("");
    setRating(0);
    setSubmittedFeedback(null);
    // Clear any saved drafts from localStorage
    localStorage.removeItem("feedbackDraft");
    localStorage.removeItem("ratingDraft");
  }, []);

  /**
   * Handles moving the player and responding to obstacles or goal.
   * Checks for obstacle collision, triggers victory on goal, and provides
   * user feedback via sound and UI.
   */
  const movePlayer = useCallback((newX, newY) => {
    const cellKey = `${newX},${newY}`;
    if (OBSTACLE_POSITIONS.has(cellKey)) {
      setStatus("Obstacle hit! Resetting...");
      beep(150); // Sad beep for hit
      setTimeout(resetGame, 1500); // Automatically reset game after a short delay
      return;
    }
    setX(newX);
    setY(newY);
    setStatus("");
    beep(500); // Short beep for valid move
    if (newX === GOAL_X && newY === GOAL_Y) {
      setWon(true);                  // You’ve reached the goal!
      setStatus("Victory! 🎉");
      beep(1000, 300);               // Happy beep for winning
    }
  }, [resetGame]);

  // --- KEYBOARD MOVEMENT EVENT HANDLING ---
  // Adds WASD keyboard controls for accessibility and fun.
  useEffect(() => {
    const handler = (e) => {
      if (won) return; // Prevent moves after victory
      let nx = x, ny = y;
      if (e.key === "w" && y > 1) ny--;
      else if (e.key === "s" && y < ROWS) ny++;
      else if (e.key === "a" && x > 1) nx--;
      else if (e.key === "d" && x < COLS) nx++;
      else return; // Ignore unrelated keys
      movePlayer(nx, ny);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler); // Clean up!
  }, [x, y, won, movePlayer]);

  // --- FORM DRAFT PERSISTENCE (localStorage) ---
  // Save feedback and rating in progress to localStorage. Encourages persistence and best UX if user reloads.
  useEffect(() => {
    localStorage.setItem("feedbackDraft", feedback);
  }, [feedback]);
  useEffect(() => {
    localStorage.setItem("ratingDraft", rating.toString());
  }, [rating]);
  useEffect(() => {
    const draft = localStorage.getItem("feedbackDraft");
    if (draft) setFeedback(draft);
    const ratingDraft = localStorage.getItem("ratingDraft");
    if (ratingDraft) setRating(parseInt(ratingDraft, 10));
  }, []);

  // --- BUILD THE GRID FOR RENDERING ---
  // This uses the buildRow helper to generate each line of the grid as a string.
  const rows = [];
  for (let row = 1; row <= ROWS; row++) {
    rows.push(
      <div key={row} style={{ fontSize: "24px", fontFamily: "monospace" }}>
        {buildRow(row, x, y)}
      </div>
    );
  }

  //-- BUTTON/ARROW HANDLER (for grid movement controls under the grid) --
  const handleMove = (direction) => {
    if (won) return;
    if (direction === "up" && y > 1) movePlayer(x, y - 1);
    if (direction === "down" && y < ROWS) movePlayer(x, y + 1);
    if (direction === "left" && x > 1) movePlayer(x - 1, y);
    if (direction === "right" && x < COLS) movePlayer(x + 1, y);
  };

  /**
   * FEEDBACK FORM SUBMISSION HANDLER
   * Ensures both feedback & rating are provided—alerts user otherwise.
   * After submit, triggers contact form.
   */
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      alert("Please enter your feedback.");
      return;
    }
    if (rating === 0) {
      alert("Please rate the game.");
      return;
    }
    setSubmittedFeedback({ text: feedback, rating }); // Store user's feedback
    setShowForm(false);
    setFeedback("");
    setRating(0);
    localStorage.removeItem("feedbackDraft");
    localStorage.removeItem("ratingDraft");
    setShowContactForm(true); // Start contact workflow
  };

  /**
   * STAR RATING COMPONENT
   * Provides interactive star-based rating input.
   * Demonstrates component props and event handling.
   */
  const Star = ({ filled, onClick }) => (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: filled ? "#FFD700" : "#CCC",
        fontSize: "30px",
        userSelect: "none",
        marginRight: 5,
      }}
      aria-label={filled ? "Star filled" : "Star empty"}
    >
      ★
    </span>
  );

  // --- RENDERING SECTION (JSX) ---
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {/* TITLE */}
      <h2>🌟 Grid Adventure Game 🌟</h2>

      {/* VICTORY MESSAGE & FEEDBACK BUTTON
          Shown only after winning, nicely centered and spaced.
      */}
      {won && !showForm && !showContactForm && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <span
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "22px",
              marginBottom: "5px"
            }}
          >
            Victory! 🎉
          </span>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
            }}
            aria-label="Give feedback on game"
          >
            🎉 You won! Give feedback
          </button>
        </div>
      )}

      {/* STATUS MESSAGE (in red unless won) */}
      {!won && (
        <p style={{ color: "red" }}>{status}</p>
      )}

      {/* THE GRID ITSELF */}
      {rows}

      {/* ON-SCREEN MOVEMENT BUTTONS; accessible & responsive */}
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "60px 60px 60px",
          gridTemplateRows: "60px 60px 60px",
          gap: 10,
          justifyContent: "center",
          marginTop: 10,
          userSelect: "none",
        }}
      >
        {/* Up arrow */}
        <button
          onClick={() => handleMove("up")}
          disabled={won}
          aria-label="Move Up"
          style={{
            gridColumn: 2,
            gridRow: 1,
            fontSize: "24px",
            cursor: won ? "default" : "pointer",
            borderRadius: "10px",
            backgroundColor: "#87ceeb",
            border: "none",
            color: "white",
          }}
        >
          ↑
        </button>
        {/* Left arrow */}
        <button
          onClick={() => handleMove("left")}
          disabled={won}
          aria-label="Move Left"
          style={{
            gridColumn: 1,
            gridRow: 2,
            fontSize: "24px",
            cursor: won ? "default" : "pointer",
            borderRadius: "10px",
            backgroundColor: "#4682b4",
            border: "none",
            color: "white",
          }}
        >
          ←
        </button>
        {/* Placeholder for center */}
        <div
          style={{
            gridColumn: 2,
            gridRow: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "#333",
            userSelect: "none",
          }}
          aria-hidden="true"
        ></div>
        {/* Right arrow */}
        <button
          onClick={() => handleMove("right")}
          disabled={won}
          aria-label="Move Right"
          style={{
            gridColumn: 3,
            gridRow: 2,
            fontSize: "24px",
            cursor: won ? "default" : "pointer",
            borderRadius: "10px",
            backgroundColor: "#4682b4",
            border: "none",
            color: "white",
          }}
        >
          →
        </button>
        {/* Down arrow */}
        <button
          onClick={() => handleMove("down")}
          disabled={won}
          aria-label="Move Down"
          style={{
            gridColumn: 2,
            gridRow: 3,
            fontSize: "24px",
            cursor: won ? "default" : "pointer",
            borderRadius: "10px",
            backgroundColor: "#87ceeb",
            border: "none",
            color: "white",
          }}
        >
          ↓
        </button>
      </div>

      {/* --- FEEDBACK FORM --- */}
      {showForm && (
        <form onSubmit={handleSubmitFeedback} style={{ marginTop: 20 }}>
          <div>
            <label htmlFor="feedback" style={{ fontWeight: "bold" }}>
              Your feedback:
            </label>
            <br />
            <textarea
              id="feedback"
              rows={4}
              cols={40}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here..."
              required
              style={{ fontSize: "16px", padding: "8px" }}
            />
          </div>
          {/* STAR RATING FIELD */}
          <div style={{ marginTop: 10, fontWeight: "bold" }}>Rate the game:</div>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= rating}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
            }}
          >
            Submit Feedback
          </button>
        </form>
      )}

      {/* --- FEEDBACK THANK-YOU BOX --- */}
      {submittedFeedback && !showContactForm && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "2px solid #4caf50",
            borderRadius: 10,
            backgroundColor: "#e8f5e9",
          }}
          aria-live="polite"
        >
          <h3>Thanks for your feedback!</h3>
          <p>
            <strong>Rating:</strong> {submittedFeedback.rating} / 5
          </p>
          <p>
            <strong>Comments:</strong> {submittedFeedback.text}
          </p>
        </div>
      )}

      {/* --- CONTACT FORM (DYNAMICALLY LOADED) --- */}
      {showContactForm && (
        <div style={{ marginTop: 30 }}>
          <h3>Contact Us</h3>
          {/* Suspense fallback shows a loading message while ContactForm loads */}
          <Suspense fallback={<div>Loading contact form…</div>}>
            <LazyContactForm />
          </Suspense>
          <button
            onClick={resetGame}
            style={{
              marginTop: 20,
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
            }}
            aria-label="Reset game"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
