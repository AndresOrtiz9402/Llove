export enum GenerateLetterButton {
  ID = 'generate',
  BUTTON_TITLE = 'generar carta',
}

export type ButtonId = (typeof GenerateLetterButton)[keyof typeof GenerateLetterButton];

export enum CommonMessages {
  BAD_OPTION_RESPONSE = 'La opción seleccionada o el tipo de mensaje no es válido. Por favor intenta de nuevo.',
  WELCOME_MESSAGE = 'Te doy la bienvenida a al chat de Whatsapp de Letter Love.',
}
