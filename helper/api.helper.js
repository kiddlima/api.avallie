let helper = {};

helper.buildResponseMessage = buildResponseMessage;
helper.getNewFormattedSupplier = getNewFormattedSupplier;

module.exports = helper;

function buildResponseMessage(status, messages){
    let response = {};
    response.status = status;
    response.messages = messages;

    return response;
}

function getNewFormattedSupplier(supplier){
    supplier.categories = stringToArray(supplier.categories);
    supplier.phones = stringToArray(supplier.phones);
    supplier.emails = stringToArray(supplier.emails);
    supplier.urls = stringToArray(supplier.urls);

    return supplier;
}

function stringToArray(toBeFormattedString){
    if(toBeFormattedString){
        return toBeFormattedString.split(';');
    } else {
        return [];
    }
}
