import { serialize } from "v8";
import { datas } from './Data';

document.addEventListener('DOMContentLoaded', ()=> {
    let sortedData = datas.sort((a, b) => parseInt(a.meret) - parseInt(b.meret))
    let activeSize = ''
    loadElements(sortedData)

    function searchByName(search : string) {
        let searchArray = (activeSize !== '' ? searchBySize(activeSize) : sortedData)
        console.log(searchArray)
        if(search.length >= 3) {
            let result = searchArray.filter(e => (e.nev.toUpperCase()).includes(search.toUpperCase()))
            clearRows();
            if(result.length != 0) {
                loadElements(result)
            }
        } else {
            clearRows()
            loadElements(searchArray)
        }
    }

    function searchBySize(size : string) {
        return sortedData.filter(e => e.meret === size)
    }


    document.getElementById('search-bar')!.addEventListener('input', (e)=> {
        let search = (e.currentTarget as HTMLInputElement).value as string
        searchByName(search)
        
        
    });

    document.getElementById('search-submit')!.addEventListener('click', (e) => {
        let search = (e.currentTarget as HTMLInputElement).textContent as string
        searchByName(search)
    });

    let sdFilter = document.getElementsByClassName('sd-filter-btn') as HTMLCollectionOf<HTMLInputElement>
    for(let i = 0; i < sdFilter.length; i++) {
        sdFilter[i]!.addEventListener('change', (e) => {
            let elemt = e.currentTarget as HTMLInputElement
            let atribute = elemt.getAttribute('data-type') as string
            let result = searchBySize(atribute);
            clearRows()
            console.log(" result lenght " + result.length)
            if(result.length == 0) {
                loadElements(sortedData)
                activeSize = ''
            } else {
                loadElements(result)
                activeSize = atribute;
            }
            
        })
        if(sdFilter[i].getAttribute('data-type') === 'all') {
            sdFilter[i].checked = true;
        } else {
            sdFilter[i].checked = false;
        }
    }
});




const clearRows = () => {
    let baseElement = document.getElementById('cards') as HTMLElement;
    baseElement.innerHTML = ""
}



const loadElements = (datasArrray : {nev: string, meret: string}[]) => {
    let baseElement = document.getElementById('cards') as HTMLElement;

    let row = document.createElement('div');
    row.classList.add('row');
    
    for(let i = 1; i < datasArrray.length + 1; i++) {
        
        let col = document.createElement('div')
        col.classList.add('col-md-4')

        let card = document.createElement('div')
        card.classList.add('card')

        let img = document.createElement('img')
        img.classList.add('card-img-top')
        img.src = '/res/sd-card.png'

        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        let cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = datasArrray[i - 1].nev

        let cardText = document.createElement('p')
        cardText.classList.add('card-text')
        cardText.textContent = datasArrray[i - 1].meret + "gb"
        let colorCardText = ''
        switch(datasArrray[i - 1].meret){
            case '32':
                colorCardText = 'sd-size-32'
                break;
            case '64':
                colorCardText = 'sd-size-64'
                break;
            case '128':
                colorCardText = 'sd-size-128'
                break;
            case '256':
                colorCardText = 'sd-size-256'
                break;
            case '512':
                colorCardText = 'sd-size-512'
                break;
            
        }
        cardText.classList.add(colorCardText)

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)

        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        row.appendChild(col)

        if(i % 3 == 0 || i == datasArrray.length) {
            console.log(i)
            baseElement.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row');
        }


    }
}
