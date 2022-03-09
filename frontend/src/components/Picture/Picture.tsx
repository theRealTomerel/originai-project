import React,{useState} from 'react'
import { PictureDataType } from '../../types/types'
import styled from 'styled-components'
import axios from 'axios'


type pictureProps = {
    id:string
    upvotes:number
    downvotes:number
}

const PictureContainer = styled.div`
    background:#00E1FF;
    width:20%;
    height:220px;
    margin:2.5%;
    border-radius:4px;
`

const RatingButton = styled.button`
    margin:5px;
    background:'white';
    border:none;
    font-size:18px;
    border-radius:4px;
    &:hover{
        cursor: pointer;
        background:#17A8F9;
        border:none;
        transform: scale(1.2)
    }
    &:active{
        transform: scale(0.9);
    }
`
const ImageWrapper = styled.div`
    display:flex;
    background:#17A8F9;
    align-items:center;
    justify-content:center;
    height:80%;
`
const StyledImage = styled.img`
    border-radius:4px;
    transition: transform .3s;
    &:hover{
        cursor: pointer;
        transform: scale(1.2)
    }
    &:active{
        transform: scale(0.9);
    }
`

export default function Picture(props:pictureProps) {
    const [upvotes,setUpvotes] = useState<number>(props.upvotes)
    const [downvotes,setDownvotes] = useState<number>(props.downvotes)

    const upvote = ()=>{
        let timeout = setTimeout(()=>{},500)
        let upvoteCount = 0
        return ()=>{
            clearTimeout(timeout)
            upvoteCount = upvoteCount+1
            setUpvotes(upvotes+1)
            timeout = setTimeout(async()=>{
                await axios.put(`http://localhost:5000/upvote?id=${props.id}&amount=${upvoteCount}`)
                upvoteCount = 0
            },500)
        }
    }

    const downvote = ()=>{
        let timeout = setTimeout(()=>{},500)
        let downvoteCount = 0
        return async()=>{
            clearTimeout(timeout)
            downvoteCount = downvoteCount+1
            setDownvotes(downvotes+1)
            timeout = setTimeout(async()=>{
                await axios.put(`http://localhost:5000/downvote?id=${props.id}&amount=${downvoteCount}`)
                downvoteCount = 0
            },500)
        }
    }

    
    const upvoteCallback = upvote()
    const downvoteCallback = downvote()

  return (
    <PictureContainer>
        <ImageWrapper>
            <StyledImage alt="picture" width={130} height={130} src={`https://picsum.photos/id/${props.id}/200/300`}/>
        </ImageWrapper>
        <div style={{display:'flex',alignItems:'space-between',justifyContent:'center'}}>
            <RatingButton onClick={upvoteCallback}>👍 {upvotes}</RatingButton>
            <RatingButton onClick={downvoteCallback}>👎 {downvotes}</RatingButton>
        </div>
    </PictureContainer>
  )
}
