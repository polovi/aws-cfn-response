import { request as makeRequest } from 'https'
import { parse as parseUrl } from 'url'

export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface Message {
  Status: Status
  ResponseURL: string
  PhysicalResourceId: string
  StackId: string
  RequestId: string
  LogicalResourceId: string
  Data?: any
  Reason?: string
}

export const send = (msg: Message) => {
  const { hostname, path } = parseUrl(msg.ResponseURL)
  const body: string = JSON.stringify(msg)

  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: 'PUT',
      headers: { 'content-length': body.length },
    }

    const req = makeRequest(options, res => {
      let body = ''
      res.on('data', chunk => (body += chunk))
      res.on('end', () => {
        console.log(body)
        resolve(body)
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}
