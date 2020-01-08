const fs = require('fs')
const util = require('util');
const youtubedl = require('youtube-dl')

const promisifiedGetInfo = util.promisify(youtubedl.getInfo)

async function Download (url, infoVideo, path, format = 18){
    const pathName = path ? `${path}${infoVideo.title}.mp4` : `${infoVideo.title}.mp4`

    const video = youtubedl(url, [`--format=${format}`],{cwd: __dirname})

    console.log(`title: ${infoVideo.title}`)
    console.log(`size: ${infoVideo.size}`)
    console.log(`description: ${infoVideo.descripton}`)
    console.log(`format: ${infoVideo.format}`)

    video.pipe(fs.createWriteStream(pathName))
}

async function GetFormat(url){
    youtubedl.exec(url, ['-F'], {}, (err, output) => {
        if (err) throw err

        console.log(output.join('\n'))
    })
}

function GetInfoVideo(url){
    return promisifiedGetInfo(url, [])
        .catch(err => console.log(err));
}

module.exports = {
    Download,
    GetInfoVideo,
    GetFormat
}