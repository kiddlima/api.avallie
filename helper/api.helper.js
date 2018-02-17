let helper = {};

helper.buildResponseMessage = buildResponseMessage;

module.exports = helper;

function buildResponseMessage(status, messages){
    let response = {};
    response.status = status;
    response.messages = messages;

    return response;
}
