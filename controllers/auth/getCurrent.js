const getCurrent = async (req, res) => {
  const { id, email, name, theme, avatarURL } = req.user;
  res.json({
    id,    
    theme,
    avatarURL,
    name,
    email,
  });
};

module.exports = getCurrent;
