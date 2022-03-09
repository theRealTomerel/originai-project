import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { CSVLink, CSVDownload } from "react-csv"
import { PicturesDataType,PicturesDataDataType,PictureDataObj,PictureDataDataType } from '../../types/types';
import Picture from '../Picture/Picture';


export default function Pictures() {

  const [pictures,setPictures] = useState<PicturesDataType>([{
    "id": "-1",
    "author": "Zwaddi",
    "width": 4287,
    "height": 2392,
    "url": "https://unsplash.com/photos/YvYBOSiBJE8",
    "download_url": "https://picsum.photos/id/109/4287/2392"
  }])
  const [picturesData,setPicturesData] = useState<PicturesDataDataType>([{
    "id": "-1",
    "upvotes": 0,
    "downvotes": 0
  }]) 

  useEffect(()=>{
    let isApiSubscribed = true;
    axios.get('http://localhost:5000/getPictures').then((response) => {
      if (isApiSubscribed) {
          setPictures(response.data)
      }
    })
    axios.get('http://localhost:5000/getPicturesData').then((response) => {
      if (isApiSubscribed) {
        setPicturesData(response.data)
      }
    })

    return () => {
      isApiSubscribed = false;
    }
  },[])
  
  const PicturesWrapper = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    height:100%;
    width:100%;
    margin-top:4%;
  `
  const ExportButton = styled.div`
    position:absolute;
    transition: transform .2s;
    right:46.5%;
    top:2%;
    background:#17A8F9;
    width:150px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:4px;

    &:hover{
      background:#00E1FF;
      transform: scale(1.2);
      cursor: pointer;
    }
  `
  return (
    <PicturesWrapper>
      <ExportButton>
        <CSVLink style={{color:'white',textDecoration:'none',fontFamily:'Segoe UI',fontSize:'18px'}} data={picturesData}>Export to csv</CSVLink>
      </ExportButton>
      
      {picturesData?.map((picture)=><Picture key={picture.id} id={picture.id} upvotes={picture.upvotes} downvotes={picture.downvotes}/>)}
    </PicturesWrapper>
  )
}
