# Upload to Dropbox

[![](https://github.com/deka0106/upload-to-dropbox-action/workflows/build-test/badge.svg)](https://github.com/deka0106/upload-to-dropbox-action/actions)

This uploads a file to Dropbox

## Usage

See [action.yml](action.yml)

### Setup

Generate access token that has `files.content.write` permission on [App Console](https://www.dropbox.com/developers/apps).

Save the token as `DROPBOX_ACCESS_TOKEN` on your repository Secrets.

### Upload a file

```yaml
- uses: deka0106/upload-to-dropbox@v2
  with:
    dropbox_access_token: ${{ secrets.DROPBOX_ACCESS_TOKEN }}
    src: dist/paper.pdf
    dest: /thesis/
```

### Upload a file with overwrite mode

```yaml
- uses: deka0106/upload-to-dropbox@v2
  with:
    dropbox_access_token: ${{ secrets.DROPBOX_ACCESS_TOKEN }}
    src: dist/paper.pdf
    dest: /thesis/
    mode: overwrite
```

### Upload a file with specified name

```yaml
- uses: deka0106/upload-to-dropbox@v2
  with:
    dropbox_access_token: ${{ secrets.DROPBOX_ACCESS_TOKEN }}
    src: dist/paper.pdf
    dest: /thesis/my-thesis.pdf
```

### Upload multiple files

```yaml
- uses: deka0106/upload-to-dropbox@v2
  with:
    dropbox_access_token: ${{ secrets.DROPBOX_ACCESS_TOKEN }}
    src: dist/**/*
    dest: /dest/
    multiple: true
```
