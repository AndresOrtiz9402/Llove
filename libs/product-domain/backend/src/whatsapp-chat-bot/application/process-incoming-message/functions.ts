import type { WhatsAppContact, WhatsAppTextMessage } from './interface';

export const createEnumRows = <T>(enumObj: T): { id: string; title: string }[] => {
  return Object.values(enumObj).map(value => ({
    id: value.toLowerCase(),
    title: value.charAt(0).toUpperCase() + value.slice(1),
  }));
};

export const getContactName = (contact: WhatsAppContact) => contact?.profile?.name || null;

export const getFirstName = (name: string) => name?.split(' ')?.[0] || null;

export const isGreeting = (message: WhatsAppTextMessage) => {
  const greetings = [
    'hola',
    'buenas',
    'buenos días',
    'buenos dias',
    'buenas tardes',
    'buenas noches',
  ];

  const value = message.text.body.toLowerCase().trim();

  return greetings.includes(value);
};
