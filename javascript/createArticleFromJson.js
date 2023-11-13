/**
 * Cree un element HTML article
 * @param {title: string, body: string} post
 * @returns {HTMLElement}
 */
function createArticle (post) {
    const article = document.createElement('article');

    article.append(createElementWithText('h2', post.title));
    article.append(createElementWithText('p', post.body));

    return article;
}

function createElementWithText (tagName, content) {
    const element = document.createElement(tagName);
    element.innerText = content;
    return element;
}

async function main () {
    const wrapper = document.querySelector('#lastPosts')
    const loader = document.createElement('p');

    loader.innerText = 'Chargement...';

    wrapper.append(loader);

    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            header: {
                Accept: 'application/json'
            }
        });
        if (!r.ok) {
            throw new Error('Erreur Serveur');
        }

        const posts = await r.json();
        loader.remove();
        for (const post of posts) {
            wrapper.append(createArticle(post));
        }
    } catch (e) {
        loader.innerText = 'impossible de charger les articles';
        loader.color = 'red';
        return;
    }
}

main()  