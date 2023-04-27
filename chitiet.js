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

let did = findGetParameter('did');
let cid = findGetParameter('cid')
let listNews = []
async function getData() {
    try {
        const response = await axios(`http://localhost:3004/news/${did}`);
        const listNewByCID = response.data;
        console.log(listNewByCID);
        function render(listNewByCID) {
            return `
                <h3>${listNewByCID.content}</h3>
                <div class="main-content">
                    <p>${listNewByCID.detail}</p>
                </div>
            `;
        }
        let str = '';
        function display(listNewByCID) {
            str += render(listNewByCID);
            $("div#detail").html(str);
        }
        display(listNewByCID);
    } catch (error) {
        console.error(error);
    }
}
getData();
async function display() {
    let listDirectories = await axios('http://localhost:3004/directories')
    listDirectories = listDirectories.data
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
    console.log(str);
}
display()
function renderDirectory(el) {
    return `<li>
    <a href="danhmuc.html?cid=${el.id}">${el.directory}</a>
    </li>`
}


