export const disableLinks = () => {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    [...links, ...buttons].forEach(item => {
        item.disabled = true;
    })
}

export const enableLinks = () => {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    [...links, ...buttons].forEach(item => {
        item.disabled = false;
    })
}