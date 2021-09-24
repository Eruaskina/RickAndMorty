import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";
import "./character.css";

function Character() {
  const { characterId } = useParams();
  const { status, data } = useQuery(`character-${characterId}`, () =>
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  const locationUrlPars = data.location.url.split("/").filter(Boolean);
  const locationId = locationUrlPars[locationUrlPars.length - 1];

  return (
    <div className="Character">
      <Typography variant="h2">{data.name}</Typography>
      <div>
        <ul>
          <img src={data.image} alt="" />
          <li>
            <strong>Gender:</strong>
            {data.gender}
          </li>
          <li>
            <strong>Status:</strong>
            {data.status}
          </li>
          <li>
            <strong>Species:</strong>
            {data.species}
          </li>
          <li>
            <strong>From:</strong>
            {data.origin.name}
          </li>
          <li>
            <strong>Name:</strong>
            <Location id={locationId} />
          </li>
        </ul>
      </div>
      <br />
      <Typography variant="h4">Episodes</Typography>

      <span>
        ______________________________________________________________________
      </span>
      {data.episode.map((episode) => {
        const episodeUrlParts = episode.split("/").filter(Boolean);
        const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

        return <Episode id={episodeId} key={`episode-${episodeId}`} />;
      })}
    </div>
  );
}

function Episode({ id }) {
  const { data, status } = useQuery(`episode-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
  );

  if (status !== "success") {
    return null;
  }

  return (
    <article className="Episodes" key={id}>
      <Link
        component={RouterLink}
        to={`/episodes/${id}`}
        style={{ color: "Lightblue" }}
      >
        <Typography variant="h6">
          {data.episode}. {data.name} - {data.air_date}
        </Typography>
      </Link>
    </article>
  );
}

function Location({ id }) {
  const { data, status } = useQuery(`location-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <>
      {data.name} - {data.type}
    </>
  );
}

export default Character;
