module.exports = {

    jwt: {
      tokens: {
        access: {
          type: 'access',
          expiresIn: '2m',  
        },
        refresh: {
          type: 'refresh',
          expiresIn: '3m',
        },

      },
    },
  },
};
