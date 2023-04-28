import { StyledButton } from "./button.style";

const Button = (props) => {
    return (
        <StyledButton {...props}>{props.children}</StyledButton>
    )
}

export default Button;