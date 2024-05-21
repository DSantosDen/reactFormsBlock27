import React, { useState } from "react";
import "../App.css";

/*The Authenticate function is a functional component that takes a single prop: token.
successMessage: Stores a message indicating successful authentication. Initially set to null.
error: Stores any error messages that occur during the authentication process. Also initially set to null
asynchronous function triggered when the button is clicked. It performs the actual authentication request
*/
export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    console.log("Button clicked");
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);

      const username = result.data.username;

      const welcomeMessage = `Welcome User: ${username}`;

      setSuccessMessage(welcomeMessage);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  /*This section renders a simple UI consisting of:
-A heading saying "Authenticate!"
-Conditionally rendered paragraphs displaying either the success message or the error message, depending on what is present in the component's state.
-A button labeled "Authenticate Token!" that triggers the `handleClick` function when clicked*/
  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p className="successStyle">{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
