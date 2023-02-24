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
                            <div class="form-group">
                                <div class="row">
                                    <label for="title" class="font-weight-bold mt-2 mb-1">Status Reservasi</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" v-model="post.status"
                                            placeholder="Masukkan" disabled>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" v-model="post.status">
                                            <option v-for="data in status" :key="data.tsr_kode">{{ data.tsr_kode }}-{{data.tsr_deskripsi }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                        <br/><br/>

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
                                    <td>{{ data.tpd_kode}}</td>
                                    <td>{{ data.nama }}</td>
                                    <td style="width: 45%;">{{ data.alamat }}</td>
                                    <td>{{ data.kota }}, {{ data.provinsi }}</td>
                                    <!-- <td>{{ data.provinsi }}</td> -->
                                    <!-- <td>{{ data.tsr_deskripsi }}</td> -->
                                    <td class="text-center">
                                        <!-- <router-link :to="{name: 'paket.edit', params:{id: data.tph_kode }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link> -->
                                        &nbsp;&nbsp;
                                        <div class="form-group">
                                            <vue-feather type="compass" class="color-white"/>
                                            <button class="btn btn-sm btn-danger ml-1" @click.prevent="postDelete(data.trh_kode)" >DELETE</button>
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

export default {

    data() {
        return {
            jenis: [],
            status: []
        }
    },
    methods: {
        setJenis(data) {
            this.jenis = data
        },
        setStatus(data) {
            this.status = data
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/paketAll')
            .then(ress => {
                this.setJenis(ress.data)
            })
            .catch(error => {
                console.log(error)
            }),
        axios.get('http://localhost:8000/api/jenisStatus')
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
            pax: '',
            status:'',
            detail:[]
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
                    console.log(response.data[0][0])
                    post.kode = response.data[0][0].trh_kode
                    post.paket = response.data[0][0].trh_tph_kode + " - " + response.data[0][0].tph_nama
                    post.paketName = response.data[0][0].tph_nama
                    post.client = response.data[0][0].trh_client
                    post.whatsapp = response.data[0][0].tu_whatsapp
                    post.tglRes = response.data[0][0].trh_tgl_reservasi
                    post.tglJalan = response.data[0][0].trh_tgl_perjalanan
                    post.pax = response.data[0][0].trh_pax
                    post.status = response.data[0][0].trh_tsr_kode
                    post.detail = response.data[1]

                }).catch(error => {
                    console.log(error.response.data)
                })

        })

        //method update
        function update() {

            let trh_tph_kode = post.paket.split("-")[0]
            let trh_tgl_perjalanan = post.tglJalan
            let trh_pax = post.pax
            let trh_tsr_kode = post.status

            axios.put(`http://localhost:8000/api/updResHead`, {
                trh_kode: route.params.id,
                trh_tph_kode : trh_tph_kode,
                trh_tgl_perjalanan: trh_tgl_perjalanan,
                trh_pax : trh_pax,
                trh_tsr_kode: trh_tsr_kode
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
    color: #39393A;
}
.color-prime{
    background-color: #297373;
    color: antiquewhite;
}
.color-second{
    background-color: #85FFC7;
}
.color-triple{
    background-color: #FF8552;
}
.color-triple:hover{
    outline-color: #FF8552;
    color: #FF8552;
    border: 1em;
    border-color: #FF8552;
}
</style>