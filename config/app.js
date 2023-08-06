module.exports = {
    jwt: {
      tokens: {
        access: {
          type: 'access',
          expiresIn: '1h',
        },
        refresh: {
          type: 'refresh',
          expiresIn: '2h',
        },
      },
    },
  };