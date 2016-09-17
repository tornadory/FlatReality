"use strict";

let THREE = require("three");

/**
 * Asset queue downloader and manager for FlatReality project.
 */
class AssetManager {

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.queue = [];
        this.cache = {};
    }

    /**
     * Enqueue an asset by path, to be downloaded and cached.
     * @param {String} path Path to the asset.
     */
    enqueue(path) {
        console.log('queued path: ' + path);
        this.queue.push(path);
    }

    /**
     * Start fetching the queue of assets, and resolve a promise when completed.
     * @returns {Promise} Contains the number of assets queue, loaded and errored.
     */
    downloadQueue() {
        return new Promise((resolve, reject) => {
            if (this.queue.length === 0) {
                console.log('Empty queue, resolving.');
                return resolve([this.queue.length, this.successCount, this.errorCount]);
            }

            for (let i = 0; i < this.queue.length; i++) {
                let path = this.queue[i];
                let img = new Image();

                img.addEventListener("load", () => {
                    this.successCount++;
                    if (this.isComplete()) {
                        console.log('Completed, resolving from load.');
                        return resolve([this.queue.length, this.successCount, this.errorCount]);
                    }
                }, false);

                img.addEventListener("error", () => {
                    this.errorCount++;
                    if (this.isComplete()) {
                        console.log('Completed, resolving from error.');
                        return resolve([this.queue.length, this.successCount, this.errorCount]);
                    }
                }, false);

                img.src = path;
                this.cache[path] = img;
            }
        });
    }

    /**
     * Used by the AssetManager itself to check completion state.
     * @returns {boolean}
     */
    isComplete() {
        return (this.queue.length == this.successCount + this.errorCount);
    }

    /**
     * Fetch cached asset by path.
     * @param path
     * @returns {*}
     */
    getAsset(path) {
        console.log('Fetching cached asset : ' + path);
        console.log(this.cache);
        return this.cache[path];
    }

    getTexture(path) {
        let imagerLoader = new THREE.ImageLoader();
        console.log('Loading cached asset As a texture: ' + path);
        console.log(this.cache);
        imagerLoader.load(this.cache[path], (image) => {
            console.log('---- :)');
            return image;
        });
    }

}

module.exports = AssetManager;
