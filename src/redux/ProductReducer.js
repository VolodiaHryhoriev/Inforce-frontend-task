import {actionsProductTypes} from "./ActionProduct";
const initialState = {
    obj: []
}

const ProductReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionsProductTypes.SET_OBJ :
            return {
                ...state,
                obj: action.payload,
            }
        default:
            return state
    }
}

export default ProductReducer;