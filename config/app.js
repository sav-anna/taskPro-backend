module.exports = {
    jwt: {
      tokens: {
        access: {
          type: 'access',
          expiresIn: '23h',  
        },
        refresh: {
          type: 'refresh',
          expiresIn: '30h',
        },
      },
    },
  };