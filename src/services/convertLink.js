export const convertLink = (links, navigate, addPath) => {
    const main = document.querySelector('main');

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && main.contains(e.target) && e.target.href.includes(window.location.origin)) {
            e.preventDefault();

            const href = e.target.href.split('/').pop();

            if (!addPath || addPath === href) {
                navigate(`/${href}`);
            } else {
                navigate(`${addPath}/${href}`);
            }
        }

        if (e.target.parentElement.parentElement.tagName === 'A' && main.contains(e.target.parentElement.parentElement) && e.target.parentElement.parentElement.href.includes(window.location.origin)) {
            e.preventDefault();

            const href = e.target.parentElement.parentElement.href.split('/').pop();
            if (!addPath || addPath === href) {
                navigate(`/${href}`);
            } else {
                navigate(`/${addPath}/${href}`);
            }
        }
    })
}