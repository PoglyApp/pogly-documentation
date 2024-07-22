# (OPTIONAL) React Project Frontend Setup

As mentioned throughout the install docs, you do not have to self-host the frontend, instead you can utilize the [pogly.gg standalone portal](https://standalone.pogly.gg).

If you wish to make changes to the frontend, you will have to self-host. Follow the instructions below!

### Install Node & Typescript

If you have not yet already, ensure the below prerequisites are installed:

- [Node](https://nodejs.org/en/download) (v20.10.0) and [Typescript](https://www.npmjs.com/package/typescript), as Pogly Standalone is written in React/Typescript.

## React Project Setup

If you're familiar with node project, there's nothing non-standard here.

In the Pogly project directory, download the required packages via node package manager, which installed with Node.
```bash
npm install
```
 
 Once sucecssfully installed, you can run the app in development mode by running:
 
 ```bash
 npm start
 ```

Alternatively, you can build the app for production by running:
```bash
npm run build
```
To run your built production version, you will need to utilize a web server, like [nginx](http://nginx.org/).

#### **IF YOU INSTALL POGLY TO A SUBDOMAIN OR FOLDER**
You will need to modify your `packages.json` so that react builds relative paths correctly. 

To do this, add a `homepage` entry with the URL to your pogly instance, including the relative path. Examples:

`"homepage": "http://pogly.mywebsite.com/",`

`"homepage": "https://mywebsite.com/pogly",`

You must then rebuild with the above commands. 

You have completed the frontend setup. In your browser, navigate to: http://localhost:3006, or if you used a web-server, replace 3006 with whatever port you've configured it with.