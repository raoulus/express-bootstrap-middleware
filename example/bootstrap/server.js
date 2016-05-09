'use strict';

const PORT = 3001;

module.exports = function(app) {
  return app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
  });
};
