require('dotenv').config();

const mongoose = require("mongoose");
const Stack = require("../models/Stack");



mongoose
  .connect(`${process.env.DB}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let stacks = [
  {title: "La hora del deporte",
    description: "Una horita de ejercicio intensito para tu body!",
    category:"sport",
    tags:["outdoors"],
    timeInHours:1,
    likesCounter: 5,
    createdBy: "Perico el de los palotes",
    status:"active",
    image: null,
    hasMusic: true,
    hasBook: false ,
    hasVideo: true,
    hasLink: true,
    hasPdf: false,
    steps: [{
      title : "Ponte ropa de deporte",
      instruction: "Coge las zapatillas llenas de polvo del armario, pontelas y sal a la calle",
      timeInMinutes: 5,
      order: 1
       },
       {
        title : "Corre!",
        instruction: "Corre por ciudad o por campo, pero corre. Deja de poner excusas.",
        timeInMinutes: 50,
        order: 2
         },
         {
          title : "Hora feliz!",
          instruction: "Corre al McDonalds y recupera lo perdido!",
          timeInMinutes: 5,
          order: 3
           }]
    },
    {title: "Architect mode",
    description: "Aprende algo de arquitectura",
    category:"learning",
    tags:["indoors"],
    timeInHours:2,
    likesCounter: 20,
    createdBy: "Fran Naranjin",
    status:"pending",
    image: "/images/dummy.jpeg",
    hasMusic: true,
    hasBook: true ,
    hasVideo: true,
    hasLink: false,
    hasPdf: true,
    steps: [{
      title : "Ponte cómodo",
      instruction: "Sientate en tu escritorio habitual de estudio y ponte este video",
      timeInMinutes: 30,
      resource: "https://www.youtube.com/watch?v=-YARoSwQd-g",
      order: 1
       },
       {
        title : "Aplica conocimientos!",
        instruction: "Hazte el plano de una gasolinera",
        timeInMinutes: 20,
        order: 2
         },
         {
          title : "La hora de la verdad!",
          instruction: "Vete con tus amigos y diles lo guay que eres por ser arquitecto!",
          timeInMinutes: 10,
          order: 3
           }]
    },
    {title: "Gaming Marathon",
    description: "Coge tu consola o PC favorito, un refresco, comida basura y a jugar!",
    category:"spare",
    tags:["indoors"],
    timeInHours:4,
    likesCounter: 9999,
    createdBy: "GamerboyColor",
    status:"active",
    image: "/images/city.jpeg",
    hasMusic: true,
    hasBook: false ,
    hasVideo: false,
    hasLink: true,
    hasPdf: false,
    steps: [{
      title : "Ve al super",
      instruction: "Toda buena maratón necesita recursos para completarse, ve al super a comprar bebidas gaseosas y altas en cafeína para que tu rendimiento no caiga(pero tu corazón sí)",
      timeInMinutes: 30,
      
      order: 1
       },
       {
        title : "Elige!",
        instruction: "Cómparte un juego a tu elección, da igual el dinero, tu solo compra, compra, COMPRA. Vivimos en un sistema capitalista para algo, no?",
        timeInMinutes: 20,
        order: 2
         },
         {
          title : "La hora de la verdad!",
          instruction: "Dale caña solo o acompañado, pero ojo, solo acompañado virtualmente, no queremos que nadie te quite el mandoo de las manos",
          timeInMinutes: 180,
          order: 3
           },
          {
            title: "Happy ending",
            instruction:"Hora de acabar esta maratón con una pajilla, te lo has ganado. Tienes 10 minutos aunque todos sabemos que tardarás menos de 1 pensando en tu prima segunda, ENFERMO!",
            timeInMinutes: 10,
            order: 4
          }]
    },
    {title: "Evento social",
    description: "Sal de casa a algún evento gratuito que haya en tu ciudad",
    category:"culture",
    tags:["outdoors"],
    timeInHours:2,
    likesCounter: 4,
    createdBy: "franchesco",
    status:"active",
    image: "/images/city.jpeg",
    hasMusic: false,
    hasBook: false ,
    hasVideo: false,
    hasLink: true,
    hasPdf: false,
    steps: [{
      title : "Busca",
      instruction: "Busca en internet cosas gratis en tu área. Te recomendo Google para ello:",
      timeInMinutes: 30,
      resource: "http://www.google.es/",
      order: 1
       },
       {
        title : "Ve",
        instruction: "Una vez hayas seleccionado algo que te gusta sal de casa con antelación para no llegar cuando todo haya acabado",
        timeInMinutes: 20,
        resource:"http://www.google.es/maps",
        order: 2
         },
         {
          title : "Disfruta del evento y observa",
          instruction: "Dale caña solo o acompañado, pero ojo, solo acompañado virtualmente, no queremos que nadie te quite el mandoo de las manos",
          timeInMinutes: 40,
          order: 3
           },
          {
            title: "Socializa",
            instruction:"Al acabar de obtener información intenta socializar con alguien que aún esté por ahí. Compartir es vivir!",
            timeInMinutes: 30,
            order: 4
          }]
    }
]

Stack.deleteMany()
.then(() => {
  return Stack.create(stacks)
})
.then(stacksCreated => {
  console.log(`${stacksCreated.length} stacks created with the following id:`);
  console.log(stacksCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})