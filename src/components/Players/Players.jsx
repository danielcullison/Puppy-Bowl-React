import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Players.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import SearchBar from "../SearchBar/SearchBar";
import CreatePlayerForm from "../CreatePlayerForm/CreatePlayerForm";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players"
        );

        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }

        const json = await response.json();

        if (Array.isArray(json.data.players)) {
          setPlayers(json.data.players);
        } else {
          throw new Error("Unexpected data format");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = (id) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleAddPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { id: Date.now(), ...newPlayer }
    ]);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="players-container">
      <h1>2024 Puppy Bowl React!</h1>
      <SearchBar query={searchQuery} onQueryChange={handleSearchQueryChange} />
      <ul className="players-list">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <li key={player.id}>
              <img src={player.imageUrl} alt={`Image of ${player.name}`} />
              <div className="player-info">
                <h2>{player.name}</h2>
                <h3>{player.breed}</h3>
              </div>
              <Link to={`/${player.id}`}>
                <button className="see-details-button">See Details</button>
              </Link>
              <DeleteButton onClick={() => handleDelete(player.id)} />
            </li>
          ))
        ) : (
          <p className="no-players-message">No players available.</p>
        )}
      </ul>
      <CreatePlayerForm onAddPlayer={handleAddPlayer} />
    </div>
  );
};

export default Players;