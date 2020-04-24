import axios from 'axios'

const url = 'http://localhost:5000'

export default function axiosWithAuth(token) {

  // pre-configure an axios object 
  return axios.create({
    headers: {
      Authorization: token,

    },
    baseURL: url,
  })
}

// export const axiosWithAuth = (axiosWithAuth || createAxiosWithAuth());
