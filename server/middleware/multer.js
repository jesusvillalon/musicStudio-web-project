const multer = require("multer");
function uploadImage(a) {
  const storage = multer.diskStorage({
    
    // destination: `../client/./public/images/${a}`,
    destination: `./public/images/${a}`,

    filename: function (req, file, callback) {
      console.log(file);
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");
  // const upload = multer({ storage: storage }).array("file");

  return upload;
}

module.exports = uploadImage;
