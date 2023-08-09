module.exports = {
    jwt: {
      tokens: {
        access: {
          type: 'access',
          expiresIn: '59m',
        },
        refresh: {
          type: 'refresh',
          expiresIn: '150m',
        },
      },
    },
  };