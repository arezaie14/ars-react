/**
 * @description
 * **** Please note, to using ars react router you need to put your paths in to src directory ****
 * To use ars router you need to first import it like this: import Routes from "ars-react/router";
 * after router imported you can use it like react router dom.
 * the props of this router are : paths, url, exact, default404
 *
 *  @param paths
 *  @param exact
 *  @param default404
 *  @param path
 *  @param url
 *
 *  @example for paths param
 *  {
 *      profile:[MainPathOfUrl,UrlToLoad,NotFoundToLoad],
 *  }
 *
 * in each component that loading with ars router, a paths object is passing to that component, you can use
 * paths object to accessing your mapping params, the object is contain the params like below:
 * @example {
 *     "path1":{
 *         path:(page)=>{
 *             //this function will making path from MainPathOfUrl for page you passed.
 *         },
 *         url:(page)=>{
 *             //this function will making url from UrlToLoad for page you passed.
 *         },
 *         notFound,  // this property will return NotFoundToLoad
 *         urlStruct // this property will return UrlToLoad with normalizing it
 *     }
 * }
 *
 */

import "../index";
import React, {useState, useEffect, Component} from 'react';
import {Route, Link} from "react-router-dom";
import loadable from "@loadable/component";
import Page404 from "../Page404";
import path from "path";

if (!ars.routes) {
    ars.routes = {
        path: {},
        default404: Page404
    }
}

export {Link, React, useState, useEffect, Component};
export default props => {

    let url = props.url;

    if (props.paths) {
        ars.routes.path = {...props.paths};

        for (const [key, val] of Object.entries(ars.routes.path)) {
            let notFound = (val[2]) ? path.normalize((val[0]) + "/" + (val[2])) : false;

            ars.routes.path[key] = {
                path: (page) => path.normalize(val[0] + "/" + page),
                url_struct: path.normalize(val[1]),
                notFound: notFound,
                url: (page) => {
                    const url_struct = ars.routes.path[key].url_struct;
                    const url_params = url_struct.replace(/:(.*?)?(.*)/g, "");
                    return path.normalize(url_params + page);
                }
            }

        }

    }
    let routesPaths = ars.routes.path;

    if (props.default404) {
        ars.routes.default404 = props.default404;
    }

    if (routesPaths[props.path]) {
        url = routesPaths[props.path].url_struct;
    }
    const Page404 = ars.routes.default404;

    return React.createElement(React.Fragment, null, React.createElement(Route, {
        exact: !!props.exact,
        path: url,
        render: url_data => {

            let url_params = url_data.match.params;
            let path = "", last_comp = "";


            if (routesPaths[props.path])
                path = routesPaths[props.path].path(".");
            else
                path = props.path;

            for (const [key, val] of Object.entries(url_params)) {
                if (path) path += "/" + val; else path += val;
                last_comp = val;
            }

            /**
             * check if file exist
             */

            try {
                require(`../../../src/${path}`);
            } catch (e) {

                /**
                 * if file not exist check if it will be a folder then load the file in the folder else make error
                 */
                path = path + "/" + last_comp;

                try {
                    require(`../../../src/${path}`);
                } catch (e) {
                    let notFound = "";
                    if (routesPaths[props.path] && routesPaths[props.path].notFound)
                        notFound = routesPaths[props.path].notFound;
                    if (props.notFound)
                        notFound = props.notFound

                    if (notFound) {
                        const CompToLoad = loadable(props => import(`../../../src/${props.page}`));
                        return /*#__PURE__*/React.createElement(CompToLoad, {
                            paths: routesPaths,
                            page: notFound
                        });
                    }

                    return /*#__PURE__*/React.createElement(Route, {
                        component: Page404
                    });
                }
            }

            const CompToLoad = loadable(props => import(`../../../src/${props.page}`));
            return /*#__PURE__*/React.createElement(CompToLoad, {
                paths: routesPaths,
                page: path
            });
        }
    }));
};