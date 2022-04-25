
const developBackendEndpoint = `http://localhost/api`;

export default function getApiEndpoint() {
  return process.env.REACT_APP_API ? process.env.REACT_APP_API : developBackendEndpoint;
}
