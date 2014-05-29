/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule ReactDOM
 * @typechecks static-only
 */

"use strict";

var ReactDescriptor = require('ReactDescriptor');
var ReactDOMComponent = require('ReactDOMComponent');

var mergeInto = require('mergeInto');
var mapObject = require('mapObject');

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @param {boolean} omitClose True if the close tag should be omitted.
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */
function createDOMComponentClass(omitClose, tag) {
  var Constructor = function(descriptor) {
    this.construct(descriptor);
  };
  Constructor.prototype = new ReactDOMComponent(tag, omitClose);
  Constructor.prototype.constructor = Constructor;
  Constructor.displayName = tag;

  var ConvenienceConstructor = ReactDescriptor.createFactory(Constructor);

  return ConvenienceConstructor;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOM = mapObject({
  a: false,
  abbr: false,
  address: false,
  area: true,
  article: false,
  aside: false,
  audio: false,
  b: false,
  base: true,
  bdi: false,
  bdo: false,
  big: false,
  blockquote: false,
  body: false,
  br: true,
  button: false,
  canvas: false,
  caption: false,
  cite: false,
  code: false,
  col: true,
  colgroup: false,
  data: false,
  datalist: false,
  dd: false,
  del: false,
  details: false,
  dfn: false,
  div: false,
  dl: false,
  dt: false,
  em: false,
  embed: true,
  fieldset: false,
  figcaption: false,
  figure: false,
  footer: false,
  form: false, // NOTE: Injected, see `ReactDOMForm`.
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  head: false,
  header: false,
  hr: true,
  html: false,
  i: false,
  iframe: false,
  img: true,
  input: true,
  ins: false,
  kbd: false,
  keygen: true,
  label: false,
  legend: false,
  li: false,
  link: true,
  main: false,
  map: false,
  mark: false,
  menu: false,
  menuitem: false, // NOTE: Close tag should be omitted, but causes problems.
  meta: true,
  meter: false,
  nav: false,
  noscript: false,
  object: false,
  ol: false,
  optgroup: false,
  option: false,
  output: false,
  p: false,
  param: true,
  pre: false,
  progress: false,
  q: false,
  rp: false,
  rt: false,
  ruby: false,
  s: false,
  samp: false,
  script: false,
  section: false,
  select: false,
  small: false,
  source: true,
  span: false,
  strong: false,
  style: false,
  sub: false,
  summary: false,
  sup: false,
  table: false,
  tbody: false,
  td: false,
  textarea: false, // NOTE: Injected, see `ReactDOMTextarea`.
  tfoot: false,
  th: false,
  thead: false,
  time: false,
  title: false,
  tr: false,
  track: true,
  u: false,
  ul: false,
  'var': false,
  video: false,
  wbr: true,

  // SVG
  altGlyph: false,
  altGlyphDef: false,
  altGlyphItem: false,
  animate: false,
  animateColor: false,
  animateMotion: false,
  animateTransform: false,
  circle: false,
  clipPath: false,
  'color-profile': false,
  cursor: false,
  defs: false,
  desc: false,
  feBlend: false,
  feColorMatrix: false,
  feComponentTransfer: false,
  feComposite: false,
  feConvolveMatrix: false,
  feDiffuseLighting: false,
  feDisplacementMap: false,
  feDistantLight: false,
  feFlood: false,
  feFuncA: false,
  feFuncB: false,
  feFuncG: false,
  feFuncR: false,
  feGaussianBlur: false,
  feImage: false,
  feMerge: false,
  feMergeNode: false,
  feMorphology: false,
  feOffset: false,
  fePointLight: false,
  feSpecularLighting: false,
  feSpotLight: false,
  feTile: false,
  feTurbulence: false,
  filter: false,
  font: false,
  'font-face': false,
  'font-face-format': false,
  'font-face-name': false,
  'font-face-src': false,
  'font-face-uri': false,
  foreignObject: false,
  g: false,
  glyph: false,
  glyphRef: false,
  hkern: false,
  image: false,
  line: false,
  linearGradient: false,
  marker: false,
  mask: false,
  metadata: false,
  'missing-glyph': false,
  mpath: false,
  path: false,
  pattern: false,
  polygon: false,
  polyline: false,
  radialGradient: false,
  rect: false,
  set: false,
  stop: false,
  'switch': false,
  svg: false,
  symbol: false,
  text: false,
  textPath: false,
  tref: false,
  tspan: false,
  use: false,
  view: false,
  vkern: false
}, createDOMComponentClass);

var injection = {
  injectComponentClasses: function(componentClasses) {
    mergeInto(ReactDOM, componentClasses);
  }
};

ReactDOM.injection = injection;

module.exports = ReactDOM;
