import React from 'react'
import type { CommentGet } from '../../Models/Comment';
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem';

type Props = {
    comments: CommentGet[];
}

const StockCommentList = ({comments}: Props) => {
  return (
    <>
        {comments ? comments.map((comment)=>{
            return <StockCommentListItem comment={comment}/>;
        }): "No comments yet."}
    </>
  )
}

export default StockCommentList