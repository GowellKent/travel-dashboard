<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-header">
                        <div class="row mt-2">
                            <div class="col">
                                <router-link :to="{ name: 'reservasi.index' }" class="btn btn-md btn-success">
                                    <vue-feather type="chevron-left" size="20" class="color-white pt-1" />
                                </router-link>
                            </div>
                            <div class="col-11 pt-1 float-start">
                                <h3><strong>EDIT RESREVASI</strong></h3>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Jenis Paket</label>
                                <input type="text" class="form-control" v-model="post.paket"
                                    placeholder="Masukkan Judul Post" disabled>
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
                                <VueDatePicker v-model="post.tglJalan" :enable-time-picker="false" class="mb-2">
                                </VueDatePicker>
                            </div>
                            <!-- <h5>{{ post.tglJalanNew }}</h5> -->
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Pax</label>
                                <input type="text" class="form-control" v-model="post.pax"
                                    placeholder="Masukkan Judul Post">
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Status Reservasi</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.status" placeholder="Masukkan"
                                            disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.status">
                                            <option v-for="data in status" :key="data.tsr_kode">{{ data.tsr_kode
                                            }}-{{ data.tsr_desc }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Biaya (Rp)</label>
                                <input type="text" class="form-control" v-model="post.harga"
                                    placeholder="Masukkan Judul Post" disabled>
                            </div>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold mt-2 mb-1">Reservasi Bus</label>
                                <input type="text" class="form-control" v-model="post.bus" placeholder="Masukkan" disabled>
                            </div>
                            <br /><br />
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <button type="submit" class="btn btn-primary float-end"
                                        style="width: 10%;">SIMPAN</button>
                                </div>
                            </div>
                        </form>
                        <br /><br />

                        <div class="row">
                            <h4>DETAIL RESREVASI</h4>
                            <hr>
                            <table class="table table-striped table-bordered mt-4 px-1">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Kode Objek</th>
                                        <th scope="col">Objek Wisata</th>
                                        <th scope="col">Alamat</th>
                                        <th scope="col">Kota, Provinsi</th>
                                        <!-- <th scope="col">provinsi</th> -->
                                        <th scope="col">OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in post.detail" :key="data.trd_kode">
                                        <!-- <td><router-link :to="{ name: 'reservasi.edit', params: { id: data.trh_kode } }">{{ data.trh_kode }}</router-link></td> -->
                                        <td>{{ data.tot_kode }}</td>
                                        <td>{{ data.nama }}</td>
                                        <td style="width: 45%;">{{ data.alamat }}</td>
                                        <td>{{ data.kota }}, {{ data.provinsi }}</td>
                                        <!-- <td>{{ data.provinsi }}</td> -->
                                        <!-- <td>{{ data.tsr_deskripsi }}</td> -->
                                        <td style="width: fit-content; text-align: center; vertical-align: middle;">
                                            <div class="form-group">
                                                <button class="btn btn-danger ml-1"
                                                    @click.prevent="postDelete(data.trh_kode)"> <vue-feather type="trash-2"
                                                        size="16" class="color-white" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { baseURL } from '@/config.js'

export default {

    components: {
        VueDatePicker
    },

    data() {
        return {
            status: []
        }
    },
    methods: {
        setStatus(data) {
            this.status = data
        }

    },
    mounted() {
        axios.get(baseURL + '/reservasi/status')
            .then(ress => {
                this.setStatus(ress.data)
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
            tglJalanNew: '',
            pax: '',
            harga: '',
            status: '',
            buses: [],
            detail: []
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
            axios.get(baseURL + `/reservasi/find?trh_kode=${route.params.id}`)
                .then(response => {
                    // axios.get(baseURL+'/getBuses?tb_pax='+response.data[0][0].trh_pax+'&tph_kode='+response.data[0][0].trh_tph_kode)
                    //     .then(ress => {
                    //         post.buses = ress.data
                    //     })
                    //     .catch(error => {
                    //         console.log(error)
                    //     })
                    //assign state posts with response data
                    // console.log(response.data[0][0])
                    post.kode = response.data[0][0].trh_kode
                    post.paket = response.data[0][0].trh_tph_kode + " - " + response.data[0][0].tph_nama
                    post.paketName = response.data[0][0].tph_nama
                    post.client = response.data[0][0].name
                    post.whatsapp = response.data[0][0].whatsapp
                    post.tglRes = response.data[0][0].trh_tgl_reservasi
                    post.tglJalan = new Date(response.data[0][0].trh_tgl_jalan)
                    post.pax = response.data[0][0].trh_pax
                    post.harga = response.data[0][0].trh_harga
                    post.status = response.data[0][0].trh_tsr_kode + " - " + response.data[0][0].tsr_desc
                    post.bus = response.data[0][0].tb_kode + " - " + response.data[0][0].tb_nama
                    post.detail = response.data[1]

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //method update
        function update() {
            let trh_tph_kode = post.paket.split("-")[0]
            let trh_tgl_jalan = post.tglJalan.toISOString().split('T')[0]
            let trh_pax = post.pax
            let trh_tsr_kode = post.status.split("-")[0]
            // let trh_tb_kode = post.bus.split("-")[0]

            axios.get(baseURL + '/reservasi/update', {
                params: {
                    trh_kode: route.params.id,
                    trh_tph_kode: trh_tph_kode,
                    trh_tgl_jalan: trh_tgl_jalan,
                    trh_pax: trh_pax,
                    trh_tsr_kode: trh_tsr_kode
                }
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
    color: #39393A;
}

.color-prime {
    background-color: #297373;
    color: antiquewhite;
}

.color-second {
    background-color: #85FFC7;
}

.color-triple {
    background-color: #FF8552;
}

.color-triple:hover {
    outline-color: #FF8552;
    color: #FF8552;
    border: 1em;
    border-color: #FF8552;
}
</style>