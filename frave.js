const puppeteer = require('puppeteer');


//funcion auto ejecutable para poder correr async - creo un ambito ejecutable
(async()=>{
     // {headless:false} abre fisicamente el navegador y me va mostrando los que sucede : true no lo abre
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage(); // abro un nueva pag con el navegador

    await page.goto('https://www.fravega.com/'); // voy a una cierta pagina web
    

    await page.type('sc-jgPyTC' , 'heladera')
    

})();