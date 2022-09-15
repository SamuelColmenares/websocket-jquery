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
        console.log('json.data :>> ', json.data);
        let precioMayor = 0;
        let moneda = '';
        let tieneBuy = false;
        json.data.forEach(row => {
            if (row.side === 'Buy') {
                precioMayor = row.price > precioMayor ? row.price : precioMayor;
                tieneBuy = true;
            }

            moneda = row.symbol;
        });

        console.log('mensaje recibido filtrado', precioMayor);
        if (tieneBuy) {
            $('.valores-moneda').text(`USD$ ${precioMayor}`);
            $('.label-moneda').text(`Cryptomoneda: ${moneda}`);
        }


    }


};

socket.onerror = event => {
    console.log('error recibido', event);
};