// code away!

const server = require("./api/server");

const port = 8000;
const greeting = "API IS RUNNING AHHHHH!!!!";
server.listen(port, () => {
    console.log(
        `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
    );
});