import globby from 'globby'
import * as core from '@actions/core'
import * as fs from 'fs'
import { join } from 'path'
import { makeUpload } from './upload'
import { isDirectory } from './utils'

const accessToken = core.getInput('dropbox_access_token')
const src = core.getInput('src')
const dest = core.getInput('dest')

const mode = core.getInput('mode')
const autorename = core.getInput('autorename').toLowerCase() === 'true'
const mute = core.getInput('mute').toLowerCase() === 'true'

async function run() {
  try {
    const files = await globby(src)
    const { upload } = makeUpload(accessToken)

    if (files.length == 1) {
      const file = files[0]
      const contents = await fs.promises.readFile(file)
      if (isDirectory(dest)) {
        const path = join(dest, file)
        await upload(path, contents, { mode, autorename, mute })
        core.info(`Uploaded: ${file} -> ${path}`)
      } else {
        await upload(dest, contents, { mode, autorename, mute })
        core.info(`Uploaded: ${file} -> ${dest}`)
      }
    } else {
      await Promise.all(
        files.map(async (file) => {
          const path = join(dest, file)
          const contents = await fs.promises.readFile(file)
          await upload(path, contents, { mode, autorename, mute })
          core.info(`Uploaded: ${file} -> ${path}`)
        })
      )
    }
  } catch (error) {
    core.setFailed(error)
  }
}

void run()
