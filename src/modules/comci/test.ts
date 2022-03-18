import { Parse, ParseServer, searchSchool } from '.';

(async () => {
    const server = await ParseServer();
    if (!server) return;
    const data = await Parse(server.host);
    console.log(data);
})();
