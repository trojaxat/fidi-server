import ms from "mediaserver";

export default function playMediaServer(req, res) {
  let serverPath = "./public/uploads/" + req.params.id;
  ms.pipe(req, res, serverPath);
  return req.params.id;
}
