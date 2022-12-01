import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Lgn = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "QuickSandRegular";
    background-color: #f6f8fc;
    height: 100vh;
  `,

  Box: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 60px 70px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;
    @media ${device.mobileL} {
      width: 90%;
    }
  `,
  Logo: styled.img`
    width: 250px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 10px;
  `,
  Title: styled.div`
    font-family: "QuickSandBold";
    font-size: 18px;
    margin-bottom: 30px;
  `,
  InputBox: styled.div``,
  InputTitle: styled.div`
    font-family: "QuickSandBold";
  `,
  Input: styled.input`
    outline: none;
    border: 1px solid #e5e7e9;
    width: 250px;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
  `,
  Button: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    background-color: #eaf1fb;
    width: 250px;
    margin-top: 15px;
    text-align: center;
    padding: 5px 0;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  `,
};
