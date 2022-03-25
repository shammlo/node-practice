const generateMessage = (username: string, text: string | object, option?: string) => {
    return {
        username,
        text,
        createdAt: new Date().getTime(),
        option,
    };
};

module.exports = { generateMessage };
