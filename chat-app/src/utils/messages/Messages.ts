const generateMessage = (text: string) => {
    return {
        text,
        createdAt: new Date().getTime(),
    };
};

module.exports = { generateMessage };
