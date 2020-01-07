const fs = require('fs')
const youtubedl = require('youtube-dl') 
const outputname = ""

async function download (url, path){
    const video = youtubedl(url, ['--format=18'],{cwd: __dirname})
    video.on('info', (info) => {
        console.log('Download Started')
        console.log(`FileName: ${info._filename}`)
        console.log(`size: ${info.size}`)
        outputname = info._filename
    })

    video.pipe(fs.createWriteStream(`${outputname}.mp4`))
}

module.exports = {
    download
}