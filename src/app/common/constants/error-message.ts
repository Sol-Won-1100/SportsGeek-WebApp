export const NO_RESP = `Action is completed but Server didn't sent any response`;

export function getErrorMessage(ex: any, component?: string): string {
    let msg = '';
    const e = ex.error;
    if (e) {
        if (+ex.status === 500 || +ex.status === 0) {
            msg = 'Invalid Request';
            // Sorry the server is down! please contact the admin
        } else {
            msg = e.message;
        }
    } else {
        if (component && component === 'login') {
            msg = 'Sorry the server cannot verify your request! try again';
        } else {
            msg = `Request is unauthorized!`;
        }
    }
    return msg;
}
