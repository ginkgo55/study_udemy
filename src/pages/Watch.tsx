import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { SideList } from '../components/SideList/SideList';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import { Store } from "../store/index";
import { useLocation } from "react-router-dom";
import { fetchSelectedData, fetchRelatedData } from "../api/index";


const Watch = () => {
  const { setGlobalState } = useContext(Store);
  const location = useLocation();
  const setVideos = async () => {
    const serchParams = new URLSearchParams(location.search)
    const id = serchParams.get('v');

    if(id){
      const [selected, related] = await Promise.all([fetchSelectedData(id), fetchRelatedData(id)]);
      setGlobalState({type: 'SET_SELECTED', payload: {selected: selected.data.items.shift()}})
      setGlobalState({type: 'SET_RELATED', payload: {related: related.data.items}})
    }
  }

  useEffect(()=> {
    setVideos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.search])

  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  )
}

export default Watch