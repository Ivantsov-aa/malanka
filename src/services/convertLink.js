export const convertLink = (links, navigate, addPath) => {
    const main = document.querySelector('main');

    document.addEventListener('click', (e) => {
        if (e.target.matches('a') && main.contains(e.target) && e.target.href.includes(window.location.origin)) {
            e.preventDefault();

            const href = e.target.href.split('/').pop();

            if (!addPath) {
                navigate(`/${href}`);
            } else {
                navigate(`${addPath}/${href}`);
            }
        }

        if (e.target.parentElement.parentElement.matches('a') && main.contains(e.target.parentElement.parentElement) && e.target.parentElement.parentElement.href.includes(window.location.origin)) {
            e.preventDefault();

            const href = e.target.parentElement.parentElement.href.split('/').pop();
            if (!addPath) {
                navigate(`/${href}`);
            } else {
                navigate(`/${addPath}/${href}`);
            }
        }
    })
}