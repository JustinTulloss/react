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
 * @providesModule HTMLDOMPropertyConfig
 */

/*jslint bitwise: true*/

"use strict";

var DOMProperty = require('DOMProperty');
var ExecutionEnvironment = require('ExecutionEnvironment');

var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE =
  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE =
  DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
var MUST_USE_NAMESPACED_ATTRIBUTE =
  DOMProperty.injection.MUST_USE_NAMESPACED_ATTRIBUTE;

var xmlNamespace = 'http://www.w3.org/XML/1998/namespace';
var xlinkNamespace = 'http://www.w3.org/1999/xlink';

var hasSVG;
if (ExecutionEnvironment.canUseDOM) {
  var implementation = document.implementation;
  hasSVG = (
    implementation &&
    implementation.hasFeature &&
    implementation.hasFeature(
      'http://www.w3.org/TR/SVG11/feature#BasicStructure',
      '1.1'
    )
  );
}


var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(
    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
  ),
  Properties: {
    /**
     * Standard Properties
     */
    accept: null,
    accessKey: null,
    action: null,
    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    allowTransparency: MUST_USE_ATTRIBUTE,
    alt: null,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: null,
    // autoFocus is polyfilled/normalized by AutoFocusMixin
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    cellPadding: null,
    cellSpacing: null,
    charSet: MUST_USE_ATTRIBUTE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    // To set className on SVG elements, it's necessary to use .setAttribute;
    // this works on HTML elements too in all browsers except IE8. Conveniently,
    // IE8 doesn't support SVG and so we can simply use the attribute in
    // browsers that support SVG and the property in browsers that don't,
    // regardless of whether the element is HTML or SVG.
    className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: MUST_USE_ATTRIBUTE,
    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    crossOrigin: null,
    data: null, // For `<object />` acts as `src`.
    dateTime: MUST_USE_ATTRIBUTE,
    defer: HAS_BOOLEAN_VALUE,
    dir: null,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: null,
    encType: null,
    form: MUST_USE_ATTRIBUTE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    frameBorder: MUST_USE_ATTRIBUTE,
    height: MUST_USE_ATTRIBUTE,
    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: MUST_USE_PROPERTY,
    label: null,
    lang: null,
    list: null,
    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    max: null,
    maxLength: MUST_USE_ATTRIBUTE,
    mediaGroup: null,
    method: null,
    min: null,
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: null,
    noValidate: HAS_BOOLEAN_VALUE,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    rel: null,
    required: HAS_BOOLEAN_VALUE,
    role: MUST_USE_ATTRIBUTE,
    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scrollLeft: MUST_USE_PROPERTY,
    scrolling: null,
    scrollTop: MUST_USE_PROPERTY,
    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: null,
    src: null,
    srcDoc: MUST_USE_PROPERTY,
    srcSet: null,
    start: HAS_NUMERIC_VALUE,
    step: null,
    style: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
    width: MUST_USE_ATTRIBUTE,
    wmode: MUST_USE_ATTRIBUTE,

    /**
     * Non-standard Properties
     */
    autoCapitalize: null, // Supported in Mobile Safari for keyboard hints
    autoCorrect: null, // Supported in Mobile Safari for keyboard hints
    itemProp: MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE, // Microdata: http://schema.org/docs/gs.html
    itemType: MUST_USE_ATTRIBUTE, // Microdata: http://schema.org/docs/gs.html
    property: null, // Supports OG in meta tags

    /**
     * SVG Properties
     */
    accentHeight: MUST_USE_ATTRIBUTE,
    accumulate: MUST_USE_ATTRIBUTE,
    additive: MUST_USE_ATTRIBUTE,
    alphabetic: MUST_USE_ATTRIBUTE,
    amplitude: MUST_USE_ATTRIBUTE,
    arabicForm: MUST_USE_ATTRIBUTE,
    ascent: MUST_USE_ATTRIBUTE,
    attributeName: MUST_USE_ATTRIBUTE,
    attributeType: MUST_USE_ATTRIBUTE,
    azimuth: MUST_USE_ATTRIBUTE,
    baseFrequency: MUST_USE_ATTRIBUTE,
    baseProfile: MUST_USE_ATTRIBUTE,
    bbox: MUST_USE_ATTRIBUTE,
    begin: MUST_USE_ATTRIBUTE,
    bias: MUST_USE_ATTRIBUTE,
    by: MUST_USE_ATTRIBUTE,
    calcMode: MUST_USE_ATTRIBUTE,
    capHeight: MUST_USE_ATTRIBUTE,
    clipPathUnits: MUST_USE_ATTRIBUTE,
    contentScriptType: MUST_USE_ATTRIBUTE,
    contentStyleType: MUST_USE_ATTRIBUTE,
    cursor: MUST_USE_ATTRIBUTE,
    cx: MUST_USE_ATTRIBUTE,
    cy: MUST_USE_ATTRIBUTE,
    d: MUST_USE_ATTRIBUTE,
    descent: MUST_USE_ATTRIBUTE,
    diffuseConstant: MUST_USE_ATTRIBUTE,
    divisor: MUST_USE_ATTRIBUTE,
    dur: MUST_USE_ATTRIBUTE,
    dx: MUST_USE_ATTRIBUTE,
    dy: MUST_USE_ATTRIBUTE,
    edgeMode: MUST_USE_ATTRIBUTE,
    elevation: MUST_USE_ATTRIBUTE,
    end: MUST_USE_ATTRIBUTE,
    exponent: MUST_USE_ATTRIBUTE,
    externalResourcesRequired: MUST_USE_ATTRIBUTE,
    filterRes: MUST_USE_ATTRIBUTE,
    filterUnits: MUST_USE_ATTRIBUTE,
    format: MUST_USE_ATTRIBUTE,
    from: MUST_USE_ATTRIBUTE,
    fx: MUST_USE_ATTRIBUTE,
    fy: MUST_USE_ATTRIBUTE,
    g1: MUST_USE_ATTRIBUTE,
    g2: MUST_USE_ATTRIBUTE,
    glyphName: MUST_USE_ATTRIBUTE,
    glyphRef: MUST_USE_ATTRIBUTE,
    gradientTransform: MUST_USE_ATTRIBUTE,
    gradientUnits: MUST_USE_ATTRIBUTE,
    hanging: MUST_USE_ATTRIBUTE,
    horizAdvX: MUST_USE_ATTRIBUTE,
    horizOriginX: MUST_USE_ATTRIBUTE,
    horizOriginY: MUST_USE_ATTRIBUTE,
    ideographic: MUST_USE_ATTRIBUTE,
    svgIn: MUST_USE_ATTRIBUTE,
    in2: MUST_USE_ATTRIBUTE,
    intercept: MUST_USE_ATTRIBUTE,
    k: MUST_USE_ATTRIBUTE,
    k1: MUST_USE_ATTRIBUTE,
    k2: MUST_USE_ATTRIBUTE,
    k3: MUST_USE_ATTRIBUTE,
    k4: MUST_USE_ATTRIBUTE,
    kernelMatrix: MUST_USE_ATTRIBUTE,
    kernelUnitLength: MUST_USE_ATTRIBUTE,
    keyPoints: MUST_USE_ATTRIBUTE,
    keySplines: MUST_USE_ATTRIBUTE,
    keyTimes: MUST_USE_ATTRIBUTE,
    lengthAdjust: MUST_USE_ATTRIBUTE,
    limitingConeAngle: MUST_USE_ATTRIBUTE,
    local: MUST_USE_ATTRIBUTE,
    markerHeight: MUST_USE_ATTRIBUTE,
    markerUnits: MUST_USE_ATTRIBUTE,
    markerWidth: MUST_USE_ATTRIBUTE,
    maskContentUnits: MUST_USE_ATTRIBUTE,
    maskUnits: MUST_USE_ATTRIBUTE,
    mathematical: MUST_USE_ATTRIBUTE,
    media: MUST_USE_ATTRIBUTE,
    mode: MUST_USE_ATTRIBUTE,
    numOctaves: MUST_USE_ATTRIBUTE,
    offset: MUST_USE_ATTRIBUTE,
    operator: MUST_USE_ATTRIBUTE,
    order: MUST_USE_ATTRIBUTE,
    orient: MUST_USE_ATTRIBUTE,
    orientation: MUST_USE_ATTRIBUTE,
    origin: MUST_USE_ATTRIBUTE,
    overlinePosition: MUST_USE_ATTRIBUTE,
    overlineThickness: MUST_USE_ATTRIBUTE,
    panose1: MUST_USE_ATTRIBUTE,
    path: MUST_USE_ATTRIBUTE,
    pathLength: MUST_USE_ATTRIBUTE,
    patternContentUnits: MUST_USE_ATTRIBUTE,
    patternTransform: MUST_USE_ATTRIBUTE,
    patternUnits: MUST_USE_ATTRIBUTE,
    points: MUST_USE_ATTRIBUTE,
    pointsAtX: MUST_USE_ATTRIBUTE,
    pointsAtY: MUST_USE_ATTRIBUTE,
    pointsAtZ: MUST_USE_ATTRIBUTE,
    preserveAlpha: MUST_USE_ATTRIBUTE,
    preserveAspectRatio: MUST_USE_ATTRIBUTE,
    primitiveUnits: MUST_USE_ATTRIBUTE,
    r: MUST_USE_ATTRIBUTE,
    radius: MUST_USE_ATTRIBUTE,
    refX: MUST_USE_ATTRIBUTE,
    refY: MUST_USE_ATTRIBUTE,
    renderingIntent: MUST_USE_ATTRIBUTE,
    repeatCount: MUST_USE_ATTRIBUTE,
    repeatDur: MUST_USE_ATTRIBUTE,
    repeatExtensions: MUST_USE_ATTRIBUTE,
    requiredExtensions: MUST_USE_ATTRIBUTE,
    requiredFeatures: MUST_USE_ATTRIBUTE,
    restart: MUST_USE_ATTRIBUTE,
    result: MUST_USE_ATTRIBUTE,
    rotate: MUST_USE_ATTRIBUTE,
    rx: MUST_USE_ATTRIBUTE,
    ry: MUST_USE_ATTRIBUTE,
    scale: MUST_USE_ATTRIBUTE,
    seed: MUST_USE_ATTRIBUTE,
    slope: MUST_USE_ATTRIBUTE,
    spacing: MUST_USE_ATTRIBUTE,
    specularConstant: MUST_USE_ATTRIBUTE,
    specularExponent: MUST_USE_ATTRIBUTE,
    spreadMethod: MUST_USE_ATTRIBUTE,
    startOffset: MUST_USE_ATTRIBUTE,
    stdDeviation: MUST_USE_ATTRIBUTE,
    stemh: MUST_USE_ATTRIBUTE,
    stemv: MUST_USE_ATTRIBUTE,
    stitchTiles: MUST_USE_ATTRIBUTE,
    strikethroughPosition: MUST_USE_ATTRIBUTE,
    strikethroughThickness: MUST_USE_ATTRIBUTE,
    string: MUST_USE_ATTRIBUTE,
    surfaceScale: MUST_USE_ATTRIBUTE,
    systemLanguage: MUST_USE_ATTRIBUTE,
    tableValues: MUST_USE_ATTRIBUTE,
    targetX: MUST_USE_ATTRIBUTE,
    targetY: MUST_USE_ATTRIBUTE,
    textLength: MUST_USE_ATTRIBUTE,
    to: MUST_USE_ATTRIBUTE,
    transform: MUST_USE_ATTRIBUTE,
    u1: MUST_USE_ATTRIBUTE,
    u2: MUST_USE_ATTRIBUTE,
    underlinePosition: MUST_USE_ATTRIBUTE,
    underlineThickness: MUST_USE_ATTRIBUTE,
    unicode: MUST_USE_ATTRIBUTE,
    unicodeRange: MUST_USE_ATTRIBUTE,
    unitsPerEm: MUST_USE_ATTRIBUTE,
    vAlphabetic: MUST_USE_ATTRIBUTE,
    vHanging: MUST_USE_ATTRIBUTE,
    vIdeographic: MUST_USE_ATTRIBUTE,
    vMathematical: MUST_USE_ATTRIBUTE,
    values: MUST_USE_ATTRIBUTE,
    version: MUST_USE_ATTRIBUTE,
    vertAdvY: MUST_USE_ATTRIBUTE,
    vertOriginX: MUST_USE_ATTRIBUTE,
    vertOriginY: MUST_USE_ATTRIBUTE,
    viewBox: MUST_USE_ATTRIBUTE,
    viewTarget: MUST_USE_ATTRIBUTE,
    widths: MUST_USE_ATTRIBUTE,
    x1: MUST_USE_ATTRIBUTE,
    x2: MUST_USE_ATTRIBUTE,
    x: MUST_USE_ATTRIBUTE,
    xHeight: MUST_USE_ATTRIBUTE,
    xChannelSelector: MUST_USE_ATTRIBUTE,
    xlinkActuate: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkArcrole: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkHref: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkRole: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkShow: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkTitle: MUST_USE_NAMESPACED_ATTRIBUTE,
    xlinkType: MUST_USE_NAMESPACED_ATTRIBUTE,
    xmlBase: MUST_USE_NAMESPACED_ATTRIBUTE,
    xmlLang: MUST_USE_NAMESPACED_ATTRIBUTE,
    xmlSpace: MUST_USE_NAMESPACED_ATTRIBUTE,
    y1: MUST_USE_ATTRIBUTE,
    y2: MUST_USE_ATTRIBUTE,
    y: MUST_USE_ATTRIBUTE,
    yChannelSelector: MUST_USE_ATTRIBUTE,
    z: MUST_USE_ATTRIBUTE,
    zoomAndPan: MUST_USE_ATTRIBUTE
  },
  DOMAttributeNames: {
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',

    /**
     * SVG
     */
    accentHeight: 'accent-height',
    arabicForm: 'arabic-form',
    attributeName: 'attributeName',
    attributeType: 'attributeType',
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clipPathUnits: 'clipPathUnits',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    diffuseConstant: 'diffuseConstant',
    edgeMode: 'edgeMode',
    externalResourcesRequired: 'externalResourcesRequired',
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    glyphName: 'glyph-name',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    svgIn: 'in',
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    limitingConeAngle: 'limitingConeAngle',
    markerHeight: 'markerHeight',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    numOctaves: 'numOctaves',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    requiredFeatures: 'requiredFeatures',
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stitchTiles: 'stitchTiles',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textLength: 'textLength',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    xHeight: 'x-height',
    xChannelSelector: 'xChannelSelector',
    xlinkActuate: 'actuate',
    xlinkArcrole: 'arcrole',
    xlinkHref: 'href',
    xlinkRole: 'role',
    xlinkShow: 'show',
    xlinkTitle: 'title',
    xlinkType: 'type',
    xmlBase: 'base',
    xmlLang: 'lang',
    xmlSpace: 'space',
    yChannelSelector: 'yChannelSelector',
    zoomAndPan: 'zoomAndPan'
  },
  DOMPropertyNames: {
    autoCapitalize: 'autocapitalize',
    autoComplete: 'autocomplete',
    autoCorrect: 'autocorrect',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    encType: 'enctype',
    hrefLang: 'hreflang',
    radioGroup: 'radiogroup',
    spellCheck: 'spellcheck',
    srcDoc: 'srcdoc',
    srcSet: 'srcset'
  },
  DOMAttributeNamespaces: {
    xlinkActuate: xlinkNamespace,
    xlinkArcrole: xlinkNamespace,
    xlinkHref: xlinkNamespace,
    xlinkRole: xlinkNamespace,
    xlinkShow: xlinkNamespace,
    xlinkTitle: xlinkNamespace,
    xlinkType: xlinkNamespace,
    xmlBase: xmlNamespace,
    xmlLang: xmlNamespace,
    xmlSpace: xmlNamespace
  },
  DOMMutationMethods: {
    /**
     * Setting `className` to null may cause it to be set to the string "null".
     *
     * @param {DOMElement} node
     * @param {*} value
     */
    className: function(node, value) {
      node.className = value || '';
    }
  }
};

module.exports = HTMLDOMPropertyConfig;
