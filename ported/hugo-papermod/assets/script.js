// Menu
let menu = document.getElementById('menu')
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = () => {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}

// Scroll to top
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        let id = this.getAttribute("href").substr(1);
        document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView();
        if (id === "top") {
            history.replaceState(null, null, " ");
        } else {
            history.pushState(null, null, `#${id}`);
        }
    });
});
let toplink = document.getElementById("top-link");
window.onscroll = () => {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        toplink.style.visibility = "visible";
        toplink.style.opacity = "1";
    } else {
        toplink.style.visibility = "hidden";
        toplink.style.opacity = "0";
    }
};

// Archive
function renderArchivePosts() {
    let archivePosts = document.querySelector('.archive-posts');
    let data;
    if(archivePosts){
        data = _hb.dataApi('v0', 'posts', {
            keys: "title, url, published_at, authors",
            limit: 250,
        }, (response) => {
            let postsdata = response.data;
            let outputcontent = '';
            postsdata.forEach((post) => {
                const postauthors = post.authors;
                postauthors.forEach(author => authorname = author.name );
                const options = {year: 'numeric', month: 'short', day: 'numeric'};
                publishedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(post.published_at*1000));
        
                outputcontent +=
                    `<div class="archive-entry">
                        <h3 class="archive-entry-title">${post.title}</h3>
                        <div class="archive-meta"><span title="${publishedDate}">${publishedDate}</span>&nbsp;·&nbsp;${authorname}</div>
                        <a class="entry-link" aria-label="post link to ${post.title}" href="${post.url}"></a>
                    </div>`
            });
            archivePosts.innerHTML = outputcontent;
        });
    }
}
document.addEventListener('flashload:navigationEnded', renderArchivePosts);
document.addEventListener('DOMContentLoaded', renderArchivePosts);