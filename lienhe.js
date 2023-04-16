async function display (){
    let listDirectories = await axios('http://localhost:3000/directories')
    listDirectories = listDirectories.data
    console.log(listDirectories);
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
}
display()
function renderDirectory(el){
    return `<li>
    <a href="danhmuc.html">${el.directory}</a>
    </li>`
}
async function displayPages (){
    let listPages = await axios('http://localhost:3000/pages')
    listPages = listPages.data
    console.log(listPages);
    let str = ''
    for (const page of listPages) {
        str += renderPage(page)
    }
    $("ul#list-pages").html(str)
}
displayPages()
function renderPage(el){
    return `
    <li class="active"><a href="${el.link}" title="">${el.page}</a></li>`
}