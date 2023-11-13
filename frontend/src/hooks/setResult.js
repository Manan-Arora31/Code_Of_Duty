import * as Action from "../redux/result_reducer"


export const PushAnswer = (result) => async (dispatch) => {
    try{
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.log(error);
    }
}

export const updateResult = (index,checked) => async (dispatch) => {
    try {
        await dispatch(Action.updateResultAction(index,checked));
    } catch (error){
        console.log(error);
    }
}