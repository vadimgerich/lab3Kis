
<template>
    <div>
        <p v-if="bugalts.length==0" class="alert">
            Робітники відсутні
        </p>
        
        <table v-if="bugalts.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('pib')">  Піб </th>
                <th v-on:click="sort('posada')"> Посада  </th>
                <th v-on:click="sort('payment')">  Зарплатня </th>
                <th v-on:click="sort('countOfChilds')"> Кількість дітей </th>
                <th v-on:click="sort('stage')"> Стаж </th>
                <th></th>
            </tr>
            <bugaltTableRow v-for="(bugalt, index) in bugalts" 
                v-bind:key="bugalt._id" 
                v-bind="{bugalt, index}"       
            >             
            </bugaltTableRow>
        </table>
    </div> 
</template>

<script>
import bugaltTableRow from "./bugaltTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"bugaltTable",      
    data(){
        return{         
          
        }
    },
    components:{
        bugaltTableRow
    },
    computed:{
       ...mapGetters({
           bugalts:"filtredBugalts"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortBugalts"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>