campi
=====

**campi** is a [Node](http://nodejs.org/) module that encapsulates the raspistill command for taking pictures.

## Author
  - Werner Vesterås <wvesteraas@gmail.com>

## Installation
As with any Node module, use the [Node Package Manager](https://www.npmjs.com/) to install it:

```bash
$ npm install campi
```

## Usage

Option | Value
--- | ---
**width, w** | Width
**height, h** | Height
**shutter, sh** | Shutter speed (>=0, <=6000000)
**nopreview, n** | No preview
**opacity, op** | Opacity (>=0, <=255)
**imxfx, ifx** | Image effect (none, negative, solarise, posterise, whiteboard, blackboard, sketch, denoise, emboss, oilpaint, hatch, gpen, pastel, watercolour, film, blur, saturation)
**metering, mm** | Metering mode (average, spot, backlit, matrix)
**quality, q** | Quality (>=0, <=100)
**timeout, t** | Timeout
**hflip, hf** | Horizontal flip
**vflip, vf*** | Vertical flip

\*The **hflip** & **vflip** properties is type agnostic, but for readability the form `{ hflip: true }` should be used.

## Examples

See the [examples](https://github.com/vesteraas/campi/tree/master/examples) directory.
