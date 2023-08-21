export const errorMessage = (element, value) => {
    const form = document.querySelector('form');
    const top = element.offsetTop;
    const {height} = element.getBoundingClientRect();
    element.classList.add('error');
    const errorMessage = document.createElement('p');
    errorMessage.innerText = value;
    errorMessage.style.position = 'absolute';
    errorMessage.style.top = top + height + 5 + 'px';
    errorMessage.style.color = '#FC978C';
    form.append(errorMessage);

    element.addEventListener('input', () => {
        errorMessage.remove();
        element.classList.remove('error');
    })
}