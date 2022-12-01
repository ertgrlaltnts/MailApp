import styled from "styled-components";

export const Mbm = {
  Container: styled.div`
    font-family: "QuickSandRegular";
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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
  `,

  TabContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
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
    width: 100%;
  `,
  TabText: styled.div``,

  Logo: styled.img`
    width: 150px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 30px;
  `,
};
