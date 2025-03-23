// Constants
const emailMessage = 'yuor_awesome_email_here@example.com';

// Main
export const GOOGLE_AUTH_API_OPERATION = {
  description:
    'Login or register with Google. If the user exists, it will be logged in. If not, it will be registered and logged in.',
  summary: 'Login or register with Google.',
};

export const LOGIN_API_OPERATION = {
  description: 'Verify if the user is registered. If the user exists, it will be logged in.',
  summary: 'Login with email.',
  requestBody: {
    content: {
      'application/json': {
        example: {
          email: emailMessage,
        },
      },
    },
  },
};

export const LOGOUT_API_OPERATION = {
  description: 'Logout the user.',
  summary: 'Logout the user.',
};

export const REGISTER_API_OPERATION = {
  description: 'Register a new user, and they will be logged in.',
  summary: 'Register a new user.',
};

export const REGISTER_API_BODY = {
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: emailMessage,
      },
      name: {
        type: 'string',
        example: 'your awesome name here',
      },
    },
  },
};
