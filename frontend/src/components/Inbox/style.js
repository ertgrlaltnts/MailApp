import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Inb = {
  Container: styled.div`
    font-family: "QuickSandRegular";
    background-color: #fff;
    margin-right: 100px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 5px;
    @media ${device.laptop} {
      margin: 0 10px;
    }
  `,

  Top: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
  `,

  TopItem: styled.div`
    cursor: pointer;
    margin: 0 10px;
    transition: all 0.3s ease-out;
    padding: 8px 9px 3px 9px;
    border-radius: 50%;
    &:hover {
      background-color: #d5d5d5;
    }
  `,

  Boxes: styled.div`
    overflow-y: scroll;
    height: 69vh;
    @media ${device.laptop} {
      margin-bottom: 10px;
    }
  `,
  Box: styled.div`
    position: relative;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 29px;
    border-bottom: 1px solid #eaebef;
  `,

  Item: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media ${device.tablet} {
      font-size: 12px;
      margin-right: 10px;
    }

    @media ${device.mobileL} {
      font-size: 12px;
      width: 100px;
    }
  `,

  LongItem: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    width: 15%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media ${device.tablet} {
      width: 200px;
      font-size: 12px;
    }

    @media ${device.mobileL} {
      margin-left: 20px;
    }

    @media ${device.mobileS} {
      margin-left: 20px;
    }
  `,

  LongItemText: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    width: 40%;
    font-size: 12px;
    opacity: 0.5;
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media ${device.tablet} {
      font-size: 12px;
    }

    @media ${device.mobileL} {
      margin-left: 20px;
    }

    @media ${device.mobileS} {
      margin-left: 20px;
    }
  `,

  BoxItem: styled.div`
    font-family: "QuickSandBold";
    transition: all 0.3s ease-out;
    padding: 2px 9px;
    border-radius: 50%;
    &:hover {
      background-color: #d5d5d5;
    }
  `,

  CheckBoxItem: styled.div`
    font-family: "QuickSandBold";
    transition: all 0.3s ease-out;
    padding: 4px 11px 4px 8px;
    border-radius: 50%;
    &:hover {
      background-color: #d5d5d5;
    }
  `,

  CheckBox: styled.input`
    outline: none;
    box-shadow: none;
    position: relative;
    cursor: pointer;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      background-color: #fff;
      border: 2px solid rgb(65 65 65);
      border-radius: 2px;
    }
    &:checked::before {
      content: "";
      display: block;
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      background-color: #fff;
    }

    &:checked::after {
      content: "";
      display: block;
      width: 5px;
      height: 10px;
      border: solid #000;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 6px;
    }
  `,

  TopRowItem: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,

  Middle: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #eaebef;
    padding-left: 19px;
    font-family: "QuickSandBold";

    @media ${device.mobileL} {
      padding-left: 0;
    }
  `,
  MiddleItem: styled.div`
    cursor: pointer;
    position: relative;
    padding: 15px;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: all 0.3s ease-out;
    border-radius: 5px;
    border-width: 60%;
    color: ${({ isActive }) => (isActive ? "#0b57d0" : "#000")};
    &:hover {
      background-color: #d5d5d5;
    }

    &::after {
      content: "";
      width: 95%;
      position: absolute;
      transition: all 0.2s ease-out;
      bottom: 0;
      left: 0;
      border-bottom: ${({ isActive }) => isActive && "4px solid #0b57d0"};
      margin: 0 7px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }

    @media ${device.mobileL} {
      width: 50%;
      font-size: 12px;
    }
  `,

  BoldText: styled.div`
    font-family: "QuickSandBold";
  `,

  UnRead: styled.div`
    display: inline-block;
    background-color: #c5221f;
    width: 10px;
    height: 10px;
    border-radius: 50%;

    position: absolute;
    left: 10px;
    top: 20px;
  `,

  Warning: styled.div`
    color: #c5221f;
    display: flex;
    font-size: ${({ abs }) => (abs ? "15px" : "20px")};
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    position: ${({ abs }) => (abs ? "absolute" : "relative")};
    top: ${({ abs }) => abs && "17px"};
    left: ${({ abs }) => abs && "-8px"};
  `,
};
