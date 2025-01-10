import { exec } from 'child_process';

const nameValidation = (filename) => {
  if (!filename) throw new Error('Provide a filename.');

  const regex = /^[a-zA-Z0-9]*$/;

  if (!regex.test(filename)) throw new Error('Invalid name.');
};

function runCommand(filename, options) {
  nameValidation(filename);

  const { outputJs } = options;

  exec(
    `npx typeorm migration:create ${outputJs} ../migrations/${filename}`,
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

const filename = process.argv[2];

runCommand(filename, { outputJs: '-o' });
