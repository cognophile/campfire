/**
 * Render a notification window to the UI
 * 
 * @param {string} title 
 * @param {string} message 
 * @return {void}
 */
function notify(title, message) {
    bootbox.alert({ 
        title: title,
        message: message
    });
}
