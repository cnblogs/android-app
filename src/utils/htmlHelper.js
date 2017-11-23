class  HtmlHelper{
    formatHtml(htmlString){
        htmlString = htmlString.replace(/[ | ]*\n/g,'\n');
        htmlString=htmlString.replace(/ /ig,' ');
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <link href="css/default.css" rel="stylesheet" />
        <link href="css/blog-comm.css" rel="stylesheet" />
        <link href="amazeui/css/amazeui.min.css" rel="stylesheet" />
        <link href="amazeui/css/app.css" rel="stylesheet" />        
        <script src="js/blog-comm.js"></script>         
        <script src="js/highlight.pack.js"></script>
        <body>
           <div class="am-container">
              ${htmlString}
           </div>
        </body>
        <script >
           hljs.initHighlightingOnLoad()
        </script> 
        <script src="amazeui/js/jquery.min.js"></script>
        <script src="amazeui/js/amazeui.min.js"></script>      
        </html>`
    }
}

const htmlHelper=new HtmlHelper()
export default htmlHelper