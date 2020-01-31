// const geApi = require('api.js');
import gApi from "@/api/api.js"
const getUrl = (mold, pagemold) => {
  return geApi[mold][pagemold]
}


export default {
  getUrl

}