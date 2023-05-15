import VerificaDiretorio from "./VerificaDiretorios"


try {
    console.log('   - iniciado')

    VerificaDiretorio()

} catch (error) {
    console.log(error)
    setTimeout(() => {
        console.log('fechando . . . ')
    }, 60000)
}

