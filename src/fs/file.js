import { pipeline } from 'stream'
import fs from 'graceful-fs'
import tmp from '../fs/tmp'

export default async (inStream, ext) => {
  const tmpFile = tmp(ext)
  await new Promise((resolve, reject) => {
    pipeline(
      inStream,
      fs.createWriteStream(tmpFile.path),
      (err) => {
        err ? reject(err) : resolve()
      }
    )
  })
  return {
    file: tmpFile,
    done: () => {
      tmpFile.destroy().catch(() => null)
    }
  }
}
