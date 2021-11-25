import request from 'request';

export default function getUploadUrl(req, res){ 

    request(process.env.UPLOAD_URL, function (error, response, body) {
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode);
          return res.status(response.statusCode).send(body)
    });
}