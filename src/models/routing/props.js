import { goToPage as goToPageAction } from './actions';

export const page = ({ state }) => state.router.page;

export const goToPage = ({dispatch}) => payload => dispatch(goToPageAction(payload));