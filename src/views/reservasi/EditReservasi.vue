<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>EDIT RESREVASI</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'reservasi.index' }"
                                    class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <div class="row">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Paket</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.paket"
                                            placeholder="Masukkan Judul Post" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.paket">
                                            <option v-for="data in jenis" :key="data.tjp_kode">{{ data.tph_kode }}-{{data.tph_nama }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Client</label>
                                <input type="text" class="form-control" v-model="post.client"
                                    placeholder="Masukkan Judul Post" disabled>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Whatsapp Client</label>
                                <input type="text" class="form-control" v-model="post.whatsapp"
                                    placeholder="Masukkan Judul Post" disabled>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Tanggal Reservasi</label>
                                <input type="text" class="form-control" v-model="post.tglRes"
                                    placeholder="Masukkan Judul Post" disabled>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Tanggal Perjalanan</label>
                                <input type="text" class="form-control" v-model="post.tglJalan"
                                    placeholder="Masukkan Judul Post">
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Pax</label>
                                <input type="text" class="form-control" v-model="post.pax"
                                    placeholder="Masukkan Judul Post">
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

import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    data() {
        return {
            jenis: [],
            trips: []
        }
    },
    methods: {
        setJenis(data) {
            this.jenis = data
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/paketAll')
            .then(ress => {
                this.setJenis(ress.data)
            })
            .catch(error => {
                console.log(error)
            })
    },

    setup() {

        //state posts
        const post = reactive({
            kode: '',
            paket: '',
            paketName: '',
            client: '',
            whatsapp: '',
            tglRes: '',
            tglJalan: '',
            pax: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/getDataRes?trh_kode=${route.params.id}`)
                .then(response => {

                    //assign state posts with response data
                    post.kode = response.data[0][0].trh_kode
                    post.paket = response.data[0][0].trh_tph_kode + " - " + response.data[0][0].tph_nama
                    post.paketName = response.data[0][0].tph_nama
                    post.client = response.data[0][0].trh_client
                    post.whatsapp = response.data[0][0].tu_whatsapp
                    post.tglRes = response.data[0][0].trh_tgl_reservasi
                    post.tglJalan = response.data[0][0].trh_tgl_perjalanan
                    post.pax = response.data[0][0].trh_pax

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //method update
        function update() {

            let trh_tph_kode = post.paket.split("-")[0]
            let trh_tgl_perjalanan = post.tglJalan
            let trh_pax = post.pax

            axios.put(`http://localhost:8000/api/updResHead`, {
                trh_kode: route.params.id,
                trh_tph_kode : trh_tph_kode,
                trh_tgl_perjalanan: trh_tgl_perjalanan,
                trh_pax : trh_pax
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'reservasi.index'
                })

            }).catch(error => {
                //assign state validation with error 
                // validation.value = error.response.data
                console.log(error)
            })

        }

        //return
        return {
            post,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>