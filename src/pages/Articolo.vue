<template>
  <q-page padding>
    <div class="row q-mb-lg" v-for="item in datiArticolo" :key="item.id">
      <router-link to="/">Torna indietro</router-link>
        <h1 v-html="item.title.rendered"></h1>
        <p v-html="item.content.rendered"></p>
      
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      datiArticolo: []
    };
  },
created(){
         axios
      .get(`https://www.ferentino.org/wp-json/wp/v2/pages/` + this.id)
      .then(response => {
        console.log(response.data);
        const data = response.data
        const articleOK = []
        for(let key in data){
          const articolo = data
            articleOK.push(articolo)
            break;
        }
        this.datiArticolo = articleOK
        console.log(this.datiArticolo)
      })
      .catch(e => {
        this.errors.push(e);
      });

  }
}
</script>