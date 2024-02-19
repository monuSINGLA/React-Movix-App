import React from "react";

import "./style.scss";
import { useSelector } from "react-redux";
const Genres = ({ data }) => {
  const genres = useSelector((state) => state.genres);
  // console.log(genres)

  return <div className="genres">
    {data?.map((g) => {
        if(!genres[g]) return
      return(
        <div key={g} className="genre">{genres[g]}</div>
      )
    
      
  })}</div>;
};

export default Genres;
