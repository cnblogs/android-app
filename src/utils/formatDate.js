function  getDateDiff(dateStr){
           let str=dateStr.replace('T',' ');
            let dateTimeStamp=Date.parse(str.replace(/-/gi,"/"));
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let halfamonth = day * 15;
            let month = day * 30;
            let diffValue =new Date().getTime() - dateTimeStamp;
            if(diffValue < 0){return;}
            let monthC =diffValue/month;
            let weekC =diffValue/(7*day);
            let dayC =diffValue/day;
            let hourC =diffValue/hour;
            let minC =diffValue/minute;
            let result;
            if(monthC>=1){
                result=parseInt(monthC.toString()) + "个月前";
                }
                else if(weekC>=1){
                result=parseInt(weekC.toString()) + "周前";
                }
                else if(dayC>=1){
                result=parseInt(dayC.toString()) +"天前";
            }
                else if(hourC>=1){
                result=parseInt(hourC.toString()) +"小时前";
            }
                else if(minC>=1){
                result=parseInt(minC.toString()) +"分钟前";
                }else{
                result="刚刚发布";
                }
               return result;
            }