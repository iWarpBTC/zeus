import MacaroonUtils from './MacaroonUtils';

class LndConnectUtils {
    processLndConnectUrl = (input: string) => {
        let host, port, macaroonHex;
        const lndconnect = input.split('lndconnect://')[1];
        const params = input.split('?')[1];

        let result: any = {};
        params.split('&').forEach(function(part) {
            const item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });

        // is IPv6
        if (input.includes('[')) {
            host = lndconnect && lndconnect.split(']:')[0] + ']';
            port =
                lndconnect &&
                lndconnect.split(']:')[1] &&
                lndconnect.split(']:')[1].split('?')[0];
        } else {
            host = lndconnect && lndconnect.split(':')[0];
            port =
                lndconnect &&
                lndconnect.split(':')[1] &&
                lndconnect.split(':')[1].split('?')[0];
        }
        macaroonHex =
            result.macaroon && MacaroonUtils.base64UrlToHex(result.macaroon);

        return { host, port, macaroonHex };
    };
}

const lndConnectUtils = new LndConnectUtils();
export default lndConnectUtils;
