import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Sdm = {
  Container: styled.div`
    font-family: "QuickSandRegular";
  `,

  InputBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #eaebef;
    padding: 5px 0;
    margin-top: 10px;
  `,
  InputTitle: styled.div`
    width: 15%;
    @media ${device.mobileL} {
      width: 20%;
    }
  `,

  InputText: styled.div`
    width: 40%;
    @media ${device.mobileL} {
      width: 50%;
    }
  `,

  Input: styled.input`
    width: 85%;
    outline: none;
    border: none;
    background-color: #f6f8fc;
  `,

  Message: styled.div`
    margin-top: 20px;
  `,
  MessageInput: styled.textarea`
    outline: none;
    border: none;
    width: 100%;
    height: 55vh;
    resize: none;
    background-color: #f6f8fc;
  `,

  SendButton: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #d3e3fd;
    transition: all 0.3s ease-out;
    padding: 15px 40px;
    border-radius: 10px;
    font-family: "QuickSandBold";
    margin-top: 20px;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  `,
};
