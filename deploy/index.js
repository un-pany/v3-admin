/**
 * 第一步: pnpm run build 打包项目生成 dist 目录
 * 第二步: 准确填写下方账号密码
 * 第三步: pnpm deploy 触发该自动部署程序
 * 注意: 账号密码不能上传到 git 仓库，这涉及的账号安全问题，请在上传前删除账号密码，或者将该文件设置为忽略文件
 */

'use strict'
const scpClient = require('scp2') // 引入 scp2
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('正在发布到服务器...')

const Client = require('ssh2').Client
const conn = new Client()

const server = {
  host: '', // 服务器的 ip 地址
  port: '22', // 服务器端口, 一般为 22
  username: 'root', // 用户名
  password: '', // 密码
  path: '/var/www/html/', // 项目部署的服务器目标位置
  command: 'rm -rf /var/www/html/*' // 删除历史静态文件
}

conn.on('ready', () => {
  conn.exec(server.command, (err, stream) => {
    if (err) { throw err }
    stream.on('close', () => {
      spinner.start()
      scpClient.scp(
        'dist/', // 本地打包文件的位置
        {
          host: server.host,
          port: server.port,
          username: server.username,
          password: server.password,
          path: server.path
        },
        (err) => {
          spinner.stop()
          if (err) {
            console.log(chalk.red('发布失败!'))
            throw err
          } else {
            console.log(chalk.green('项目发布成功!'))
          }
        }
      )
      conn.end()
    }).on('data', (data) => {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data)
    })
  })
}).connect({
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password
})
