import axios from "axios";

ars.send_request = (method, url, data, headers) => {
    if (!headers)
        headers = {};
    let access_token = localStorage.getItem("access_token");
    if (access_token)
        headers["ars-access"] = access_token;

    headers["Content-Type"] = "application/x-www-form-urlencoded";

    return new Promise((resolve, err) => {
        let params = {...data};
        data = ars.serialize_object(data);
        let options = {
            params,
            method,
            url,
            data,
            headers,
            withCredentials: true
        }

        if (method === "get")
            delete options["data"];
        else
            delete options["params"];

        axios(options).then(function (response) {
            if (response.headers["ars-access"]) {
                localStorage.setItem("access_token", response.headers["ars-access"]);
            }
            return resolve(response);
        }).catch(function (error) {
            if (error.response.headers["ars-access"])
                localStorage.setItem("access_token", error.response.headers["ars-access"]);
            return err(error);
        });
    });
}
ars.post = (url, data_to_pass, headers) => {
    return ars.send_request("post", url, data_to_pass, headers);
}
ars.get = (url, data_to_pass, headers) => {
    return ars.send_request("get", url, data_to_pass, headers);
}