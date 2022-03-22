import React from "react";
import { useParams, Link } from "react-router-dom";

function User() {
    let params = useParams();

    return (
      <>
        <main>
          <h2>@{params.handle}!</h2>
        </main>
      </>
    );
  }

export default User