<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h4>TAMBAH KOTA</h4>
                            </div>
                            <div class="col right-align">
                                <router-link :to="{ name: 'kota.index' }" class="btn btn-md btn-primary">BACK</router-link>
                            </div>
                        </div>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="provinsi" class="font-weight-bold">PROVINSI</label>
                                <!-- <input class="form-control" v-model="kota.tot_provinsi" placeholder="Masukkan Provinsi"> -->
                                <br />
                                <select v-model="kota.tot_provinsi" v-on:change="getKota(kota.tot_provinsi)">
                                    <option>Provinsi</option>
                                    <option v-for="data in provs" :key="data.id">{{ data.id }}-{{ data.nama }}</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.tot_provinsi" class="mt-2 alert alert-danger">
                                    {{ validation.tot_provinsi[0] }}
                                </div>
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">NAMA</label>
                                <br />
                                <!-- <input type="text" class="form-control" v-model="kota.tot_nama" placeholder="Masukkan Kota"> -->
                                <select v-model="kota.tot_nama">
                                    <option>Kota/ Kabupaten</option>
                                    <option v-for="data in kotas" :key="data.id">{{ data.nama }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.tot_nama" class="mt-2 alert alert-danger">
                                    {{ validation.tot_nama[0] }}
                                </div>
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
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    data() {
        return {
            provs: [],
            kotas: [],
        }
    },
    methods: {
        setProvs(data) {
            this.provs = data;
        },

        setKotas(data) {
            this.kotas = data;
            // console.log(data)
        },

        getKota(id) {
            let idProvinsi = id.split("-")[0]
            axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + idProvinsi)
                .then(ress => {
                    this.setKotas(ress.data.kota_kabupaten)
                })
                .catch(error => {
                    console.log(error)
                })

        }
    },

    setup() {

        //state posts
        const kota = reactive({
            tot_tjo_kode: 1,
            tot_nama: '',
            tot_provinsi: '',
            tot_kota: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let tot_tjo_kode = kota.tot_tjo_kode
            let tot_nama = kota.tot_nama
            let tot_kota = kota.tot_nama
            let tot_provinsi = kota.tot_provinsi.split("-")[1]

            // console.log(131, tot_prseleovinsi)

            axios.post('http://localhost:8000/api/addObjek', {
                tot_tjo_kode: tot_tjo_kode,
                tot_nama: tot_nama,
                tot_provinsi: tot_provinsi,
                tot_kota: tot_kota,
                tot_foto:"https://docs.google.com/uc?id=1hTEApOQK5ZZnzQz1TLtswes3sRBKPbCm"
            }).then(() => {

                //redirect ke post index
                // console.log(122, tot_provinsi)
                router.push({
                    name: 'kota.index'
                })

            }).catch(error => {
                //assign state validation with error 
                // console.log(129, kota.tot_provinsi)
                validation.value = error.response.data
            })

        }

        //return
        return {
            kota,
            validation,
            router,
            store
        }

    },
    mounted() {
        axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
            .then(ress => {
                this.setProvs(ress.data.provinsi)
                // console.log(ress.data.provinsi)
            })
            .catch(error => {
                console.log(error)
            })
    }

}
</script>

<style>
body {
    background: lightgray;
}
</style>