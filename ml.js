const puppeteer = require('puppeteer');


//funcion auto ejecutable para poder correr async - creo un ambito ejecutable
(async()=>{
     // {headless:false} abre fisicamente el navegador y me va mostrando los que sucede : true no lo abre
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage(); // abro un nueva pag con el navegador

    await page.goto('https://www.mercadolibre.com.ar/'); // voy a una cierta pagina web
    

    await page.click('#newCookieDisclaimerButton');

   await page.type('.nav-search-input', 'libros de javascript');
   

    await page.click('.nav-search-btn');
    await page.waitForSelector('.ui-search-layout__item')
    
    await page.waitForTimeout(2000);

   //  await page.screenshot({path: 'amazon1.jpg'});

    const enlaces = await page.evaluate(()=>{
        const elements = document.querySelectorAll('.ui-search-layout__item a');
       
        const links = [];
        for(let element of elements){
           links.push(element.href)
           
          }
        return links;
        //return data;
    });

   console.log(enlaces.length);
   //console.log(enlaces)
   
   
   const books =[];
    for (let enlace of enlaces){
        await page.goto(enlace);
        await page
        await page.waitForSelector('.ui-pdp-title'); // hasta que este disponible el productTitle

      const book = await page.evaluate(()=>{
            const tmp ={};
            tmp.title = document.querySelector('.ui-pdp-title').innerText
           tmp.price = document.querySelector('.price-tag-fraction').innerText
            return tmp
        });
        books.push(book)
       console.log(books)
    }

    console.log(books)
    await browser.close();

    //nav-search-submit

})();