import { create, deliveryConfigList, deliveryRegionList,
    deliveryCost, pay, statusPaid,
    detail, list
} from '@/api/order'

const state = {
    productList:[],
    guestToken:'aaabbb',
    deliveryPerson:'',
    deliveryProvince:'',
    deliveryCity:'',
    deliveryAddress: '',
    deliveryPhone:'',
    deliveryConfigId:1,
    deliveryConfig:'',
    dealPlatform:1,
    deliveryRemark:'',
    deliveryCountry:'',
    deliveryPersonOption:[],
    deliveryProvinceOption:[],
    deliveryCityOption:[],
    deliveryOption:[],
    deliveryCost:0,
    orderId:0,
    orderState:0,
    deliveryConfigName:'',
    orderList:[],        
    datelineCreateReadable:'',
    datelinePaidReadable:'',
    datelineDeliveryReadable:'',
    datelineReceivedReadable:'',
    paid:false
}

const mutations = {
    SET_ADDRESS: (state, data) =>{
        const {deliveryPerson,deliveryProvince,deliveryCity,
            deliveryAddress,deliveryPhone,deliveryConfigId,
            datelineCreateReadable,datelinePaidReadable,
            datelineDeliveryReadable,datelineReceivedReadable,
            deliveryConfig,dealPlatform,deliveryRemark,deliveryCountry,deliveryConfigName,paid} = data;
        state.deliveryPerson = deliveryPerson
        state.deliveryProvince = deliveryProvince
        state.deliveryCity = deliveryCity
        state.deliveryAddress = deliveryAddress
        state.deliveryPhone = deliveryPhone
        state.deliveryConfigId = deliveryConfigId
        state.deliveryConfig = deliveryConfig
        state.dealPlatform = dealPlatform
        state.deliveryRemark = deliveryRemark
        state.deliveryCountry = deliveryCountry
        state.deliveryConfigName = deliveryConfigName
        state.datelineCreateReadable = datelineCreateReadable
        state.datelinePaidReadable = datelinePaidReadable
        state.datelineDeliveryReadable = datelineDeliveryReadable
        state.datelineReceivedReadable = datelineReceivedReadable
        state.paid = paid
    },
    SET_PERSON_OPTION: (state, data) => {
        state.deliveryPersonOption = data
    },
    SET_PROVINCE_OPTION: (state, data) => {
        state.deliveryProvinceOption = data
    },
    SET_CITY_OPTION: (state, data) => {
        state.deliveryCityOption = data
    },
    SET_DELIVERY_OPTION: (state, data) => {
        state.deliveryOption = data
    },
    SET_COST: (state, data) =>{
        state.deliveryCost = data  
    },
    SET_ORDER: (state, data) =>{
        state.orderId =  data
    },
    SET_ORDER_STATE: (state, data) =>{
        state.orderState = data
    },
    SET_PRODUCTIST: (state, data) =>{
        state.productList = data
    },
    SET_ORDER_LIST: (state, data) => {
        state.orderList = data
    }
}

const actions = {
    // eslint-disable-next-line no-empty-pattern
    create({  commit }, data) {
        return new Promise((resolve, reject) => {
            create({ ...data }).then((response) => {
            console.log(response)
            commit('SET_ORDER', response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    deliveryConfigList({ commit }, guestToken) {
        return new Promise((resolve, reject) => {
            deliveryConfigList({ guestToken:guestToken }).then((response) => {
            commit('SET_DELIVERY_OPTION', response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    deliveryRegionList({ commit }, data) {
        return new Promise((resolve, reject) => {
            deliveryRegionList({ parentId:data }).then((response) => {
            // console.log(response)
            commit('SET_PERSON_OPTION',response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    deliveryProvince({ commit }, data) {
        return new Promise((resolve, reject) => {
            deliveryRegionList({ parentId:data }).then((response) => {
            // console.log(response)
            commit('SET_PROVINCE_OPTION',response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    deliveryCity({ commit }, data) {
        return new Promise((resolve, reject) => {
            deliveryRegionList({ parentId:data }).then((response) => {
            // console.log(response)
            commit('SET_CITY_OPTION',response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    deliveryCost({ commit }, data) {
        return new Promise((resolve, reject) => {
            deliveryCost({ ...data }).then((response) => {
            // console.log(response)
            commit('SET_COST', response.result)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    pay({  }, data) {
        return new Promise((resolve, reject) => {
            pay({ ...data }).then((response) => {
            window.open(response.result.redirectURL)
            console.log(response)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    // eslint-disable-next-line no-empty-pattern
    statusPaid({ commit }, data) {
        // if(data == 0) return false
        return new Promise((resolve, reject) => {
            statusPaid({ id:data }).then((response) => {
                console.log(response==undefined)
                commit('SET_ORDER_STATE', response.result)
            // console.log(response)
            resolve()
          }).catch(error => {
              reject(error)
          })
        })
    },
    detail({ commit }, data) {
        return new Promise((resolve, reject) => {
            detail({id: data}).then((response) => {
                const {orderFormProductList} = response.result
                commit('SET_ADDRESS', response.result)
                commit('SET_PRODUCTIST',orderFormProductList)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    list({ commit }, data) {
        return new Promise((resolve, reject) => {
            list({...data}).then((response) => {
                commit('SET_ORDER_LIST', response.result)                
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
