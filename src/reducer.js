export const initialState = {
  user:  localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
  userfirst: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USER_FIRST: "SET_USER_FIRST",
};
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
       
      };
      case actionTypes.SET_USER_FIRST:
      return {
        ...state,
        userfirst: action.userfirst,
      };
    default:
      return state;
  }
};

export default reducer;
