import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});
//android pelo emulador o IP padrão é esse
//10.0.2.2
export default api;
