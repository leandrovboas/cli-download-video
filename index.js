#!/usr/bin/env node

const program = require('commander')
const config = require('./config')

const exec = require('./process')

program.version(config.version)

program
    .command('download <url>')
    .description('Realiza o download de um video a partir da url informada')
    .option('-p, --path [path]', 'Realiza o download do video no caminho informado')
    .action((url, option) =>{
        exec.download(url)
    })

program.parse(process.argv)