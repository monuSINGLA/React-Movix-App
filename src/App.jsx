import { useState, useEffect } from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { fetchDataWithApi } from "./utils/api";

import { Header,Footer } from './components/index'

import { Home, Details, SearchResult, Explore, PageNotFound } from "./pages/index";


function App() {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  // console.log(url)
 

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);

  const fetchApiConfig =  () => {
    fetchDataWithApi("/configuration")
      .then((data) => {
        // console.log(data)

        const url = {
          backdrop : data.images.secure_base_url + "original",
          poster : data.images.secure_base_url + "original",
          profile : data.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url));
      })

      
  };

  const genresCall = async()=>{
    let promise = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach(url=>{
      return promise.push(fetchDataWithApi(`/genre/${url}/list`))

    })

    const data = await Promise.all(promise)
    // console.log(data)
    data.map(({genres}) => {
      return genres.map(item=>{
       return allGenres[item.id] = item.name
      })
    })
    // console.log(allGenres)
    dispatch(getGenres(allGenres))

  }



  return (
  <BrowserRouter>
  <Header/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/explore/:mediaType" element={<Explore/>} />
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>)
}

export default App;
