import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server side
    return axios.create({
      // baseURL:
      //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      baseURL: 'http://www.ticketing-app-prod.xyz/',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
