export enum GenerateLetterFlowStepsMessages {
  INTERACTIVE_BUTTON_MESSAGE = 'Si deseas crear una carta has click en generar.',
  INTERACTED_BUTTON_RESPONSE = '¡Muy bien, Comencemos!',
  STEP1_START_MESSAGE = 'Escribe el nombre de la persona a quién va dirigida la carta.',
  STEP2_IS_FOR_MESSAGE = 'Escribe el motivo de la carta.',
  STEP3_OCCASION_MESSAGE = 'Indica el tipo de relación con el destinatario.',
  STEP4_RELATIONSHIP_MESSAGE = 'Elige una opción para el tono de la carta.',
  STEP5_TONE_MESSAGE = 'Generando carta...',
  LETTER_GENERATION_FAIL = 'Lo sentimos mucho, no pudimos generar la carta para ti. Por favor, intente más tarde.',
  LETTER_GENERATION_SUCCESS = '¡Carta generada con éxito! Si deseas generar otra carte presiona el botón de "generar".',
}

export enum LetterGenerationFlowSteps {
  STEP1_START = 'start',
  STEP2_IS_FOR = 'isFor',
  STEP3_OCCASION = 'occasion',
  STEP4_RELATIONSHIP = 'relationship',
  STEP5_TONE = 'tone',
}
