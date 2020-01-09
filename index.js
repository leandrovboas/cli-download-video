#!/usr/bin/env node

const program = require('commander')
const config = require('./config')

const exec = require('./process')

program.version(config.version)

program
    .command('download <url>')
    .description('Realiza o download de um video a partir da url informada')
    .option('-p, --path [path]', 'Realiza o download do video no caminho informado')
    .option('-f, --format [format]', 'Formato do arquovo ( EX:. 480p ) Padrao 360p ' )
    .option('-F, --formatList', 'Busca os formatos validos para esse video')
    .action(async (url, option) =>{

        if(option.formatList){
            exec.GetFormat(url);
            return
        }


        let infoVideo = await exec.GetInfoVideo(url)
        await exec.Download(url, infoVideo, option.path, option.format)

    })

program.parse(process.argv)