const canvas = require('canvas-prebuilt');
const { JSDOM } = require('jsdom');
const vm = require('vm-shim');

var fs = require('fs');
const picasso = fs.readFileSync('./node_modules/picasso.js/dist/picasso.js', 'utf8');

module.exports = {
    chart: (args) => {
        const dom = new JSDOM(`<!DOCTYPE html><chart></chart>`);
        let mockglobal = {};
        let window;
        let document;

        window = dom.window;
        dom.window.CanvasRenderingContext2D = canvas;
        document = window.document;
        const element = document.querySelector('chart');

        mockglobal.window = window;
        mockglobal.self = window;
        mockglobal.navigator = { maxTouchPoints: 1 };
        mockglobal.document = document;
        mockglobal.Image = window.Image;
        mockglobal.Node = window.Node;

        element.addEventListener = () => {};

        element.getBoundingClientRect = () => {
            return {
                x: 0,
                y: 0,
                width: args && args.element && args.element.width || 500,
                height: args && args.element && args.element.height || 500
            };
        };

        const picarg = Object.assign({}, args);
        picarg.element = element;
        mockglobal.args = picarg;

        vm.runInContext(`${picasso}`, mockglobal);
        mockglobal.picasso = mockglobal.window.picasso;

        vm.runInContext('picasso.chart(args);', mockglobal);
        
        let xml = element.innerHTML;

        return xml;
    }
}