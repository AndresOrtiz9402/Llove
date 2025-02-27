import { randomBytes } from 'crypto';

const secret: string = randomBytes(32).toString('hex');

console.log('Secreto:', secret);
