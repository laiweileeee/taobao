import { UserActionTypes } from './user.types';

//Creating user ACTION
export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});