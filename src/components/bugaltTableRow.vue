
<template>
    <tr>        
        <td> {{index+1}} </td>
        <td> {{bugalt.pib}} </td>
        <td> {{bugalt.posada}} </td>
        <td> {{bugalt.payment}} </td>
        <td> {{bugalt.countOfChilds}} </td>
        <td> {{bugalt.stage}} </td>
        <td>
            <input type="button" value="Вилучити" @click="deleteBugalt(bugalt)">
            <input type="button" value="Редагувати" @click="showUpdateForm(bugalt)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"bugaltTableRow",
    props:{
        index:Number,
        bugalt:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteBugalt", "showUpdateForm"]),
        updated(){
        console.log(this.bugalt);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>