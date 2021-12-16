import request from 'request';

export default function getUploadUrl(req, res){ 

    request(process.env.UPLOAD_URL, function (error, response, body) {
          if (error != null) {
              console.log('error:', error);
              return res.status(500).json("Can't get upload link");
          }
          res.type('json');
          return res.status(response.statusCode).send(body);
    });
}