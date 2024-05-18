import React, { useState } from "react";

/*
const [username, setUsername] = useState("");
Initializes state for the username input field (username) is the state variable
and setUsername is the function to update this state. It's initialized with an empty string.

const [password, setPassword] = useState("");
Initializes state for the password input field (password) is the state variable,
and setPassword is the function to update this state. It's initialized with an empty string.

const [error, setError] = useState(null);
Initializes state for handling errors (error) is the state variable
and setError is the function to update this state. It's initialized as null.
*/
export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  /*
async function fetchData() {...}
This function is responsible for making a 
GET request to https://fsa-jwt-practice.herokuapp.com/signup
and logging the response data to the console.
Immediately invoked when the component renders.
*/
  async function fetchData() {
    const response = await fetch(
      "https://fsa-jwt-practice.herokuapp.com/signup"
    );
    const result = await response.json();
    console.log(result);
  }
  fetchData();

  /*
async function handleSubmit(event) {...} 
Defines an async function named handleSubmit, which handles form submission.
It's triggered when the form is submitted.

event.preventDefault();
Prevents the default form submission behavior to avoid page reload.

Makes a POST request to https://fsa-jwt-practice.herokuapp.com/signup
with the username and password data from the state.
Logs the response data to the console and throws an error 
if the response is not ok (HTTP status not in the 200-299 range).
Catches any errors that occur during the fetch operation
and sets the error state accordingly.
*/
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
