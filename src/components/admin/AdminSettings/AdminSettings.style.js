import styled from "styled-components";

export const AdminSettingsContainer = styled.main`
    padding: 20px;
    max-width: 1100px;

    h1 {
        margin-bottom: 32px;
    }

    h4 {
        margin-bottom: 16px;
    }

    label {
        position: relative;
        z-index: 0;
        width: 100%;
    }
`;

export const AdminSettingsPassword = styled.form`
    display: flex;
    flex-direction: ${props => props.superadmin ? 'row' : 'column'};
    align-items: ${props => props.superadmin ? 'flex-start' : 'center'};
    gap: 24px;
    width: 100%;
    margin-bottom: 32px;
    max-width: ${props => props.superadmin ? '100%' : '350px'};

    button {
        max-width: 220px;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
    
        button {
            max-width: 100%;
        }
    }
`;

export const AdminSettingsNewUser = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 50%;
    min-width: 320px;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;

export const ErrorMessage = styled.p`
    @keyframes showError {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    position: absolute;
    left: 0;
    --font-size: 14px;
    font-size: --font-size;
    color: #FC978C;
    z-index: -1;
    animation: showError .2s linear;

    @media (max-width: 767px) {
        font-size: --font-size - 20%;
    }
`;