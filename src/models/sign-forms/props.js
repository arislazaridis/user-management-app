import { setUsersData as setUsersDataAction } from './actions';

export const setUsersData = ({dispatch}) => payload => dispatch(setUsersDataAction(payload));
