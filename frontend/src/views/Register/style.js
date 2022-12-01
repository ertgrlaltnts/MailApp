import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Rgs = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "QuickSandRegular";
    background-color: #f6f8fc;
    height: 100vh;
  `,

  Box: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 50%;
    padding: 60px;
    padding-bottom: 80px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;

    @media ${device.laptop} {
      width: 70%;
    }

    @media ${device.mobileL} {
      width: 90%;
    }
  `,
  Logo: styled.img`
    width: 250px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 10px;

    @media ${device.mobileL} {
      width: 150px;
    }
  `,
  Title: styled.div`
    font-family: "QuickSandBold";
    font-size: 18px;
    margin-bottom: 30px;
  `,
  InputBox: styled.div``,
  InputTitle: styled.div`
    font-family: "QuickSandBold";
    margin: 0 5px;
  `,
  Input: styled.input`
    outline: none;
    border: 1px solid #e5e7e9;
    width: 250px;
    padding: 5px;
    border-radius: 5px;
    margin: 0 5px 10px 5px;
    @media ${device.mobileL} {
      width: 300px;
      margin: 0 0 8px 0;
    }
  `,

  BigInput: styled.input`
    outline: none;
    border: 1px solid #e5e7e9;
    width: 510px;
    padding: 5px;
    border-radius: 5px;
    margin: 0 5px 10px 5px;
    @media ${device.mobileL} {
      width: 300px;
      margin: 0 0 8px 0;
    }
  `,
  Button: styled.div`
    cursor: pointer;
    font-family: "QuickSandBold";
    background-color: #eaf1fb;
    width: 510px;
    margin-top: 15px;
    text-align: center;
    padding: 5px 0;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    @media ${device.mobileL} {
      width: 300px;
    }
  `,

  InputRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media ${device.mobileL} {
      flex-direction: column;
      justify-content: center;
    }
  `,

  Back: styled.div`
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 20px;
    transition: all 0.2s ease-out;
    &:hover {
      opacity: 0.5;
    }
  `,
};
