//редагування ножини 
<template>
  <div>
    <ul v-if="set.length>0">
      <li v-for="(element, index) in set" v-bind:key="index">
        {{element}}
        <input type="button" @click="remove(index)" value="X">
      </li>
    </ul>
    <p v-else>Нема елементів</p>
    <input type="text" v-model="newElement" />
    <input type="button" @click="add()" value="Додати">
  </div>
</template>

<script>
export default {
  name: "setInput",
  props: {
    value: {
        type: Array,
        default: ()=>[]
    }

  },
  data() {
    return {
      set: this.value,
      newElement: ""
    };
  },
  methods: {
    remove(index) {       
        if (confirm(`Ви справді хочете вилучити ${this.set[index]}?`))
          // робимо мінімальну затримку для того щоб уникнути багу подвійного вилучення  
            setTimeout(()=>  this.set.splice(index, 1), 100);
           
    },
    add() {
      console.log(this.newElement);  
      this.set.push(this.newElement);
      this.$emit('input', this.set); 
      this.newElement = "";
    }
  }
};
</script>

<style scoped>
    li {
        margin: 10px;
    }
</style>