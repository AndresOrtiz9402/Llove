import { exec } from 'child_process';
import { resolve } from 'path';

function runCommand(
  projectName: string,
  filename: string,
  outputJs: '-o' | '' = ''
) {
  const length = process.argv.length;

  if (length < 3) {
    console.log('No args provided.');
    process.exit(1);
  }

  if (length === 3) {
    console.log('Provide a filename.');
    process.exit(1);
  }

  if (length > 4) {
    console.log('To many args provided.');
    process.exit(1);
  }

  const regex = /^[a-zA-Z0-9-]*$/;

  if (!regex.test(projectName)) {
    console.log('Invalid project name.');
    process.exit(1);
  }

  if (!regex.test(filename)) {
    console.log('Invalid filename.');
    process.exit(1);
  }

  const filePath = resolve(
    __dirname,
    '../../',
    `./libs/product-domain/backend/src/${projectName}/infrastructure/typeorm/migrations/${filename}`
  );

  exec(
    `npx typeorm migration:create ${outputJs} ${filePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }

      console.log(`${stdout}`);
    }
  );
}

const projectName = process.argv[2];
const filename = process.argv[3];

runCommand(projectName, filename);
