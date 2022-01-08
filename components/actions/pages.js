import axios from "axios";
const LIST_PAGE = 'LIST_PAGE';
const ADD_PAGE = 'ADD_PAGE';
const DELETE_PAGE = 'DELETE_PAGE';

export function AC_ADD_PAGE(userData) {
    console.log('======Add page======', userData)
    return function (dispatch) {
        return axios.post("http://localhost:8000/api/v1/pages/addUpdatePage", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_PAGE, payload: data })
            });
    };
}
export function AC_LIST_PAGE() {
    return function (dispatch) {
        return axios.get("http://localhost:8000/api/v1/pages/listPages")
            .then(({ data }) => {
                console.log('=====List page====', data)
                dispatch({ type: LIST_PAGE, payload: data })
            });

    }
}
export function AC_DELETE_PAGE(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:8000/api/v1/pages/deletePage",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_PAGE,payload:data})
        });
    };
}