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

let listNews = []
async function getData() {
    listNewByCatID = await axios(`http://localhost:3004/news/${did}`)

    listNewByCatID = listNewByCatID.data

    console.log(listNewByCatID);
    function render(listNewByCatID) {
        return `
        
				<h3>${listNewByCatID.content}</h3>
				<div class="main-content">
					<p>${listNewByCatID.detail}</p>
				</div>
			
        `
    }
    let str = ''
    function display(listNewByCatID) {

        str += render(listNewByCatID)

        $("div#detail").html(str)

    }
    display(listNewByCatID)
}
getData()

