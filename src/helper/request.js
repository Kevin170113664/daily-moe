import axios from 'axios'

const get = async (url) => {
  try {
    const res = await axios.get(url)
    return res.data;
  } catch(e) {
    console.error(e.message)
    throw e
  }
};

export default {get}