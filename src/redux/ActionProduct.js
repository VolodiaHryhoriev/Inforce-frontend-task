
export const actionsProductTypes = {
    SET_OBJ: "SET_OBJ",
}

export const actionsProduct = {
    setObj: (obj) => ({type:actionsProductTypes.SET_OBJ, payload: [obj]}),
};
