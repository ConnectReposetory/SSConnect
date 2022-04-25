import {GET_AGENDA_CONTENT_SUCCESS, SET_SEARCH_CRITERIA} from "../actions";


const initialState = {
  searchCriteria: {},
  events: [],
  partners: [],
  regions: {}
};

const agenda = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_CRITERIA:
      return {
        ...state,
        searchCriteria: action.searchCriteria,
      };
    case GET_AGENDA_CONTENT_SUCCESS:
      return {
        ...state,
        events: action.content.events|| [],
        partners: action.content.partners || [],
        regions: action.content.regions || [],
      };
    default:
      return state;
  }
};
export const getSearchCriteria = state => state.searchCriteria;
export const getRegions = state => state.regions;
export const getEvents = state => state.events;
export const getPartners = state => state.partners;

export default agenda;
