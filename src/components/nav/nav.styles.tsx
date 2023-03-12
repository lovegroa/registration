import styled from 'styled-components';

export const StyledNavigation = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0.5rem 0rem;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 2px 2px rgba(9, 9, 9, 0.23);

  .navigation-menu {
    margin-left: auto;
  }

  .navigation-menu ul {
    display: flex;
    padding: 0;
  }

  .navigation-menu li {
    list-style-type: none;
    margin: 0 1rem;
  }

  .navigation-menu li a {
    text-decoration: none;
    display: block;
    width: 100%;
  }

  .hamburger {
    border: 0;
    height: 40px;
    width: 40px;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #808080;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    display: none;
  }

  .hamburger:hover {
    background-color: #808080;
  }

  .menu-item {
    background-color: grey;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    position: relative;
    overflow: hidden;
  }

  .menu-item:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: width 0.3s ease-out, height 0.3s ease-out;
  }
  .menu-item:hover:before {
    width: 200%;
    height: 200%;
  }
  .menu-item:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 550px) {
    .hamburger {
      display: block;
    }

    .navigation-menu ul {
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #808080;
      border-top: 1px solid black;
      display: none;
      box-shadow: 5px 5px 5px black;
    }

    .navigation-menu li {
      text-align: center;
      margin: 0;
    }

    .navigation-menu li a {
      color: black;
      width: 100%;
      padding: 1.5rem 0;
    }

    .navigation-menu li:hover {
      background-color: #eee;
    }

    .navigation-menu.expanded ul {
      display: block;
    }

    .menu-item {
      margin: 20px;
    }
  }
`;

export const BrandNameButton = styled.button`
  all: unset;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-size: 1.3rem;
  margin-left: 1rem;
`;
