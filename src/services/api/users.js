const users = {
    addNewUser: (requestBody) => {
        return new Promise((resolve) => {
            // simulate network call
            setTimeout(() => {
                resolve(Object.assign({}, requestBody, { id: Math.floor(1000 * Math.random()) }));
            }, 10);
        });
    },
};

export default users;
