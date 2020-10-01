const urlApi = 'https://apilenguaback.herokuapp.com'; 

const endpoints = {
    createUsuario:`${urlApi}/api/createUsuario/`,
    backup:`${urlApi}/api/backup/`,
    deleteByIdUsuario:`${urlApi}/api/deleteByIdUsuario/`,
    getByIdUsuario:`${urlApi}/api/getByIdUsuario/`,
}

export default endpoints;