import React, { useState } from "react";
import { Carousel, ContentWrapper, SwitchTabs } from "../../../components/index";
import useFetch from "../../../hooks/UseFetch";
import "../style.scss";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);
  

  const onTabChange = (tab) => {
      setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
      <div className="carouselSection">
          <ContentWrapper>
              <span className="carouselTitle">What's Popular</span>
              <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
          </ContentWrapper>
          <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </div>
  );
};


export default Popular;
