const fs = require('fs')
const util = require('util')
const ora = require('ora');
const youtubedl = require('youtube-dl')

const promisifiedGetInfo = util.promisify(youtubedl.getInfo)

async function Download (url, infoVideo, path, format = 18){
    const pathName = path ? `${path}${infoVideo.title}.mp4` : `${infoVideo.title}.mp4`
    let spinner = null;
    const video = youtubedl(url, [`--format=${format}`],{cwd: __dirname})
    
    video.on('info', function(info) {
        console.log("")
        console.log('=====> Download Started')
        console.log("")
        console.log(`title: ${infoVideo.title}`)
        console.log('size: ' + info.size)
        console.log(`description: ${infoVideo.descripton}`)
        console.log(`format: ${infoVideo.format}`)
        console.log("")
        this.spinner = ora({
        	text: "Download...", 
            spinner: {
                interval: 80,
		        frames: [
		            	"⠋",
		            	"⠙",
		            	"⠹",
		            	"⠸",
		            	"⠼",
		            	"⠴",
		            	"⠦",
		            	"⠧",
		            	"⠇",
                        "⠏"
                    ]}
        }).start();
    })

    video.pipe(fs.createWriteStream(pathName))
    
    video.on('end', function() {
        this.spinner.stop();
        console.log('=====> Download Finish')
        })
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