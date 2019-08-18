<template>
  <q-page padding>
    <!-- <h5>Articoli</h5> -->
    <div class="row">
      <q-list bordered separator class="rounded-borders"  style="max-width: 100%">
        <q-item clickable v-ripple v-for="item in articoliOk" :key="item.id">
          <router-link :to="{path: '/post/' + item.id }">
          <q-item-section >
            <!-- <q-item-label>{{item.id}}</q-item-label> -->
            <q-item-label v-html="item.title.rendered"></q-item-label>
            <q-item-label caption lines="2" v-html="item.excerpt.rendered"></q-item-label>
          </q-item-section>
        </router-link>
        </q-item>
      </q-list>
    </div> 

  </q-page>
</template>

<style scoped>

</style>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "PageIndex",
  data() {
    return {
      dialog: false,
      testoUtente: "",
      cosaDaFare: [],
      eseguite: [],
      articoliOk: []
    };
  },
  methods: {
    inserisciToDo() {
      this.cosaDaFare.push(this.testoUtente);
      this.testoUtente = "";
    },
    checked(index) {
      this.eseguite.push(this.cosaDaFare[index]);
      this.cosaDaFare.splice(index, 1);
    },
    deleteToDOchecked(index) {
      this.eseguite.splice(index, 1);
    },
    deleteToDO(index) {
      this.cosaDaFare.splice(index, 1);
    }
  },
  created() {
    axios
      .get(`https://www.ferentino.org/wp-json/wp/v2/pages`)
      .then(response => {
        // this.articoli.push(response.data);
        // console.log(response.data);
        const data = response.data
        const articoli = []
        for(let key in data){
          const articolo = data[key]
          /* articolo.id = key  assegna un index ordinato ma perdo gli id reali dche mi arrivano da wordpress*/
          articoli.push(articolo)
        }
        console.log(articoli)
        this.articoliOk = articoli
      })
      .catch(e => {
        this.errors.push(e);
      });

  }
};
</script>
