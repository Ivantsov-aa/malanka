export const convertLink = (links, navigate) => {
    const main = document.querySelector('main');

    document.addEventListener('click', (e) => {
        if (e.target.matches('a') && main.contains(e.target) && e.target.href.includes(window.location.origin)) {
            e.preventDefault();

            const href = e.target.href.split('/').pop();
            navigate(`/${href}`);
        }
    })

    // links.forEach(link => {
    //     if (link.href.includes(window.location.origin)) {
    //         let href;
    //         if (link.href.includes('partner') && link.href.split('/').pop() !== 'partner') {
    //             href = 'partner/' + link.href.split('/').pop();
    //         } else {
    //             href = link.href.split('/').pop();
    //         }

    //         link.setAttribute('href', href);
    //     }
    // })
}