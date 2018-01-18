import moment from '../config/momentConfig'

class HtmlService {
    static instance = null;
    static getInstance() {
        return !HtmlService.instance
            ? new HtmlService()
            : HtmlService.instance;
    }

    generateHtmlCode(data,htmlString,type) {
        let htmlCode=''
        switch(type){
            case 'blog':
                htmlCode=this.generateBlogCode(data,htmlString) 
                break;
            case 'news': 
                htmlCode=this.generateNewsCode(data,htmlString)
                break;
            case 'kb': 
                htmlCode=this.generateKbCode(data,htmlString)
                break;
            default: 
                htmlCode;          
             }
            return htmlCode;
             
    }

    generateBlogCode(data, htmlString){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <link href="css/spectre.css" rel="stylesheet" /> 
        <link href="css/github-gist.css" rel="stylesheet" />       
        <script src="js/highlight.pack.js"></script>
        <style>
        img {
            width: 100%;
        }
        .cnblogs_code {
            background-color: #eff0f1;
            font-size: 12px !important;
            padding: 5px;
            font-family: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif;
            overflow: auto;
            color: #000;
        }
    </style>
        <body>
        <div class="container" style="margin-top:15px">
        <h3>${data.Title}</h3>
        <div class="columns">
            <div class="column">
                <img src="${data.Avatar}" style="width: 24px;height: 24px;vertical-align: middle;display: inline-block;"
                />
                <span>${data.Author} · ${moment(data.PostDate).startOf('minute').fromNow()}</span>
            </div>
        </div>
    </div>
           <div class="container" style="margin-top:15px">
              ${htmlString}
           </div>
        </body>
        <script >
        window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}
           hljs.initHighlightingOnLoad()
        </script>    
        </html>`
    }

    generateNewsCode(data, htmlString){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <link href="css/spectre.css" rel="stylesheet" /> 
        <style>
        img {
            width: 100%;
        }
        .cnblogs_code {
            background-color: #eff0f1;
            font-size: 12px !important;
            padding: 5px;
            font-family: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif;
            overflow: auto;
            color: #000;
        }
    </style>
        <body>
        <div class="container" style="margin-top:15px">
        <h3>${data.Title}</h3>
        <div class="columns">
            <div class="column">
                <span>发布于 · ${moment(data.PostDate).startOf('minute').fromNow()}</span>
            </div>
        </div>
    </div>
           <div class="container" style="margin-top:15px">
              ${htmlString}
           </div>
        </body>
        <script>
        window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}
        </script>
        </html>`
    }

    generateKbCode(data, htmlString){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <link href="css/spectre.css" rel="stylesheet" /> 
        <style>
        img {
            width: 100%;
        }
        .cnblogs_code {
            background-color: #eff0f1;
            font-size: 12px !important;
            padding: 5px;
            font-family: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif;
            overflow: auto;
            color: #000;
        }
    </style>
        <body>
        <div class="container" style="margin-top:15px">
            <h3>${data.Title}</h3>
        </div>
           <div class="container" style="margin-top:15px">
              ${htmlString}
           </div>
        </body>
        <script>
        window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}
        </script>
        </html>`
    }
}
const _htmlService = HtmlService.getInstance();
export default _htmlService;