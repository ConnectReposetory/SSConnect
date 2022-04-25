import { combineReducers } from 'redux';
import agenda, * as fromAgenda from './agenda';

const appReducer = combineReducers({
  agenda
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export const getAgendaSearchCriteria = state => fromAgenda.getSearchCriteria(state.agenda);
export const getAgendaRegions = state => fromAgenda.getRegions(state.agenda);
export const getAgendaEvents = state => fromAgenda.getEvents(state.agenda);
export const getAgendaPartners = state => fromAgenda.getPartners(state.agenda);

export default rootReducer;

