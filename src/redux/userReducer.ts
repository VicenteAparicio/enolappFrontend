import { IUserState } from "../pages/models/IUserState"

// Define the initial state using that type
const initialState: IUserState = {
    data: {
        data: {
            id: 0,
            nickname: '',
            token: ''
        }
    }
}

type TAction = { type: "ADD_USER", payload: IUserState }

export const userReducer: any = (state: IUserState = initialState, action: TAction) => {
    switch (action.type) {
        case 'ADD_USER': {
            return state = action.payload
        }
        default:
            return state
    }
}