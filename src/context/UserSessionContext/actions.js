import { baseURL } from "api";
import { createCommandService, APIMethods } from "services";

const actions = dispatch => {
    const startLoading = () => dispatch({
        type: "START_LOADING"
    });

    const finishLoading = () => dispatch({
        type: "FINISH_LOADING"
    });

    const registerSession = () =>
             
        createCommandService({
            url: `${baseURL}/registerSession`,
            method: APIMethods.POST,
            payload: {
                uidUser: "00000000002",
            },
            onCustomError: e => {
                debugger;
            },
            onSuccess: ({ data }) => {
                if (data?.success) {
                    localStorage.setItem('sessionToken', data.JWT);
                    console.log(data)
                } else {
                    console.error(data.errorMessage);
                }                
            }
        });

    return {
        registerSession,
        startLoading,
        finishLoading,
    };
}

export default actions;