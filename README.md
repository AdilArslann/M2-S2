# Typing Speed Test App Readme

## Project Description

The Typing Speed Test App is a web application that allows users to test their typing speed and accuracy. Users are presented with a random piece of text fetched from a public API (PoetryDB API). The app provides a user-friendly interface to display the progress of the user's typing skills over time.

## Project File Structure

- `index.html`: The main HTML file for the Typing Speed Test App.
- `stats.html`: A separate HTML file for displaying user statistics and progress data.
- `js/`: The JavaScript folder containing the following files:
  - `poetryApi.js`: A module responsible for fetching a random piece of text from a the API.
  - `script.js`: The main JavaScript file for implementing the Typing Speed Test App's logic.
  - `stats.js`: A JavaScript file for handling statistics and progress tracking on the `stats.html` page.
- `css/`: The CSS folder containing the following files:
  - `stats.css`: CSS stylesheet for styling the statistics page (`stats.html`).
  - `style.css`: CSS stylesheet for styling the main application (`index.html`).

This file structure helps keep the project organized and separates the main application logic from statistics-related functionality.

### Additional Comments

- The app interacts with DOM elements for displaying text, user input, and results.
- Event listeners are used for user interactions, such as detecting input and resetting the test.
- User progress data is stored and retrieved using local storage.
- Error handling is implemented to handle failed API requests and other potential issues.
- The code is structured to allow for easy modification of key features without needing extensive changes.
- External CSS and JS libraries may be used if they are not directly related to the typing test logic.
- Code is documented with comments to explain non-trivial parts.

## Usage

To use the Typing Speed Test App, follow these steps:

1. Open the web application in a web browser.

2. The app will fetch a random piece of text for you to type.

3. Start typing the displayed text as accurately and quickly as possible.

4. Use the backspace key to correct any mistakes.

5. After 60 seconds, the timer will end, and the app will display your typing speed (WPM) and accuracy.

6. You can reset the test and try again by pressing "esc" and "enter" to restart.

7. Your progress data will be stored and displayed over time, indicating whether you have improved in your typing skills.

## Conclusion

The Typing Speed Test App provides an engaging way for users to test and improve their typing speed and accuracy. It fulfills the specified requirements and offers a user-friendly interface for a seamless typing experience. Enjoy testing and tracking your typing skills with this app!