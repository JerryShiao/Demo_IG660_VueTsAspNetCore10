//申請事由選單
let reasonSelect = document.querySelectorAll("[name=person-info] select");
let otherReason = document.querySelectorAll("[name=otherReason]");

for (let i = 0; i < reasonSelect.length; i++) {
    reasonSelect[i].addEventListener("change", () => {
        if (reasonSelect[i].value === "其他") {
            otherReason[i].classList.remove("disable")
        } else {
            otherReason[i].classList.add("disable")
        };
        // if (reasonSelect[i].value === "終止僱傭") {
        //     let personDoc = document.querySelector("#form04 div:nth-child(1)")
        //     personDoc.classList.add("disable")
        // }
    })
}

let formList = document.getElementsByTagName('form');
for (let i = 0; i < formList.length; i++) {
    formList[i].setAttribute('onsubmit', 'return rejectSubmit();');
}
function rejectSubmit() {
    return false;
}