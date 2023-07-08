const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodeMailer = require("nodemailer")
const MailMessage = require("nodemailer/lib/mailer/mail-message")

const transporter = nodeMailer.createTransport({
    host:"smtp.@gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"ayushabhi02002@gmail.com",
        pass:"alhayihktuvbfrji"
    }
})

const app = express()

app.set("views engine","hbs")
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.static(path.join(__dirname,"/views/public")))

const urlEncoder = bodyParser.urlencoded()

app.get("/",(req,res)=>{
    return res.render("index.hbs")
})
app.get("/about",(req,res)=>{
    return res.render("about.hbs")
})
app.get("/faq",(req,res)=>{
    return res.render("faq.hbs")
})
app.get("/service",(req,res)=>{
    return res.render("service.hbs")
})
app.get("/gallery",(req,res)=>{
    return res.render("gallery.hbs")
})
app.get("/contact",(req,res)=>{
    return res.render("contact.hbs",{show:false})
})
app.post("/contact",urlEncoder,(req,res)=>{
    let mialOption = {
        from:"ayushabhi02002@gmail.com",
        to:req.body.email,
        subject:"your query received!!!!! team iterio",
        text:"thanks to share your query with us !!! \nour team will contact you soon\n"
    }
    transporter.sendMail(mialOption,(error,data)=>{
        if (error)
        console.log(error)
    })
    mialOption= {
        from:"ayushabhi02002@gmail.com",
        to:"ayushabhi02002@gmail.com",
        subject:"query recived!! :team decor",
        text: `
            Name : ${req.body.name}
            Email : ${req.body.email}
            Phone : ${req.body.phone}
            Subject : ${req.body.subject}
            Massage : ${req.body.massage}
        `
    }
    transporter.sendMail(mialOption,(error,data)=>{
        if (error)
        console.log(error)
    })
    return res.render("contact.hbs",{show:true})
})

app.listen(80,()=>console.log("server is running at port 80"))