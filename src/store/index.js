import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //= data
        products: []
    },
    getters: { //= computed properties
        availableProducts(state, getters){
            return state.products.filter(product => product.inventory > 0)
        }
    },
    actions: {
        fetchProducts({commit}){
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        },

        /*
        addToCart(context, product){
            if(product.inventory > 0){
                context.commit('pushProductToCart', product)
            } else{
                //show out of stock message to user
            }
        }
        */
    },
    mutations: {
        setProducts(state, products) {
            // update products
            state.products  = products
        }
    }
})