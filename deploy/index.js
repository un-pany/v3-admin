/* eslint-disable @typescript-eslint/no-var-requires */

/** 注意：
 * 该自动部署文件的中的账号密码不能上传到 git 仓库，这涉及的账号安全问题；
 * 请在上传前删除账号密码，或者将该文件设置为忽略文件。
 */

'use strict'
const scpClient = require('scp2') // 引入scp2
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('正在发布到服务器...')

const Client = require('ssh2').Client
const conn = new Client()

const server = {
  host: '', // 服务器的IP地址
  port: '22', // 服务器端口, 一般为22
  username: 'root', // 用户名
  password: '', // 密码
  path: '/var/www/html/', // 项目部署的服务器目标位置
  command: 'rm -rf /var/www/html/*' // 删除命令
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
