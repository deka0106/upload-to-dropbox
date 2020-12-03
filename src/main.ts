import globby from 'globby'
import * as core from '@actions/core'
import * as fs from 'fs'
import { join, basename } from 'path'
import { makeUpload } from './upload'
import { asBoolean, isDirectory } from './utils'

const accessToken = core.getInput('dropbox_access_token')
const src = core.getInput('src')
const dest = core.getInput('dest')
const multiple = asBoolean(core.getInput('multiple'))

const mode = core.getInput('mode')
const autorename = asBoolean(core.getInput('autorename'))
const mute = asBoolean(core.getInput('mute'))

async function run() {
  try {
    const { upload } = makeUpload(accessToken)

    if (!multiple) {
      const contents = await fs.promises.readFile(src)
      if (isDirectory(dest)) {
        const path = join(dest, basename(src))
        await upload(path, contents, { mode, autorename, mute })
        core.info(`Uploaded: ${src} -> ${path}`)
      } else {
        await upload(dest, contents, { mode, autorename, mute })
        core.info(`Uploaded: ${src} -> ${dest}`)
      }
    } else {
      const files = await globby(src)
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
