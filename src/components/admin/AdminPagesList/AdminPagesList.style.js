import { Link } from "react-router-dom";
import styled from "styled-components";

export const AdminPagesListContainer = styled.main`
    width: 100%;
    max-width: 1720px;
    padding: 20px;
    margin: 0 auto;

    h1 {
        margin-bottom: 32px;
    }
`;

export const PagesListFlex = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
`;

export const PagesListItem = styled(Link)`
    max-width: calc((100% / 3) - 24px);
    width: 100%;
    border-radius: 20px;
    padding: 16px;
    border: 1px solid #7A7A95;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        max-width: calc((100% / 2) - 16px);
    }

    @media (max-width: 500px) {
        max-width: 100%;
    }

    .img-wrapper {
        max-height: 500px;
        width: 100%;
        object-fit: cover;
        overflow-y: scroll;
        margin-bottom: 16px;
        flex: 1;

        &::-webkit-scrollbar {
            display: none;
        }
        
        @media (max-width: 500px) {
            max-height: 350px;
        }
    }

    &:hover {
        border-color: #76D275;
    }
`