const express = require('express')

const server = express()

const path = require('path')
const { stdout, stderr } = require('process')

const router = express.Router()

server.use('/',router)

router.get("/", function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'))
})
router.post("/", function(req,res){
    const { exec } = require('child_process')

    exec('stress --cpu 8 --io 4 --vm 2 --vm-bytes 128M --timeout 10s -v >> stresslog.txt', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        } else {
            res.sendFile(path.join(__dirname+'/stresslog.txt'))
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
    exec('wget -q -O - http://169.254.169.254/meta-data/instance-id >> stresslog.txt', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        } else {
            res.sendFile(path.join(__dirname+'/stresslog.txt'))
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
})
server.listen(3000, function(){
    console.log("Server is running")
})
