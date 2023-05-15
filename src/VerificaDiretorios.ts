import { promises as fs_promise } from 'fs'
import fs from "fs"
import path from "path"
import mime from 'mime-types'

export async function VerificaDiretorio() {

    if (!fs.existsSync(`${path.resolve()}\\XMLDestinatario-NOVO\\`)) {

        fs.mkdirSync(`${path.resolve()}\\XMLDestinatario-NOVO`)
    }

    const diretorio = path.resolve()
    let arquivos: string[] = []

    await MapeiaArquivos(diretorio)

    async function MapeiaArquivos(diretorio: string) {

        let listaDeArquivos = await fs_promise.readdir(diretorio)

        for (let arquivo in listaDeArquivos) {
            const arquivo_no_diretorio = diretorio + '\\' + listaDeArquivos[arquivo]

            let stat = await fs_promise.stat(arquivo_no_diretorio)

            if (!stat.isDirectory()) {

                if (fs.existsSync(arquivo_no_diretorio) && String(mime.lookup(arquivo_no_diretorio)) == 'application/xml') {

                    if (arquivo_no_diretorio.includes('proc')) {

                        let newPath = `${path.resolve()}\\XMLDestinatario-NOVO\\${path.basename(arquivo_no_diretorio.replace('proc', ''))}`

                        fs.readFile(arquivo_no_diretorio, (err, data) => {
                            if (err) throw err;
                            // Escreve o arquivo de destino
                            fs.writeFile(newPath, data, (err) => {
                                if (err) throw err;
                            });
                        });

                    } else {

                        let newPath = `${path.resolve()}\\XMLDestinatario-NOVO\\${path.basename(arquivo_no_diretorio)}`

                        fs.readFile(arquivo_no_diretorio, (err, data) => {
                            if (err) throw err;
                            // Escreve o arquivo de destino
                            fs.writeFile(newPath, data, (err) => {
                                if (err) throw err;
                            });
                        });

                    }
                }

            } else if (stat.isDirectory()) {

                await MapeiaArquivos(diretorio + '\\' + listaDeArquivos[arquivo])
            }
        }
    }

    console.log(`   - Arquivos renomeados e movidos!`)

    let retorno = arquivos
    arquivos = []

    setTimeout(() => {
        console.log('  - fechando . . . ')
    }, 60000)

    return retorno
}

export default VerificaDiretorio