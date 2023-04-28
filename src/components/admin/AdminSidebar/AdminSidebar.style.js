import styled from "styled-components";

export const AdminSidebarStyled = styled.aside`
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1000;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);

    @media (max-width: 1024px) {
        width: 100%;
        height: max-content;
        top: auto;
        bottom: 0;

        ul {
            flex-direction: row;
            align-items: center;
            overflow-x: auto;

            li {
                justify-content: center;
                
                a, button {
                    padding: 10px;

                    svg {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }

    ul {
        gap: 0;
    }

    li {
        height: 100%;
        position: relative;
        transition: all .3s ease;
        
        a, button {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 30px;
            color: #71C370;

            svg {
                width: 50px;
                height: 50px;
            }

            span {
                font-size: 20px;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                left: 100%;
                height: 100%;
                max-width: 0;
                overflow: hidden;
                background: #fff;
                font-weight: 600;
                border-radius: 0 20px 20px 0;
                opacity: 0;
                transition: all .3s ease;
            }
        }

        &.active {
            background: linear-gradient(271.12deg, rgb(111, 190, 110) 0%, rgb(139, 235, 138) 100%);
            
            a {
                color: #fff;
            }

            span {
                background: linear-gradient(271.12deg, rgb(111, 190, 110) 0%, rgb(139, 235, 138) 100%);
            }
        }

        @media (min-width: 1025px) {
            &:hover {         
                box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.15);

                a, button {
                    span {
                        box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.15);
                        width: 100vw;
                        max-width: 210px;
                        color: #71C370;
                        opacity: 1;
                    }
                }

                &.active {
                    background: rgb(139, 235, 138);

                    span {
                        color: #fff;
                    }
                }
            }
        }

        &::before {
            display: none;
        }
    }
`;