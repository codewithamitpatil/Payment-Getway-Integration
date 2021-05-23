
const express         = require('express');
const router          = express.Router();
const multer          = require('multer');
const asyncHandler  = require('../middlewares/async.middleware');


// intilize multer
   const upload = multer();

// form-data /multipart data parsing
   router.use(upload.array());

// create user (signup)
router.post('/create-profile',asyncHandler()); 

// export routes
module.exports = router;















