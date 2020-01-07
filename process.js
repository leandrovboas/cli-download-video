const fs = require('fs')
const util = require('util');
const youtubedl = require('youtube-dl')

const promisifiedGetInfo = util.promisify(youtubedl.getInfo)

async function Download (url, infoVideo){
    const video = youtubedl(url, ['--format=18'],{cwd: __dirname})

    console.log(`FileName: ${infoVideo._filename}`)
    console.log(`size: ${infoVideo.size}`)

    video.pipe(fs.createWriteStream(`${infoVideo.title}.mp4`))
}

function GetInfoVideo(url){
    return promisifiedGetInfo(url, [])
        .catch(err => console.log(err));
}

module.exports = {
    Download,
    GetInfoVideo
}