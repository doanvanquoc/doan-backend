const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/anh'); // Đường dẫn lưu trữ tệp
  },
  filename: function (req, file, cb) {
    //lay ten file luc upload
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;