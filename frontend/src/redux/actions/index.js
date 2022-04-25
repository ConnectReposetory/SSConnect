import content from "../../services/content";
import HttpService from '../../services/httpService';

export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA'
export const GET_AGENDA_CONTENT_SUCCESS = 'GET_AGENDA_CONTENT_SUCCESS'
export const GET_AGENDA_CONTENT_FAILED = 'GET_AGENDA_CONTENT_FAILED'


const httpService = new HttpService();

export const setSearchCriteria = (searchCriteria) => ({
  type: SET_SEARCH_CRITERIA,
  searchCriteria,
});

export const getAgendaContentSuccess = (content) => ({
  type: GET_AGENDA_CONTENT_SUCCESS,
  content,
});

export const getAgendaContentFailed = () => ({
  type: GET_AGENDA_CONTENT_FAILED,
});


export const fetchAgendaContent = (showLoading = true) => {
  return dispatch => {
    httpService.getAgendaContent()
      .then(content => {
        dispatch(getAgendaContentSuccess(content));
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('DEBUG: Events not fetched from CMS') //eslint-disable-line
          dispatch(getAgendaContentSuccess(content));
        } else {
          dispatch(getAgendaContentFailed());
        }
      });
  };
};
