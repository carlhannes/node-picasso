const { Canvas } = require('canvas-webworker');
const { JSDOM } = require('jsdom');
const vm = require('vm-shim');

var fs = require('fs');
const picasso = fs.readFileSync('./node_modules/picasso.js/dist/picasso.js', 'utf8');

module.exports = {
    chart: (args) => {
        const dom = new JSDOM(`<!DOCTYPE html><chart></chart>`);
        const canvas = new Canvas(500, 500);
        let mockglobal = {};
        let window;
        let document;

        window = dom.window;
        dom.window.CanvasRenderingContext2D = canvas.getContext('2d');
        document = window.document;
        const element = document.querySelector('chart');

        mockglobal.window = window;
        mockglobal.document = document;
        mockglobal.Image = window.Image;
        mockglobal.Node = window.Node;

        element.addEventListener = () => {};

        element.getBoundingClientRect = () => {
            return {
                x: 0,
                y: 0,
                width: 500,
                height: 500
            };
        };

        args.element = element;

        mockglobal.args = args;

        vm.runInContext(`${picasso}`, mockglobal);
        mockglobal.picasso = mockglobal.window.picasso;
        vm.runInContext('picasso.chart(args);', mockglobal);
        
        let xml = element.innerHTML;

        return xml;
    }
}