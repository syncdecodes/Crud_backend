const generateAlias = () => {

    const names = [
        "nova", "orion", "nebula", "zenith",
        "atlas", "cosmos", "lunar", "stellar",
        "phoenix", "aurora", "vortex", "quantum"
    ];

    const name = names[Math.floor(Math.random() * names.length)];
    const number = Math.floor(1000 + Math.random() * 9000);

    return `${name}-${number}`;
};

module.exports = {
    generateAlias
}