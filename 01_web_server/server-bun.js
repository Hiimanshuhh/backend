import {serve} from 'bun'
import { hostname } from 'os';

serve({
  fetch(request){
    const url = new URL(request.url);
    if(url.pathname==="/"){
      return new Response("Hello Himanshu Joshi",{status:200})
    }else if(url.pathname==="/SayBye"){
      return new Response("Bye Himanshu Joshi",{status:200})
    }else{
      return new Response("404! Error NOT FOUND!!",{status:404})
    }
  },
  port : 3000,
  hostname : "127.0.0.1"  
})