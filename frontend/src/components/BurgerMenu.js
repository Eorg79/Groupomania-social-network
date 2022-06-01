import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from '../utils/AuthContext';
import { Home, User } from '@styled-icons/boxicons-solid';
import { GearFill } from '@styled-icons/bootstrap';
import { LogOut } from '@styled-icons/entypo';

const COLORS = {
  primaryDark: "#051446",
  primaryLight: "white",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 0;
  right: 0;
  height: 62px;
  width: 62px;
  padding: 3px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const NavBackground = styled.div`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.4s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "#051446")};
  width: 2.5rem;
  height: 2px;
  display: inline-block;
  margin-top: 1.8rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: #051446;
    width: 2.5rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

const Navigation = styled.nav`
  height: 40vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 0.5rem 1rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

const TextItem = styled.span`
  padding-left: 15px
}
`;

const BurgerMenu = () =>  {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const { authStatus, setAuthStatus } = useContext(AuthContext);
    let navigate = useNavigate();

    const LogoutclickHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        setAuthStatus({
           firstname:"",
           name:"",
           position:"",
           avatar:"",
           id: 0,
           status: false,
        })
        //setIslogged('notlogged');
        navigate("/auth/login");
       };



  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            {authStatus.status === false && <ItemLink onClick={handleClick} to="/auth/login" name="login"><User size="1.8rem" title="login"/><TextItem>s'identifier</TextItem></ItemLink>}
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/"><Home size="1.8rem" title="accueil"/><TextItem>accueil</TextItem></ItemLink>
          </li>
          <li>
            {authStatus.status && <ItemLink onClick={handleClick} to="/profile/*"><GearFill size="1.8rem" title="profil"/><TextItem>mon profil</TextItem></ItemLink>}
          </li>
          <li>
            {authStatus.status && <ItemLink to="/auth/logout" name="logout" onClick={LogoutclickHandler}><LogOut size="1.8rem" title="logout"/><TextItem>deconnexion</TextItem></ItemLink>}
          </li>   
        </List>
      </Navigation>
    </>
  );
}

export default BurgerMenu;