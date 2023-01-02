window.addEventListener('load', () => {
// module aliases

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


/* const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;


const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 0.1;
 */



const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

// create an engine
const engine = Engine.create();

// create a renderer
/* const render = Render.create({
    element: document.body,
    engine: engine
});
 */
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: windowWidth,
    height: windowHeight,
    wireframes: false,
    background: '#ff0'
  }
});


// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const boxC = Bodies.circle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC, ground]);



// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);




});