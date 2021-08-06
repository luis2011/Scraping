const puppeteer = require('puppeteer');


//funcion auto ejecutable para poder correr async - creo un ambito ejecutable
(async()=>{
     // {headless:false} abre fisicamente el navegador y me va mostrando los que sucede : true no lo abre
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage(); // abro un nueva pag con el navegador

    await page.goto('https://www.amazon.es'); // voy a una cierta pagina web
    //await page.screenshot({path: 'amazon1.jpg'});
    //"#twotabsearchtextbox"

    //<input id="sp-cc-accept" tabindex="1" name="accept" class="a-button-input celwidget" type="submit" value="all" data-csa-c-id="vr79er-tbgsy5-1diy4e-6copvu" aria-labelledby="a-autoid-0-announce" data-cel-widget="sp-cc-accept">

    await page.click('#sp-cc-accept');

    await page.type('#twotabsearchtextbox', 'libros de javascript');
   

    await page.click('.nav-search-submit input');
    await page.waitForSelector('[data-component-type=s-search-result]')
    await page.waitForTimeout(2000);

     //await page.screenshot({path: 'amazon1.jpg'});

    const enlaces = await page.evaluate(()=>{
        const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a');
       
        const links = [];
        for(let element of elements){
            links.push(element.href)
           
        }
        return links;
        //return data;
    });

   console.log(enlaces.length);
    
   const books =[];
    for (let enlace of enlaces){
        await page.goto(enlace);
        await page
        await page.waitForSelector('#productTile'); // hasta que este disponible el productTitle

      const book = await page.evaluate(()=>{
            const tmp ={};
            tmp.title = document.querySelector('#productTile').innerText
            tmp.author = document.querySelector('.author a').innerText
            return tmp
        });
        books.push(book)
       console.log(books)
    }

    console.log(books)
    await browser.close();

    //nav-search-submit

})();

