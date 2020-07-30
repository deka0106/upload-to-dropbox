import { Dropbox } from 'dropbox'

export async function upload(
  path: string,
  contents: Buffer,
  accessToken: string
): Promise<void> {
  const dropbox = new Dropbox({ accessToken })
  await dropbox.filesUpload({ path, contents })
}
