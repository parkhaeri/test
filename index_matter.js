const engine = Matter.Engine.create();
const world = engine.world;

const render = Matter.Render.create({
    element: document.querySelector("div"),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'black'
    }
});

Matter.Render.run(render);

const runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

fetch("./terrain.svg")
    .then((response) => { return response.text(); })
    .then((raw) => { return (new window.DOMParser()).parseFromString(raw, "image/svg+xml"); })
    .then(function(root) {
        const paths = Array.prototype.slice.call(root.querySelectorAll('path'));
        console.log(paths);
        const vertices = paths.map((path) => { return Matter.Svg.pathToVertices(path, 30); });
        const terrain = Matter.Bodies.fromVertices(400, 350, vertices, {
            isStatic: true,
            render: {
                fillStyle: '#2c3e50',
                strokeStyle: '#2c3e50',
                lineWidth: 1,
            }
        }, true);

        Matter.World.add(world, terrain);

        var bodyOptions = {
            frictionAir: 0.1, 
            friction: 0.5,
            restitution: 0.1
        };
        
        Matter.World.add(world, Matter.Composites.stack(100, 200, 40, 10, 15, 15, (x, y) => {
            if (Matter.Query.point([terrain], { x: x, y: y }).length === 0) {
                return Matter.Bodies.polygon(x, y, 4, 10, bodyOptions);
            }
        }));
    }
);

var mouse = Matter.Mouse.create(render.canvas),
mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Matter.World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
//render.mouse = mouse;

/*
Matter.Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});
*/
