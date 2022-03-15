import axios from 'axios';

export default function getMessages(user) {
  axios.get('/api/message/', user)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.error(error));
}
