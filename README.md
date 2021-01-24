# Meeting ars-react
**Ars React** is javascript program for you to make works easy to using react and its dependencies like react redux or react router dom.

**Ars React** contains some applications, it had a global object like 'window' object in react to handle your works so easilly, the object is called ars and it is in **functions/ars.js**. with this object we will handle our programms.

with **Ars React** you can handle your urls such as api urls so easily. there is an object in a file called **ars_api.js** and  it will handle all jobjs for you, the object is  '**ars.api**'.

with **Ars React** and its  '**ars.load_module**' method you will by pass redux-thunk and you will use redux without store, to handle your codes so fast and make your programm so readable. you will need just pass an api that you need to get data from it and it will retrive data and pass data in props to you so easilly to fetch it.


with **Ars React** you will not need to use axios any more, we have 2 methods to handle requests so easilly:
> 1- '**ars.get**' to handle get requests.
   2- '**ars.post**' to handle post requests.

these methods have an ability to handle your tokens I mean refresh token and access token dynamically.
>I will publish a package that is handling these tokens for loging user for nodejs and express frame work :)  

with **Ars React** and its  '**ars.store**'  object and its methods, you can handle your redux store and you will have an ability to add reducers dynamically to your program, for so many purpose like memory managing and dynamically importing.
 
With **Ars React** and its package **ars-react/router** you can handle your routes so easily and dynamically and then memory management will easy to handle and your one page website will be load very fast.

# How to use ars-react
there is a two package in ars-react. one is ars and the second one is router that using ars object too.

# ars-react/router
to using ars-react router, you can do like this:

> #app.js
    import {Router},Route from "ars-react/router"
    


I will publish more readme to how to use this package so soon.

and at the end thanks for react, react-redux, axios, react-router-dom, @loadable/component and redux-thunk
