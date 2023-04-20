function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

let cid = findGetParameter('cid');


let listNews = []
async function getData() {
    listNews = await axios('http://localhost:3004/news')

    listNews = listNews.data

    let listNewByCatID = listNews.filter(function (news) {
        return news.cat_id == cid
    })

    function render(listNewByCatID) {
        return `
        <li>
        <h2>
        <a href="chitiet.html?did=${listNewByCatID.id}" title="">${listNewByCatID.content}</a>
        </h2>
        <div class="item">
        <p>${listNewByCatID.detail}</p>
        <div class="clr"></div>
    </div>
    </li>
        `
    }
    let str = ''
    function display(listNewByCatID) {
        for (const neww of listNewByCatID) {
            str += render(neww)
        }
        $("ul#list-news").html(str)

    }
    display(listNewByCatID)
}
getData()


async function display() {
    let listDirectories = await axios('http://localhost:3004/directories')
    listDirectories = listDirectories.data
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
}
display()
function renderDirectory(el) {
    return `<li>
    <a href="danhmuc.html">${el.directory}</a>
    </li>`
}

async function displayPages() {
    let listPages = await axios('http://localhost:3004/pages')
    listPages = listPages.data
    let str = ''
    for (const page of listPages) {
        str += renderPage(page)
    }
    $("ul#list-pages").html(str)
}
displayPages()
function renderPage(el) {
    return `
    <li class="active"><a href="${el.link}" title="">${el.page}</a></li>`
}