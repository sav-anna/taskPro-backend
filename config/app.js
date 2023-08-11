module.exports = {
    jwt: {
      tokens: {
        access: {
          type: 'access',
          expiresIn: '1m',  
        },
        refresh: {
          type: 'refresh',
          expiresIn: '30h',
        },
      },
    },
  };