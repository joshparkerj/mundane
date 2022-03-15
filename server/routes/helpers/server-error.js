module.exports = (res) => (err) => {
  console.error(err);
  return res.status(500).send('messed up');
};
