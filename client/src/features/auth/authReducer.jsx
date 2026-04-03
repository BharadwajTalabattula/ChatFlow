
export const initialState = {
    user : null,
    token: null,
    isAuthenticated: false,
    userName : null
}

export function authReducer (state, action){

    switch (action.type) {
        case "LOGIN":
            return {...state, 
                user : action.payload.user,
                token:  action.payload.token,
                isAuthenticated : true,
                userName : action.payload.userName
            }
        case "LOGOUT":
            return {...state, 
                user : null,
                isAuthenticated : false,
                userName : null
            }
        case "REGISTER":
            return {...state, 
                user : action.payload.user,
                token:  action.payload.token,
                isAuthenticated : true,
            }
        default:
            return state;

    }

}