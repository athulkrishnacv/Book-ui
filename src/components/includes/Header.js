import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";

function Header() {
    const { userData, updateUserData } = useContext(UserContext);
    // console.log(userData);

    const handleLogout = () => {
        updateUserData({ type: "LOGOUT" });
    };
    return (
        <>
            <HeaderContainer>
                <DivLeft>
                    <Link to="/">
                        <LogoImg
                            src={
                                require("../../assets/images/logo.png")
                            }
                        />
                    </Link>
                </DivLeft>
                <DivRight>
                    {userData ? (
                        <LoginText onClick={() => handleLogout()} to={""}>
                            Logout
                        </LoginText>
                    ) : (
                        <LoginText to={"/auth/login/"}>Login</LoginText>
                    )}
                </DivRight>
            </HeaderContainer>
        </>
    );
}

export default Header;

const HeaderContainer = styled.div`
    height: 120px;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
`;
const DivLeft = styled.div`
    width: 150px;
`;
const LogoImg = styled.img`
    width: 100%;
    display: block;
`;
const DivRight = styled.div``;
const LoginText = styled(Link)`
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    background: #000;
    padding: 13px 45px;
    border-radius: 5px;
    border: 0;
    outline: 0;
`;
