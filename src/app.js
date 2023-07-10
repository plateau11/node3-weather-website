const path = require('path')
const express = require('express')
const hbs = require('hbs')

const weather2 = require('./weather')

const app = express()

const directory = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')

const partialPath = path.join(__dirname,'../templates/partials')


app.use(express.static(directory))

app.set('view engine','hbs')

app.set('views',viewsPath)

hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'sahil',
        surname:'thapa'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        info:"this is about page..."
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        info2: 'this is help page...'
    })
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        res.send("Please provide an address")
        return
    }

    location = req.query.address

    
    weather2.geocode(location, (error, {latitude,longitude}={}) => {
        console.log('Error', error)
        //console.log('Data', data)

        if(error){
            res.send({error})
        }

        else{
            weather2.forecast(latitude,longitude, (error2, {temperature,location}={}) => {
                console.log('Error', error2)
                //console.log(data)
    
                
    
    
                res.send({
                    temperature,
                    location,
                    error2
                    
                    
                    
                })
            })
        }

        
    })

    
    


    console.log(req.query)
})

// app.get('/check',(req,res)=>{
//     res.render('404',{

//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error: 'page not found'
    })
})


 app.listen(3000,()=>{
     console.log('server is starting...')
 })