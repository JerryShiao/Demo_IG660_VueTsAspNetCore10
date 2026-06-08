let formList = document.getElementsByTagName('form');
for (let i = 0; i < formList.length; i++) {
    formList[i].setAttribute('onsubmit', 'return rejectSubmit();');
}
function rejectSubmit() {
    return false;
}