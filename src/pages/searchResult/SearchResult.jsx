import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { ContentWrapper, Img } from "../../components/index";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import { fetchDataWithApi } from "../../utils/api";

const searchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  const fetchInitialPageData = () => {
    setLoading(true);
    fetchDataWithApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    
    
    fetchDataWithApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
          console.log(data)
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
        
      }
    );
  };

  useEffect(() => {
    setPageNum(1)
    fetchInitialPageData();
  }, [query]);

  

  return <div className="searchResultsPage">
    {loading && <Spinner initial={true}/>}
    {!loading && (
      <ContentWrapper>
        {data?.results?.length > 0 ? (
          <>
          <div className="pageTitle">
            {`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
          </div>
          <InfiniteScroll
          className="content"
          dataLength={data?.results?.length || []}
          next={fetchNextPageData}
          hasMore={pageNum <= data?.total_pages}
          loader={<Spinner/>}

          >

            {data?.results.map((item, index)=>{
              if(item.media_type === "person") return;

              return(
                <MovieCard key={index} data={item} fromSearch={true}/>
              )
            })}

          </InfiniteScroll>
          </>
        ) : (
          <div className="resultNotFound">
            Sorry, Results not found!!
            <Img className="errorImage" src={noResults}/>
          </div>
        )}
      </ContentWrapper>
    )}
  </div>;
};

export default searchResult;
