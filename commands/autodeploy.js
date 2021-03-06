const { Command } = require("jommand");
const exec = require('child_process').exec
const config = require('../config.json')

module.exports.command = new Command('deploy', async (msg, ctx) => {

    if(!config.debugging) {
        if(!msg.member.hasPermission('ADMINISTRATOR')) {
            msg.channel.send(':x: 관리자 권한이 필요합니다.')
            return
        }

        await msg.channel.send('<a:loading:865033893954846721> Pulling from git...')
        exec('git pull', async (err, stdout, stderr) => {
            let txt = 'Pulled Successfully!\n```diff\n[DEPLOY] Start\n'
            txt += stdout
            txt += '\n```'
            await msg.channel.send(txt)
            await msg.channel.send('Restarting...')
            exec('pm2 restart gameroom')
        })
    }

})