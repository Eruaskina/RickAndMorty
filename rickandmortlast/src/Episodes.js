import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";
import "./episodes.css";

export default function Episodes() {
  const { data, status } = useQuery("episodes", () =>
    fetch("https://rickandmortyapi.com/api/episode")
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  return (
    <div>
      <div>
        <Typography variant="h2" style={{ color: "Lightblue" }}>
          Episodes
        </Typography>
        {data.results.map((episode) => (
          <article key={episode.id}>
            <Link
              component={RouterLink}
              to={`/episodes/${episode.id}`}
              style={{ color: "#252525" }}
            >
              <ul className="EpisodeCard">
                <img
                  src="https://yellowbos.com/wp-content/uploads/2019/07/ri13.jpg"
                  alt="episode"
                />
                <Typography variant="h4" style={{ color: "#252525" }}>
                  {episode.episode} - {episode.name} - {episode.air_date}
                </Typography>
              </ul>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
