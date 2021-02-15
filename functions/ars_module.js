import {useEffect} from "react";
import {connect} from "react-redux";

ars.load_module = function (url_or_data_fn, component) {
    let load_fn = {};
    let data_to_pass = {data:{}};
    if (typeof component !== "function")
        Error("Need to use component!");

    if (typeof url_or_data_fn === "object") {

        load_fn = () => async (dispatch) => {
            for (const [param, url] of Object.entries(url_or_data_fn)) {
                try {
                    const res = await ars.get(url);
                    data_to_pass[param] = res.data;
                } catch (e) {

                }
                dispatch({type: "ars"})
            }

        }
    } else if (typeof url_or_data_fn === "function") {
        load_fn = url_or_data_fn;
    } else {
        load_fn = () => async (dispatch) => {
            try {
                const res = await ars.get(url_or_data_fn);
                data_to_pass = {data:res.data};
                dispatch({type: "ars"})
            } catch (e) {

            }
        }
    }
    return connect(
        (state) => (data_to_pass),
        {load_fn}
    )((props) => {
        if (props.load_fn && typeof props.load_fn === "function") {
            useEffect(() => {
                props.load_fn();
            }, []);
        }
        return component(props);
    });
};
