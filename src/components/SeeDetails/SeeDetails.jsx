import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SeeDetails.css";

const SeeDetails = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2405-FTB-ET-WEB-PT/players/${playerId}`
        );

        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }

        const json = await response.json();

        if (json.data.player) {
          setPlayer(json.data.player);
        } else {
          throw new Error("Unexpected data format");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="see-details-container">
      {player ? (
        <div>
          <h1>{player.name}</h1>
          <p>Team ID: {player.teamId}</p>
          <img src={player.imageUrl} alt={`Image of ${player.name}`} />
          <p>
            <strong>Breed:</strong> {player.breed}
          </p>
          <p>
          <strong>Status:</strong> {player.status}
          </p>
        </div>
      ) : (
        <p className="no-player-message">Player not found.</p>
      )}
    </div>
  );
};

export default SeeDetails;
