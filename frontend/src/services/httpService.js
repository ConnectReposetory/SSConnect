import getApiEndpoint from '../utils/getApiEndpoint';
import paramsToQueryString from '../utils/paramsToQueryString';

class HttpService {
  handleJSONResponse(response) {
    const {status} = response;
    if (status === 200 || status === 201){
      return response.json();
    }
    throw new Error();
  }

  async getRequest(endpoint, params = null) {
    let queryString = '';
    if (params) {
      queryString = `?${paramsToQueryString(params)}`;
    }

    return await fetch(getApiEndpoint() + endpoint + queryString, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        }
        return response;
      })
      .catch(e => {
        this.handleRequestException(e, endpoint);
      });
  }

  async postRequest(endpoint, body) {
    return await fetch(getApiEndpoint() + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        }
        return response;
      })
      .catch(e => {
        this.handleRequestException(e, endpoint);
      });
  }

  static getJson(response) {
    return response.json();
  }

  handleRequestException(e, endpoint) {
    // Sentry.withScope(function (scope) {
    //   scope.setExtra('endpoint', endpoint);
    //
    //   if (e.hasOwnProperty('ok') && e.hasOwnProperty('headers')) {
    //     HttpService.getJson(e)
    //       .then((JsonResponse) => {
    //         console.log(JsonResponse) //eslint-disable-line
    //       });
    //   } else {
    //     // Sentry.captureException(e);
    //   }
    // });
    console.error(e) //eslint-disable-line
    throw e;
  }

  async getAgendaContent() {
    return await this.getRequest('/content/get').then(this.handleJSONResponse);
  }
}

export default HttpService;
