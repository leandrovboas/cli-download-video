const fs = require('fs')
const util = require('util');
const youtubedl = require('youtube-dl')

const promisifiedGetInfo = util.promisify(youtubedl.getInfo)

async function Download (url, infoVideo, path){
    const video = youtubedl(url, ['--format=18'],{cwd: __dirname})

    console.log(`title: ${infoVideo.title}`)
    console.log(`size: ${infoVideo.size}`)
    console.log(`description: ${infoVideo.descripton}`)
    console.log(`format: ${infoVideo.format}`)

    let pathName = path ? `${path}${infoVideo.title}.mp4` : `${infoVideo.title}.mp4`
    video.pipe(fs.createWriteStream(pathName))
}

function GetInfoVideo(url){
    return promisifiedGetInfo(url, [])
        .catch(err => console.log(err));
}

module.exports = {
    Download,
    GetInfoVideo
}