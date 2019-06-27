import axios = require("axios");

export class BitCoinRpc {
    private readonly host: string;
    private readonly port: number;
    private readonly rpcuser: string;
    private readonly rpcpassword: string;

    constructor(host: string, port: number, rpcuser: string, rpcpassword: string) {
        this.host = host;
        this.port = port;
        this.rpcuser = rpcuser;
        this.rpcpassword = rpcpassword;
    }

    public async CallRpc(method: string, params: any) {
        let response = await axios.default.post(`http://${this.host}:${this.port}`, {
            "jsonrpc": "1.0",
            "id": "bitcoin-core-rpc",
            "method": method,
            "params": params
        }, {
            auth: {
                username: this.rpcuser,
                password: this.rpcpassword
            },
            headers: {
                'Content-Type': "application/json"
            },
            timeout: 10 * 1000
        })
        return response.data;
    }
}


async function test() {
    let rpc = new BitCoinRpc("127.0.0.1", 8888, "xiaoxia", "xiaoxia123");
    let aaa = await rpc.CallRpc("getbalance", ["*", 6]);
    console.log(aaa);
}

test();



