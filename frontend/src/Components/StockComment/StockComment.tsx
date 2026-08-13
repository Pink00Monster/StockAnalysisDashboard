import { toast } from "react-toastify";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { useEffect, useState } from "react";
import type { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
}

const StockComment = ({stockSymbol}: Props) => {
    const [comments, setComments] = useState<CommentGet[]|null>(null);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        getComments();
    },[]);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol).then((res) => {
            if (res) {
                toast.success("Comment posted successfully!");
                getComments();
            }
        }).catch((e) => {
            toast.error("Failed to post comment.");
        });
    }

    const getComments = () => {
        setLoading(true);
        commentGetAPI(stockSymbol).then((res) => {
            setLoading(false);
            setComments(res?.data!);
        })
    }
  return (
    <div className = "flex flex-col">
        {loading ? <Spinner /> : <StockCommentList comments={comments!}/>}
        <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  )
}

export default StockComment