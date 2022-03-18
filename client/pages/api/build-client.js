import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    let baseURL;
    if (req.headers.host === 'http://www.ticketing-app-yair.xyz') {
      baseURL = 'http://www.ticketing-app-yair.xyz';
    } else {
      baseURL =
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    }
    // We are on the server side
    return axios.create({
      baseURL,
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
