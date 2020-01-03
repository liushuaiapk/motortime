export default {
  getAdvs (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/advs', {
        params:params
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getBbsList (params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/bbs/cards', {
        params:params
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getArticleList(params) {
    return new Promise((resolve, reject) => {
      axios.get('/api/home/lists', {
        params:params
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getSliders() {
    return new Promise((resolve, reject) => {
      axios.get('/api/home/sliders', {
        params:{
          media_id:0
        }
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getChannel() {
    return new Promise((resolve, reject) => {
      axios.get('/api/archive/channel')
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getShow(id){
    return new Promise((resolve, reject) => {
      axios.get('/api/archive/' + id)
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getRecommends(id){
    return new Promise((resolve, reject) => {
      axios.get('/api/archive/' + id + '/recommends')
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getCommentList(id,params){
    return new Promise((resolve, reject) => {
      axios.get('/api/archive/' + id + '/comments',{
        params:params
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getBbsShow(id){
    return new Promise((resolve, reject) => {
      axios.get('/api/bbs/card/' + id)
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  },
  getBbsCommentList(id,params){
    return new Promise((resolve, reject) => {
      axios.get('/api/bbs/card/' + id + '/comments',{
        params:params
      })
      .then((response) => {
        resolve(response)
      })
    }, err => {
      reject(err)
    })
  }
}