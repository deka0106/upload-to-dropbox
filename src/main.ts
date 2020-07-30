import * as core from '@actions/core'
import * as path from 'path'
import fs from 'fs/promises'
import { upload } from './upload'

const accessToken = core.getInput('dropbox_access_token')
const file = core.getInput('file')
const prefix = core.getInput('path')

async function run() {
  try {
    const contents = await fs.readFile(file)
    core.debug(`Upload ${file} to ${prefix} ...`)
    await upload(path.join(prefix, file), contents, accessToken)
    core.debug('Completed!')
  } catch (error) {
    core.setFailed(error)
  }
}

run()
