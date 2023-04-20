const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

var ground, ground2;

var top_wall;
var ball;

var btn1;
var btn2;

var restricao;

function setup() {
  createCanvas(400, 400);

  engine = Engine.create();
  world = engine.world;

  var ball_options = {
    restitution: 0.95,
  };

  btn2 = createImg("right.png");
  btn2.position(20, 30);
  btn2.size(50, 50);
  btn2.mouseClicked(vForce);

  ground = new Ground(200, 400, 400, 20);
  ground2 = new Ground(0, 200, 20, 400);
  ground3 = new Ground(400, 200, 20, 400);
  ground4 = new Ground(200, 0, 400, 20);

  ball = Bodies.circle(100, 200, 20, ball_options);
  World.add(world, ball);

  rectMode(CENTER);
  ellipseMode(RADIUS);

  //length: comprimento ou tamanho da corda
  //stiffness: elasticidade da corda
  restricao = Constraint.create({
    pointA: { x: 100, y: 100 },
    bodyB: ball,
    pointB: { x: 0, y: 0 },
    length: 150,
    stiffness: 0.02,
  });

  World.add(world, restricao);
}

function draw() {
  background(51);
  Engine.update(engine);

  //circulo/esfera
  fill("lightblue");

  ground.show();
  ground2.show();
  ground3.show();
  ground4.show();

  strokeWeight(3);
  line(
    restricao.pointA.x,
    restricao.pointA.y,
    ball.position.x,
    ball.position.y
  );

  ellipse(ball.position.x, ball.position.y, 30);

  Engine.update(engine);
}

function vForce() {
  Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: 0.03, y: 0 });
}
