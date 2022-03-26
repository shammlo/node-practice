const generateMessage = (username, text, option) => {
    return {
        username,
        text,
        createdAt: new Date().getTime(),
        option,
    };
};
module.exports = { generateMessage };
//# sourceMappingURL=Messages.js.map