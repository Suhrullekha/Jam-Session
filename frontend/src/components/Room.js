import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//handles the main page of the app once inside a room
export default function Room() {
  const { roomCode } = useParams(); // Accessing the room code from the URL
  const [state, setState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    getRoomDetails();}, []); // Empty dependency array means this effect will run once, similar to componentDidMount

  //fetches the details we want and updates the states so forces a rerender 
  const getRoomDetails = () => {

    fetch('/api/get-room' + '?code=' + roomCode)
      .then(response => response.json())
      .then(data => {
        setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause || false,
          isHost: data.is_host || false,
        });
      })
      .catch(error => {
        console.error("Error fetching room details:", error);
        // Handle error, e.g., set default state or show an error message
      });
  }

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {state.votesToSkip}</p>
      <p>Guest Can Pause: {state.guestCanPause.toString()}</p>
      <p>Host: {state.isHost.toString()}</p>
    </div>
  );
}

