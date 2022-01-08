const initialState = {
  faqList: [],
  faqAdd: [],
  faqDelete:[]
}
function FAQ_Reducer(state = initialState, action) {
  console.log("-=-=-=Reducer=-=-=", action)
  switch (action.type) {
    case 'LIST_FAQ':
      return {
        ...state,
        faqList: action.payload.data
      };
    case 'ADD_FAQ':
      return {
        ...state,
        faqAdd: action.payload
      };
    case 'DELETE_FAQ':
      return {
        ...state,
        faqDelete: action.payload

      };
      break;
    default: return state;
  }
}
export default FAQ_Reducer;

