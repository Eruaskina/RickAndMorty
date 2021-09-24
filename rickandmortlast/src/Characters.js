import React from "react";
import { Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";

export default function Characters() {
  const { status, data } = useQuery("characters", () =>
    fetch("https://rickandmortyapi.com/api/character/")
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  console.info(data);

  return (
    <div>
      <Typography variant="h2" style={{ color: "lightblue" }}>
        Characters
      </Typography>
      {data.results.map((person) => {
        return (
          <article key={person.id} style={{ margin: "16px 0 0" }}>
            <ul component={RouterLink} to={`/characters/${person.id}`}>
              <li style={{ listStyle: "none" }}>
                <a
                  href={`/characters/${person.id}`}
                  style={{ color: "lightblue" }}
                >
                  {" "}
                  {person.name} - {person.gender}: {person.species}{" "}
                </a>
              </li>
            </ul>
          </article>
        );
      })}
    </div>
  );
}
