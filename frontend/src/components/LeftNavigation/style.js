import styled from "styled-components";
import { device } from "../../data/breakpoint";

export const Lfn = {
  Container: styled.div`
    font-family: "QuickSandRegular";
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media ${device.laptop} {
      flex-direction: row;
      width: 100%;
    }

    @media ${device.tablet} {
      display: none;
    }
  `,

  Create: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #d3e3fd;
    transition: all 0.3s ease-out;
    padding: 15px 40px;
    border-radius: 5px;
    font-family: "QuickSandBold";
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    @media ${device.laptop} {
      margin-bottom: 0;
      padding: 6px 12px;
      width: 180px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  `,

  TabContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media ${device.laptop} {
      flex-direction: row;
      margin-bottom: 10px;
    }
  `,
  Tab: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 50px;
    font-family: "QuickSandBold";
    background-color: ${({ tab }) => (tab ? "#d3e3fd" : "#eaebef")};
    padding: 6px 12px;
    border-radius: 5px;
    margin-top: 8px;
    @media ${device.laptop} {
      margin: 0 10px;
      width: 180px;
    }
  `,
  TabText: styled.div``,
};
