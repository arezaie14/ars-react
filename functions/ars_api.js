ars.api = {
    base_url: {},
    api_list: {},
    set_base_url: (base_url, v) => {
        if (!v)
            v = "v1";
        ars.api.base_url[v] = base_url
    },
    set_addresses: (address_obj) => ars.api.api_list = address_obj,
    url: (api_name, v) => {
        if (!v)
            v = "v1";
        return ars.api.base_url[v] +v+"/"+ api_name;
    }
}
