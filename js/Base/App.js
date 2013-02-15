(function (global) {
    'use strict';

    global.app = global.app || {};

    global.app.start = function start() {
        var i, entity,
            engine = new app.Engine({
                container: $('#container')[0],
                systems: [
                    'MouseInputSystem',
                    'SquidControlSystem',
                    'SteeringSystem',
                    'PhysicsSystem',
                    'CameraSystem',
                    'RockSystem',
                    'FoodSystem',
                    'SquidSystem',
                    'BackgroundSystem'
                ]
            });

        engine.creatureFactory = new app.SquidFactory(engine);
        engine.foodFactory = new app.FoodFactory(engine);
        engine.rockFactory = new app.RockFactory(engine);

        for (i = 0; i < 3; i += 1) {
            engine.rockFactory.createRock({
                x: app.random(0, 1500),
                y: app.random(1000, 1500),
                vertexCount: 9,
                minRadius: 40,
                maxRadius: 90
            });
        }

        for (i = 0; i < 5; i += 1) {
            engine.creatureFactory.createSquid({
                segmentLength: app.random(5, 11),
                radius: app.random(10, 19),
                thickness: app.random(1, 5),
                velocity: app.random(30, 32),
                force: app.random(800, 900),
                sprint: 2
            });
        }

        entity = engine.creatureFactory.createSquid({
            segmentLength: 25,
            radius: 25,
            thickness: 3,
            velocity: 26,
            force: 700,
            sprint: 2,
            tentacleCount: 5
        });

        engine.systems.CameraSystem.setTargetEntity(entity);
        engine.start();

        global.myEngine = engine;
    };

}(window));


//todo pickups
//todo hostile creature render (maybe just different color squids)
//todo AI behavior system
//todo health system
//todo environment spawn system
//todo scoring
//todo start menu
//todo options
//todo leader board
//todo game over screen

//todo data service
//todo database