console.log('hey');
let currentsong= new Audio();
let songs;

let currfolder;

function formatSeconds(seconds) {

    if(isNaN(seconds)|| seconds<0)
    {
        return "00:00"
    }
    seconds = Math.max(0, seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

const playmusic =(track, pause=false)=>
{  
    currentsong.src= `/${currfolder}/`+track+".mp3"
    if(!pause)
    { 

     
        currentsong.play()
        play.src="image/pause.svg"
    }

  


    console.log(track+"that is gonna play");

    document.querySelector(".songinfo").innerHTML= `${track}`
    document.querySelector(".songtime").innerHTML= `00:00 / 00:00`
}
async function getsong(folder)
{      currfolder=folder
    let x= await fetch(`/${folder}/`)
    let response= await x.text();
    

     let div = document.createElement("div")
     div.innerHTML=response;
     let a=  div.getElementsByTagName("a")
      songs=[]
       for( e of a)
       {
        
        if(e.href.endsWith(".mp3") )
        {

            songs.push(e.href.split(`/${folder}/`)[1])

        }
       }


       replacement=
       {
           "%20":" ",
           ".mp3": " "
       }
   
       let songul= document.querySelector(".songlist").getElementsByTagName("ul")[0]
       songul.innerHTML=" "
       
            for(e of songs)
            {
                 songul.innerHTML= songul.innerHTML+ `<li>  <img src="image/music.svg" class="invert" alt="musicsvg" >
                              <div class="info"> 
                               <div class="name"> ${e.replaceAll(/%20|.mp3/g, match => replacement[match])}</div>
                               <div class="artist">Neeraj rawat</div>
                           
                              </div>
                           <div class="playnow">
                               <span>playnow</span>
                               <img src="image/player.svg"  class="invert" alt="">
                           </div>
                           
                           </li>`
     
            }
   
            console.log(songs);
   
           Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>
               {
   
                   e.addEventListener("click", element=>
                   {
                       playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
                   
                   })
           
               }   )


               return songs;
        
    }

 

    async function displayAlbum()
    {
        let x= await fetch(`/song/`)
    let response= await x.text();
    

     let div = document.createElement("div")
     div.innerHTML=response;

     anchor=div.getElementsByTagName("a")
     let arr= Array.from(anchor);
      
          for( let i=0; i<arr.length; i++)
        {    
            
            const e= arr[i]
            console.log(e.href);
            
            if(e.href.includes("/song") && !e.href.endsWith(".DS_Store"))
            {
                 let folder=e.href.split("/song/")[1].replace("/","");
                  console.log(folder);
                  
                  let meta= await fetch(`/song/${folder}/info.json`)
                  let response= await meta.json();
                  console.log(response);
                  

                  document.querySelector(".cardcontainer").innerHTML=
                  document.querySelector(".cardcontainer").innerHTML+ `
                  <div class="cards" data-folder="${folder}">

                      <div class="play">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                  stroke-linejoin="round" />
                          </svg>
                      </div>
                      <img src="song/${folder}/cover.jpeg" alt="picture">
                      <h2>${response.tittle} </h2>
                      <p>${response.description}</p>
                  </div>
              `
            }
            console.log('************************************')
            
        }
        console.log('************************************')

        console.log('************************************');
        Array.from(document.getElementsByClassName("cards")).forEach(e=>
            {  console.log('hnji');
            
                  console.log(e);
                  
                e.addEventListener("click", async item=>
                {
                    console.log(item.currentTarget);
                    console.log(item.currentTarget.dataset.folder);
                    
                    
                    songs= await getsong(`song/${item.currentTarget.dataset.folder}`)
                    let songname= songs[0].replace(".mp3", "")
                    playmusic(songname);      
                }) 

            })
    
console.log('************************************')

console.log('************************************');


    }



async function main()

{
    await getsong("song/karan")
    playmusic(songs[0].replace(".mp3", ""), true);


    //display functions
       displayAlbum();
   

              play.addEventListener("click", ()=>
              {
                if(currentsong.paused)
                {
                    currentsong.play();
                    play.src="image/pause.svg"
                }

                else{
                    currentsong.pause();
                    play.src="image/player.svg"
    
                }
              })
        

              currentsong.addEventListener("timeupdate", ()=>
              {
                let time= formatSeconds(currentsong.currentTime)
                let duration= formatSeconds(currentsong.duration)
                document.querySelector(".songtime").innerHTML=`${time}/${duration}`
                document.querySelector(".circle").style.left= (currentsong.currentTime/ currentsong.duration)*100 +"%";
                
              })



            document.querySelector(".seek").addEventListener("click",(e)=>
            { 
               let percentageofseekbar=  (e.offsetX/e.target.getBoundingClientRect().width )*100;
               document.querySelector(".circle").style.left= percentageofseekbar+"%";
               currentsong.currentTime=((currentsong.duration)*percentageofseekbar)/100;


            })
// this is for reset the seek to its first position .
         currentsong.addEventListener("timeupdate",()=>
         {
            if(currentsong.currentTime >= currentsong.duration)
            {
                play.src="image/player.svg"
                document.querySelector(".circle").style.left= "0%"
            }
         })

// showing menu
         document.querySelector(".hamburger").addEventListener("click", ()=>
         {
              console.log("pressed");
              
            document.querySelector(".left").style.left="0%"
         })


// closing responsive site hamburger
         document.querySelector(".close").addEventListener("click",()=>
         {
            console.log("pressed");
            document.querySelector(".left").style.left="-140%"
            
         })

// for playing previous song
         previous.addEventListener("click",()=>
         {

            currentsong.pause()
                    
            console.log('clicked');
            currentlyplayingsong=(currentsong.src.split('/').slice(-1)[0]);
              index= songs.indexOf(currentlyplayingsong)  
              console.log(songs[index+1]);
              if((index-1)>= 0)
              {
                  playmusic(songs[index-1].replace(".mp3", "")) } 
  
         })

         // for playing next songs
         next.addEventListener("click",()=>
         {
            currentsong.pause()
            console.log('clicked');
            currentlyplayingsong=(currentsong.src.split('/').slice(-1)[0]);
              index= songs.indexOf(currentlyplayingsong)  
              console.log(songs[index+1]);
              if((index+1)< songs.length)
              {  playmusic(songs[index+1].replace(".mp3", "")) }   
         })


         soundimg.addEventListener("click", (e)=>
          {
             


            if(!currentsong.muted)
            {
                soundimg.src="image/soundof.svg"
                currentsong.muted=true;
                currentsong.volume=0;
                
            }
             else
             {
                currentsong.muted=false;
                soundimg.src="image/volume.svg"
                currentsong.volume=0.5;
                
             }
            
            
          })

          ranger.addEventListener("change",(e)=>
          {
                  console.log(e);
                  level=(e.target.value)/100;
                  currentsong.volume=level;
                  
          })


          //loading the playlist whenever the card is click


}
  
main()








// var audio = new Audio( "/song/"+song[5]);
//     audio.play();

//     audio.addEventListener("loadeddata", ()=>

//     {
//         console.log(audio.duration, audio.currentSrc, audio.currentTime);

//     })