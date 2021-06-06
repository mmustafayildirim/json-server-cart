import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function savedProductReducer(state = initialState.products, action) {
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCT_SUCCES:
            return action.payload
        case actionTypes.CREATE_PRODUCT_SUCCES:
            return action.payload
        default:
            return state
    }
}