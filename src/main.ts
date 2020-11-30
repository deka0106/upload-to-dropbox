import * as core from '@actions/core'
import * as fs from 'fs'
import { upload } from './upload'

const accessToken = core.getInput('dropbox_access_token')
const file = core.getInput('file')
const path = core.getInput('path')
const mode = core.getInput('mode')

async function run() {
  try {
    const contents = await fs.promises.readFile(file)
    core.debug(`Uploading '${file}' -> '${path}'`)
    await upload(path, contents, accessToken, mode)
    core.info(`'${file}' -> '${path}' has been successfully uploaded`)
  } catch (error) {
    core.setFailed(error)
  }
}

run()
