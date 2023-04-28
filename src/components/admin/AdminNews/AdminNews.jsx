import { AdminNewsStyled } from "./AdminNews.style"
import { NewsContent } from "../../news/news-content";
import { newsArray } from "../../store/store";

export const AdminNews = (props) => {
    return (
        <AdminNewsStyled>
            <NewsContent {...props} />
        </AdminNewsStyled>
    )
}