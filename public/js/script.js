//console.log("hello world")

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')

const search = document.querySelector('input')





weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const msg1 = document.querySelector('#one') 
    const msg2 = document.querySelector('#two')




    if(search.value == ''){
       console.log("You must enter an address") 
    }

    else{

        msg1.textContent = 'Loading...'

        fetch('https://weather-site-kuln.onrender.com/weather?address='+search.value+"'").then((response)=>{
    response.json().then((data)=>{
        if(!data.error && !data.error2){
           // console.log(data.temperature)
           // console.log(data.location)

            msg1.textContent = 'Temperature of ' + data.location +' is '+data.temperature + ' degrees Celsius'
            //msg2.textContent = data.location
        }else if(data.error){
                msg1.textContent = data.error
            }

            else if(data.error2){
                msg1.textContent = data.error2
            }
            //console.log(data.error)
            
        
        
        
    })
})

    }

    //console.log(search.value)
})
