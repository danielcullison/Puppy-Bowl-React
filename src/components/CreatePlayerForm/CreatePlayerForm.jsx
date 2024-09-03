import React, { useState } from "react";
import "./CreatePlayerForm.css";

const CreatePlayerForm = ({ onAddPlayer }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && breed && imageUrl) {
      onAddPlayer({ name, breed, imageUrl });
      setName("");
      setBreed("");
      setImageUrl("");
    }
  };

  return (
    <form className="create-player-form" onSubmit={handleSubmit}>
      <h2>Create New Player</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player's name"
        />
      </label>
      <label>
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Player's breed"
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
        />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
};

export default CreatePlayerForm;