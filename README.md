In order to run service there is a few things that should be installed: <br/> 1. `node` version `v14.17.3` <br/> 2. `npm` at least `v5.7.1`

To install all dependecies needed we use `npm ci` command which will delete node-moudule(if existed) folder and install all dependencies at once. It will also check package-lock.json and package.json file if any dependencies are missing or have incompatible versions, it will throw an error.
In order to use this command we need to have at least `npm` version `v5.7.1`.

In order to start the service the `npm start` command should be used.
