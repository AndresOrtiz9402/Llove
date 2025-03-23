// Generate letter endpoint
export const GENERATE_LETTER_API_BODY = {
  description: 'The DTO containing letter options to be generated.',
  schema: {
    type: 'object',
    properties: {
      isFor: { type: 'string' },
      occasion: { type: 'string' },
      relationship: { type: 'string' },
      tone: { type: 'family | friendly | romantic' },
    },
  },
};

export const GENERATE_LETTER_API_OPERATION = {
  summary: 'Generate a letter',
  description: 'Generates a new letter based on the provided options without saving it.',
};

export const GENERATE_LETTER_API_RESPONSE = [
  {
    status: 201,
    description: 'Letter generated successfully.',
    schema: {
      type: 'object',
      properties: {
        letter: { type: 'object' },
        options: { type: 'object' },
      },
    },
  },
];

// Get page endpoint
export const GET_PAGE_API_OPERATION = {
  summary: 'Get paginated letters',
  description:
    'Retrieve a paginated list of letters based on the user ID includes and optional sorting criteria.',
};

export const GET_PAGE_API_QUERIES = [
  {
    name: 'l',
    required: false,
    description: 'Limit per page',
    schema: { type: 'integer', default: 10 },
  },
  {
    name: 'p',
    required: false,
    description: 'Page number',
    schema: { type: 'integer', default: 1 },
  },
  {
    name: 'ds',
    required: false,
    description: 'Date sort direction',
    schema: { type: 'string', default: 'a' },
  },
  {
    name: 'ts',
    required: false,
    description: 'Title sort direction',
    schema: { type: 'string', default: 'a' },
  },
];

export const GET_PAGE_API_RESPONSE = [
  {
    status: 200,
    description: 'Successful response with the list of letters.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          letterOptions: {},
          letter: {},
        },
      },
    },
  },
  {
    status: 400,
    description: 'Bad Request. Invalid query parameters.',
  },
  {
    status: 401,
    description: 'Unauthorized. The user is not authenticated.',
  },
  {
    status: 500,
    description: 'Internal Server Error. An unexpected error occurred.',
  },
];

// Save letter endpoint
export const SAVE_LETTER_API_BODY = {
  description: 'The DTO containing letter options and content to be saved.',
};

export const SAVE_LETTER_API_RESPONSE = [
  {
    status: 201,
    description: 'Letter saved successfully.',
    schema: {
      type: 'object',
      properties: {
        letterOptions: {},
        letter: {},
      },
    },
  },
];

export const SAVE_LETTER_API_OPERATION = {
  summary: 'Save a letter',
  description:
    'Stores a new letter with the provided options and associates it with the authenticated user.',
  schema: {
    type: 'object',
    properties: {
      letterOptions: {},
      letter: {},
    },
  },
};
