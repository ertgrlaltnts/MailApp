import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Hdr = {
  Container: styled.div`
    font-family: "QuickSandRegular";
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  MidItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  `,
  Logo: styled.img`
    width: 150px;
    height: 70px;
    object-fit: contain;
    @media ${device.tablet} {
      display: none;
    }
  `,

  Input: styled.input`
    width: 70%;
    line-height: 40px;
    outline: none;
    font-family: "QuickSandRegular";
    margin-top: 12px;
    border-color: transparent;
    background-color: #eaf1fb;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;
    padding-left: 60px;
    @media ${device.tablet} {
      width: 90%;
    }
  `,

  SearchButton: styled.div`
    position: absolute;
    cursor: pointer;
    left: 10px;
    top: 16px;
    transition: all 0.3s ease-out;
    padding: 6px 8px 4px 8px;
    border-radius: 50%;
    &:hover {
      background-color: #d5d5d5;
    }
  `,

  Row: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    @media ${device.tablet} {
      display: none;
    }
  `,
  RowItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 3px;
    transition: all 0.3s ease-out;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &:hover {
      background-color: #d5d5d5;
    }
  `,

  Hamburger: styled.div`
    display: none;
    cursor: pointer;
    margin-top: 14px;
    color: rgb(95, 99, 104);
    @media ${device.tablet} {
      display: block;
    }
  `,

  UserContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 20px;
  `,
  Avatar: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #d3e3fd;
    border-radius: 50%;
    font-family: "QuickSandBold";
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  `,
  Name: styled.div`
    font-family: "QuickSandBold";
    margin-bottom: 10px;
  `,
  ExitButton: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    width: 100%;
    background-color: #d3e3fd;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    transition: all 0.3s ease-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  `,
};
