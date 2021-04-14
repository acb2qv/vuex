import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

new Vuex.Store({
    state: { //= data
        products: []
    },
    getters: { //= computed properties
        productsCount(){
            // count products
        }
    },
    actions: {
        fetchProducts(){
            //make the call
        }
    },
    mutations: {
        setProducts() {
            // update products
        }
    }
})