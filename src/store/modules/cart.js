import { detail, addProduct, delProduct } from '@/api/cart'

const state = {
    productList:[],
    guestToken:'aaabbb'
}

const mutations = {
  SET_PRODUCT_LIST: (state, data) => {
    state.productList = data
  },
  SET_PRODUCT_NUM: (state, data) => {
    state.productList.map(element => {
        if(element.id == data.id) {
        element.quantity = data.num
        }
    });
  },
  DEl_PRODUCT:(state, data) =>{
    let arr = [];
    state.productList.map(element => {
        if(element.id != data.id) {
            arr.push(element)
        }
    });
    state.productList = arr
  },
  CHECK_PRODUCT: (state, data) =>{
    let arr = [];
    state.productList.map(element => {
        if(element.id == data.id) {
            if(element.checkout)
            element.checkout = false
            else
            element.checkout = true
        }
        arr.push(element)
    }); 
    state.productList = arr
  },
  CHECK_ALL: (state, data) => {
    let arr = [];
    state.productList.map(element => {
        element.checkout = data
        arr.push(element)
    }); 
    state.productList = arr
  }
}

const actions = {
    detail({ commit }, guestToken) {
        return new Promise((resolve, reject) => {
        detail({ guestToken:guestToken }).then(response => {
            const { itemList } = response.result
            itemList.map(item =>{
                item.checkout = true
             })
            console.log(itemList)
            commit('SET_PRODUCT_LIST', itemList)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    addProduct({ state}, data) {
        const {  product } = data;
        return new Promise((resolve, reject) => {
            addProduct({ product}).then(() => {
                console.log(state)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    delProduct({state}, data) {
        // const {  product } = data;
        return new Promise((resolve, reject) => {
            delProduct({guestToken:state.guestToken,product:data}).then(() => {
                // commit('DEl_PRODUCT', {id:data.id})
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}