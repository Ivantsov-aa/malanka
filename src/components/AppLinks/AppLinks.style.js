import styled from "styled-components";
import { FlexWrap } from "../FlexWrap/FlexWrap";

export const AppLinksWrapper = styled(FlexWrap)`
    flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;

export const AppLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    background: ${props => props.outline ? '#fff' : '#000'};
    border-radius: 6px;
    color: #fff;
    padding: 7px 0;
    width: 198px;
    border: 1px solid #000;

    p {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color:  ${props => props.outline ? '#000' : '#fff'};

        &:last-child {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            margin-top: 2px;
        }
    }
`;