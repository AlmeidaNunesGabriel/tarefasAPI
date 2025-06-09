import axios from 'axios';


//http://localhost:3333/tasks


const api = axios.create({
  baseURL: 'https://tarefa-backend.onrender.com'
});


export default api;