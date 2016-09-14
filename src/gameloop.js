"use strict";

let THREE = require('three');

/**
 * This class aims to be as empty and as basic as possible, this is the GAME LOOP!
 */
class GameLoop {

    /**
     * Construction sets off the loop. Do not construct until ready!
     */
    constructor(renderer, scene, camera, controls) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.loop();
    }

    /**
     * This is it...
     */
    loop() {

        /**
         * This is the only way I can get es6 arrow operator + recursive function to work :|
         */
        var animate = () => {
            this.renderer.render(this.scene, this.camera);

            /**
             * Added call outs...
             */
            this.controls.updateControls(this.controls.get());     // call controls update.

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }


}

module.exports = GameLoop;
