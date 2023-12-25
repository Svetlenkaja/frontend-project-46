import { existsSync, readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';

const fileParse = (path) => {
  const workDir = cwd();
  const absolutePatn = resolve(workDir, path);
  if (existsSync(absolutePatn)) {
    const ext = extname(absolutePatn);
    switch(ext) {
      case '.json': 
        return JSON.parse(readFileSync(absolutePatn, 'utf8'));
      default:
        return readFileSync(absolutePatn, 'utf8');
    }
  } 
  return absolutePatn;
}

export default fileParse;