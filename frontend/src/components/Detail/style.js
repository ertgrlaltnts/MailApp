import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Dtl = {
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
    justify-content: flex-start;
    padding: 15px;
    border-bottom: 1px solid #eaebef;
    width: 100%;
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

    @media ${device.mobileS} {
      margin: 0 5px;
    }
  `,

  Messages: styled.div`
    overflow-y: scroll;
    height: 76vh;
  `,
  Message: styled.div`
    display: flex;
    flex-direction: ${({ isSender }) => (isSender ? "row-reverse" : "row")};
    align-items: flex-start;
    text-align: ${({ isSender }) => (isSender ? "right" : "left")};
    padding: 15px 25px;
    border-bottom: 1px solid #eaebef;
  `,
  Image: styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-right: 10px;
  `,
  TextContainer: styled.div`
    width: 80%;
    overflow-wrap: break-word;
    margin-right: ${({ isSender }) => (isSender ? "10px" : 0)}; ;
  `,

  TextTitle: styled.div``,
  Text: styled.div``,
  Date: styled.div`
    font-size: 12px;
  `,
};
