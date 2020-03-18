const http = require("http");
const queryString = require("querystring");

module.exports = {
  getResponse(hostname, port, path, param, success, errFn, processFn) {
    let data = "";

    const query = queryString.stringify(param);

    path += "?" + query;

    const opt = {
      hostname,
      port,
      path,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    return new Promise((resolve, reject) => {
      const req = http.request(opt, response => {
        response.on("error", err => {
          console.err(err);
          errFn && errFn(err);
          reject(err);
        });

        response.on("end", () => {
          success && success(data);
          resolve(JSON.parse(data));
        });

        response.on("data", chunk => {
          processFn && processFn(chunk.toString(), data);
          data += chunk.toString();
        });
      });

      req.end();
    });
  }
};
