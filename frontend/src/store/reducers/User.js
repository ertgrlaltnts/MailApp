import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    isLoggedIn: false,
    user: {},
    messages: [],
    stars: [],
    trash: [],
  },

  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.messages = action.payload.messages;
      state.stars = action.payload.stars;
      state.trash = action.payload.trash;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.messages = [];
      state.stars = [];
      state.trash = [];
    },
    readMessage: (state, action) => {
      let temp;

      if (action.payload.tab === 1) {
        temp = state.messages;
      } else if (action.payload.tab === 2) {
        temp = state.stars;
      } else {
        temp = state.trash;
      }

      const findItem = temp.find((item) => item._id === action.payload._id);
      const findIndex = temp.findIndex(
        (item) => item._id === action.payload._id
      );

      findItem.messages.forEach((element, index) => {
        if (element.receiver === state.user.email) {
          temp[findIndex].messages[index].isRead = true;
        }
      });

      if (action.payload.tab === 1) {
        state.messages = temp;
      } else if (action.payload.tab === 2) {
        state.stars = temp;
      } else {
        state.trash = temp;
      }
    },

    pushMessage: (state, action) => {
      let findIndex =
        action.payload.tab === 1
          ? state.messages.findIndex(
              (item) => item._id === action.payload.mailID
            )
          : action.payload.tab === 2
          ? state.stars.findIndex((item) => item._id === action.payload.mailID)
          : state.trash.findIndex((item) => item._id === action.payload.mailID);

      let findArray =
        action.payload.tab === 1
          ? state.messages.find((item) => item._id === action.payload.mailID)
          : action.payload.tab === 2
          ? state.stars.find((item) => item._id === action.payload.mailID)
          : state.trash.find((item) => item._id === action.payload.mailID);

      findArray.messages.push({
        sender: action.payload.sender,
        receiver: action.payload.receiver,
        isRead: action.payload.isRead,
        date: action.payload.date,
        message: action.payload.message,
        _id: action.payload._id,
      });

      action.payload.tab === 1
        ? (state.messages[findIndex] = findArray)
        : action.payload.tab === 2
        ? (state.stars[findIndex] = findArray)
        : (state.trash[findIndex] = findArray);
    },

    mailToStar: (state, action) => {
      let temp = state.stars;
      action.payload.forEach((element) => {
        temp.push(state.messages.find((item) => item._id === element));
      });
      state.stars = temp;

      state.messages = state.messages.filter(
        (item) => !action.payload.includes(item._id)
      );
    },

    mailToTrash: (state, action) => {
      let temp = state.trash;
      action.payload.forEach((element) => {
        temp.push(state.messages.find((item) => item._id === element));
      });
      state.trash = temp;

      state.messages = state.messages.filter(
        (item) => !action.payload.includes(item._id)
      );
    },

    starsToMail: (state, action) => {
      let temp = state.messages;
      action.payload.forEach((element) => {
        temp.push(state.stars.find((item) => item._id === element));
      });
      state.messages = temp;

      state.stars = state.stars.filter(
        (item) => !action.payload.includes(item._id)
      );
    },

    starsToTrash: (state, action) => {
      let temp = state.trash;
      action.payload.forEach((element) => {
        temp.push(state.stars.find((item) => item._id === element));
      });
      state.trash = temp;

      state.stars = state.stars.filter(
        (item) => !action.payload.includes(item._id)
      );
    },

    trashToMail: (state, action) => {
      let temp = state.messages;
      action.payload.forEach((element) => {
        temp.push(state.trash.find((item) => item._id === element));
      });
      state.messages = temp;

      state.trash = state.trash.filter(
        (item) => !action.payload.includes(item._id)
      );
    },

    clearTrash: (state, action) => {
      state.trash = state.trash.filter(
        (item) => !action.payload.includes(item._id)
      );
    },
  },
});

export const {
  loginUser,
  logOutUser,
  readMessage,
  pushMessage,
  mailToStar,
  mailToTrash,
  starsToMail,
  starsToTrash,
  trashToMail,
  clearTrash,
} = UserSlice.actions;

export default UserSlice.reducer;
