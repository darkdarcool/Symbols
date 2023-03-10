import * as replit from '@replit/extensions';


class FS {
  async readFile(path) {
    let file = await replit.fs.readFile(path);
    return file.content
  }
}

export default new FS();