import Toast from 'react-native-root-toast';

export function Info(message){
      return  Toast.show(message,{
            position: Toast.positions.CENTER,
            backgroundColor:'#31708f'
        })
    }
export  function Success(message){
       return Toast.show(message,{
            position: Toast.positions.CENTER,
            backgroundColor:'#3c763d'
        })
    }
 export function  Waring(message){
       return Toast.show(message,{
            position: Toast.positions.CENTER,
            backgroundColor:'#8a6d3b'
        })
    }
export function  Error(){
      return  Toast.show(message,{
            position: Toast.positions.CENTER,
            backgroundColor:'#a94442'
        })
    }