import { Dropbox, files } from 'dropbox'
import fetch from 'node-fetch'

export async function upload(
  path: string,
  contents: Buffer,
  accessToken: string,
  dropboxMode: string
): Promise<void> {
  const mode = getMode(dropboxMode)

  const dropbox = new Dropbox({ accessToken, fetch })
  await dropbox.filesUpload({ path, contents, mode })
}

function getMode(mode: string): files.WriteMode {
  switch (mode) {
    case 'overwrite':
      return {
        '.tag': 'overwrite',
      }
    case 'add':
    default:
      return {
        '.tag': 'add',
      }
  }
}
