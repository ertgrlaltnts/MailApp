import React from "react";
import { Lfn } from "./style";
import { Pen, Tray, Star, Trash } from "phosphor-react";
import { useSelector } from "react-redux";
import "../../App.css";

const LeftNavigation = ({
  setDrawerVisible,
  tab,
  setTab,
  setBeforeTab,
  setCheckList,
}) => {
  const { messages, stars, trash } = useSelector((state) => state.User);

  const handleCreate = () => {
    setDrawerVisible(true);
  };

  const handleTab = (value) => {
    setTab(value);
    setCheckList([]);
    setBeforeTab(value);
  };

  return (
    <Lfn.Container>
      <Lfn.Create onClick={handleCreate}>
        <Pen style={{ marginRight: 5 }} size={25} />
        <>Oluştur</>
      </Lfn.Create>
      <Lfn.TabContainer>
        <Lfn.Tab tab={tab === 1 ? true : false} onClick={() => handleTab(1)}>
          <Tray size={20} />
          <Lfn.TabText>Gelen Kutusu</Lfn.TabText>
          <Lfn.TabText>{messages.length}</Lfn.TabText>
        </Lfn.Tab>
        <Lfn.Tab tab={tab === 2 ? true : false} onClick={() => handleTab(2)}>
          <Star size={20} />
          <Lfn.TabText>Yıldızlı</Lfn.TabText>
          <Lfn.TabText>{stars.length}</Lfn.TabText>
        </Lfn.Tab>
        <Lfn.Tab tab={tab === 3 ? true : false} onClick={() => handleTab(3)}>
          <Trash size={20} />
          <Lfn.TabText>Çöp Kutusu</Lfn.TabText>
          <Lfn.TabText>{trash.length}</Lfn.TabText>
        </Lfn.Tab>
      </Lfn.TabContainer>
    </Lfn.Container>
  );
};

export default LeftNavigation;
