const socket = new WebSocket('wss://ws.bitmex.com/realtime');


socket.onopen = event => {
    const apiCall = {
        'op': 'subscribe',
        'args': [`orderBookL2_25:XBTUSD`]
    };

    console.log('Inicia socket', event);
    socket.send(JSON.stringify(apiCall));
};

socket.onmessage = event => {
    const json = JSON.parse(event.data);

    if (json.action === 'partial' || json.action === 'insert') {
        const filtrado = json.data.find(row => row.side === 'Buy');
        console.log('mensaje recibido filtrado', filtrado);
        if (filtrado) {
            $('.valores-moneda').text(`USD$ ${filtrado.price}`);
            $('.label-moneda').text(`Cryptomoneda: ${filtrado.symbol}`);
        }
    }


};

socket.onerror = event => {
    console.log('error recibido', event);
};