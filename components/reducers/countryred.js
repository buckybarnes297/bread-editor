const initialState = {
    countryList: [],
    countryAdd: [],
    countryDelete:[]
  }
  function COUNTRY_Reducer(state = initialState, action) {
    console.log("-=-=-=Reducer=-=-=", action)
    switch (action.type) {
      case 'LIST_COUNTRY':
        return {
          ...state,
          countryList: action.payload.data
        };
      case 'ADD_COUNTRY':
        return {
          ...state,
          countryAdd: action.payload
        };
      case 'DELETE_COUNTRY':
        return {
          ...state,
          countryDelete: action.payload
  
        };
        break;
      default: return state;
    }
  }
  export default COUNTRY_Reducer;
  
  