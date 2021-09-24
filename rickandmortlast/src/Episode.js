import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";
import "./episode.css";

function Episode() {
  const { episodeId } = useParams();
  const { data, status } = useQuery(`episode-${episodeId}`, () =>
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <div className="Episode">
      <Typography variant="h2">{data.name}</Typography>
      <Typography variant="body1">{data.air_date}</Typography>
      <br />
      <Typography variant="h4">Characters</Typography>
      {data.characters.map((character) => {
        const characterUrlParts = character.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return <Character id={characterId} key={characterId} />;
      })}
    </div>
  );
}

function Character({ id }) {
  const { data, status } = useQuery(`character-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <main>
      <article key={id}>
        <div class="CharacterCard">
          <ul>
            <li component={RouterLink} to={`/characters/${id}`}>
              <a href={`/characters/${id}`}>
                <img src={data.image} alt="characterImage" />
                <h2>{data.name}</h2>
                <h3>{data.gender}</h3>
                <h4>{data.status}</h4>
              </a>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}

export default Episode;
