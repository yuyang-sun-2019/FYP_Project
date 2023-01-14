const app = Vue.createApp({





})

app.component('search-dropdown',{
    data(){
        return{
            price: ["$","$$","$$$","$$$$"],
            rating:["⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"],
            hours: ["Any Time","Open Now","Open 24 hours"]
        }
    },
    props: ['specified'],
    template: 
    `
    <select>
        <option v-for="op in specification(specified)"> {{ op }}</option>
    
    </select>
    `,
    methods: {
        specification(something){
            if (something == 'price'){
                return this.price;
            }
            else if (something == 'rating'){
                return this.rating;
            }
            else{
                return this.hours;
            }
        }


    }
})

const vm = app.mount("#app")