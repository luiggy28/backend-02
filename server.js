import http from 'http';

const server = http.createServer((request, response) => {
    response.end("Primer servidor con Node.js");
});

server.listen(8080, () => {
    console.log("Servidor escucha en el puerto 8080");
});
