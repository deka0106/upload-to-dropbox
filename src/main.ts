import * as core from '@actions/core'

async function run() {
  try {
    core.debug('Hello')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
