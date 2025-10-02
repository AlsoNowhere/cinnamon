# Cinnamon
A JS 3D library.

## What it does
Generates points (arc in Canvas and <circle> in SVG),
generates lines,
and generates polygons.
You can also add events that allow you to view the 3D objects with the keyboard or mouse.

## Getting started
You will need to download at least the package.json and /dist folder locally and reference that in your project.

Define an SVG element or canvas element.
Its a good idea to make this width and height 100% yourself because these elements don't stretch on their own and they have default dimensions you might not want.

Get a reference to the element you have defined and add this to a new instance of Cinnamon.
```import { Cinnamon, Point } from "cinnamon";

(function(){
  const element = document.querySelector("svg");

  const cinnamon = new Cinnamon(element);

  cinnamon.points = [
    new Point(0, 0, 0)
  ];

  cinnamon.centre = new Point(0, 0, -100);

  cinamon.render();
})()```
