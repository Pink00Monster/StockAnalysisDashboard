import { toast } from "react-toastify";
import { commentPostAPI } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";

type Props = {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
}

const StockComment = ({stockSymbol}: Props) => {
    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol).then((res) => {
            if (res) {
                toast.success("Comment posted successfully!");
            }
        }).catch((e) => {
            toast.error("Failed to post comment.");
        });
    }
  return (
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
  )
}

export default StockComment