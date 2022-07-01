import React, { createContext, useReducer } from 'react';

type VideoItem = {
  id? : VideoId | any
  snippet? : Snippet
}

type VideoId = {
  videoId : string
}

type Snippet = {
  title : string
  description: string
  thumbnails : Thumbnails
}

type Thumbnails = {
  default: ThumbnailItem
  medium : ThumbnailItem
}

type ThumbnailItem = {
  url : string
  width: number
  height: number
}


type InitialState = {
  popular : VideoItem[];
  related : VideoItem[];
  searched:VideoItem[];
  selected: VideoItem;
  term: string;
}
const initialState:InitialState = {
  popular : [],
  related : [],
  searched:[],
  selected: {},
  term: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_POPULAR':
      return { ...state, popular: action.payload.popular }
    case 'SET_RELATED':
      return { ...state, related: action.payload.related }
      case 'SET_SEARCHED':
      return { ...state, searched: action.payload.searched }
    case 'SET_SELECTED':
      return { ...state, selected: action.payload.selected}
      // ここのスプレッド構文はselectedでpopularのstateを上書きして消さないため。
    case 'SET_TERM':
      return { ...state, term: action.payload.term }
    default:
      return state
  }
}

export const Store = createContext({
  globalState: initialState,
  setGlobalState: (...obj) => null
})

export const StoreProvider = ({children}) => {
  const [ globalState, setGlobalState ] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
  )
}

