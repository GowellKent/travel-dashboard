<template>
    <navbar />
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>TAMBAH OBJEK WISATA</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'paket.detail', params: { id: $route.params.id } }"
                                    class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="store">

                            <div class="form-group">
                                <label for="objek" class="font-weight-bold">Objek Wisata</label>
                                <br />
                                <select class="form-select" v-model="detail.tpd_tot_kode" aria-label="Kota Tujuan">
                                    <option v-for="data in objs" :key="data.tot_kode">{{data.tot_kode}}-{{ data.tot_nama }}</option>
                                </select>
                            </div>

                            <br /><br />
                            <button type="submit" class="btn btn-primary">SIMPAN</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>



import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

import navbar from '@/components/NavBar.vue'

export default {

    data() {
        return {
            objs: [],
            pakets: [],
            tph_kode: ''
        }
    },
    methods: {
        setObjs(data) {
            this.objs = data;
        },
        setPaket(data) {
            this.pakets = data;
        }
    },

    setup() {

        //state posts
        const detail = reactive({
            tpd_tot_kode:''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        const route = useRoute()

        //method store
        function store() {


            let tpd_tph_kode = route.params.id
            let tpd_tot_kode = detail.tpd_tot_kode.split("-")[0]

            axios.post('http://localhost:8000/api/addPaketDet', {
                tpd_tph_kode: tpd_tph_kode,
                tpd_tot_kode: tpd_tot_kode,
                tpd_tipe:'D'


            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'paket.detail', params: { id: route.params.id }
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            detail,
            validation,
            router,
            store
        }

    },
    mounted() {

        const route = useRoute()
        this.tph_kode = route.params.id

        axios.get('http://localhost:8000/api/findPaket?tph_kode=' + this.tph_kode)
            .then(ress => {
                this.setPaket(ress.data[0])
                axios.get('http://localhost:8000/api/objekByKota?tot_kota=' + this.pakets.tph_kota_destinasi)
                    .then(resp => {
                        this.setObjs(resp.data)
                    }).catch(error => {
                        console.log(error)
                })

    })
        .catch(error => {
        console.log(error)
    })
},
components: {
    navbar
}

}
</script>

<style>
body {
    background: lightgray;
}
</style>