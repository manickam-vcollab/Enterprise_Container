/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}var version = "0.0.14";var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.create_UUID = function () {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Utility.deepCopy = function (obj) {
        var _this = this;
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        if (obj instanceof Array) {
            return obj.reduce(function (arr, item, i) {
                arr[i] = _this.deepCopy(item);
                return arr;
            }, []);
        }
        if (obj instanceof Object) {
            return Object.keys(obj).reduce(function (newObj, key) {
                newObj[key] = _this.deepCopy(obj[key]);
                return newObj;
            }, {});
        }
    };
    Utility.downloadDataAsFile = function (data, filename, type) {
        if (!type)
            type = 'application/json';
        // @ts-ignore
        var blob = new Blob([JSON.stringify(data)], { type: type });
        // @ts-ignore
        var url = URL.createObjectURL(blob);
        // Create a new anchor element
        // @ts-ignore
        var a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        a.click();
        a.remove();
    };
    Utility.getProbeInputData = function (event) {
        var e = event.data;
        var container = e.target;
        var rect = container.getBoundingClientRect();
        var pointerData = {
            xyFromTop: [e.clientX - rect.left,
                e.clientY - rect.top],
            width: rect.width,
            height: rect.height
        };
        return pointerData;
    };
    Utility.getDOMSize = function (containerID) {
        var size = [0, 0];
        var DOM = document.getElementById(containerID);
        if (DOM) {
            size[0] = DOM.clientWidth;
            size[1] = DOM.clientHeight;
        }
        return size;
    };
    Utility.getURLParameterByName = function (URL, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", 'i'), results = regex.exec(URL);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    Utility.getPathFromUrl = function (url) {
        return url.split(/[?#]/)[0];
    };
    return Utility;
}());var orientation = {
    VERTICAL: 0,
    HORIZONTAL: 1,
};
var paletteType = {
    CONTINUOUS: 0,
    DISCRETE: 1
};
var valueType = {
    CONTINUOUS: 0,
    DISCRETE: 1
};
var valuePlacement = {
    EDGE: 0,
    MIDDLE: 1
};
var ticsPosition = {
    NONE: 0,
    INSIDE: 1,
    OUTSIDE: 2,
    ACROSS: 3,
};
var colorValueMode = {
    BOUNDED: 0,
    EXTENDED: 1,
};
var colorMap = {
    PRESET1: [
        [255, 0, 0],
        [255, 78, 0],
        [255, 156, 0],
        [247, 227, 0],
        [196, 255, 0],
        [117, 255, 0],
        [39, 255, 0],
        [0, 255, 39],
        [0, 255, 117],
        [0, 255, 196],
        [0, 227, 247],
        [0, 156, 255],
        [0, 78, 255],
        [0, 0, 255],
    ],
    COLORS_2: [
        [255, 0, 0],
        [0, 0, 255],
    ]
};
var InteractionMode;
(function (InteractionMode) {
    InteractionMode["DEFAULT"] = "DEFAULT";
    InteractionMode["CONTINUOUS_PROBE"] = "CONTINUOUS_PROBE";
    InteractionMode["LABEL2D"] = "LABEL2D";
    InteractionMode["LABEL3D_POINT"] = "LABEL3D_POINT";
    InteractionMode["LABEL3D_FACE"] = "LABEL3D_FACE";
    InteractionMode["LABEL_MEASUREMENT_POINT_TO_POINT"] = "LABEL_MEASUREMENT_POINT_TO_POINT";
    InteractionMode["LABEL_MEASUREMENT_3PT_ARC"] = "LABEL_MEASUREMENT_3PT_ARC";
    InteractionMode["SECTION_3PT"] = "SECTION_3PT";
    InteractionMode["SECTION_FACE"] = "SECTION_FACE";
    InteractionMode["PICK_AND_MOVE"] = "PICK_AND_MOVE";
})(InteractionMode || (InteractionMode = {}));
var displayModes = {
    BOUNDING_BOX: {
        ID: "BOUNDING_BOX",
        DISPLAYNAME: "Bounding Box",
        DISPLAYORDER: 1
    },
    POINT: {
        ID: "POINT",
        DISPLAYNAME: "Point",
        DISPLAYORDER: 2
    },
    WIREFRAME: {
        ID: "WIREFRAME",
        DISPLAYNAME: "Wireframe",
        DISPLAYORDER: 3
    },
    HIDDEN_LINE: {
        ID: "HIDDEN_LINE",
        DISPLAYNAME: "Hidden Line",
        DISPLAYORDER: 4
    },
    SHADED: {
        ID: "SHADED",
        DISPLAYNAME: "Shaded",
        DISPLAYORDER: 5
    },
    SHADED_MESH: {
        ID: "SHADED_MESH",
        DISPLAYNAME: "Shaded Mesh",
        DISPLAYORDER: 6
    },
    TRANSPARENT: {
        ID: "TRANSPARENT",
        DISPLAYNAME: "Transparent",
        DISPLAYORDER: 7
    }
};
var downloadMetricTypes = {
    NONE: "NONE",
    SIZE: "SIZE",
    TIME: "TIME",
};
var BackgroundType;
(function (BackgroundType) {
    BackgroundType[BackgroundType["GRADIENT"] = 0] = "GRADIENT";
    BackgroundType[BackgroundType["IMAGE"] = 1] = "IMAGE";
})(BackgroundType || (BackgroundType = {}));var ModelTree = /** @class */ (function () {
    function ModelTree(treeMap, modelIds) {
        this.models = treeMap;
        this.rootNodeIds = modelIds;
    }
    ModelTree.prototype.getVisibleNodeIds = function () {
        if (this.models) {
            var visible = __spread(this.models.values()).filter(function (node) { return (node.children.length === 0 && node.customData.displayProps.visibility == true); });
            return visible.map(function (node) { return node.id; });
        }
    };
    ModelTree.prototype.getInvisibleNodeIds = function () {
        if (this.models) {
            var invisible = __spread(this.models.values()).filter(function (node) { return (node.children.length === 0 && node.customData.displayProps.visibility == false); });
            return invisible.map(function (node) { return node.id; });
        }
    };
    ModelTree.prototype.getPartNodeFromNodeIds = function (nodeIds) {
        var _this = this;
        var out = [];
        if (this.models) {
            nodeIds.forEach(function (nodeId) {
                var selectedNode = _this.models.get(nodeId);
                if (selectedNode)
                    out.push(selectedNode);
            });
        }
        //console.log(out);
        return out;
    };
    ModelTree.prototype.getAllPartNodes = function () {
        if (this.models) {
            return __spread(this.models.values()).filter(function (node) { return node.children.length === 0; });
        }
    };
    ModelTree.prototype.getRepresentationsFromParts = function (nodes) {
        var out = [];
        nodes.forEach(function (part) {
            if (part.customData && part.customData.geometries) {
                part.customData.geometries.forEach(function (geometry) {
                    if (geometry.customData && geometry.customData.representations) {
                        out.push.apply(out, __spread(geometry.customData.representations));
                    }
                });
            }
        });
        return out;
    };
    ModelTree.prototype.getRenderNodeIdsFromNodeIds = function (nodeIds) {
        var nodes = this.getPartNodeFromNodeIds(nodeIds);
        var reps = this.getRepresentationsFromParts(nodes);
        return reps.map(function (rep) { return rep.customData.node; });
    };
    ModelTree.prototype.getPartIdsFromRenderNodeIds = function (renderIds) {
        var partIds = [];
        __spread(this.models.values()).forEach(function (node) {
            if (node.children.length === 0) {
                if (node.customData && node.customData.geometries) {
                    node.customData.geometries.forEach(function (geometry) {
                        if (geometry.customData && geometry.customData.representations) {
                            geometry.customData.representations.forEach(function (rep) {
                                if (renderIds.includes(rep.customData.node)) {
                                    partIds.push(node.id);
                                }
                            });
                        }
                    });
                }
            }
        });
        return partIds;
    };
    ModelTree.prototype.setVisibility = function (nodes, toShow) {
        var _this = this;
        nodes.forEach(function (node) {
            var curNode = __assign({}, _this.models.get(node.id));
            curNode.customData.displayProps.visibility = toShow;
            _this.models.set(curNode.id, curNode);
        });
    };
    return ModelTree;
}());
var ModelTreeBuilder = /** @class */ (function () {
    function ModelTreeBuilder(_mcax) {
        this.mcax = _mcax;
        this.tree = new Map();
    }
    ModelTreeBuilder.prototype.build = function () {
        var rootNodeIds = this.processModels(Utility.deepCopy(this.mcax.models));
        return new ModelTree(this.tree, rootNodeIds);
    };
    ModelTreeBuilder.prototype.processModels = function (models) {
        var _this = this;
        var modelIds = [];
        if (models && models instanceof Array && models.length > 0) {
            var filteredModels = models.filter(this.filter);
            for (var j = 0; j < filteredModels.length; j++) {
                var model = filteredModels[j];
                var children = [];
                if (model.components) {
                    var filteredComponents = model.components.filter(function (item) { return _this.filter(_this.mcax.components[item]); });
                    for (var i = 0, l = filteredComponents.length; i < l; i++) {
                        var childID = this.buildComponentsHierachy("model_" + j, filteredComponents[i], this.mcax.components);
                        children.push(childID);
                    }
                }
                var name_1 = model.name || "model_" + j;
                var tempModel = {
                    //name,
                    id: "model_" + j,
                    pid: null,
                    children: children,
                    customData: model,
                    title: name_1,
                    attributes: model.attributes
                };
                this.tree.set(tempModel.id, tempModel);
                modelIds.push(tempModel.id);
            }
        }
        return modelIds;
    };
    ModelTreeBuilder.prototype.buildComponentsHierachy = function (pid, componentId, allComponents) {
        var _this = this;
        var component = JSON.parse(JSON.stringify(this.mcax.components[componentId]));
        var children = [];
        if (component.geometries) {
            //children = this.processGeometries(component.geometries);
            component.geometries = this.processGeometries(component.geometries);
            component.displayProps = {
                displayId: displayModes.BOUNDING_BOX.ID,
                hiddenlineEnabled: false,
                transparency: 0.0,
                useTexture: false,
                isHighlighted: false,
                visibility: component.display
            };
        }
        if (component.children) {
            var filteredChildren = component.children.filter(function (item) { return _this.filter(allComponents[item]); });
            for (var i = 0, l = filteredChildren.length; i < l; i++) {
                var compo = this.buildComponentsHierachy("component_" + componentId, filteredChildren[i], allComponents);
                children.push(compo);
            }
        }
        var name = component.name || "component_" + componentId;
        var tempComponent = {
            //name,
            id: "component_" + componentId,
            pid: pid,
            children: children,
            customData: component,
            title: name,
            attributes: component.attributes
        };
        this.tree.set(tempComponent.id, tempComponent);
        return tempComponent.id;
    };
    ModelTreeBuilder.prototype.buildChildHierachy = function (pid, childId, allmodels, allComponents) {
        var _this = this;
        var model = JSON.parse(JSON.stringify(allmodels[childId]));
        var children = [];
        if (model.components) {
            var filteredComponents = model.components.filter(function (item) { return _this.filter(allComponents[item]); });
            for (var i = 0, l = filteredComponents.length; i < l; i++) {
                var child = this.buildComponentsHierachy("component_" + childId, filteredComponents[i], allComponents);
                children.push(child);
            }
        }
        if (model.children) {
            var filteredChildren = model.children.filter(function (item) { return _this.filter(allmodels[item]); });
            for (var i = 0, l = filteredChildren.length; i < l; i++) {
                var child = this.buildChildHierachy("model_" + childId, filteredChildren[i], allmodels, allComponents);
                children.push(child);
            }
        }
        var name = model.name || "model_" + childId;
        var tempModel = {
            //name,
            id: "model_" + childId,
            pid: pid,
            children: children,
            customData: model,
            title: name,
            key: "model_" + childId,
            attributes: model.attributes
        };
        return tempModel;
    };
    ModelTreeBuilder.prototype.processGeometries = function (geometryArray) {
        var geometries = [];
        if (geometryArray && geometryArray instanceof Array) {
            for (var i = 0; i < geometryArray.length; i++) {
                var geometryIndex = geometryArray[i];
                var geometry = JSON.parse(JSON.stringify(this.mcax.geometries[geometryIndex]));
                if (geometry.representations)
                    geometry.representations = this.processRepresentation(geometry.representations, geometryIndex);
                var name_2 = geometry.name || "geometry_" + geometryIndex;
                var tempGeometry = {
                    name: name_2,
                    id: "geometry_" + geometryIndex,
                    customData: geometry
                };
                geometries.push(tempGeometry);
            }
        }
        return geometries;
    };
    ModelTreeBuilder.prototype.processRepresentation = function (representationArray, geometryIndex) {
        var representations = [];
        if (representationArray && representationArray instanceof Array) {
            for (var i = 0; i < representationArray.length; i++) {
                var representationIndex = representationArray[i];
                var representation = JSON.parse(JSON.stringify(this.mcax.representations[representationIndex]));
                var name_3 = representation.name || "representation_" + representationIndex;
                var tempRepresentation = {
                    name: name_3,
                    id: "representation_" + representationIndex,
                    geometryIndex: geometryIndex,
                    customData: representation
                };
                representations.push(tempRepresentation);
            }
        }
        return representations;
    };
    ModelTreeBuilder.prototype.filter = function (item) {
        return item.active;
    };
    return ModelTreeBuilder;
}());var URLObject = /** @class */ (function () {
    function URLObject(_url) {
        this.bufferViewLength = 0;
        this.url = _url;
        this.bufferViewOffset = 0;
        this.bufferViewLength = 0;
        this.bufferIndex = null;
        this.bufferViewIndex = null;
        this.accessorIndex = null;
        this.meshIndex = null;
        this.nodeIndex = null;
    }
    return URLObject;
}());
var GltfUrlExtractor = /** @class */ (function () {
    function GltfUrlExtractor(_glftJSON, renderApp) {
        this.glftJSON = _glftJSON;
        this.renderApp = renderApp;
    }
    GltfUrlExtractor.prototype.getNodeURLs = function (nodeIndex) {
        var urlObjArray = [];
        if (nodeIndex !== null && nodeIndex !== undefined) {
            var nodes = this.glftJSON.nodes;
            if (nodeIndex < nodes.length) {
                var meshIndex = nodes[nodeIndex].mesh;
                urlObjArray = this.getMeshURLs(nodeIndex, meshIndex);
                urlObjArray.forEach(function (item) {
                    item.nodeIndex = nodeIndex;
                });
            }
        }
        return urlObjArray;
    };
    GltfUrlExtractor.prototype.getMeshURLs = function (nodeIndex, meshIndex) {
        var _this = this;
        var urlObjArray = [];
        if (meshIndex !== null && meshIndex !== undefined) {
            var meshes = this.glftJSON.meshes;
            if (meshIndex < meshes.length) {
                var mesh = meshes[meshIndex];
                var accesstorIndices_1 = [];
                mesh.primitives.forEach(function (primitive) {
                    accesstorIndices_1.push(primitive.attributes.POSITION);
                    accesstorIndices_1.push(primitive.indices);
                });
                accesstorIndices_1.forEach(function (accessorIndex) {
                    var urlObj = _this.getAccessorURLs(accessorIndex);
                    if (urlObj) {
                        urlObj.meshIndex = meshIndex;
                        var isDownloaded = _this.renderApp.getIsAttributeDataAvailable(nodeIndex, "accessor_" + urlObj.accessorIndex);
                        if (isDownloaded === false)
                            urlObjArray.push(urlObj);
                    }
                });
            }
        }
        return urlObjArray;
    };
    GltfUrlExtractor.prototype.getAccessorURLs = function (accessorIndex) {
        var urlObj = null;
        if (accessorIndex !== null && accessorIndex !== undefined) {
            var accessors = this.glftJSON.accessors;
            if (accessorIndex < accessors.length) {
                var bufferViewIndex = accessors[accessorIndex].bufferView;
                urlObj = this.getBufferViewURLs(bufferViewIndex);
                urlObj.accessorIndex = accessorIndex;
            }
        }
        return urlObj;
    };
    GltfUrlExtractor.prototype.getBufferViewURLs = function (bufferViewIndex) {
        var urlObj = null;
        if (bufferViewIndex !== null && bufferViewIndex !== undefined) {
            var bufferViews = this.glftJSON.bufferViews;
            if (bufferViewIndex < bufferViews.length) {
                var bufferIndex = bufferViews[bufferViewIndex].buffer;
                var offset = bufferViews[bufferViewIndex].byteOffset;
                var length_1 = bufferViews[bufferViewIndex].byteLength;
                var url = this.getBufferURLs(bufferIndex);
                if (url) {
                    urlObj = new URLObject(url);
                    urlObj.bufferViewOffset = offset || 0;
                    urlObj.bufferViewLength = length_1 || 0;
                    urlObj.bufferViewIndex = bufferViewIndex;
                    urlObj.bufferIndex = bufferIndex;
                }
            }
        }
        return urlObj;
    };
    GltfUrlExtractor.prototype.getBufferURLs = function (bufferIndex) {
        var uri = null;
        if (bufferIndex !== null && bufferIndex !== undefined) {
            var buffers = this.glftJSON.buffers;
            if (bufferIndex < buffers.length) {
                var buffer = buffers[bufferIndex];
                uri = buffer.uri;
            }
        }
        return uri;
    };
    return GltfUrlExtractor;
}());var statusIconType;
(function (statusIconType) {
    statusIconType[statusIconType["NONE"] = 0] = "NONE";
    statusIconType[statusIconType["ERROR"] = 1] = "ERROR";
    statusIconType[statusIconType["WARN"] = 2] = "WARN";
    statusIconType[statusIconType["INFO"] = 3] = "INFO";
    statusIconType[statusIconType["SUCCESS"] = 4] = "SUCCESS";
})(statusIconType || (statusIconType = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.setExternalLogger = function (externalLogger) {
        this.externalLogger = externalLogger;
    };
    Logger.setStatusBar = function (text, iconType) {
        if (iconType === void 0) { iconType = statusIconType.INFO; }
        if (this.externalLogger) {
            this.externalLogger.setStatusBar(text, iconType);
        }
    };
    Logger.clearStatusBar = function () {
        if (this.externalLogger)
            this.externalLogger.clearStatusBar();
    };
    Logger.externalLogger = null;
    return Logger;
}());var ProgressiveLoader = /** @class */ (function () {
    function ProgressiveLoader(_mcax, _renderApp, _connector) {
        this.mcax = _mcax;
        this.renderApp = _renderApp;
        this.connector = _connector;
        this.gltfurlExtractor = new GltfUrlExtractor(_mcax.gltf, this.renderApp);
    }
    //########################################################
    ProgressiveLoader.prototype.showDefaultDisplay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var representations_1, geometries;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.mcax && this.renderApp) {
                    Logger.setStatusBar("Downloading mesh data...");
                    representations_1 = [];
                    geometries = this.getRenderableGeometries();
                    geometries.forEach(function (e, gIndex) {
                        var repre = _this.getRecursiveItems(e.item.representations, _this.mcax.representations);
                        repre.forEach(function (r, rIndex) {
                            if (r.item.display === true) {
                                var repIndex = r.index[rIndex];
                                var repObj = {
                                    customData: r.item,
                                    geometryIndex: e.index[gIndex],
                                    id: "representation_" + repIndex,
                                    name: r.item.name
                                };
                                representations_1.push(repObj);
                            }
                        });
                    });
                    this.loadSelectedRepresentations(null, representations_1)
                        .then(function () {
                        Logger.setStatusBar("Mesh data downloaded.");
                        _this.renderApp.fitView();
                        return (true);
                    }).catch((function (error) {
                        Logger.setStatusBar("Error occurred while loading mesh.", statusIconType.ERROR);
                        throw new Error(error);
                    })).finally(function () {
                    });
                }
                else {
                    throw new Error("Invalid mcax or renderApp object.");
                }
                return [2 /*return*/];
            });
        });
    };
    ProgressiveLoader.prototype.getRenderableGeometries = function () {
        var models = this.mcax.models;
        if (models instanceof Array && models.length > 0) {
            var filteredModels = models.filter(function (item) { return item.display; });
            var componentIndexList = filteredModels.map(function (item) { return (item.components || []); }).flat();
            var components = this.getRecursiveItems(componentIndexList, this.mcax.components);
            var filteredcomponents = components.filter(function (e) { return e.item.display; });
            var geometryIndexList = filteredcomponents.map(function (e) { return (e.item.geometries || []); }).flat();
            var geometries = this.getRecursiveItems(geometryIndexList, this.mcax.geometries);
            return geometries;
        }
    };
    ProgressiveLoader.prototype.getRecursiveItems = function (indexList, items) {
        var _this = this;
        var itemsList = [];
        if (indexList instanceof Array && indexList.length > 0) {
            indexList.forEach(function (index) {
                var item = items[index];
                if (item.children && item.children.length > 0) {
                    itemsList.push.apply(itemsList, __spread(_this.getRecursiveItems(item.children, items)));
                }
                else {
                    itemsList.push({
                        item: item,
                        index: index
                    });
                }
            });
        }
        return itemsList;
    };
    //########################################################
    ProgressiveLoader.prototype.loadSelectedRepresentations = function (downloadId, representations) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (representations && representations instanceof Array) {
                var rep_map = new Map();
                representations.forEach(function (rep) {
                    var level = rep.customData.level;
                    if (!(rep_map.get(level) instanceof Array))
                        rep_map.set(level, []);
                    (rep_map.get(level)).push(rep);
                });
                var levelKeys = __spread(rep_map.keys());
                var sortedLevels_1 = levelKeys.sort(function (a, b) { return (a - b); });
                var promises_1 = [];
                Logger.setStatusBar("Downloading data...");
                sortedLevels_1.forEach(function (level) {
                    promises_1.push(_this.loadLevelNodes(downloadId, rep_map.get(level), level, sortedLevels_1));
                });
                Promise.all(promises_1).finally(function () {
                    Logger.setStatusBar("Data downloaded.");
                    resolve(true);
                });
            }
            else {
                //console.log("Invalid representations");
                reject("Invalid representations");
            }
        });
    };
    ProgressiveLoader.prototype.getRepresentationsByLevel = function (representationList, level) {
        var scope = this;
        var representations = [];
        representationList.forEach(function (element) {
            var geometry = scope.mcax.geometries[element.geometryIndex];
            geometry.representations.forEach(function (repIndex) {
                if (scope.mcax.representations[repIndex].level == level) {
                    var repObj = {
                        customData: scope.mcax.representations[repIndex],
                        geometryIndex: element.geometryIndex,
                        id: "representation_" + repIndex,
                        name: scope.mcax.representations[repIndex].name
                    };
                    representations.push(repObj);
                }
            });
        });
        return representations;
    };
    ProgressiveLoader.prototype.loadLevelNodes = function (downloadId, representationList, currentLevel, allselectedLevels) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var downloadRepreList_1, lod, nodeList, progression, i, level, representations, nodeList, representations_2, nodeList;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(representationList instanceof Array)) return [3 /*break*/, 12];
                                    downloadRepreList_1 = [];
                                    representationList.forEach(function (element) {
                                        //let gltfNodeIndex =  element.node;
                                        //if(element.customData)
                                        var gltfNodeIndex = element.customData.node;
                                        if (_this.renderApp.getIsRenderDataAvailable([gltfNodeIndex]))
                                            _this.renderApp.setNodeVisibility([gltfNodeIndex], true);
                                        else
                                            downloadRepreList_1.push(element);
                                    });
                                    if (!(downloadRepreList_1.length > 0)) return [3 /*break*/, 11];
                                    lod = this.mcax.lods.filter(function (item) { return (item.level === currentLevel); });
                                    if (!(lod.length === 0)) return [3 /*break*/, 2];
                                    nodeList = downloadRepreList_1.map(function (item) { return item.customData.node; });
                                    this.renderApp.setNodeVisibility(nodeList, true);
                                    return [4 /*yield*/, this.loadRespresentationNodes(downloadId, downloadRepreList_1)];
                                case 1:
                                    _a.sent();
                                    //this.renderApp.fitView();                    
                                    resolve(true);
                                    return [3 /*break*/, 10];
                                case 2:
                                    progression = lod[0].progression;
                                    i = 0;
                                    _a.label = 3;
                                case 3:
                                    if (!(i < progression.length)) return [3 /*break*/, 9];
                                    level = progression[i];
                                    representations = this.getRepresentationsByLevel(downloadRepreList_1, level);
                                    if (!(level !== currentLevel)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.loadLevelNodes(downloadId, representations, level, allselectedLevels)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5:
                                    nodeList = representations.map(function (item) { return item.customData.node; });
                                    this.renderApp.setNodeVisibility(nodeList, true);
                                    return [4 /*yield*/, this.loadRespresentationNodes(downloadId, representations)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    if (i !== 0) {
                                        if (!(allselectedLevels.includes(progression[i - 1]))) {
                                            representations_2 = this.getRepresentationsByLevel(representationList, progression[i - 1]);
                                            nodeList = representations_2.map(function (item) { return item.customData.node; });
                                            this.renderApp.setNodeVisibility(nodeList, false);
                                        }
                                    }
                                    _a.label = 8;
                                case 8:
                                    i++;
                                    return [3 /*break*/, 3];
                                case 9:
                                    resolve(true);
                                    _a.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    //this.renderApp.fitView();     
                                    resolve(true);
                                    _a.label = 12;
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProgressiveLoader.prototype.loadRespresentationNodes = function (downloadId, representationList) {
        return __awaiter(this, void 0, void 0, function () {
            var urlObjArray, clubbedURLObjList, maxLength, urlCount, counter;
            var _this = this;
            return __generator(this, function (_a) {
                urlObjArray = [];
                representationList.forEach(function (element) {
                    //let gltfNodeIndex =  element.node;
                    //if(element.customData)
                    var gltfNodeIndex = element.customData.node;
                    var urlOjb = _this.gltfurlExtractor.getNodeURLs(gltfNodeIndex);
                    urlObjArray.push(urlOjb);
                });
                clubbedURLObjList = ManagedURLDownloader.processURLObject(downloadId, urlObjArray);
                if (clubbedURLObjList.length === 0)
                    return [2 /*return*/, Promise.resolve()];
                maxLength = 0;
                urlCount = 0;
                clubbedURLObjList.forEach(function (item) {
                    maxLength = (item.length > maxLength) ? item.length : maxLength;
                    urlCount += item.length;
                });
                counter = 0;
                return [2 /*return*/, new Promise(function (resolve) {
                        for (var i = 0; i < maxLength; i++) {
                            var _loop_1 = function (j) {
                                if (i < clubbedURLObjList[j].length) {
                                    var URLobj_1 = clubbedURLObjList[j][i];
                                    //console.log(URLobj);                    
                                    _this.connector.getArrayBuffer(downloadId, URLobj_1.url)
                                        .then(function (arrayBuffer) {
                                        _this.splitandUpdateBuffer(URLobj_1, arrayBuffer);
                                        counter += 1;
                                        if (counter === urlCount) {
                                            resolve(true);
                                        }
                                    });
                                }
                            };
                            for (var j = 0; j < clubbedURLObjList.length; j++) {
                                _loop_1(j);
                            }
                        }
                    })];
            });
        });
    };
    ProgressiveLoader.prototype.splitandUpdateBuffer = function (URLobj, arrayBuffer) {
        var _this = this;
        var chunkstring = Utility.getURLParameterByName(URLobj.url, "chunks");
        var chunks = chunkstring.split(",");
        var offset = 0;
        chunks.forEach(function (chunk, index) {
            var length = parseInt(chunk.split('+')[1]);
            _this.renderApp.replaceWEBGLBuffer(URLobj.nodes[index], arrayBuffer.slice(offset, offset + length));
            offset = offset + length;
        });
    };
    ProgressiveLoader.prototype.loadLevelNodes_working = function (downloadId, representationList) {
        var _this = this;
        if (representationList instanceof Array) {
            var urlObjArray_1 = [];
            representationList.forEach(function (element) {
                var gltfNodeIndex = element.customData.node;
                if (_this.renderApp.getIsRenderDataAvailable([gltfNodeIndex]))
                    _this.renderApp.setNodeVisibility([gltfNodeIndex], true);
                else {
                    var urlOjb = _this.gltfurlExtractor.getNodeURLs(gltfNodeIndex);
                    urlObjArray_1.push(urlOjb);
                }
            });
            var clubbedURLObjList = ManagedURLDownloader.processURLObject(downloadId, urlObjArray_1);
            var maxLength_1 = 0;
            clubbedURLObjList.forEach(function (item) {
                maxLength_1 = (item.length > maxLength_1) ? item.length : maxLength_1;
            });
            for (var i = 0; i < maxLength_1; i++) {
                var _loop_2 = function (j) {
                    if (i < clubbedURLObjList[j].length) {
                        var URLobj_2 = clubbedURLObjList[j][i];
                        //console.log(URLobj);                    
                        this_1.connector.getArrayBuffer(null, URLobj_2.url)
                            .then(function (arrayBuffer) {
                            _this.splitandUpdateBuffer(URLobj_2, arrayBuffer);
                        });
                    }
                };
                var this_1 = this;
                for (var j = 0; j < clubbedURLObjList.length; j++) {
                    _loop_2(j);
                }
            }
            /*
            for (let i=0;i < clubbedURLObjList.length; i++)
            {
                for(let j=0;j < clubbedURLObjList[i].length; j++)
                {
                    let URLobj = clubbedURLObjList[i][j];
                    //console.log(URLobj);
                    this.connector.getArrayBuffer(URLobj.url)
                    .then((arrayBuffer) => {
                        this.splitandUpdateBuffer(URLobj,arrayBuffer)
                    });
                }
            }
            */
        }
    };
    return ProgressiveLoader;
}());
var ManagedURLDownloader = /** @class */ (function () {
    function ManagedURLDownloader() {
    }
    ManagedURLDownloader.createURLGroup = function (groupId) {
        this.cache.set(groupId, new Map());
    };
    ManagedURLDownloader.isChunkCached = function (cachedUrlObj, urlObj) {
        var found = cachedUrlObj.find(function (e) { return e.offset === urlObj.bufferViewOffset && e.len === urlObj.bufferViewLength; });
        return found ? true : false;
    };
    ManagedURLDownloader.processURLObject = function (groupId, urlObjArray) {
        var _this = this;
        var urlCache = this.cache.get(groupId);
        var urlMap = new Map();
        urlObjArray.forEach(function (item) {
            item.forEach(function (urlObj) {
                if (!(urlCache.has(urlObj.url))) {
                    urlCache.set(urlObj.url, [{ offset: urlObj.bufferViewOffset, len: urlObj.bufferViewLength }]);
                    urlMap.set(urlObj.url, [urlObj]);
                }
                else {
                    var cachedUrlObj = urlCache.get(urlObj.url);
                    if (_this.isChunkCached(cachedUrlObj, urlObj) === false) {
                        cachedUrlObj.push({ offset: urlObj.bufferViewOffset, len: urlObj.bufferViewLength });
                        if (urlMap.has(urlObj.url))
                            (urlMap.get(urlObj.url)).push(urlObj);
                        else
                            urlMap.set(urlObj.url, [urlObj]);
                    }
                }
            });
        });
        var uniqueURLs = __spread(urlMap.keys());
        var clubbedURLObjList = [];
        uniqueURLs.forEach(function (url) {
            var clubbedUrlObj = _this.URLMerger(url, urlMap.get(url));
            clubbedURLObjList.push(clubbedUrlObj);
        });
        return clubbedURLObjList;
    };
    ManagedURLDownloader.deleteURLGroup = function (groupId) {
        this.cache.delete(groupId);
    };
    ManagedURLDownloader.URLMerger = function (_url, specificUrlObjArray) {
        var groupedIndex = [];
        var clubbedSize = 0;
        var tempIndex = [];
        for (var i = 0; i < specificUrlObjArray.length; i++) {
            var size = specificUrlObjArray[i].bufferViewLength;
            if (size >= ManagedURLDownloader.downloadSizeLimit) {
                groupedIndex.push(i);
            }
            else {
                if ((clubbedSize + size) >= ManagedURLDownloader.downloadSizeLimit) {
                    tempIndex = [i];
                    clubbedSize = size;
                    groupedIndex.push(tempIndex);
                }
                else {
                    if (tempIndex.length === 0)
                        groupedIndex.push(tempIndex);
                    tempIndex.push(i);
                    clubbedSize += size;
                }
            }
        }
        //console.log(groupedIndex);
        var clubbedURLObjects = [];
        groupedIndex.forEach(function (item) {
            var queryString = "";
            var nodes = [];
            if (item instanceof Array) {
                var indexedItems = item.map(function (value, index) { return { index: index, value: value }; });
                var sortedItems = indexedItems.sort(function (x, y) { return ((specificUrlObjArray[x.value].bufferViewOffset > specificUrlObjArray[y.value].bufferViewOffset) ? 1 : ((specificUrlObjArray[x.value].bufferViewOffset === specificUrlObjArray[y.value].bufferViewOffset) ? 0 : -1)); });
                var sortedIndex = sortedItems.map(function (e) { return e.value; });
                sortedIndex.forEach(function (i) {
                    var offset = specificUrlObjArray[i].bufferViewOffset || 0;
                    var length = specificUrlObjArray[i].bufferViewLength || 0;
                    if (queryString === "")
                        queryString = "chunks=" + offset + "%2B" + length; //%2B = +                 
                    else
                        queryString += "," + offset + "%2B" + length; //%2B = + 
                    nodes.push(specificUrlObjArray[i]);
                });
            }
            else {
                var offset = specificUrlObjArray[item].bufferViewOffset || 0;
                var length_1 = specificUrlObjArray[item].bufferViewLength || 0;
                queryString = "chunks=" + offset + "%2B" + length_1; //%2B = +        
                nodes.push(specificUrlObjArray[item]);
            }
            var bufferURI = _url;
            var url = (bufferURI.includes('?') ?
                bufferURI + "&" + queryString :
                bufferURI + "?" + queryString);
            var objects = {
                url: url,
                nodes: nodes
            };
            clubbedURLObjects.push(objects);
        });
        return clubbedURLObjects;
    };
    ManagedURLDownloader.downloadSizeLimit = 4 * 1024 * 1024; // 4 MB
    ManagedURLDownloader.cache = new Map();
    return ManagedURLDownloader;
}());var basicType = Object.freeze({
    ANALYTICAL: 1,
    PRIMITIVES: 2,
    CONNECTIONS: 3,
    BOUNDING_BOX: 4,
    FEATURE_EDGES: 5,
    SIMPLIFIED: 6,
    FULL_MESH: 7,
    MESH_POINTS: 8
});
var powof2 = function (value) { return Math.pow(2, value); };
var abstractType = Object.freeze({
    BBOX: powof2(basicType.CONNECTIONS) + powof2(basicType.BOUNDING_BOX),
    MESH: powof2(basicType.FULL_MESH) + powof2(basicType.PRIMITIVES),
    WIREFRAME: powof2(basicType.FULL_MESH) + powof2(basicType.CONNECTIONS),
    POINT: powof2(basicType.MESH_POINTS) + powof2(basicType.FULL_MESH)
});var Default = {
    LEGEND_ORIENTATION: orientation.VERTICAL,
    LEGEND_PALETTE_TYPE: paletteType.CONTINUOUS,
    LEGEND_VALUE_TYPE: valueType.CONTINUOUS,
    LEGEND_VALUE_PLACEMENT: valuePlacement.EDGE,
    LEGEND_TICS_POSITION: ticsPosition.ACROSS,
    LEGEND_COLOR_VALUE_MODE: colorValueMode.BOUNDED,
    LEGEND_COLOR_MAP: colorMap.PRESET1
};/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$1() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone$1(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$1();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}());function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}var constant = x => () => x;function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}var rgb$1 = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}function number(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}function value(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb$1) : string)
      : b instanceof color ? rgb$1
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
}function piecewise(interpolate, values) {
  if (values === undefined) values = interpolate, interpolate = value;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}var Legend = /** @class */ (function () {
    function Legend(id) {
        this.id = id;
        this.orientation = Default.LEGEND_ORIENTATION;
        this.paletteType = Default.LEGEND_PALETTE_TYPE;
        this.valueType = Default.LEGEND_VALUE_TYPE;
        this.valuePlacement = Default.LEGEND_VALUE_PLACEMENT;
        this.ticsPosition = Default.LEGEND_TICS_POSITION;
        this.colorValueMode = Default.LEGEND_COLOR_VALUE_MODE;
        this.colorMap = Default.LEGEND_COLOR_MAP;
        this.noResultColor = [211, 211, 211, 255];
        this.aboveMaxColor = [255, 255, 0, 255];
        this.belowMinColor = [0, 255, 255, 255];
        this.isUserCustomDefinedValue = false;
        this.userDefinedValues = [];
        this.min = null;
        this.max = null;
        this.userMin = 0;
        this.userMax = 0;
    }
    Legend.prototype.setPaletteType = function (value) {
        this.paletteType = value;
    };
    Legend.prototype.setColorMap = function (colors) {
        this.colorMap = colors;
    };
    Legend.prototype.setUserMinMAX = function (min, max) {
        this.userMin = min;
        this.userMax = max;
    };
    Legend.prototype.setMinMAX = function (min, max) {
        this.min = min;
        this.max = max;
    };
    Legend.prototype.getMinMAX = function () {
        return {
            min: this.min,
            max: this.max
        };
    };
    Legend.prototype.getDisplayData = function () {
        var range = this.getRange();
        var data = {
            colors: this.colorMap,
            paletteType: this.paletteType,
            range: range,
        };
        return data;
    };
    Legend.prototype.getNewColorSet = function (newSize, inColorArray) {
        var outColorArray = [];
        if (inColorArray.length < 2)
            return outColorArray;
        if (newSize <= 0)
            return outColorArray;
        var iOldColorSize = inColorArray.length; //size of input
        if (newSize == iOldColorSize) {
            outColorArray = __spread(inColorArray);
            return outColorArray;
        }
        if (newSize == 1) {
            if (inColorArray.length % 2 == 0) {
                var idxStart = inColorArray.length / 2 - 1;
                var color = create$1();
                color[0] = (inColorArray[idxStart][0] + inColorArray[idxStart + 1][0]) * 0.5;
                color[1] = (inColorArray[idxStart][1] + inColorArray[idxStart + 1][1]) * 0.5;
                color[2] = (inColorArray[idxStart][2] + inColorArray[idxStart + 1][2]) * 0.5;
                outColorArray.push(color);
            }
            else {
                var idx = inColorArray.length * 0.5;
                outColorArray.push(inColorArray[idx]);
            }
            return outColorArray;
        }
        var GapRatio = (iOldColorSize - 1) / (newSize - 1); //count for each size of input
        //set first color as it is
        outColorArray.push(inColorArray[0]);
        var position = 0.0;
        for (var i = 1; i < newSize; i++) {
            position += GapRatio;
            var intPart = parseInt(position.toString());
            var fracPart = position - intPart;
            var color1 = inColorArray[intPart];
            var color2 = create$1();
            if (intPart < iOldColorSize - 1)
                color2 = inColorArray[intPart + 1];
            else
                color2 = fromValues(0, 0, 0);
            var rIncr = (color2[0] - color1[0]) * fracPart;
            var gIncr = (color2[1] - color1[1]) * fracPart;
            var bIncr = (color2[2] - color1[2]) * fracPart;
            var color = create$1();
            color[0] = color1[0] + rIncr;
            color[1] = color1[1] + gIncr;
            color[2] = color1[2] + bIncr;
            outColorArray.push(color);
        }
        return outColorArray;
    };
    Legend.prototype.createTexture = function (colorArray, textureSize, isDiscrete) {
        var out = [];
        //out.push(this.belowMinColor.slice(0, 3)); //rgb
        if (isDiscrete) {
            for (var x = 0; x < textureSize; x++) {
                var fract = (x * colorArray.length) / textureSize;
                var i = Math.floor(fract);
                out.push(colorArray[i]);
            }
        }
        else {
            //out = this.getNewColorSet(textureSize,colorArray); 
            var newColors = colorArray.map(this.rgbToHex);
            var piecewiseColor = piecewise(rgb$1, newColors);
            for (var i = 0; i < textureSize; i++) {
                var s = piecewiseColor(i / (textureSize - 1));
                out.push(this.rgbToArray(s));
            }
        }
        //out.push(this.aboveMaxColor.slice(0, 3));  //rgb
        return out;
    };
    Legend.prototype.rgbToHex = function (rgb) {
        return "#" + (1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1);
    };
    Legend.prototype.rgbToArray = function (rgb) {
        var stringArray = rgb.replace("rgb(", "").replace(")", "").split(',');
        return [parseInt(stringArray[0]), parseInt(stringArray[1]), parseInt(stringArray[2])];
    };
    Legend.prototype.getTextureData = function () {
        //const texture_div = 2 ** textureBits;
        var texture_div = 4096;
        var input = __spread(this.colorMap);
        var isDiscrete = this.paletteType === paletteType.DISCRETE;
        var textureArray = this.createTexture(input.reverse(), texture_div, isDiscrete);
        var textureData = [];
        textureArray.forEach(function (color) {
            textureData.push.apply(textureData, __spread(color));
            //textureData.push(255);
        });
        return textureData;
    };
    Legend.prototype.getRange = function () {
        var range = [];
        var colorCount = this.colorMap.length;
        var step = (this.max - this.min) / colorCount;
        if (this.paletteType === paletteType.CONTINUOUS) {
            step = (this.max - this.min) / (colorCount - 1);
            colorCount = colorCount - 1;
        }
        for (var i = 0; i < colorCount + 1; i++) {
            var val = this.min + (step * i);
            range.push(val);
        }
        return range.reverse();
    };
    Legend.prototype.setNoResultColor = function (noResultColor) {
        this.noResultColor = noResultColor;
    };
    Legend.prototype.setAboveMaxColor = function (aboveMaxColor) {
        this.aboveMaxColor = aboveMaxColor;
    };
    Legend.prototype.setBelowMinColor = function (belowMinColor) {
        this.belowMinColor = belowMinColor;
    };
    return Legend;
}());var LegendManager = /** @class */ (function () {
    function LegendManager() {
        this.Legends = new Map();
        this.defaultLegendsID = null;
    }
    LegendManager.prototype.createLegend = function () {
        var id = Utility.create_UUID();
        var legend = new Legend(id);
        this.Legends.set(id, legend);
        if (this.defaultLegendsID === null)
            this.defaultLegendsID = id;
        return id;
    };
    LegendManager.prototype.getLegend = function (id) {
        if (id)
            return this.Legends.get(id);
        return this.Legends.get(this.defaultLegendsID);
    };
    return LegendManager;
}());var CAEResult = /** @class */ (function () {
    function CAEResult(_mcax, _renderApp, _connector, _legendManager, _networkManager) {
        this.mcax = _mcax;
        this.renderApp = _renderApp;
        this.connector = _connector;
        this.legendManager = _legendManager;
        this.networkManager = _networkManager;
        this.legendID = null;
        this.result = null;
        if (this.getIsCAEResultAvailable())
            this.createResult();
        this.appliedResultId = null;
        this.appliedStepId = null;
        this.appliedDerivedTypeId = null;
        this.resultNodeIds = null;
        if (this.mcax.selection) {
            if (this.mcax.selection.variableIndex != undefined && this.mcax.selection.variableIndex != null)
                this.appliedResultId = this.mcax.selection.variableIndex;
            if (this.mcax.selection.stepIndex != undefined && this.mcax.selection.stepIndex != null)
                this.appliedStepId = this.mcax.selection.stepIndex;
            if (this.mcax.selection.derivedTypeIndex != undefined && this.mcax.selection.derivedTypeIndex != null)
                this.appliedDerivedTypeId = this.mcax.selection.derivedTypeIndex;
            if (this.legendManager)
                this.legendID = this.legendManager.createLegend();
        }
    }
    CAEResult.prototype.getIsCAEResultAvailable = function () {
        var variables = this.mcax.variables;
        if (variables) {
            var activeVariables = variables.filter(function (item) { return item.active; });
            if (activeVariables.length > 0)
                return true;
        }
        return false;
    };
    CAEResult.prototype.setDefaultDerived = function (variableTypeId, defaultValue) {
        this.result.variableTypes[variableTypeId].defaultDerived = this.mcax.derivedTypes[defaultValue].generator;
    };
    CAEResult.prototype.createResult = function () {
        var _this = this;
        this.result = {
            variables: {},
            derivedTypes: {},
            missingVariableSteps: {},
            variableTypes: {},
            stepVariables: {},
            selection: {}
        };
        try {
            if (this.mcax.selection && this.mcax.selection.variableIndex !== null && this.mcax.selection.variableIndex !== undefined) {
                this.result.selection = {
                    variableId: this.mcax.variables[this.mcax.selection.variableIndex].id,
                    stepId: this.mcax.steps[this.mcax.selection.stepIndex].id,
                    derivedTypeId: this.mcax.derivedTypes[this.mcax.selection.derivedTypeIndex].generator
                };
            }
            else {
                this.result.selection = {
                    variableId: this.mcax.variables[0].id,
                    stepId: this.mcax.steps[this.mcax.variables[0].stepsAvailable[0]].id,
                    derivedTypeId: this.mcax.derivedTypes[this.mcax.variables[0].defaultDerived.colorplot].generator
                };
            }
            this.mcax.variableTypes.forEach(function (variableType) {
                if (variableType.active == true) {
                    _this.result.variableTypes[variableType.id] = {
                        id: variableType.id,
                        name: variableType.name,
                        defaultDerived: "",
                        derivedTypeIds: variableType.derivedTypes.map(function (e) { return _this.mcax.derivedTypes[e].generator; }),
                        dimension: variableType.dimension
                    };
                }
            });
            this.mcax.variables.forEach(function (variable) {
                if (variable.active == true) {
                    _this.result.variables[variable.id] = {
                        id: variable.id,
                        name: variable.name,
                        type: _this.mcax.variableTypes[variable.type].id,
                        attributes: {}
                    };
                    _this.setDefaultDerived(_this.mcax.variableTypes[variable.type].id, variable.defaultDerived['colorplot']);
                }
            });
            this.mcax.derivedTypes.forEach(function (derivedType) {
                _this.result.derivedTypes[derivedType.generator] = {
                    id: derivedType.generator,
                    name: derivedType.name,
                    generator: derivedType.generator,
                    resultType: derivedType.resultType
                };
            });
            this.mcax.steps.forEach(function (step) {
                if (step.active == true) {
                    _this.result.stepVariables[step.id] = {
                        id: step.id,
                        name: step.name
                    };
                }
            });
            //missing steps
            this.mcax.variables.forEach(function (variable) {
                if (_this.mcax.steps.length !== variable.stepsAvailable.length) {
                    var missingStepIds_1 = [];
                    _this.mcax.steps.forEach(function (step, index) {
                        if (!variable.stepsAvailable.find(function (sIndex) { return index == sIndex; })) {
                            missingStepIds_1.push(step.id);
                        }
                    });
                    _this.result.missingVariableSteps[variable.id] = missingStepIds_1;
                }
                else {
                    _this.result.missingVariableSteps[variable.id] = [];
                }
            });
            //console.log(this.result);
        }
        catch (error) {
            throw new Error(error);
        }
    };
    CAEResult.prototype.getCAEResult = function () {
        return this.result ? Object.freeze(this.result) : null;
    };
    CAEResult.prototype.getDisplayResult = function () {
        return this.getCAEResult();
        // let resultSet:any = {
        //     resultsNameList : [],
        //     stepsNameList : [],
        //     derivedTypesNameList : [],
        //     result : null,
        //     step : null,
        //     derivedType : null,
        // };
        // try{
        //     let variables =  this.mcax.variables;
        //     if(variables){                  
        //         let resultObj = this.getResults();
        //         let stepObj = this.getSteps(this.appliedResultIndex);
        //         let derivedTypeObj = this.getDerivedTypes(this.appliedResultIndex);
        //         resultSet.resultsNameList =resultObj.results;
        //         resultSet.stepsNameList = stepObj.steps;
        //         resultSet.derivedTypesNameList = derivedTypeObj.derivedTypes;
        //         resultSet.result = resultObj.defaultValue;
        //         resultSet.step = stepObj.defaultValue;
        //         resultSet.derivedType = derivedTypeObj.defaultValue;           
        //     }  
        // } 
        // catch(error){
        //     throw new Error(error);
        // }  
        // return resultSet;        
    };
    CAEResult.prototype.getResults = function () {
        // let variables = this.mcax.variables;
        // if(variables){  
        //     try{   
        //         let CAEResults: any = {
        //             results : [],
        //             defaultValue : null
        //         };
        //         variables.forEach((element:any, index:number) => {
        //             if(element.active === true){
        //                 CAEResults.results.push({
        //                     name : element.name,
        //                     id : element.id,
        //                     value : index
        //                 });
        //             }
        //         });
        //         CAEResults.defaultValue = (this.appliedResultIndex !== null ? this.appliedResultIndex : 0); 
        //         return CAEResults;
        //     }
        //     catch(error){
        //         throw new Error(error);
        //     }            
        // } 
        // else
        //     throw new Error("Invalid data")
    };
    CAEResult.prototype.getSteps = function (selectedResultIndex) {
        // selectedResultIndex = selectedResultIndex || 0;  
        // try{       
        //     let oldStepIndex =this.appliedStepIndex;
        //     let CAESteps:any = {
        //         steps : [],
        //         defaultValue : null
        //     };
        //     let steps = this.mcax.variables[ selectedResultIndex ].stepsAvailable;
        //     if(steps && steps instanceof Array &&  this.mcax.steps instanceof Array)
        //     {
        //         steps.forEach(stepIndex => {
        //             if (this.mcax.steps.length > stepIndex){
        //                 CAESteps.steps.push({
        //                     name :  this.mcax.steps[stepIndex].name,
        //                     id :  this.mcax.steps[stepIndex].id,
        //                     value : stepIndex
        //                 });  
        //             }
        //         });
        //     }
        //     if(steps.includes(oldStepIndex))
        //         CAESteps.defaultValue = oldStepIndex;
        //     else if(CAESteps.steps.length > 0)
        //         CAESteps.defaultValue =  CAESteps.steps[0].value;               
        //         return CAESteps; 
        // }
        // catch(error){
        //     throw new Error(error);
        // }           
    };
    CAEResult.prototype.getDerivedTypes = function (selectedResultIndex) {
        var _this = this;
        selectedResultIndex = selectedResultIndex || 0;
        try {
            var CAEDerivedTypes_1 = {
                derivedTypes: [],
                defaultValue: null
            };
            var type = this.mcax.variables[selectedResultIndex].type;
            var defaultDerivedIndex_1 = this.mcax.variables[selectedResultIndex].defaultDerived.colorplot;
            var variableTypes = this.mcax.variableTypes[type];
            var derivedTypes = variableTypes.derivedTypes;
            var defaultValue_1 = null;
            var oldDerivedIndex = this.mcax.appliedDerivedTypeIndex;
            derivedTypes.forEach(function (derivedTypesIndex) {
                if (_this.mcax.derivedTypes.length > derivedTypesIndex) {
                    CAEDerivedTypes_1.derivedTypes.push({
                        name: _this.mcax.derivedTypes[derivedTypesIndex].name,
                        generator: _this.mcax.derivedTypes[derivedTypesIndex].generator,
                        value: derivedTypesIndex
                    });
                    if (derivedTypesIndex === defaultDerivedIndex_1)
                        defaultValue_1 = derivedTypesIndex;
                }
            });
            if (derivedTypes.includes(oldDerivedIndex))
                CAEDerivedTypes_1.defaultValue = oldDerivedIndex;
            else if (defaultValue_1 !== null)
                CAEDerivedTypes_1.defaultValue = defaultValue_1;
            else if (CAEDerivedTypes_1.derivedTypes.length > 0)
                CAEDerivedTypes_1.defaultValue = CAEDerivedTypes_1.derivedTypes[0].value;
            return CAEDerivedTypes_1;
        }
        catch (error) {
            throw new Error(error);
        }
    };
    CAEResult.prototype.setLegendData = function (paletteType$1, colors, noResultColor) {
        var legend = this.legendManager.getLegend(this.legendID);
        if (legend) {
            if (colors.length <= 0)
                return false;
            else if (colors.length === 1)
                paletteType$1 = paletteType.DISCRETE;
            legend.setPaletteType(paletteType$1);
            legend.setColorMap(colors);
            if (noResultColor) {
                legend.setNoResultColor(noResultColor);
                this.renderApp.setNoResultColor(noResultColor);
            }
            this.renderApp.setTextureData(legend.getTextureData());
            return true;
        }
        return false;
    };
    CAEResult.prototype.setNoResultColor = function (noResultColor) {
        var legend = this.legendManager.getLegend(this.legendID);
        if (legend) {
            legend.setNoResultColor(noResultColor);
            this.renderApp.setNoResultColor(noResultColor);
            this.renderApp.setTextureData(legend.getTextureData());
            return true;
        }
        return false;
    };
    CAEResult.prototype.setAboveMaxColor = function (aboveMaxColor) {
        var legend = this.legendManager.getLegend(this.legendID);
        if (legend) {
            legend.setAboveMaxColor(aboveMaxColor);
            this.renderApp.setAboveMaxColor(aboveMaxColor);
            this.renderApp.setTextureData(legend.getTextureData());
            return true;
        }
        return false;
    };
    CAEResult.prototype.setBelowMinColor = function (belowMinColor) {
        var legend = this.legendManager.getLegend(this.legendID);
        if (legend) {
            legend.setBelowMinColor(belowMinColor);
            this.renderApp.setBelowMinColor(belowMinColor);
            this.renderApp.setTextureData(legend.getTextureData());
            return true;
        }
        return false;
    };
    CAEResult.prototype.applyResult = function (variableId, stepId, derivedTypeId, productTree) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var parts, resultName, stepName, derivedGenerator, textureCoordsURL, resultValuesURL, downloadSize, uri, uri_meta_info, uri_result_values, groupId, uri_result_NodeId, arraybuffer, textureArrayBuffer, textureMetaData, resultValuesArrayBuffer, legend, min, max, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getIsCAEResultAvailable())
                            reject("No CAE Result available");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        parts = productTree.getAllPartNodes();
                        parts.map(function (part) {
                            part.customData.displayProps.useTexture = true;
                        });
                        resultName = (this.result.variables[variableId].name);
                        stepName = (this.result.stepVariables[stepId].name);
                        derivedGenerator = (this.result.derivedTypes[derivedTypeId].generator);
                        textureCoordsURL = this.mcax.gltf.buffers.filter(function (buffer) { return buffer.uri.includes('type=texcoords'); });
                        resultValuesURL = this.mcax.gltf.buffers.filter(function (buffer) { return buffer.uri.includes('type=values'); });
                        this.appliedResultId = variableId;
                        this.appliedStepId = stepId;
                        this.appliedDerivedTypeId = derivedTypeId;
                        downloadSize = 0;
                        if (!(textureCoordsURL && textureCoordsURL.length > 0
                            && resultValuesURL && resultValuesURL.length > 0)) return [3 /*break*/, 9];
                        uri = textureCoordsURL[0].uri.replace("${variableIndex}", resultName);
                        uri = uri.replace("${stepIndex}", stepName);
                        uri = uri.replace("${derivedTypeIndex}", derivedGenerator);
                        uri_meta_info = uri.replace("/extract/buffer", "/extract/buffermeta");
                        downloadSize += textureCoordsURL[0].byteLength;
                        uri_result_values = resultValuesURL[0].uri.replace("${variableIndex}", resultName);
                        uri_result_values = uri_result_values.replace("${stepIndex}", stepName);
                        uri_result_values = uri_result_values.replace("${derivedTypeIndex}", derivedGenerator);
                        downloadSize += resultValuesURL[0].byteLength;
                        if (!this.resultNodeIds) {
                            downloadSize += resultValuesURL[0].byteLength;
                        }
                        groupId = this.networkManager.createGroup({
                            title: "Result - " + resultName + " - " + stepName + " - " + derivedGenerator,
                            notify: true,
                            totalSize: downloadSize,
                            msg: "Downloading result - " + resultName + " - " + stepName + " - " + derivedGenerator,
                            tag: "RESULT"
                        });
                        Logger.setStatusBar("Downloading result buffers.");
                        if (!!this.resultNodeIds) return [3 /*break*/, 3];
                        uri_result_NodeId = resultValuesURL[0].uri.replace("${variableIndex}", "Node Ids");
                        uri_result_NodeId = uri_result_NodeId.replace("${stepIndex}", "");
                        uri_result_NodeId = uri_result_NodeId.replace("${derivedTypeIndex}", "scalar");
                        return [4 /*yield*/, this.connector.getArrayBuffer(groupId, uri_result_NodeId)];
                    case 2:
                        arraybuffer = _a.sent();
                        if (arraybuffer)
                            this.resultNodeIds = new Uint32Array(arraybuffer);
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.connector.getArrayBuffer(groupId, uri)];
                    case 4:
                        textureArrayBuffer = _a.sent();
                        return [4 /*yield*/, this.connector.getJsonData(uri_meta_info)];
                    case 5:
                        textureMetaData = _a.sent();
                        return [4 /*yield*/, this.connector.getArrayBuffer(groupId, uri_result_values)];
                    case 6:
                        resultValuesArrayBuffer = _a.sent();
                        Logger.setStatusBar("Result buffers downloaded.");
                        this.networkManager.deleteGroup(groupId);
                        //console.log("textureArrayBuffer", new Float32Array(textureArrayBuffer));
                        //console.log("resultValuesArrayBuffer", new Float32Array(resultValuesArrayBuffer));
                        return [4 /*yield*/, this.renderApp.updateTextureCoordsArrayBuffer(textureCoordsURL[0].uri, textureArrayBuffer)];
                    case 7:
                        //console.log("textureArrayBuffer", new Float32Array(textureArrayBuffer));
                        //console.log("resultValuesArrayBuffer", new Float32Array(resultValuesArrayBuffer));
                        _a.sent();
                        return [4 /*yield*/, this.renderApp.updateValuesArrayBuffer(resultValuesURL[0].uri, resultValuesArrayBuffer)];
                    case 8:
                        _a.sent();
                        legend = this.legendManager.getLegend(this.legendID);
                        if (textureMetaData) {
                            min = textureMetaData.range[0];
                            max = textureMetaData.range[1];
                            legend.setMinMAX(min, max);
                        }
                        this.renderApp.setTextureData(legend.getTextureData());
                        resolve(true);
                        return [3 /*break*/, 10];
                    case 9: throw new Error("Invalid texture Coords URL");
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); });
    };
    CAEResult.prototype.setValueMinMax = function (minMax) {
        var legend = this.legendManager.getLegend(this.legendID);
        legend.setUserMinMAX(minMax[0], minMax[1]);
        this.renderApp.setValueMinMax(minMax);
    };
    CAEResult.prototype.getDeformationValues = function (variableId, stepId, derivedTypeId, selectedPartNodes) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var resultName, stepName, derivedGenerator, resultValuesURL, uri_result_values, arraybuffer, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getIsCAEResultAvailable())
                            reject("No CAE Result available");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        resultName = this.result.variables[variableId].name;
                        stepName = this.result.stepVariables[stepId].name;
                        derivedGenerator = derivedTypeId;
                        if (this.result.derivedTypes[derivedTypeId])
                            derivedGenerator = this.result.derivedTypes[derivedTypeId].generator;
                        resultValuesURL = this.mcax.gltf.buffers.filter(function (buffer) { return buffer.uri.includes('type=values'); });
                        if (!(resultValuesURL && resultValuesURL.length > 0)) return [3 /*break*/, 3];
                        uri_result_values = resultValuesURL[0].uri.replace("${variableIndex}", resultName);
                        uri_result_values = uri_result_values.replace("${stepIndex}", stepName);
                        uri_result_values = uri_result_values.replace("${derivedTypeIndex}", derivedGenerator);
                        Logger.setStatusBar("Downloading result buffers.");
                        return [4 /*yield*/, this.connector.getArrayBuffer(null, uri_result_values)];
                    case 2:
                        arraybuffer = _a.sent();
                        Logger.setStatusBar("Result buffers downloaded.");
                        result = this.renderApp.updateDeformationValueBuffer(arraybuffer, selectedPartNodes);
                        resolve(result);
                        return [3 /*break*/, 4];
                    case 3:
                        reject("Invalid Deformation Result URL");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    CAEResult.prototype.getLegendData = function () {
        var legend = this.legendManager.getLegend(this.legendID);
        var data = legend.getDisplayData();
        return data;
    };
    CAEResult.prototype.getUVInterpolatedResultValue = function (data) {
        //console.log(data.msg);
        if (data.msg !== "NA") {
            var legend = this.legendManager.getLegend(this.legendID);
            var _a = legend.getMinMAX(), min = _a.min, max = _a.max;
            if (min !== null && max !== null) {
                var value = min + ((max - min) * parseFloat(data.msg));
                return value.toFixed(3);
            }
        }
        return data.msg;
    };
    CAEResult.prototype.getNodeId = function (nodeIndex) {
        if (nodeIndex !== undefined && nodeIndex > -1 && this.resultNodeIds) {
            if (nodeIndex < this.resultNodeIds.length)
                return this.resultNodeIds[nodeIndex];
        }
        return null;
    };
    CAEResult.prototype.getNodeIdIndex = function (nodeId, modelIndex) {
        if (this.resultNodeIds && this.resultNodeIds.constructor.name === 'Uint32Array')
            return this.resultNodeIds.indexOf(nodeId);
        return -1;
    };
    CAEResult.prototype.getMinMAX = function () {
        var legend = this.legendManager.getLegend(this.legendID);
        return legend.getMinMAX();
    };
    CAEResult.prototype.getHotSpot = function (hotspotParams, variableId, stepId, derivedTypeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var resultName, stepName, derivedGenerator, resultValuesURL, uri_result_hotspot, hotspotNodeIndexes, arraybuffer, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.getIsCAEResultAvailable())
                                        reject("No CAE Result available");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 6]);
                                    resultName = this.result.variables[variableId].name;
                                    stepName = this.result.stepVariables[stepId].name;
                                    derivedGenerator = this.result.derivedTypes[derivedTypeId].generator;
                                    resultValuesURL = this.mcax.gltf.buffers.filter(function (buffer) { return buffer.uri.includes('type=values'); });
                                    if (!(resultValuesURL && resultValuesURL.length > 0)) return [3 /*break*/, 3];
                                    uri_result_hotspot = resultValuesURL[0].uri.replace("${variableIndex}", resultName);
                                    uri_result_hotspot = uri_result_hotspot.replace("${stepIndex}", stepName);
                                    uri_result_hotspot = uri_result_hotspot.replace("${derivedTypeIndex}", derivedGenerator);
                                    uri_result_hotspot = uri_result_hotspot.replace("type=values", "type=hotspots");
                                    if (hotspotParams.bBottom === true)
                                        uri_result_hotspot = uri_result_hotspot + "&minHotspot";
                                    Logger.setStatusBar("Downloading hotspot data.");
                                    hotspotNodeIndexes = null;
                                    return [4 /*yield*/, this.connector.getArrayBuffer(null, uri_result_hotspot)];
                                case 2:
                                    arraybuffer = _a.sent();
                                    if (arraybuffer)
                                        hotspotNodeIndexes = new Uint32Array(arraybuffer);
                                    Logger.setStatusBar("Hotspot data downloaded.");
                                    resolve(hotspotNodeIndexes);
                                    return [3 /*break*/, 4];
                                case 3:
                                    reject("Invalid result URL");
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    error_3 = _a.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return CAEResult;
}());var viewerEvents;
(function (viewerEvents) {
    viewerEvents["VIEWER_CLICK"] = "VIEWER_CLICK";
    viewerEvents["VIEWER_DBL_CLICK"] = "VIEWER_DBL_CLICK";
    viewerEvents["MODEL_DOWNLOAD_STATUS_UPDATE"] = "MODEL_DOWNLOAD_STATUS_UPDATE";
    viewerEvents["MODEL_PART_HIGHLIGHTED"] = "MODEL_PART_HIGHLIGHTED";
    viewerEvents["SECTION_PLANE_SELECTED"] = "SECTION_PLANE_SELECTED";
    viewerEvents["CAMERA_MOVED"] = "CAMERA_MOVED";
    viewerEvents["DOWNLOAD_START"] = "DOWNLOAD_START";
    viewerEvents["DOWNLOAD_PROGRESS"] = "DOWNLOAD_PROGRESS";
    viewerEvents["DOWNLOAD_END"] = "DOWNLOAD_END";
    viewerEvents["INTERACTION_MODE_CHANGED"] = "INTERACTION_MODE_CHANGED";
    viewerEvents["LABEL3D_CREATED"] = "LABEL3D_CREATED";
    viewerEvents["ANIMATION_FRAME_NUMBER"] = "ANIMATION_FRAME_NUMBER";
    viewerEvents["LABEL_MOVED"] = "LABEL_MOVED";
    viewerEvents["LABEL_VISIBILITY"] = "LABEL_VISIBILITY";
})(viewerEvents || (viewerEvents = {}));
var internalEvents;
(function (internalEvents) {
    internalEvents["NETWORK_CREATE_GROUP"] = "NETWORK_CREATE_GROUP";
    internalEvents["NETWORK_ADD_PART"] = "NETWORK_ADD_PART";
    internalEvents["NETWORK_UPDATE_PART"] = "NETWORK_UPDATE_PART";
    internalEvents["NETWORK_DELETE_GROUP"] = "NETWORK_DELETE_GROUP";
})(internalEvents || (internalEvents = {}));
var globalEvents;
(function (globalEvents) {
    globalEvents["ERROR"] = "ERROR";
    globalEvents["INFO"] = "INFO";
    globalEvents["WARN"] = "WARN";
    globalEvents["LOG"] = "LOG";
})(globalEvents || (globalEvents = {}));var GUIState = /** @class */ (function () {
    function GUIState() {
        this.planeOptions = new Map();
    }
    return GUIState;
}());
var SelectionMode;
(function (SelectionMode) {
    SelectionMode[SelectionMode["NONE"] = 0] = "NONE";
    SelectionMode[SelectionMode["THREE_PT"] = 1] = "THREE_PT";
    SelectionMode[SelectionMode["FACE"] = 2] = "FACE";
})(SelectionMode || (SelectionMode = {}));
var PlaneGUIState = /** @class */ (function () {
    function PlaneGUIState() {
        this.isPlaneEnabled = false;
        this.isPlaneVisible = false;
        this.sliderMinMax = [0, 0];
        this.primarySliderValue = 0;
        this.rotSliderUValue = 360;
        this.rotSliderVValue = 360;
        this.rotSliderNValue = 360;
        this.delta = 0;
        this.deltaRotU = 0;
        this.deltaRotV = 0;
        this.deltaRotN = 0;
        this.transform = create();
        this.initTransform = create();
    }
    return PlaneGUIState;
}());
var Section = /** @class */ (function () {
    function Section(viewerId, _renderApp, appState, eventDispatcher) {
        this.renderApp = _renderApp;
        this.appState = appState;
        this.activePlaneId = -1;
        this.externalEvents = this.renderApp.getEvents();
        this.externalEventDispatcher = this.renderApp.getEventDispatcher();
        this.eventDispatcher = eventDispatcher;
        this.registerEvents();
        this.bbox = null;
        this.guiState = new GUIState();
        this.selectedPts = [];
        this.viewerId = viewerId;
    }
    Section.prototype.registerEvents = function () {
        this.externalEventDispatcher.addEventListener(this.externalEvents.PROBE_FINISH, this.handleSelection.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.MODEL_LOADED, this.handleOnModelLoad.bind(this));
    };
    Section.prototype.handle3ptSelect = function (probeData) {
        if (this.selectedPts.length < 2) {
            this.selectedPts.push(probeData.hitPoint);
        }
        else {
            this.selectedPts.push(probeData.hitPoint);
            var a = fromValues(this.selectedPts[0][0], this.selectedPts[0][1], this.selectedPts[0][2]);
            var b = fromValues(this.selectedPts[1][0], this.selectedPts[1][1], this.selectedPts[1][2]);
            var c = fromValues(this.selectedPts[2][0], this.selectedPts[2][1], this.selectedPts[2][2]);
            var d1 = sqrDist(a, b);
            var d2 = sqrDist(b, c);
            var d3 = sqrDist(c, a);
            var e = this.appState.EPSIOLON;
            if (d1 > e && d2 > e && d3 > e) {
                this.eventDispatcher.dispatchEvent({
                    type: viewerEvents.SECTION_PLANE_SELECTED,
                    viewerID: this.viewerId,
                    data: { points: Array.from(this.selectedPts), planeId: this.activePlaneId }
                });
                //console.error("event dispatched");
                this.selectedPts = [];
            }
            this.selectedPts = [];
        }
        Logger.setStatusBar("Probing from 3pt section");
    };
    Section.prototype.handleFaceSelect = function (probeData) {
        if (probeData.primitiveSize == 3) {
            var data = probeData.primitiveData;
            this.selectedPts = [
                [data[0], data[1], data[2]],
                [data[3], data[4], data[5]],
                [data[6], data[7], data[8]]
            ];
            var a = fromValues(data[0], data[1], data[2]);
            var b = fromValues(data[3], data[4], data[5]);
            var c = fromValues(data[6], data[7], data[8]);
            var d1 = sqrDist(a, b);
            var d2 = sqrDist(b, c);
            var d3 = sqrDist(c, a);
            var e = this.appState.EPSIOLON;
            if (d1 > e && d2 > e && d3 > e) {
                this.eventDispatcher.dispatchEvent({
                    type: viewerEvents.SECTION_PLANE_SELECTED,
                    viewerID: this.viewerId,
                    data: { points: Array.from(this.selectedPts), planeId: this.activePlaneId }
                });
                //this.renderApp.addPoint(Utility.create_UUID(),glmatrix.vec3.create(),1,[1,0,0,1]);
                this.selectedPts = [];
            }
            Logger.setStatusBar("Probing from face section");
        }
        else {
            Logger.setStatusBar("Please select a face");
        }
    };
    Section.prototype.handleSelection = function (e) {
        var probeData = e.data;
        if (probeData === null || probeData === void 0 ? void 0 : probeData.hitPoint) {
            if (this.appState.interactionMode == InteractionMode.SECTION_3PT)
                this.handle3ptSelect(probeData);
            else if (this.appState.interactionMode == InteractionMode.SECTION_FACE)
                this.handleFaceSelect(probeData);
        }
    };
    Section.prototype.handleOnModelLoad = function (e) {
        this.bbox = this.renderApp.getSceneBoundingBox(false);
    };
    Section.prototype.getSectionGUIData = function () {
        return Utility.deepCopy(this.guiState);
    };
    Section.prototype.setSectionGUIData = function (guiState) {
        this.guiState = guiState;
    };
    Section.prototype.addSectionPlane = function (planeId, transform, color) {
        var newPlaneState = new PlaneGUIState();
        newPlaneState.transform = clone(transform);
        newPlaneState.initTransform = clone(transform);
        this.guiState.planeOptions.set(planeId, newPlaneState);
        this.renderApp.addSectionPlane(planeId, transform, color);
    };
    Section.prototype.deleteSectionPlane = function (planeId) {
        this.guiState.planeOptions.delete(planeId);
        this.renderApp.deleteSectionPlane(planeId);
    };
    Section.prototype.setSectionPlaneEquation = function (planeId, transform, initTransform) {
        var curPlane = this.guiState.planeOptions.get(planeId);
        if (curPlane) {
            curPlane.transform = clone(transform);
            curPlane.initTransform = initTransform ? clone(initTransform) : null;
        }
        this.renderApp.setSectionPlaneEquation(planeId, transform, initTransform);
    };
    Section.prototype.getSectionPlaneEquation = function (planeId) {
        var curPlane = this.guiState.planeOptions.get(planeId);
        var _a = this.renderApp.getSectionPlaneEquation(planeId), transform = _a.transform, initTransform = _a.initTransform;
        if (curPlane) {
            curPlane.transform = clone(transform);
            curPlane.initTransform = initTransform ? clone(initTransform) : null;
        }
        return { transform: transform, initTransform: initTransform };
    };
    Section.prototype.setActive = function (planeId) {
        this.activePlaneId = planeId;
        this.renderApp.setActiveSectionPlaneId(planeId);
    };
    Section.prototype.setSelection = function (mode) {
        switch (mode) {
            case SelectionMode.FACE:
                this.appState.interactionMode = InteractionMode.SECTION_FACE;
                break;
            case SelectionMode.THREE_PT:
                this.appState.interactionMode = InteractionMode.SECTION_3PT;
                break;
            default:
                this.appState.interactionMode = InteractionMode.DEFAULT;
                break;
        }
    };
    Section.prototype.setPlaneState = function (planeId, params) {
        this.setSelection(params.selectionMode);
        if (params.isPlaneEnabled) {
            this.renderApp.enableClipPlane(planeId);
        }
        else {
            this.renderApp.disableClipPlane(planeId);
        }
        if (params.isPlaneVisible) {
            this.renderApp.showClipPlane(planeId);
        }
        else {
            this.renderApp.hideClipPlane(planeId);
        }
        if (this.guiState.planeOptions.has(planeId)) {
            this.guiState.planeOptions.set(planeId, params);
        }
    };
    Section.prototype.invert = function (planeId) {
        // let currentEqn:{eqn:number[],transform:glmatrix.mat4} = this.getSectionPlaneEquation(planeId);
        // if(currentEqn == undefined)
        // return;
        // let {eqn,transform} = currentEqn;
        // const invertedAxes = glmatrix.mat4.clone(transform);
        // invertedAxes[8] = -invertedAxes[8]; invertedAxes[9] = -invertedAxes[9]; invertedAxes[10] = -invertedAxes[10];
        // const invNormal = [-eqn[0],-eqn[1],-eqn[2]];
        // this.setSectionPlaneEquation(planeId,[...invNormal ,-eqn[3]] as [number,number,number,number],invertedAxes);
    };
    Section.prototype.planeFrom3pts = function (planeId, p1, p2, p3, transform) {
        var kEdge1 = create$1();
        var kEdge2 = create$1();
        sub(kEdge1, p2, p1);
        sub(kEdge2, p3, p1);
        var n = create$1();
        cross(n, kEdge1, kEdge2);
        normalize(n, n);
        -dot(n, p1);
        if (sqrLen(n) > 0.0001) {
            this.setSectionPlaneEquation(planeId, transform);
            //console.log('plane eqn from 3pts',eqn);
        }
    };
    Section.prototype.translatePlane = function (delta, deltaSlice, planeId) {
        if (delta == 0 && deltaSlice == 0)
            return;
        //this.slicePlaneOffset[planeId] +=deltaSlice;
        //this.renderApp.translateSectionPlane(delta,deltaSlice,planeId);
        // let currentEqn = this.getSectionPlaneEquation(planeId);
        // if(currentEqn == undefined)
        // return;
        // currentEqn[3] += delta;
        // this.renderApp.setSlicePlaneOffset(this.slicePlaneOffset[planeId],planeId);
        // this.setSectionPlaneEquation(planeId,currentEqn)
    };
    Section.prototype.rotatePlane = function (deltaU, deltaV, deltaN, planeId) {
        if (deltaU == 0 && deltaV == 0 && deltaN == 0)
            return;
        //this.renderApp.rotateSectionPlane(deltaU,deltaV,deltaN,planeId);
    };
    Section.prototype.setBounds = function (planeId) {
        var planeState = this.guiState.planeOptions.get(planeId);
        if (planeState) {
            planeState.sliderMinMax = [-this.bbox.getRadius(), this.bbox.getRadius()];
            this.guiState.planeOptions.set(planeId, planeState);
        }
    };
    return Section;
}());var Label3DType;
(function (Label3DType) {
    Label3DType["ANNOTATION"] = "ANNOTATION";
    Label3DType["MINMAX"] = "MINMAX";
    Label3DType["PROBE"] = "PROBE";
    Label3DType["DISTANCE"] = "DISTANCE";
    Label3DType["ARC"] = "ARC";
    Label3DType["EDGE"] = "EDGE";
    Label3DType["FACE"] = "FACE";
    Label3DType["HOTSPOT"] = "HOTSPOT";
    Label3DType["LINECHART"] = "LINECHART";
})(Label3DType || (Label3DType = {}));
var CameraType;
(function (CameraType) {
    CameraType["Perspective"] = "PERSPECTIVE";
    CameraType["Ortho"] = "ORTHOGRAPHIC";
})(CameraType || (CameraType = {}));
var Events;
(function (Events) {
    Events["MOUSE_DOWN"] = "MOUSE_DOWN";
    Events["MOUSE_UP"] = "MOUSE_UP";
    Events["MOUSE_MOVE"] = "MOUSE_MOVE";
    Events["MOUSE_SCROLL"] = "MOUSE_SCROLL";
    Events["CLICK"] = "CLICK";
    Events["DBL_CLICK"] = "DBL_CLICK";
    Events["MODEL_LOADED"] = "MODEL_LOADED";
    Events["PART_PICKED"] = "PART_PICKED";
    Events["PROBE_FINISH"] = "PROBE_FINISH";
    Events["CAMERA_MOVED"] = "CAMERA_MOVED";
    Events["LABEL3D_CREATED"] = "LABEL3D_CREATED";
    Events["LABEL3D_DESTROYED"] = "LABEL3D_DESTROYED";
    Events["ANIMATION_FRAME_NUMBER"] = "ANIMATION_FRAME_NUMBER";
    Events["LABEL_MOVED"] = "LABEL_MOVED";
    Events["LABEL_VISIBILITY"] = "LABEL_VISIBILITY";
})(Events || (Events = {}));var LabelManager = /** @class */ (function () {
    function LabelManager(_renderApp, appState, viewer) {
        this.renderApp = _renderApp;
        this.hitPoints = [];
        this.appState = appState;
        this.events = this.renderApp.getEvents();
        this.viewer = viewer;
        this.externalEventDispatcher = this.renderApp.getEventDispatcher();
        this.registerEventHandlers();
    }
    LabelManager.prototype.registerEventHandlers = function () {
        this.externalEventDispatcher.addEventListener(this.events.CLICK, this.handleClick.bind(this));
    };
    LabelManager.prototype.handleClick = function (event) {
        switch (this.appState.interactionMode) {
            case InteractionMode.LABEL3D_POINT:
                this.handleProbeLabel(event, Label3DType.PROBE);
                break;
            case InteractionMode.LABEL3D_FACE:
                this.handleProbeLabel(event, Label3DType.FACE);
                break;
            case InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT:
                this.handleMeasurementP2P(event);
                break;
            case InteractionMode.LABEL_MEASUREMENT_3PT_ARC:
                this.handleMeasurementArc(event);
        }
    };
    LabelManager.prototype.handleProbeLabel = function (event, type) {
        var _this = this;
        var pointerData = Utility.getProbeInputData(event);
        var data = this.viewer.probeFromNodes(pointerData);
        if (data) {
            //let hit = data.hitPoint;
            var hit = data.nearPoint;
            var point = fromValues(hit[0], hit[1], hit[2]);
            var id = this.renderApp.addPoint('t', point, 1, [1, 0, 0, 1]);
            this.hitPoints.push({ id: id, hit: point });
            if (this.hitPoints.length === 1) {
                this.renderApp.addLabel3D("label_probe_" + id, this.hitPoints.map(function (e) { return e.hit; }), type, data);
                this.hitPoints.forEach(function (pt) {
                    _this.renderApp.removePoint(pt.id);
                });
                this.hitPoints = [];
            }
        }
    };
    LabelManager.prototype.handleMeasurementP2P = function (event) {
        var _this = this;
        var pointerData = Utility.getProbeInputData(event);
        var data = this.viewer.probeFromNodes(pointerData);
        if (data) {
            var hit = data.hitPoint;
            var point = fromValues(hit[0], hit[1], hit[2]);
            var id = this.renderApp.addPoint('t', point, 1, [1, 0, 0, 1]);
            this.hitPoints.push({ id: id, hit: point });
            if (this.hitPoints.length === 2) {
                this.renderApp.addLabel3D("label_distance_" + id, this.hitPoints.map(function (e) { return e.hit; }), Label3DType.DISTANCE, data);
                this.hitPoints.forEach(function (pt) {
                    _this.renderApp.removePoint(pt.id);
                });
                this.hitPoints = [];
            }
        }
    };
    LabelManager.prototype.handleMeasurementArc = function (event) {
        var _this = this;
        var pointerData = Utility.getProbeInputData(event);
        var data = this.viewer.probeFromNodes(pointerData);
        if (data) {
            var hit = data.hitPoint;
            var point = fromValues(hit[0], hit[1], hit[2]);
            var id = this.renderApp.addPoint('t', point, 1, [1, 0, 0, 1]);
            this.hitPoints.push({ id: id, hit: point });
            if (this.hitPoints.length === 3) {
                this.renderApp.addLabel3D("label_arc_" + id, this.hitPoints.map(function (e) { return e.hit; }), Label3DType.ARC, data);
                this.hitPoints.forEach(function (pt) {
                    _this.renderApp.removePoint(pt.id);
                });
                this.hitPoints = [];
            }
        }
    };
    LabelManager.prototype.add3DLabel = function (id, hitPoint, type, probeData) {
        this.renderApp.addLabel3D(id, [hitPoint], type, probeData);
    };
    LabelManager.prototype.addMeasurementLabel = function (id, hitPoint, type, probeData) {
        this.renderApp.addLabel3D(id, hitPoint, type, probeData);
    };
    LabelManager.prototype.showHideLabelVisibility = function (id, flag) {
        this.renderApp.showHideLabelVisibility(id, flag);
    };
    LabelManager.prototype.add3dLabelforNodeId = function (id, type, nodeid, modelIndex, nodeidIndex, selectedPartNodes) {
        return this.renderApp.add3dLabelforNodeId(id, type, nodeid, modelIndex, nodeidIndex, selectedPartNodes);
    };
    LabelManager.prototype.delete3DLabel = function (id) {
        return this.renderApp.deleteLabel3D(id);
    };
    LabelManager.prototype.get3DLabelCanvasPos = function (id) {
        return this.renderApp.get3DLabelCanvasPos(id);
    };
    LabelManager.prototype.getLabel3DInfo = function (id) {
        return this.renderApp.getLabel3DInfo(id);
    };
    return LabelManager;
}());var RepresentationType;
(function (RepresentationType) {
    RepresentationType[RepresentationType["BBOX"] = 24] = "BBOX";
    RepresentationType[RepresentationType["MESH"] = 132] = "MESH";
    RepresentationType[RepresentationType["WIREFRAME"] = 136] = "WIREFRAME";
    RepresentationType[RepresentationType["POINTS"] = 384] = "POINTS";
    RepresentationType[RepresentationType["HIGHLIGHT"] = 143345245] = "HIGHLIGHT"; // to be changed if we get from server
})(RepresentationType || (RepresentationType = {}));var MCAXFilter = /** @class */ (function () {
    function MCAXFilter(renderer, mcax) {
        this.renderApp = renderer;
        this.mcax = mcax;
    }
    MCAXFilter.prototype.getRenderableGeometries = function () {
        var models = this.mcax.models;
        if (models instanceof Array && models.length > 0) {
            var filteredModels = models.filter(function (item) { return item.display; });
            var componentIndexList = filteredModels.map(function (item) { return (item.components || []); }).flat();
            var components = this.getRecursiveItems(componentIndexList, this.mcax.components);
            var filteredcomponents = components.filter(function (e) { return e.item.display; });
            var geometryIndexList = filteredcomponents.map(function (e) { return (e.item.geometries || []); }).flat();
            var geometries = this.getRecursiveItems(geometryIndexList, this.mcax.geometries);
            return geometries;
        }
    };
    MCAXFilter.prototype.getRecursiveItems = function (indexList, items) {
        var _this = this;
        var itemsList = [];
        if (indexList instanceof Array && indexList.length > 0) {
            indexList.forEach(function (index) {
                var item = items[index];
                if (item.children && item.children.length > 0) {
                    itemsList.push.apply(itemsList, __spread(_this.getRecursiveItems(item.children, items)));
                }
                else {
                    itemsList.push({
                        item: item,
                        index: index
                    });
                }
            });
        }
        return itemsList;
    };
    MCAXFilter.prototype.getVisibleGeometries = function (representationsId) {
        var geometries = this.getRenderableGeometries();
        var visibleGeometries = [];
        representationsId.forEach(function (id, index) {
            for (var i = 0; i < geometries.length; i++) {
                var geo = geometries[i].item;
                if (geo.representations && geo.representations.length > 0 && geo.representations.includes(id)) {
                    if (visibleGeometries[index]) {
                        visibleGeometries[index].name = geo.name;
                        visibleGeometries[index].representations.push(id);
                    }
                    else {
                        visibleGeometries[index] = {
                            name: geo.name,
                            representations: [id]
                        };
                    }
                    break;
                }
            }
        });
        return visibleGeometries;
    };
    MCAXFilter.prototype.getRepresentationType = function (id) {
        var curr_rep = this.mcax.representations[id];
        if (curr_rep)
            return RepresentationType[curr_rep.type];
    };
    return MCAXFilter;
}());var AppState = /** @class */ (function () {
    function AppState() {
        this.interactionMode = InteractionMode.DEFAULT;
        this.EPSIOLON = 0.000001;
    }
    return AppState;
}());var ServerConnectionType = {
    XHR: 1,
    AXIOS: 2
};
var serverURLs = {
    getLicense: '/api/1.0/license/acquire',
    releaseLicense: '/api/1.0/license/release',
    ping: '/api/1.0/ping',
    is_free: '/api/1.0/isfree',
    getCAEResultList: '/api/1.0/getCAEResultList',
    connect: '/api/1.0/connect',
    disconnect: '/api/1.0/disconnect',
    taskState: '/api/1.0/task'
};
var ResponseType = {
    JSON: 'json',
    BUFFER: 'arraybuffer'
};
var errorCode = {
    noerror: '',
    connectionError: 'Not connected. Please verify your network connection.',
    error404: 'The requested page not found [404].',
    serverError: 'Internal server error [500].',
    jsonError: 'Requested JSON parse failed.',
    timeoutError: 'Time out error.',
    ajaxError: 'Ajax request aborted.',
    unknownError: 'Unkown network error.',
    noresponseError: 'No response from server',
    invalidDataError: 'Invalid data received from server'
};
var range = [" seconds ", " minutes ", " hours ", " days ", " weeks "];
var SizeRange = ["Bytes", "KB", "MB", "GB", "TB"];
var SpeedRange = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
//Convert number of seconds to structure string E.g. 65 as input returns 1minutes 5seconds
var SecondsToStructuredString = function (time) {
    var min;
    var sec;
    var hr;
    var days;
    var wks;
    if (time < 1)
        return "0 milliseconds";
    if (time < 1000)
        return Math.floor(time) + " milliseconds";
    else
        time = time / 1000;
    if (time < 60) //Seconds
     {
        return Math.floor(time) + range[0];
    }
    else if ((time / 60) < 60) //Minutes
     {
        min = Math.floor(time / 60);
        sec = Math.floor(time - (min * 60));
        return min + range[1] + (sec > 0 ? sec + range[0] : "");
    }
    else if ((time / (60 * 60)) >= 1 && (time / (60 * 60)) < 24) //Hours
     {
        hr = Math.floor(time / (60 * 60));
        min = time - (hr * (60 * 60));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((hr * (60 * 60)) + (min * 60)));
        return hr + range[2] + (min > 0 ? min + range[1] : "") + (sec > 0 ? Math.floor(sec) + range[0] : "");
    }
    else if ((time / (60 * 60)) >= 24 && (time / (60 * 60 * 24)) < 7) //Days
     {
        days = Math.floor(time / (60 * 60 * 24));
        hr = time - (days * 60 * 60 * 24);
        hr = Math.floor(hr / (60 * 60));
        min = time - ((days * 60 * 60 * 24) + (hr * 60 * 60));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
        return days + range[3] + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
    }
    else //if((time / (60*60*24)) >= 7) //Weeks
     {
        wks = Math.floor(time / (60 * 60 * 24 * 7));
        days = time - (wks * (60 * 60 * 24 * 7));
        days = Math.floor(days / (60 * 60 * 24));
        hr = time - ((wks * 60 * 60 * 24 * 7) + (days * 60 * 60 * 24));
        hr = Math.floor(hr / (60 * 60));
        min = time - (((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60)));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
        return wks + range[4] + (days > 0 ? days + range[3] : "") + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
    }
};
//Returns number of bytes as structure string E.g. 1076 as input returns 1.05KB  
var BytesToStructuredString = function (bytes) {
    if (bytes < 1)
        return "0 Byte";
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + SizeRange[i];
};
//Returns number of bytes/sec as structure string E.g. 1076 as input returns 1.05KB/s
var SpeedToStructuredString = function (speed) {
    if (speed < 1)
        return "0 B/s";
    var i = Math.floor(Math.log(speed) / Math.log(1024));
    return (speed / Math.pow(1024, i)).toFixed(2) + " " + SpeedRange[i];
};var AjaxConnector = /** @class */ (function () {
    function AjaxConnector() {
    }
    AjaxConnector.xhr2 = function (_url, _data, _callback, _method, _async, responseType) {
        var asyncRequest = true;
        var resultData = {};
        var errorMsgCode = errorCode.noerror;
        if (_async === false)
            asyncRequest = false;
        //if(this.xhrRequest === undefined)
        //    this.xhrRequest =  new XMLHttpRequest();
        //let oReq = this.xhrRequest;
        //@ts-ignore
        var oReq = new XMLHttpRequest();
        var returnData = null;
        //oReq.addEventListener('progress', updateProgress);
        //oReq.addEventListener('error', transferFailed);
        //oReq.addEventListener('abort', transferCanceled);
        oReq.onload = function () {
            if (oReq.status === 200)
                resultData = this.response;
            else {
                if (oReq.status === 0) {
                    errorMsgCode = errorCode.connectionError;
                }
                else if (oReq.status === 404) {
                    errorMsgCode = errorCode.error404;
                }
                else if (oReq.status === 500) {
                    errorMsgCode = errorCode.serverError;
                }
                else {
                    errorMsgCode = errorCode.unknownError;
                }
            }
            if (_callback)
                _callback(resultData, errorMsgCode);
        };
        oReq.open(_method, _url, asyncRequest);
        //oReq.withCredentials = true; //Access-Control-Allow-Origin = * will not work if withCredentials = true;
        oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        //oReq.setRequestHeader('Range', 'bytes=0-47');
        if (responseType === ResponseType.BUFFER)
            oReq.responseType = 'arraybuffer';
        else if (responseType === ResponseType.JSON)
            oReq.responseType = 'json';
        else
            oReq.responseType = 'text';
        //if (_method == 'POST')
        //_data['client_id'] = clientID;
        oReq.send(JSON.stringify(_data));
        if (_async === false) {
            returnData = {
                Data: resultData,
                errorMsgCode: errorMsgCode
            };
            return returnData;
        }
    };
    AjaxConnector.send = function (_url, _data, _method, _async, _reponseType) {
        return new Promise(function (resolve, reject) {
            if (!_url) {
                throw new Error('Invalid request parameters');
            }
            var _callbackFn = function (resultData, errorMsgCode) {
                if (errorMsgCode !== errorCode.noerror)
                    reject(errorMsgCode);
                if (errorMsgCode === errorCode.noerror && resultData)
                    resolve(resultData);
                resolve(errorCode.unknownError);
            };
            var syncCallResult = null;
            var responseType = _reponseType || ResponseType.JSON;
            if (responseType === ResponseType.JSON || responseType === ResponseType.BUFFER)
                syncCallResult = AjaxConnector.xhr2(_url, _data, _callbackFn, _method, _async, responseType);
            else
                throw new Error('Invalid Response Type');
            if (_async === true && syncCallResult) {
                if (parseInt(syncCallResult.errorMsgCode) !== -1)
                    reject(syncCallResult.errorMsgCode);
                if (parseInt(syncCallResult.errorMsgCode) === -1 && syncCallResult.Data)
                    resolve(syncCallResult.Data);
                resolve(errorCode.unknownError);
            }
        });
    };
    return AjaxConnector;
}());var RequestMeter = /** @class */ (function () {
    function RequestMeter(url) {
        this._url = url,
            this._requestInitaitedOn = null,
            this._firstResponseReceivedOn = null,
            this._finalResponseReceivedOn = null,
            this._isErrorOccurred = false,
            this._isSuccess = false,
            this._loaded = 0;
        this._progessList = [];
        this._error = null;
        this.size = 0;
        this.timeForFirstResponse = null;
        this.timeForDownload = null;
    }
    RequestMeter.prototype.requestInitaited = function () {
        this._requestInitaitedOn = new Date().getTime();
    };
    RequestMeter.prototype.addProgress = function (event) {
        //console.log("event : ", event);
        if (event) {
            var current_time = new Date().getTime();
            if (this._progessList.length === 0) {
                this._firstResponseReceivedOn = current_time;
                this.timeForFirstResponse = this._firstResponseReceivedOn - this._requestInitaitedOn;
                this.size = event.total;
            }
            if (event.loaded === event.total) {
                this._finalResponseReceivedOn = current_time;
                this.timeForDownload = this._finalResponseReceivedOn - this._requestInitaitedOn;
            }
            var prvTime = this._requestInitaitedOn;
            var bitsLoaded = event.loaded;
            if (this._progessList.length > 0) {
                prvTime = this._progessList[this._progessList.length - 1].time;
                bitsLoaded = event.loaded - this._progessList[this._progessList.length - 1].loaded;
            }
            var durationInMS = (current_time - prvTime);
            var durationInSec = durationInMS / 1000;
            //bitsLoaded = bitsLoaded * 8;
            var speedBps = bitsLoaded / durationInSec;
            var progressEvent = {
                time: current_time,
                loaded: event.loaded,
                duration: durationInMS,
                //event : event,
                speed: speedBps
            };
            this._progessList.push(progressEvent);
            this._loaded = event.loaded;
        }
    };
    RequestMeter.prototype.succeeded = function () {
        this._isSuccess = true;
    };
    RequestMeter.prototype.errorOccurred = function (errorString) {
        this._isErrorOccurred = true;
        this._error = errorString;
    };
    RequestMeter.prototype.getTransferSpeed = function () {
        var transferSpeed = {
            maxSpeed: 0,
            avgSpeed: 0,
            minSpeed: 0,
        };
        for (var i = 1; i < this._progessList.length; i++) //skip the first response since in contains server processing time
         {
            var item = this._progessList[i];
            if (item.speed < transferSpeed.minSpeed || transferSpeed.minSpeed == 0)
                transferSpeed.minSpeed = item.speed;
            if (item.speed > transferSpeed.maxSpeed)
                transferSpeed.maxSpeed = item.speed;
            transferSpeed.avgSpeed = transferSpeed.avgSpeed + item.speed;
        }
        if (this._progessList.length > 1)
            transferSpeed.avgSpeed = transferSpeed.avgSpeed / (this._progessList.length - 1);
        return transferSpeed;
    };
    RequestMeter.prototype.getProgress = function () {
        return this._progessList[this._progessList.length - 1];
    };
    RequestMeter.prototype.getMetrics = function () {
        var metricsString = "";
        if (this._isSuccess === true && this._isErrorOccurred === false) {
            var transferSpeed = this.getTransferSpeed();
            var size = BytesToStructuredString(this.size);
            var timeForFirstResponse = SecondsToStructuredString(this.timeForFirstResponse);
            var timeToDownload = SecondsToStructuredString(this.timeForDownload);
            var minSpeed = SpeedToStructuredString(transferSpeed.minSpeed);
            var maxSpeed = SpeedToStructuredString(transferSpeed.maxSpeed);
            var avgSpeed = SpeedToStructuredString(transferSpeed.avgSpeed);
            metricsString =
                "URL :  " + this._url + "\nSize :  " + size + "\nWaiting (TTFB) :  " + timeForFirstResponse + "\nTimeToDownload :  " + timeToDownload + "\nMIN Speed :  " + minSpeed + "\nMAX Speed :  " + maxSpeed + "\nAVG Speed :  " + avgSpeed + "\nChunk Count :  " + this._progessList.length;
        }
        else if (this._isErrorOccurred === true && this._error !== null) {
            metricsString =
                "URL :  " + this._url + "\nError :  " + this._error;
        }
        else {
            metricsString =
                "URL :  " + this._url + "\nError :  Unknown Error";
        }
        return metricsString;
    };
    return RequestMeter;
}());var NetworkMetrics = /** @class */ (function () {
    function NetworkMetrics() {
    }
    NetworkMetrics.addURL = function (url) {
        var reqObj = new RequestMeter(url);
        NetworkMetrics.URLMap.set(url, reqObj);
        return reqObj;
    };
    NetworkMetrics.getRequestObject = function (url) {
        return NetworkMetrics.URLMap.get(url);
    };
    NetworkMetrics.getAllMetrics = function () {
        var rtnString = "";
        NetworkMetrics.URLMap.forEach(function (value) {
            if (rtnString === "") {
                rtnString = "" + value.getMetrics();
            }
            else {
                rtnString =
                    rtnString + " \n\n" + value.getMetrics();
            }
        });
        return rtnString;
    };
    NetworkMetrics.URLMap = new Map();
    return NetworkMetrics;
}());var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend$1(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend$1,
  trim: trim,
  stripBOM: stripBOM
};function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var _default = axios;
axios_1.default = _default;var axios$1 = axios_1;var AxiosConnector = /** @class */ (function () {
    function AxiosConnector(viewerId, eventDispatcher) {
        this.viewerId = viewerId;
        this.eventDispatcher = eventDispatcher;
    }
    AxiosConnector.prototype.send = function (downloadId, _url, _data, _method, _reponseType) {
        if (!_url)
            throw new Error('Invalid request parameters');
        var responseType = _reponseType || ResponseType.JSON;
        if (responseType === ResponseType.JSON || responseType === ResponseType.BUFFER) {
            var self_1 = this;
            return new Promise(function (resolve, reject) {
                var requestObject = NetworkMetrics.addURL(_url);
                requestObject.requestInitaited();
                if (downloadId)
                    self_1.eventDispatcher.dispatchEvent({
                        data: { event: {}, downloadId: downloadId, partId: _url },
                        type: internalEvents.NETWORK_ADD_PART,
                        viewerID: self_1.viewerId
                    });
                axios$1({
                    method: _method,
                    url: _url,
                    data: _data,
                    responseType: responseType,
                    onDownloadProgress: function (event) {
                        requestObject.addProgress(event);
                        if (downloadId)
                            self_1.eventDispatcher.dispatchEvent({
                                data: { event: event, downloadId: downloadId, partId: _url },
                                type: internalEvents.NETWORK_UPDATE_PART,
                                viewerID: self_1.viewerId
                            });
                    }
                })
                    .then(function (response) {
                    if (response) {
                        requestObject.succeeded();
                        resolve(response.data);
                    }
                    else {
                        requestObject.errorOccurred(errorCode.invalidDataError);
                        reject(errorCode.invalidDataError);
                    }
                })
                    .catch(function (error) {
                    var errorMsgCode = errorCode.noerror;
                    if (error.response) {
                        if (error.response.status === 0) {
                            errorMsgCode = errorCode.connectionError;
                        }
                        else if (error.response.status === 404) {
                            errorMsgCode = errorCode.error404;
                        }
                        else if (error.response.status === 500) {
                            errorMsgCode = errorCode.serverError;
                        }
                        else {
                            errorMsgCode = errorCode.unknownError;
                        }
                    }
                    else if (error.request) {
                        errorMsgCode = errorCode.noresponseError;
                    }
                    else {
                        errorMsgCode = errorCode.unknownError;
                    }
                    requestObject.errorOccurred(errorMsgCode);
                    reject(errorMsgCode);
                });
            });
        }
        else
            throw new Error('Invalid Response Type');
    };
    return AxiosConnector;
}());var ServerConnector = /** @class */ (function () {
    function ServerConnector(viewerId, connectionType, eventDispatcher) {
        this.connectionType = connectionType || ServerConnectionType.AXIOS;
        this.eventDispatcher = eventDispatcher;
        this.axiosConnector = new AxiosConnector(viewerId, eventDispatcher);
    }
    ServerConnector.prototype.getJsonData = function (url) {
        if (this.connectionType === ServerConnectionType.XHR) {
            return AjaxConnector.send(url, null, 'GET', true, ResponseType.JSON);
        }
        else if (this.connectionType === ServerConnectionType.AXIOS) {
            return this.axiosConnector.send(null, url, null, 'GET', ResponseType.JSON);
        }
        else {
            throw new Error('Invalid server connection type');
        }
    };
    ServerConnector.prototype.getArrayBuffer = function (downloadId, url) {
        if (this.connectionType === ServerConnectionType.XHR) {
            return AjaxConnector.send(url, null, 'GET', true, ResponseType.BUFFER);
        }
        else if (this.connectionType === ServerConnectionType.AXIOS) {
            return this.axiosConnector.send(downloadId, url, null, 'GET', ResponseType.BUFFER);
        }
        else {
            throw new Error('Invalid server connection type');
        }
    };
    ServerConnector.prototype.getNetworkMetrics = function () {
        return NetworkMetrics.getAllMetrics();
    };
    return ServerConnector;
}());var NetworkCache = /** @class */ (function () {
    function NetworkCache(viewerId) {
        this.cacheURL = new Map();
        this.viewerId = viewerId;
    }
    NetworkCache.prototype.get = function (url) {
        var dataObject = this.cacheURL.get(url);
        if (dataObject && dataObject.isValid)
            return dataObject.data;
        return null;
    };
    NetworkCache.prototype.add = function (url, data) {
        var dataObject = {
            data: data,
            timestamp: new Date(),
            size: 0,
            isValid: false,
            type: ArrayBuffer
        };
        dataObject.data
            .then(function (response) {
            if (response instanceof ArrayBuffer)
                dataObject.size = response.byteLength;
            else {
                dataObject.size = JSON.stringify(response).length;
                dataObject.type = Object;
            }
            dataObject.isValid = true;
        })
            .catch(function (error) {
            console.log(error);
            dataObject.size = 0;
            dataObject.isValid = false;
        });
        this.cacheURL.set(url, dataObject);
        return true;
    };
    NetworkCache.prototype.remove = function (url) {
        this.cacheURL.delete(url);
        return true;
    };
    NetworkCache.prototype.removeAll = function () {
        this.cacheURL.clear();
        return true;
    };
    return NetworkCache;
}());var AppConnector = /** @class */ (function () {
    function AppConnector(viewerId, _eventDispacther) {
        this.connector = new ServerConnector(viewerId, ServerConnectionType.AXIOS, _eventDispacther);
        this.eventDispacther = _eventDispacther;
        this.networkCache = new NetworkCache(viewerId);
    }
    AppConnector.prototype.getArrayBuffer = function (downloadId, url, cacheData) {
        var data = this.networkCache.get(url);
        if (!data) {
            var promiseData = this.connector.getArrayBuffer(downloadId, url);
            if (true)
                this.networkCache.add(url, promiseData);
            return promiseData;
        }
        else
            return data;
    };
    AppConnector.prototype.getJsonData = function (url, cacheData) {
        var data = this.networkCache.get(url);
        if (!data) {
            var promiseData = this.connector.getJsonData(url);
            if (true)
                this.networkCache.add(url, promiseData);
            return promiseData;
        }
        else
            return data;
    };
    AppConnector.prototype.getNetworkMetrics = function () {
        return this.connector.getNetworkMetrics();
    };
    AppConnector.prototype.getModel = function (API, caxFilePath, viewerID) {
        //console.log("Downloading file on the server.");
        Logger.setStatusBar("Checking the file on the server.");
        var obj = {
            type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
            viewerID: viewerID,
            data: "Checking the file on the server"
        };
        this.eventDispacther.dispatchEvent(obj);
        var scope = this;
        var url = API + "?url=" + caxFilePath;
        var returnPromise = new Promise(function (resolve, reject) {
            scope.getJsonData(url)
                .then(function (jsonResult) {
                if (scope.isJson(jsonResult) === true && jsonResult) {
                    if (jsonResult["json_url"]) {
                        if (jsonResult["data"]) {
                            var status_1 = jsonResult["data"]["status"];
                            var taskId = jsonResult["data"]["task_id"];
                            var taskURL = jsonResult["data"]["task_url"];
                            if (status_1 === "available") {
                                Logger.clearStatusBar();
                                resolve(jsonResult);
                            }
                            else if (status_1 === "download_in_progress") {
                                var statusMessage = "File download in progress";
                                Logger.setStatusBar("Downloading file on the server");
                                var obj_1 = { type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE, viewerID: viewerID, data: "Downloading file on the server" };
                                scope.eventDispacther.dispatchEvent(obj_1);
                                scope.checkTaskStatus(taskURL, taskId, viewerID, statusMessage, function () {
                                    Logger.clearStatusBar();
                                    resolve(jsonResult);
                                });
                            }
                        }
                    }
                    else if (jsonResult["error"]) {
                        //console.log(jsonResult["error"]);
                        Logger.setStatusBar(jsonResult["error"], statusIconType.ERROR);
                        reject(jsonResult["error"]);
                    }
                    else {
                        //console.log(errorCode.jsonError);
                        Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
                        reject(errorCode.jsonError);
                    }
                }
                else {
                    //console.log(errorCode.jsonError);
                    Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
                    reject(errorCode.jsonError);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode.noerror) {
                    //console.log(errorMsgCode);
                    Logger.setStatusBar(errorMsgCode, statusIconType.ERROR);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    Logger.setStatusBar(errorCode.unknownError, statusIconType.ERROR);
                    reject(errorCode.unknownError);
                }
            });
        });
        return returnPromise;
    };
    AppConnector.prototype.checkTaskStatus = function (taskURL, taskId, viewerID, statusMessage, onCompleteCallbackFn) {
        var _this = this;
        var scope = this;
        if ((taskId || taskURL) && onCompleteCallbackFn) {
            var url = this.baseUrl + serverURLs["taskState"] + "/" + taskId;
            if (taskURL)
                url = taskURL;
            this.getJsonData(url)
                .then(function (jsonResult) {
                if (_this.isJson(jsonResult) === true && jsonResult) {
                    if (jsonResult["state"] === "SUCCESS") {
                        onCompleteCallbackFn(jsonResult);
                    }
                    else {
                        var msg = statusMessage;
                        if (jsonResult["info"] &&
                            jsonResult["info"]["bytes_downloaded"] &&
                            jsonResult["info"]["total_bytes"]) {
                            var bytes_downloaded = jsonResult["info"]["bytes_downloaded"];
                            var total_bytes = jsonResult["info"]["total_bytes"];
                            var percetage = (bytes_downloaded / total_bytes) * 100;
                            msg = statusMessage + " : " + percetage.toFixed(1) + "% completed.";
                        }
                        Logger.setStatusBar(msg);
                        var obj = { type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE, viewerID: viewerID, data: msg };
                        scope.eventDispacther.dispatchEvent(obj);
                        //console.log(msg);
                        setTimeout(function () {
                            this.checkTaskStatus(taskURL, taskId, viewerID, statusMessage, onCompleteCallbackFn);
                        }.bind(_this, taskURL, taskId, viewerID, statusMessage, onCompleteCallbackFn), 3000);
                    }
                }
                else {
                    //console.log(errorCode.jsonError);
                    Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode.noerror) {
                    //console.log(errorMsgCode);
                    Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
                }
                else {
                    //console.log(errorCode.unknownError);
                    Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
                }
            });
        }
        else {
            //console.log("checkTaskStatus :: Incorrect number of arguments.");
            Logger.setStatusBar(errorCode.jsonError, statusIconType.ERROR);
        }
    };
    AppConnector.prototype.isJson = function (item) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        }
        catch (e) {
            return false;
        }
        if (typeof item === "object" && item !== null) {
            return true;
        }
        return false;
    };
    return AppConnector;
}());var vctViewer = function(_containerID, _connectorObject, _disableMouseEvents)
{
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}var AppConstants;
(function (AppConstants) {
    (function (BackgroundType) {
        BackgroundType[BackgroundType["LINEAR"] = 0] = "LINEAR";
        BackgroundType[BackgroundType["GRADIENT"] = 1] = "GRADIENT";
        BackgroundType[BackgroundType["IMAGE"] = 2] = "IMAGE";
    })(AppConstants.BackgroundType || (AppConstants.BackgroundType = {}));
    (function (NodeType) {
        NodeType[NodeType["NONE"] = 0] = "NONE";
        NodeType[NodeType["TRANSFORM"] = 1] = "TRANSFORM";
        NodeType[NodeType["SHAPE"] = 2] = "SHAPE";
        NodeType[NodeType["CAMERA"] = 3] = "CAMERA";
    })(AppConstants.NodeType || (AppConstants.NodeType = {}));
    (function (NodeSubType) {
        NodeSubType[NodeSubType["NONE"] = 0] = "NONE";
        NodeSubType[NodeSubType["HIGHLIGHT"] = 1] = "HIGHLIGHT";
        NodeSubType[NodeSubType["SECTION_PLANE"] = 2] = "SECTION_PLANE";
    })(AppConstants.NodeSubType || (AppConstants.NodeSubType = {}));
    (function (DisplayMode) {
        DisplayMode[DisplayMode["SHADED"] = 1] = "SHADED";
        DisplayMode[DisplayMode["SHADEDMESH"] = 2] = "SHADEDMESH";
        DisplayMode[DisplayMode["WIREFRAME"] = 3] = "WIREFRAME";
        DisplayMode[DisplayMode["HIDDENWIREFRAME"] = 4] = "HIDDENWIREFRAME";
        DisplayMode[DisplayMode["POINT"] = 5] = "POINT";
        DisplayMode[DisplayMode["TRANSPARENT"] = 6] = "TRANSPARENT";
    })(AppConstants.DisplayMode || (AppConstants.DisplayMode = {}));
    (function (RenderPass) {
        RenderPass[RenderPass["FIRSTPASS"] = 1] = "FIRSTPASS";
        RenderPass[RenderPass["SECONDPASS"] = 2] = "SECONDPASS";
    })(AppConstants.RenderPass || (AppConstants.RenderPass = {}));
    AppConstants.imageFormat = {
        PNG: {
            mimeType: 'image/png',
            extension: '.png'
        },
        JPEG: {
            mimeType: 'image/jpeg',
            extension: '.jpg'
        },
        BMP: {
            mimeType: 'image/bmp',
            extension: '.bmp'
        },
    };
    (function (AnimationType) {
        AnimationType["NONE"] = "NONE";
        AnimationType["LINEAR"] = "LINEAR";
        AnimationType["EIGENNONCOMPEX"] = "EIGENNONCOMPEX";
        AnimationType["EIGENCOMPLE"] = "EIGENCOMPLE";
        AnimationType["TRANSIENT"] = "TRANSIENT";
        AnimationType["LEGEND"] = "LEGEND";
        AnimationType["VIEWPOINT"] = "VIEWPOINT";
    })(AppConstants.AnimationType || (AppConstants.AnimationType = {}));
})(AppConstants || (AppConstants = {}));var AppState = /** @class */ (function () {
    function AppState() {
    }
    AppState.DefaultDisplayMode = AppConstants.DisplayMode.SHADED;
    AppState.UseDefaultWireFrameColor = true;
    AppState.DefaultWireFrameColor = [1, 0, 0, 1];
    //static DefaultColorPlotState : boolean = true; 
    AppState.isSceneLoaded = false;
    AppState._BGTYPE = AppConstants.BackgroundType.GRADIENT;
    AppState._BGColor1 = [159, 159, 255, 1];
    AppState._BGColor2 = [255, 255, 255, 1];
    AppState.resultSet = '';
    AppState.BaseUrl = null;
    AppState.showFPS = true;
    return AppState;
}());
var AppObjects = /** @class */ (function () {
    function AppObjects() {
    }
    Object.defineProperty(AppObjects, "serverConnection", {
        get: function () {
            return this._serverConnection;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._serverConnection = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "dataManager", {
        get: function () {
            return this._dataManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._dataManager = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "sceneManager", {
        get: function () {
            return this._sceneManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._sceneManager = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "renderer", {
        get: function () {
            return this._renderer;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._renderer = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "picker", {
        get: function () {
            return this._picker;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._picker = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "sectionManager", {
        get: function () {
            return this._sectionManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._sectionManager = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "partManipulator", {
        get: function () {
            return this._partManipulator;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._partManipulator = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "labelManager", {
        get: function () {
            return this._labelManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._labelManager = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "input", {
        get: function () {
            return this._input;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._input = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "commands", {
        get: function () {
            return this._commands;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._commands = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "mouseControl", {
        get: function () {
            return this._mouseControl;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._mouseControl = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "externalEventDispatcher", {
        get: function () {
            return this._externalEventDispatcher;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._externalEventDispatcher = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "keyboardControl", {
        get: function () {
            return this._keyboardControl;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._keyboardControl = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "animationManager", {
        get: function () {
            return this._animationManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._animationManager = object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppObjects, "colorValueManager", {
        get: function () {
            return this._colorValueManager;
        },
        set: function (object) {
            if (object !== null || undefined)
                this._colorValueManager = object;
        },
        enumerable: false,
        configurable: true
    });
    AppObjects._serverConnection = null;
    AppObjects._commands = null;
    AppObjects._dataManager = null;
    AppObjects._sceneManager = null;
    AppObjects._renderer = null;
    AppObjects._picker = null;
    AppObjects._sectionManager = null;
    AppObjects._labelManager = null;
    AppObjects._partManipulator = null;
    AppObjects._input = null;
    AppObjects._mouseControl = null;
    AppObjects._externalEventDispatcher = null;
    AppObjects._keyboardControl = null;
    AppObjects._animationManager = null;
    AppObjects._colorValueManager = null;
    return AppObjects;
}());var ServerConnectionType = {
    XHR: 1,
    AXIOS: 2
};
var ResponseType = {
    JSON: 'json',
    BUFFER: 'arraybuffer'
};
var errorCode = {
    noerror: '',
    connectionError: 'Not connected. Please verify your network connection.',
    error404: 'The requested page not found [404].',
    serverError: 'Internal server error [500].',
    jsonError: 'Requested JSON parse failed.',
    timeoutError: 'Time out error.',
    ajaxError: 'Ajax request aborted.',
    unknownError: 'Unkown network error.',
    noresponseError: 'No response from server',
    invalidDataError: 'Invalid data received from server',
    downloadInProgress: 'Download in progress'
};var WEBGLBuffer = /** @class */ (function () {
    function WEBGLBuffer(_uid, usage) {
        this.GLContext = AppState.GLContext;
        this.buffer = this.GLContext.createBuffer();
        this.usage = usage;
        this.uid = _uid;
        this.dataArray = null;
        this.GLTFAccessor = null;
        this.isLoading = false;
        this.promise = null;
    }
    WEBGLBuffer.prototype.bind = function () {
        this.GLContext.bindBuffer(this.target, this.buffer);
    };
    WEBGLBuffer.prototype.unbind = function () {
        this.GLContext.bindBuffer(this.target, null);
    };
    WEBGLBuffer.prototype.getDataArrayCount = function () {
        if (this.dataArray) {
            var divFactor = 1;
            if (this.dataArray instanceof Int8Array || this.dataArray instanceof Uint8Array)
                divFactor = 1;
            else if (this.dataArray instanceof Int16Array || this.dataArray instanceof Uint16Array)
                divFactor = 2;
            else if (this.dataArray instanceof Uint32Array || this.dataArray instanceof Float32Array)
                divFactor = 4;
            else if (this.dataArray instanceof Float64Array)
                divFactor = 8;
            return this.dataArray.byteLength / divFactor;
        }
        return 0;
    };
    WEBGLBuffer.prototype.getType = function () {
        var type = this.GLContext.UNSIGNED_SHORT;
        if (this.dataArray instanceof Int8Array || this.dataArray instanceof Uint8Array)
            type = this.GLContext.UNSIGNED_BYTE;
        else if (this.dataArray instanceof Int16Array || this.dataArray instanceof Uint16Array)
            type = this.GLContext.UNSIGNED_SHORT;
        else if (this.dataArray instanceof Uint32Array || this.dataArray instanceof Float32Array)
            type = this.GLContext.UNSIGNED_INT;
        return type;
    };
    WEBGLBuffer.prototype.getUid = function () {
        return this.uid;
    };
    WEBGLBuffer.prototype.setUid = function (s) {
        this.uid = s;
    };
    Object.defineProperty(WEBGLBuffer.prototype, "getDataArray", {
        get: function () {
            return this.dataArray;
        },
        enumerable: false,
        configurable: true
    });
    WEBGLBuffer.prototype.delete = function () {
        this.GLContext.deleteBuffer(this.buffer);
    };
    WEBGLBuffer.prototype.isDataAvailable = function () {
        if (this.dataArray && this.dataArray.byteLength > 0)
            return true;
        return false;
    };
    WEBGLBuffer.prototype.setGLTFAccessor = function (accessor) {
        this.GLTFAccessor = accessor;
    };
    WEBGLBuffer.prototype.getGLTFAccessor = function () {
        return this.GLTFAccessor;
    };
    WEBGLBuffer.prototype.getGLTFAccessorId = function () {
        return this.GLTFAccessor.getAccessor().uid;
        //return this.GLTFAccessor.accessor.uid;
    };
    WEBGLBuffer.prototype.updateData = function (data) {
        if (data) {
            this.bind();
            this.dataArray = data;
            this.GLContext.bufferData(this.target, this.dataArray, this.usage);
            this.unbind();
        }
    };
    WEBGLBuffer.prototype.clearData = function () {
        this.dataArray = null;
        this.promise = null;
    };
    WEBGLBuffer.prototype.clearPromise = function () {
        this.promise = null;
    };
    WEBGLBuffer.prototype.getData = function () {
        var scope = this;
        if (this.promise === null)
            this.promise = new Promise(function (resolve, reject) {
                if (scope.isDataAvailable() === false) {
                    if (scope.GLTFAccessor) {
                        if (scope.isLoading === false) {
                            scope.isLoading = true;
                            var promise = scope.GLTFAccessor.getData();
                            promise.then(function (ArrayBuffer) {
                                scope.updateData(ArrayBuffer);
                                scope.isLoading = false;
                                resolve(true);
                            })
                                .catch(function (error) {
                                reject(error);
                            })
                                .finally(function () {
                                scope.isLoading = false;
                            });
                        }
                        else {
                            reject(errorCode.downloadInProgress);
                        }
                    }
                    else {
                        reject('Accessor info missing in WEBGLBuffer');
                    }
                }
                else
                    resolve(true);
            });
        return this.promise;
    };
    WEBGLBuffer.prototype.updateBufferData = function (arrayBufferData) {
        var typedBuffer = this.GLTFAccessor.getTypedBuffer(arrayBufferData);
        this.updateData(typedBuffer);
    };
    WEBGLBuffer.prototype.replaceBufferData = function (url, arrayBufferData) {
        var scope = this;
        var promise = null;
        if (this.GLTFAccessor) {
            var bufferURL = this.GLTFAccessor.getURI();
            if (bufferURL === url) {
                this.promise = new Promise(function (resolve, reject) {
                    var promise = scope.GLTFAccessor.replaceBufferData(arrayBufferData);
                    promise.then(function (arrayBuffer) {
                        scope.updateData(arrayBuffer);
                        resolve(true);
                    })
                        .catch(function (error) {
                        reject(error);
                    })
                        .finally(function () {
                    });
                });
                promise = this.promise;
            }
        }
        return promise;
    };
    WEBGLBuffer.prototype.getBufferViewIndex = function () {
        if (this.GLTFAccessor) {
            var accessor = this.GLTFAccessor.getAccessor();
            if (accessor)
                return accessor.bufferView;
        }
        return -1;
    };
    return WEBGLBuffer;
}());var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["NONE"] = -1] = "NONE";
    ShaderType[ShaderType["VERTEX"] = 0] = "VERTEX";
    ShaderType[ShaderType["FRAGMENT"] = 1] = "FRAGMENT";
})(ShaderType || (ShaderType = {}));
var CameraType;
(function (CameraType) {
    CameraType["Perspective"] = "PERSPECTIVE";
    CameraType["Ortho"] = "ORTHOGRAPHIC";
})(CameraType || (CameraType = {}));
var BufferUsage;
(function (BufferUsage) {
    BufferUsage[BufferUsage["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
    BufferUsage[BufferUsage["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
    BufferUsage[BufferUsage["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW"; //35048
})(BufferUsage || (BufferUsage = {}));
var BufferTarget;
(function (BufferTarget) {
    BufferTarget[BufferTarget["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
    BufferTarget[BufferTarget["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER"; //34963
})(BufferTarget || (BufferTarget = {}));
var TextureType;
(function (TextureType) {
    TextureType[TextureType["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
    TextureType[TextureType["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
    TextureType[TextureType["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
    TextureType[TextureType["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
    TextureType[TextureType["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
    TextureType[TextureType["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
    TextureType[TextureType["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
    TextureType[TextureType["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(TextureType || (TextureType = {}));
var WEBGLTYPESIZES;
(function (WEBGLTYPESIZES) {
    WEBGLTYPESIZES[WEBGLTYPESIZES["SCALAR"] = 1] = "SCALAR";
    WEBGLTYPESIZES[WEBGLTYPESIZES["VEC2"] = 2] = "VEC2";
    WEBGLTYPESIZES[WEBGLTYPESIZES["VEC3"] = 3] = "VEC3";
    WEBGLTYPESIZES[WEBGLTYPESIZES["VEC4"] = 4] = "VEC4";
    WEBGLTYPESIZES[WEBGLTYPESIZES["MAT2"] = 4] = "MAT2";
    WEBGLTYPESIZES[WEBGLTYPESIZES["MAT3"] = 9] = "MAT3";
    WEBGLTYPESIZES[WEBGLTYPESIZES["MAT4"] = 16] = "MAT4";
})(WEBGLTYPESIZES || (WEBGLTYPESIZES = {}));
var WEBGLCONSTANTS;
(function (WEBGLCONSTANTS) {
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT"] = 5126] = "FLOAT";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
    WEBGLCONSTANTS[WEBGLCONSTANTS["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
    WEBGLCONSTANTS[WEBGLCONSTANTS["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    WEBGLCONSTANTS[WEBGLCONSTANTS["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    WEBGLCONSTANTS[WEBGLCONSTANTS["LINEAR"] = 9729] = "LINEAR";
    WEBGLCONSTANTS[WEBGLCONSTANTS["REPEAT"] = 10497] = "REPEAT";
    WEBGLCONSTANTS[WEBGLCONSTANTS["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
})(WEBGLCONSTANTS || (WEBGLCONSTANTS = {}));
var RenderMode;
(function (RenderMode) {
    RenderMode[RenderMode["POINTS"] = 0] = "POINTS";
    RenderMode[RenderMode["LINES"] = 1] = "LINES";
    RenderMode[RenderMode["LINE_LOOP"] = 2] = "LINE_LOOP";
    RenderMode[RenderMode["LINE_STRIP"] = 3] = "LINE_STRIP";
    RenderMode[RenderMode["TRIANGLES"] = 4] = "TRIANGLES";
    RenderMode[RenderMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    RenderMode[RenderMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
})(RenderMode || (RenderMode = {}));
var WEBGLCOMPONENTTYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
};
var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["NONE"] = 0] = "NONE";
    AnimationType[AnimationType["LINEAR"] = 1] = "LINEAR";
    AnimationType[AnimationType["EIGENNONCOMPEX"] = 2] = "EIGENNONCOMPEX";
    AnimationType[AnimationType["EIGENCOMPLE"] = 3] = "EIGENCOMPLE";
    AnimationType[AnimationType["TRANSIENT"] = 4] = "TRANSIENT";
    AnimationType[AnimationType["LEGEND"] = 5] = "LEGEND";
    AnimationType[AnimationType["VIEWPOINT"] = 6] = "VIEWPOINT";
})(AnimationType || (AnimationType = {}));var WebGLElementArrayBuffer = /** @class */ (function (_super) {
    __extends(WebGLElementArrayBuffer, _super);
    function WebGLElementArrayBuffer(_uid, usage, data) {
        var _this = _super.call(this, _uid, usage) || this;
        _this.target = BufferTarget.ELEMENT_ARRAY_BUFFER;
        if (data)
            _this.updateData(data);
        return _this;
    }
    return WebGLElementArrayBuffer;
}(WEBGLBuffer));var WebGLArrayBufferAttribute = /** @class */ (function () {
    function WebGLArrayBufferAttribute() {
        this.name = null;
        this.position = null;
        this.normal = null;
        this.color = null;
        this.texCoord = null;
        this.value = null;
        this.CustomBuffers = {};
        this.isLoading = false;
        this.promise = null;
    }
    WebGLArrayBufferAttribute.prototype.delete = function () {
        if (this.position) {
            this.position.delete();
        }
        if (this.normal) {
            this.normal.delete();
        }
        if (this.color) {
            this.color.delete();
        }
        if (this.texCoord) {
            this.texCoord.delete();
        }
        if (this.value) {
            this.value.delete();
        }
        if (this.CustomBuffers) {
            for (var key in this.CustomBuffers) {
                if (this.CustomBuffers.hasOwnProperty(key)) {
                    var element = this.CustomBuffers[key];
                    element.delete();
                }
            }
        }
    };
    WebGLArrayBufferAttribute.prototype.isDataAvailable = function (useTexture) {
        if (this.position && this.position.isDataAvailable() === false)
            return false;
        if (this.normal && this.normal.isDataAvailable() === false)
            return false;
        if (this.color && this.color.isDataAvailable() === false)
            return false;
        if (useTexture === true && this.texCoord && this.texCoord.isDataAvailable() === false)
            return false;
        if (useTexture === true && this.value && this.value.isDataAvailable() === false)
            return false;
        /*
        if(this.CustomBuffers){
            for (const key in this.CustomBuffers) {
                if (this.CustomBuffers.hasOwnProperty(key)) {
                    if(this.CustomBuffers[key].isDataAvailable() === false)
                        return false;
                }
            }
        }
        */
        return true;
    };
    WebGLArrayBufferAttribute.prototype.clearPromise = function () {
        this.promise = null;
    };
    WebGLArrayBufferAttribute.prototype.clearData = function () {
        if (this.position) {
            this.position.clearData();
            this.position = null;
        }
        if (this.normal) {
            this.normal.clearData();
            this.normal = null;
        }
        if (this.color) {
            this.color.clearData();
            this.color = null;
        }
        if (this.texCoord) {
            this.texCoord.clearData();
            this.texCoord = null;
        }
        if (this.value) {
            this.value.clearData();
            this.value = null;
        }
        if (this.CustomBuffers) {
            for (var key in this.CustomBuffers) {
                if (this.CustomBuffers.hasOwnProperty(key)) {
                    var element = this.CustomBuffers[key];
                    element.clearData();
                    delete this.CustomBuffers[key];
                }
            }
        }
    };
    WebGLArrayBufferAttribute.prototype.getData = function (useTexture) {
        var scope = this;
        if (this.promise === null)
            this.promise = new Promise(function (resolve, reject) {
                if (scope.isDataAvailable(useTexture) === false) {
                    if (scope.isLoading === false) {
                        var promisesArray = [];
                        scope.isLoading = true;
                        if (scope.position && scope.position.isDataAvailable() === false)
                            promisesArray.push(scope.position.getData());
                        /*
                        if(scope.normal && scope.normal.isDataAvailable() === false)
                            promisesArray.push(scope.normal.getData());

                        if(scope.color && scope.color.isDataAvailable() === false)
                            promisesArray.push(scope.color.getData());

                        if(useTexture === true && scope.texCoord && scope.texCoord.isDataAvailable() === false)
                            promisesArray.push(scope.texCoord.getData());

                        if(useTexture === true && scope.value && scope.value.isDataAvailable() === false)
                            promisesArray.push(scope.value.getData());

                        if(scope.CustomBuffers){
                            for (const key in scope.CustomBuffers) {
                                if (scope.CustomBuffers.hasOwnProperty(key)) {
                                    if(scope.CustomBuffers[key].isDataAvailable() === false)
                                        promisesArray.push(scope.CustomBuffers[key].getData());
                                }
                            }
                        }
                        */
                        Promise.all(promisesArray).then(function (values) {
                            resolve(true);
                        })
                            .catch(function (error) {
                            reject(error);
                        })
                            .finally(function () {
                            scope.isLoading = false;
                        });
                    }
                    else {
                        reject(errorCode.downloadInProgress);
                    }
                }
                else
                    resolve(true);
            });
        return this.promise;
    };
    WebGLArrayBufferAttribute.prototype.getBufferViewIndex = function (useTexture) {
        var bufferViewIndexes = [];
        if (this.position && this.position.isDataAvailable() === false) {
            var index = this.position.getBufferViewIndex();
            if (index > -1)
                bufferViewIndexes.push(index);
        }
        if (this.normal && this.normal.isDataAvailable() === false) {
            var index = this.normal.getBufferViewIndex();
            if (index > -1)
                bufferViewIndexes.push(index);
        }
        if (this.color && this.color.isDataAvailable() === false) {
            var index = this.color.getBufferViewIndex();
            if (index > -1)
                bufferViewIndexes.push(index);
        }
        if (useTexture === true && this.texCoord && this.texCoord.isDataAvailable() === false) {
            var index = this.texCoord.getBufferViewIndex();
            if (index > -1)
                bufferViewIndexes.push(index);
        }
        if (useTexture === true && this.value && this.value.isDataAvailable() === false) {
            var index = this.value.getBufferViewIndex();
            if (index > -1)
                bufferViewIndexes.push(index);
        }
        /*
        if(this.CustomBuffers){
            for (const key in this.CustomBuffers) {
                if (this.CustomBuffers.hasOwnProperty(key)) {
                    if(this.CustomBuffers[key].isDataAvailable() === false)
                        {
                            let index = this.CustomBuffers[key].getBufferViewIndex();
                            if(index > -1)
                            bufferViewIndexes.push(index);
                        }
                }
            }
        }
        */
        return bufferViewIndexes;
    };
    return WebGLArrayBufferAttribute;
}());var WebGLArrayBuffer = /** @class */ (function (_super) {
    __extends(WebGLArrayBuffer, _super);
    function WebGLArrayBuffer(_uid, usage, data) {
        var _this = _super.call(this, _uid, usage) || this;
        _this.target = BufferTarget.ARRAY_BUFFER;
        if (data)
            _this.updateData(data);
        return _this;
    }
    return WebGLArrayBuffer;
}(WEBGLBuffer));/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create$1() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$2() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone$1(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues$1(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$2();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}());/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$3() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues$2(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale$2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$1(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4$1(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$3();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}());/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create$4() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply$1(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues$3 = fromValues$2;
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul$1 = multiply$1;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize$2 = normalize$1;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

(function () {
  var tmpvec3 = create$2();
  var xUnitVec3 = fromValues$1(1, 0, 0);
  var yUnitVec3 = fromValues$1(0, 1, 0);
  return function (out, a, b) {
    var dot$1 = dot(a, b);

    if (dot$1 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot$1 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot$1;
      return normalize$2(out, out);
    }
  };
}());
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

(function () {
  var temp1 = create$4();
  var temp2 = create$4();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}());
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

(function () {
  var matr = create();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize$2(out, fromMat3(out, matr));
  };
}());var Utility;
(function (Utility) {
    /**
     * Create a Random UUID/GUID.
     * {@link http://codingrepo.com/regular-expression/2015/11/23/javascript-generate-uuidguid-for-rfc-4122-version-4-compliant-with-regular-expression/ | (Reference Links)}
     * @return {string} A 16 digit UUID/GUID string.
     */
    Utility.getGUID = function getGUID() {
        var cryptoObj = window.crypto;
        if (cryptoObj && cryptoObj.getRandomValues) {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = cryptoObj.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        else {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    };
    /**
     * Check the given item is JSON object or not .
     * @param  {object} item - item to be tested.
     * @return {boolean} Returns true/false.
     */
    Utility.isJson = function isJson(item) {
        item = typeof item !== 'string' ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        }
        catch (e) {
            return false;
        }
        if (typeof item === 'object' && item !== null) {
            return true;
        }
        return false;
    };
    /**
     * Check the given item is JSON object or not .
     * @param  {object} object - object.
     * @param  {Function} callback - Callbach function.
     * @param  {object}  [thisObj] - This object of the calling function.
     * @return {Promise} Returns promise object.
     */
    Utility.each = function each(object, callback, thisObj) {
        if (!object) {
            return Promise.resolve();
        }
        var results;
        var fns = [];
        if (Object.prototype.toString.call(object) === '[object Array]') {
            results = [];
            var length_1 = object.length;
            for (var idx = 0; idx < length_1; idx++) {
                var value = callback.call(thisObj || this, object[idx], idx);
                if (value) {
                    fns.push(value);
                    if (value instanceof Promise) {
                        value.then(function (key, value) {
                            results[key] = value;
                        }.bind(this, idx));
                    }
                    else {
                        results[idx] = value;
                    }
                }
            }
        }
        else {
            results = {};
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var value = callback.call(thisObj || this, object[key], key);
                    if (value) {
                        fns.push(value);
                        if (value instanceof Promise) {
                            value.then(function (key, value) {
                                results[key] = value;
                            }.bind(this, key));
                        }
                        else {
                            results[key] = value;
                        }
                    }
                }
            }
        }
        return Promise.all(fns).then(function () {
            return results;
        });
    };
    /**
     * Convert Uint8Array to string .
     * @param  {Uint8Array} array - Uint8Array.
     * @return {string} Returns string value.
     */
    Utility.convertUint8ArrayToString = function convertUint8ArrayToString(array) {
        // Avoid the String.fromCharCode.apply(null, array) shortcut, which
        // throws a 'maximum call stack size exceeded' error for large arrays.
        var s = '';
        for (var i = 0, il = array.length; i < il; i++) {
            s += String.fromCharCode(array[i]);
        }
        return s;
    };
    Utility.CopyToClipboard = function CopyToClipboard(dataURL) {
        try {
            var img = document.createElement('img');
            img.id = 'imgCap';
            img.src = dataURL;
            document.body.appendChild(img);
            var selection = null;
            var range = null;
            if (window.getSelection) {
                selection = window.getSelection();
                selection.removeAllRanges();
                range = document.createRange();
                range.selectNode(img);
                selection.addRange(range);
            }
            var successStatus = document.execCommand('copy');
            selection.removeAllRanges();
            range = null;
            selection = null;
            document.body.removeChild(img);
            return successStatus;
        }
        catch (err) {
            //console.warn('Clipboard copying failed ', err);
        }
        return false;
    };
    Utility.SaveToDisk = function SaveToDisk(fileURL, fileName, mimetype, bmpBlob) {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var edge = ua.indexOf('Edge');
        if (!mimetype)
            mimetype = 'application/octet-stream'; //'image/png';
        if (msie > 0 || edge > 0 || 'msExitFullscreen' in document) {
            //alert( 'ie ' );
            if (bmpBlob === null) {
                var replaceText = 'data:' + mimetype + ';base64,';
                var data = atob(fileURL.substring(replaceText.length)), asArray = new Uint8Array(data.length);
                for (var i = 0, len = data.length; i < len; ++i) {
                    asArray[i] = data.charCodeAt(i);
                }
                var blobObject = new Blob([asArray.buffer], { type: mimetype });
                window.navigator.msSaveBlob(blobObject, fileName);
            }
            else
                window.navigator.msSaveBlob(bmpBlob, fileName);
            //window.navigator.msSaveOrOpenBlob(blobObject, fileName);
        }
        else {
            var save = document.createElement('a');
            save.href = fileURL;
            save.target = '_blank';
            save.download = fileName || fileURL;
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            save.dispatchEvent(evt);
            (window.URL).revokeObjectURL(save.href);
            //(window.URL || window.webkitURL).revokeObjectURL(save.href); //  window.webkitURL error in typescript typedoc generation
        }
    };
    Utility.getElementInsideContainer = function (containerID, childID) {
        var elm = null;
        var topContainer = document.getElementById(containerID);
        if (topContainer) {
            var elms = topContainer.getElementsByTagName("*");
            for (var i = 0; i < elms.length; i++) {
                if (elms[i].id === childID) {
                    elm = elms[i];
                    break;
                }
            }
        }
        return elm;
    };
    var CanvasToBMP = /** @class */ (function () {
        function CanvasToBMP() {
        }
        /**
         * Convert a canvas element to ArrayBuffer containing a BMP file
         * with support for 32-bit (alpha).
         *
         * Note that CORS requirement must be fulfilled.
         *
         * @param {HTMLCanvasElement} canvas - the canvas element to convert
         * @return {ArrayBuffer}
         */
        CanvasToBMP.toArrayBuffer = function (canvas) {
            var w = canvas.width, h = canvas.height, w4 = w * 4, idata = canvas.getContext('2d').getImageData(0, 0, w, h), data32 = new Uint32Array(idata.data.buffer), // 32-bit representation of canvas
            stride = Math.floor((32 * w + 31) / 32) * 4, // row length incl. padding
            pixelArraySize = stride * h, // total bitmap size
            fileLength = 122 + pixelArraySize, // header size is known + bitmap
            file = new ArrayBuffer(fileLength), // raw byte buffer (returned)
            view = new DataView(file), // handle endian, reg. width etc.
            pos = 0, x, y = 0, p, s = 0, a, v;
            // write file header
            setU16(0x4d42); // BM
            setU32(fileLength); // total length
            pos += 4; // skip unused fields
            setU32(0x7a); // offset to pixels
            // DIB header
            setU32(108); // header size
            setU32(w);
            setU32(-h >>> 0); // negative = top-to-bottom
            setU16(1); // 1 plane
            setU16(32); // 32-bits (RGBA)
            setU32(3); // no compression (BI_BITFIELDS, 3)
            setU32(pixelArraySize); // bitmap size incl. padding (stride x height)
            setU32(2835); // pixels/meter h (~72 DPI x 39.3701 inch/m)
            setU32(2835); // pixels/meter v
            pos += 8; // skip color/important colors
            setU32(0xff0000); // red channel mask
            setU32(0xff00); // green channel mask
            setU32(0xff); // blue channel mask
            setU32(0xff000000); // alpha channel mask
            setU32(0x57696e20); // ' win' color space
            // bitmap data, change order of ABGR to BGRA
            while (y < h) {
                p = 0x7a + y * stride; // offset + stride x height
                x = 0;
                while (x < w4) {
                    v = data32[s++]; // get ABGR
                    a = v >>> 24; // alpha channel
                    view.setUint32(p + x, (v << 8) | a); // set BGRA
                    x += 4;
                }
                y++;
            }
            return file;
            // helper method to move current buffer position
            function setU16(data) { view.setUint16(pos, data, true); pos += 2; }
            function setU32(data) { view.setUint32(pos, data, true); pos += 4; }
        };
        /**
         * Converts a canvas to BMP file, returns a Blob representing the
         * file. This can be used with URL.createObjectURL().
         * Note that CORS requirement must be fulfilled.
         *
         * @param {HTMLCanvasElement} canvas - the canvas element to convert
         * @return {Blob}
         */
        CanvasToBMP.toBlob = function (canvas) {
            return new Blob([this.toArrayBuffer(canvas)], {
                type: 'image/bmp'
            });
        };
        /**
         * Converts the canvas to a data-URI representing a BMP file.
         * Note that CORS requirement must be fulfilled.
         *
         * @param canvas
         * @return {string}
         */
        CanvasToBMP.toDataURL = function (canvas) {
            var buffer = new Uint8Array(this.toArrayBuffer(canvas)), bs = '', i = 0, l = buffer.length;
            while (i < l)
                bs += String.fromCharCode(buffer[i++]);
            return 'data:image/bmp;base64,' + btoa(bs);
        };
        return CanvasToBMP;
    }());
    Utility.CanvasToBMP = CanvasToBMP;
    /**
     * Encode and decode the base64-string.
     * {@link https://github.com/niklasvh/base64-arraybuffer| (Reference Links)}
     * Licensed under the MIT license.
     */
    var base64 = /** @class */ (function () {
        function base64() {
        }
        /**
         * Encode the arraybuffer to base64 encode string.
         * @param {ArrayBuffer} arraybuffer - Arraybuffer data.
         * @return {string} Base64 encode string.
         */
        base64.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
            for (i = 0; i < len; i += 3) {
                base64 += this.chars[bytes[i] >> 2];
                base64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                base64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                base64 += this.chars[bytes[i + 2] & 63];
            }
            if ((len % 3) === 2) {
                base64 = base64.substring(0, base64.length - 1) + '=';
            }
            else if (len % 3 === 1) {
                base64 = base64.substring(0, base64.length - 2) + '==';
            }
            return base64;
        };
        /**
         * Decode the base64 encode string to arraybuffer.
         * @param {string} base64 - Base64 encode string.
         * @return {ArrayBuffer} Arraybuffer data.
         */
        base64.decode = function (base64) {
            var lookup = new Uint8Array(256);
            for (var i_1 = 0; i_1 < this.chars.length; i_1++) {
                lookup[this.chars.charCodeAt(i_1)] = i_1;
            }
            var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
            if (base64[base64.length - 1] === '=') {
                bufferLength--;
                if (base64[base64.length - 2] === '=') {
                    bufferLength--;
                }
            }
            var arraybuffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(arraybuffer);
            for (i = 0; i < len; i += 4) {
                encoded1 = lookup[base64.charCodeAt(i)];
                encoded2 = lookup[base64.charCodeAt(i + 1)];
                encoded3 = lookup[base64.charCodeAt(i + 2)];
                encoded4 = lookup[base64.charCodeAt(i + 3)];
                bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
            }
            return arraybuffer;
        };
        base64.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        return base64;
    }());
    Utility.base64 = base64;
    var Registry = /** @class */ (function () {
        function Registry() {
            this.objects = {};
        }
        Registry.prototype.get = function (key) {
            return this.objects[key];
        };
        Registry.prototype.add = function (key, object) {
            this.objects[key] = object;
        };
        Registry.prototype.remove = function (key) {
            delete this.objects[key];
        };
        Registry.prototype.removeAll = function () {
            this.objects = {};
        };
        return Registry;
    }());
    Utility.Registry = Registry;
    Utility.resolveURL = function resolveURL(url, path) {
        // Invalid URL
        if (typeof url !== 'string' || url === '')
            return '';
        // Host Relative URL
        if (/^https?:\/\//i.test(path) && /^\//.test(url)) {
            path = path.replace(/(^https?:\/\/[^\/]+).*/i, '$1');
        }
        // Absolute URL http://,https://,//
        if (/^(https?:)?\/\//i.test(url))
            return url;
        // Data URI
        if (/^data:.*,.*$/i.test(url))
            return url;
        // Blob URL
        if (/^blob:.*$/i.test(url))
            return url;
        // Relative URL
        return path + url;
    };
    Utility.getAllLeafNode = function (tree) {
        var leafNodes = [];
        if (tree.children) {
            tree.children.forEach(function (element) {
                var nodes = Utility.getAllLeafNode(element);
                leafNodes = __spread(leafNodes, nodes);
            });
        }
        else {
            leafNodes = __spread(leafNodes, tree);
        }
        return leafNodes;
    };
    Utility.getAvgRot = function (matrices) {
        var out = create$1();
        if (matrices.length > 0) {
            if (matrices.length == 1) {
                var w = matrices[0];
                return fromValues(w[0], w[1], w[2], w[3], w[4], w[5], w[6], w[7], w[8], w[9], w[10], w[11], 0, 0, 0, 1);
            }
            var q_1 = null;
            matrices.forEach(function (mat) {
                var curQ = create$4();
                getRotation(curQ, mat);
                if (q_1) {
                    slerp(q_1, q_1, curQ, 0.5);
                }
                else {
                    q_1 = curQ;
                }
            });
            fromQuat(out, q_1);
            return out;
        }
        else {
            //console.warn(`Utility.ts line 518 : matices are empty`);
            return null;
        }
    };
    Utility.getAvgTrans = function (matrices) {
        var out = create$2();
        if (matrices.length > 0) {
            var trans_1 = create$2();
            matrices.forEach(function (m) {
                getTranslation(trans_1, m);
                add(out, out, trans_1);
            });
            return scale$1(out, out, 1 / matrices.length);
        }
        else {
            //console.warn(`Utility.ts line 518 : matices are empty`);
            return null;
        }
    };
    Utility.getPerpendicular = function (input) {
        var n = create$2();
        normalize(n, input);
        var X = fromValues$1(1, 0, 0);
        var Y = fromValues$1(0, 1, 0);
        var Z = fromValues$1(0, 0, 1);
        var dots = [dot(input, X), dot(input, Y), dot(input, Z)];
        var minIndex = Utility.getMinIndex(dots);
        var i = create$2();
        var n1 = n[0];
        var n2 = n[1];
        var n3 = n[2];
        switch (minIndex) {
            case 0:
                i = fromValues$1(1 - n1 * n1, -n1 * n2, -n1 * n3);
                break;
            case 1:
                i = fromValues$1(-n1 * n2, 1 - n2 * n2, -n2 * n3);
                break;
            case 2:
                i = fromValues$1(-n1 * n3, -n2 * n3, 1 - n3 * n3);
                break;
        }
        return i;
    };
    Utility.getMinIndex = function (arr) {
        return arr.indexOf(Math.min.apply(Math, __spread(arr)));
    };
    Utility.getOrthoAxes = function (input) {
        var i = Utility.getPerpendicular(input);
        var n = create$2();
        var j = create$2();
        normalize(n, input);
        cross(j, n, i);
        return {
            x: i,
            y: j
        };
    };
    Utility.formMat4 = function (x, y, z, t) {
        var out = create$1();
        out[0] = x[0];
        out[1] = x[1];
        out[2] = x[2];
        out[4] = y[0];
        out[5] = y[1];
        out[6] = y[2];
        out[8] = z[0];
        out[9] = z[1];
        out[10] = z[2];
        out[12] = t[0];
        out[13] = t[1];
        out[14] = t[2];
        return out;
    };
    Utility.getPlaneEqnFromTransfromMat = function (transform) {
        var n = fromValues$1(transform[8], transform[9], transform[10]);
        var d = dot(n, fromValues$1(transform[12], transform[13], transform[14]));
        return [n[0], n[1], n[2], -d];
    };
    Utility.orthoToPerspective = function (left, right, top, bottom, near, far) {
        var fov = 2 * 180 / Math.PI * (Math.atan2(top, near));
        var aspect = (right - left) / (top - bottom);
        return {
            fov: fov,
            aspect: aspect,
            near: near,
            far: far
        };
    };
})(Utility || (Utility = {}));var Texture = /** @class */ (function () {
    function Texture(name, textureType) {
        this.name = name;
        if (AppState.GLContext) {
            this.texture = AppState.GLContext.createTexture();
            this.textureType = textureType | TextureType.TEXTURE_2D;
            this.level = 0;
            this.internalformat = AppState.GLContext.RGB;
            this.width = 0;
            this.height = 0;
            this.border = 0;
            this.format = AppState.GLContext.RGB;
            this.type = AppState.GLContext.UNSIGNED_BYTE;
            this.textureData = null;
            this.index = Texture.textureCounter++;
            this.isBind = false;
            this.texCoordIndex = 0;
        }
    }
    Texture.prototype.setTextureType = function (textureType) {
        if (AppState.GLContext) {
            this.textureType = textureType;
            return true;
        }
        return false;
    };
    Texture.prototype.bind = function () {
        if (AppState.GLContext && this.isBind == false) {
            var textureSlot = AppState.GLContext.TEXTURE0 + this.index;
            AppState.GLContext.activeTexture(textureSlot);
            AppState.GLContext.bindTexture(this.textureType, this.texture);
            this.isBind = true;
        }
    };
    Texture.prototype.unBind = function () {
        if (AppState.GLContext && this.isBind == true) {
            AppState.GLContext.bindTexture(this.textureType, null);
            this.isBind = false;
        }
    };
    Texture.prototype.setTextureData = function (txtData) {
        this.textureData = txtData;
    };
    Texture.prototype.setTextureDataFromImage = function (img) {
        if (AppState.GLContext) {
            this.setTextureData(img);
            //AppState.GLContext.bindTexture(this.textureType, this.texture);
            this.bind();
            AppState.GLContext.texImage2D(this.textureType, this.level, this.internalformat, this.format, this.type, img);
        }
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MAG_FILTER, AppState.GLContext.NEAREST);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MIN_FILTER, AppState.GLContext.NEAREST);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_S, AppState.GLContext.CLAMP_TO_EDGE);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_T, AppState.GLContext.CLAMP_TO_EDGE);
        //AppState.GLContext.bindTexture(AppState.GLContext.TEXTURE_2D, null);
        this.unBind();
    };
    Texture.prototype.setTextureDataFromArrayBuffer = function (arrayBuffer) {
        if (AppState.GLContext) {
            var textureData = arrayBuffer;
            this.width = textureData.length / 3;
            this.height = 1;
            this.setTextureData(arrayBuffer);
            this.bind();
            AppState.GLContext.texImage2D(this.textureType, this.level, this.internalformat, this.width, this.height, this.border, this.format, this.type, arrayBuffer);
            AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MAG_FILTER, AppState.GLContext.NEAREST);
            AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MIN_FILTER, AppState.GLContext.NEAREST);
            AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_S, AppState.GLContext.CLAMP_TO_EDGE);
            AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_T, AppState.GLContext.CLAMP_TO_EDGE);
            //AppState.GLContext.bindTexture(AppState.GLContext.TEXTURE_2D, null);
            this.unBind();
        }
    };
    Texture.prototype.isPowerOf2 = function (value) {
        return (value & (value - 1)) == 0;
    };
    Texture.prototype.setEmptyTexture = function () {
        AppState.GLContext.texImage2D(this.textureType, this.level, this.internalformat, this.width, this.height, this.border, this.format, this.type, null);
    };
    Texture.prototype.setFilterOptions = function (options) {
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MAG_FILTER, options.magFilter);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_MIN_FILTER, options.minFilter);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_S, options.wrap_s);
        AppState.GLContext.texParameteri(AppState.GLContext.TEXTURE_2D, AppState.GLContext.TEXTURE_WRAP_T, options.wrap_t);
    };
    Texture.prototype.isDataAvailable = function () {
        if (this.textureData)
            return true;
        return false;
    };
    Texture.prototype.getData = function () {
    };
    Texture.textureCounter = 0;
    return Texture;
}());
var TextureManager = /** @class */ (function () {
    function TextureManager() {
    }
    TextureManager.getTextureByName = function (name) {
        var texture = this.textureCache.get(name);
        if (texture)
            return texture;
        return null;
    };
    TextureManager.parseServerJSON = function (textureJson) {
        if (textureJson && textureJson.texture) {
            if (textureJson.texture.source !== null && textureJson.texture.source !== undefined) {
                var textureName = 'texture_' + textureJson.texture.source;
                var texture_1 = this.textureCache.get(textureName);
                if (texture_1 === undefined || texture_1 === null) {
                    texture_1 = new Texture(textureName);
                    texture_1.texCoordIndex = textureJson.texCoord;
                    var image_1 = new Image();
                    image_1.onload = function (event) {
                        texture_1.setTextureDataFromImage(image_1);
                    };
                    if (textureJson.texture.data)
                        image_1.src = textureJson.texture.data;
                    else if (textureJson.texture.bufferViewLoader) {
                        var promise = textureJson.texture.bufferViewLoader.getData();
                        promise.then(function (arrayBuffer) {
                            var stringData = Utility.convertUint8ArrayToString(new Uint8Array(arrayBuffer));
                            image_1.src = 'data:' + textureJson.texture.mimeType + ';base64,' + btoa(stringData);
                        })
                            .catch(function (error) {
                            throw new Error(error);
                            //store the   textureJson.texture.bufferViewData.deferredBufferViewLoader in local variable to load later using getdata fn
                        });
                    }
                    else {
                        throw new Error("Texture data missing");
                    }
                    this.textureCache.add(textureName, texture_1);
                }
                return texture_1;
            }
        }
        return null;
    };
    TextureManager.textureCache = new Utility.Registry();
    return TextureManager;
}());var Material = /** @class */ (function () {
    function Material(name) {
        this.name = name;
        this.shader = null;
        this.diffuseColor = new Array(1.0, 1.0, 1.0);
        this.specularColor = new Array(0.2, 0.2, 0.2);
        this.ambientColor = new Array(0.5, 0.5, 0.5);
        this.emissiveColor = new Array(0.0, 0.0, 0.0);
        this.shininess = 128;
        this.transparency = 0.0;
        this.ambientIntensity = 0.5;
        this.isColorMaskEnabled = true;
        this.useTexture = false;
        this.isTextureAvailable = false;
        this.texture = null;
        this.useUserDefinedColor = false;
        this.userDefinedColor = new Array(0.0, 0.0, 0.0);
    }
    Material.prototype.parseServerJSON = function (materialJson) {
        //console.log(materialJson)
        if (materialJson.emissiveFactor) {
            this.emissiveColor = materialJson.emissiveFactor;
        }
        if (materialJson.pbrMetallicRoughness) {
            if (materialJson.pbrMetallicRoughness.baseColorFactor)
                this.diffuseColor = materialJson.pbrMetallicRoughness.baseColorFactor;
            if (materialJson.pbrMetallicRoughness.baseColorTexture) {
                this.texture = TextureManager.parseServerJSON(materialJson.pbrMetallicRoughness.baseColorTexture);
                this.isTextureAvailable = true;
            }
        }
    };
    Material.prototype.setTransparency = function (value) {
        this.transparency = value;
    };
    Material.prototype.setColorMask = function (value) {
        this.isColorMaskEnabled = value;
    };
    Material.prototype.setUseTexture = function (value) {
        this.useTexture = value;
    };
    Material.prototype.setTextureData = function (textureData) {
        if (this.texture) {
            this.texture.setTextureDataFromArrayBuffer(new Uint8Array(textureData));
        }
    };
    Material.prototype.setUserDefinedColor = function (value) {
        if (value.length >= 3) {
            this.userDefinedColor[0] = value[0];
            this.userDefinedColor[1] = value[1];
            this.userDefinedColor[2] = value[2];
        }
        else {
            throw new Error("Invalide number of color values");
        }
    };
    Material.prototype.setUseUserDefinedColor = function (value) {
        this.useUserDefinedColor = value;
    };
    Material.prototype.clone = function () {
        var m = Object.create(this);
        m.diffuseColor = __spread(this.diffuseColor);
        m.specularColor = __spread(this.specularColor);
        m.ambientColor = __spread(this.ambientColor);
        m.emissiveColor = __spread(this.emissiveColor);
        m.userDefinedColor = __spread(this.userDefinedColor);
        return m;
    };
    return Material;
}());
var MaterialManager = /** @class */ (function () {
    function MaterialManager() {
    }
    MaterialManager.getMaterailByName = function (name) {
        var material = this.materialCache.get(name);
        if (material)
            return material;
        return null;
    };
    MaterialManager.parseServerJSON = function (materialJson) {
        if (materialJson) {
            if (materialJson.id) {
                var material_name = materialJson.id;
                var material = this.materialCache.get(material_name);
                if (material === undefined || material === null) {
                    material = new Material(material_name);
                    material.parseServerJSON(materialJson);
                    this.materialCache.add(material_name, material);
                }
                return material;
            }
        }
        return null;
    };
    MaterialManager.materialCache = new Utility.Registry();
    return MaterialManager;
}());var WEBGLBufferCache = /** @class */ (function () {
    function WEBGLBufferCache() {
    }
    WEBGLBufferCache.get = function (key) {
        return WEBGLBufferCache.cache.get(key);
    };
    WEBGLBufferCache.add = function (key, object) {
        WEBGLBufferCache.cache.add(key, object);
    };
    WEBGLBufferCache.remove = function (key) {
        WEBGLBufferCache.cache.remove(key);
    };
    WEBGLBufferCache.removeAll = function () {
        WEBGLBufferCache.cache.removeAll();
    };
    WEBGLBufferCache.getAll = function () {
        return Object.values(WEBGLBufferCache.cache.objects);
    };
    WEBGLBufferCache.cache = new Utility.Registry();
    return WEBGLBufferCache;
}());var BoundingBox = /** @class */ (function () {
    function BoundingBox() {
        this.Min = {
            x: 0,
            y: 0,
            z: 0
        };
        this.Max = {
            x: 0,
            y: 0,
            z: 0
        };
        this.isDefault = true;
    }
    BoundingBox.prototype.getSquaredDistance = function () {
        return Math.sqrt(Math.pow((this.Max.x - this.Min.x), 2) + Math.pow((this.Max.y - this.Min.y), 2) + Math.pow((this.Max.z - this.Min.z), 2));
    };
    BoundingBox.prototype.getCenter = function () {
        var center = create$2();
        center[0] = (this.Min.x + this.Max.x) / 2;
        center[1] = (this.Min.y + this.Max.y) / 2;
        center[2] = (this.Min.z + this.Max.z) / 2;
        return center;
    };
    BoundingBox.prototype.getRadius = function () {
        var d = this.getSquaredDistance();
        return (d / 2);
    };
    BoundingBox.prototype.findDistance = function (a, b) {
        var result = Math.sqrt(((a[0] - b[0]) * (a[0] - b[0]))
            + ((a[1] - b[1]) * (a[1] - b[1]))
            + ((a[2] - b[2]) * (a[2] - b[2])));
        return result;
    };
    BoundingBox.prototype.setMin = function (minValue) {
        this.Min.x = minValue[0];
        this.Min.y = minValue[1];
        this.Min.z = minValue[2];
        this.isDefault = false;
    };
    BoundingBox.prototype.setMax = function (maxValue) {
        this.Max.x = maxValue[0];
        this.Max.y = maxValue[1];
        this.Max.z = maxValue[2];
        this.isDefault = false;
    };
    BoundingBox.prototype.multiply = function (matrix) {
        var minArray = [this.Min.x, this.Min.y, this.Min.z];
        var maxArray = [this.Max.x, this.Max.y, this.Max.z];
        var min = create$2();
        var max = create$2();
        transformMat4(min, minArray, matrix);
        transformMat4(max, maxArray, matrix);
        this.Min.x = min[0];
        this.Min.y = min[1];
        this.Min.z = min[2];
        this.Max.x = max[0];
        this.Max.y = max[1];
        this.Max.z = max[2];
    };
    BoundingBox.prototype.clone = function () {
        var BBox = new BoundingBox();
        BBox.Min.x = this.Min.x;
        BBox.Min.y = this.Min.y;
        BBox.Min.z = this.Min.z;
        BBox.Max.x = this.Max.x;
        BBox.Max.y = this.Max.y;
        BBox.Max.z = this.Max.z;
        return BBox;
    };
    return BoundingBox;
}());var CoreMesh = /** @class */ (function () {
    function CoreMesh(name) {
        this.name = name;
        this.material = null;
        this.isLoading = false;
        this.BBox = new BoundingBox();
        this.isErrorOccurred = false;
    }
    CoreMesh.prototype.setIndex = function (indexData) {
        this.indices = indexData;
    };
    CoreMesh.prototype.setattribs = function (attribs) {
        this.attribs = attribs;
    };
    CoreMesh.prototype.setMin = function (minValue) {
        this.BBox.setMin(minValue);
    };
    CoreMesh.prototype.setMax = function (maxValue) {
        this.BBox.setMax(maxValue);
    };
    CoreMesh.prototype.clone = function (isDeep) {
        var c = Object.create(this);
        c.material = this.material.clone();
        return c;
    };
    CoreMesh.prototype.delete = function () {
        if (this.attribs)
            this.attribs.delete();
        if (this.indices)
            this.indices.delete();
    };
    CoreMesh.prototype.clearData = function () {
        if (this.attribs)
            this.attribs.clearData();
        if (this.indices)
            this.indices.clearData();
    };
    CoreMesh.prototype.isDataAvailable = function () {
        if (this.attribs && this.attribs.isDataAvailable(this.material ? this.material.useTexture : false) === false)
            return false;
        if (this.indices && this.indices.isDataAvailable() === false)
            return false;
        return true;
    };
    CoreMesh.prototype.getBufferViewIndex = function () {
        var bufferViewIndexes = [];
        if (this.attribs) {
            var indexes = this.attribs.getBufferViewIndex(this.material ? this.material.useTexture : false);
            bufferViewIndexes = __spread(indexes);
        }
        if (this.indices && this.indices.isDataAvailable() === false) {
            var index = this.indices.getBufferViewIndex();
            bufferViewIndexes.push(index);
        }
        return bufferViewIndexes;
    };
    CoreMesh.prototype.getData = function () {
        var _this = this;
        var scope = this;
        if (this.isDataAvailable() === false && this.isLoading === false && this.isErrorOccurred === false) {
            this.isLoading = true;
            var promisesArray = [];
            if (this.attribs && this.attribs.isDataAvailable(this.material.useTexture) === false)
                promisesArray.push(this.attribs.getData(this.material.useTexture));
            if (this.indices && this.indices.isDataAvailable() === false)
                promisesArray.push(this.indices.getData());
            Promise.all(promisesArray).then(function (values) {
                //console.log(this.indices.name, ": Mesh loading done : ",values );
            })
                .catch(function (error) {
                //console.error(this.indices.name , error);
                _this.isErrorOccurred = true;
            })
                .finally(function () {
                scope.isLoading = false;
            });
        }
    };
    CoreMesh.prototype.setTransparency = function (value) {
        if (this.material) {
            this.material.setTransparency(value);
        }
    };
    CoreMesh.prototype.setColorMask = function (value) {
        if (this.material) {
            this.material.setColorMask(value);
        }
    };
    CoreMesh.prototype.setUseTexture = function (value) {
        if (this.material) {
            if (value === true && this.attribs.texCoord && this.attribs.texCoord.isDataAvailable())
                this.material.setUseTexture(true);
            else
                this.material.setUseTexture(false);
        }
    };
    CoreMesh.prototype.setTextureData = function (value) {
        if (this.material) {
            this.material.setTextureData(value);
        }
    };
    CoreMesh.prototype.setUserDefinedColor = function (value) {
        if (this.material)
            this.material.setUserDefinedColor(value);
    };
    CoreMesh.prototype.setUseUserDefinedColor = function (value) {
        if (this.material)
            this.material.setUseUserDefinedColor(value);
    };
    return CoreMesh;
}());
/** @class */ ((function (_super) {
    __extends(SharedMesh, _super);
    function SharedMesh(name, mesh) {
        var _this = _super.call(this, name) || this;
        _this.mainMesh = mesh;
        _this.useMainMesh = false;
        return _this;
    }
    return SharedMesh;
}(CoreMesh)));
var Mesh = /** @class */ (function () {
    function Mesh(_name) {
        this.name = _name;
        this.mainMesh = null;
        this.subMeshes = {};
    }
    Mesh.prototype.parseData = function (mesh) {
        if (mesh) {
            this.name = mesh.name;
            if (mesh.primitives && mesh.primitives instanceof Array) {
                for (var i = 0; i < mesh.primitives.length; i++) {
                    var primitive = mesh.primitives[i];
                    var subMesh = new CoreMesh(primitive.name);
                    subMesh.rendingMode = primitive.mode;
                    subMesh.name = primitive.name;
                    if (primitive.indices) {
                        subMesh.setIndex(this.getBufferAttrib(primitive.indices));
                    }
                    if (primitive.attributes) {
                        subMesh.setattribs(this.getAttribs(primitive.attributes));
                        if (primitive.attributes['POSITION']) {
                            var accessor = primitive.attributes['POSITION'].getAccessor();
                            subMesh.setMin(accessor.min);
                            subMesh.setMax(accessor.max);
                        }
                    }
                    if (primitive.material) {
                        subMesh.material = MaterialManager.parseServerJSON(primitive.material);
                    }
                    this.subMeshes[primitive.name] = subMesh;
                }
            }
        }
    };
    Mesh.prototype.getAttribs = function (attributes) {
        var bufferAttribute = null;
        if (attributes) {
            bufferAttribute = new WebGLArrayBufferAttribute();
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    if (key === 'POSITION') {
                        bufferAttribute.position = this.getBufferAttrib(attributes[key]);
                    }
                    else if (key === 'NORMAL') {
                        bufferAttribute.normal = this.getBufferAttrib(attributes[key]);
                    }
                    else if (key === 'TEXCOORD_0') {
                        bufferAttribute.texCoord = this.getBufferAttrib(attributes[key]);
                    }
                    else if (key === 'VALUE') {
                        bufferAttribute.value = this.getBufferAttrib(attributes[key]);
                    }
                    else if (key === 'COLOR_0') {
                        bufferAttribute.color = this.getBufferAttrib(attributes[key]);
                    }
                    else {
                        bufferAttribute.CustomBuffers[key] = this.getBufferAttrib(attributes[key]);
                    }
                }
            }
        }
        return bufferAttribute;
    };
    Mesh.prototype.getBufferAttrib_old = function (accessor) {
        var key = 'bufferView : ' + accessor.bufferView;
        var bufferAttribute = Mesh.bufferAttributeCache.get(key);
        if (bufferAttribute === undefined) {
            var accessorType = accessor.type;
            var itemSize = WEBGLTYPESIZES[accessorType];
            var arrayBuffer = accessor.bufferViewData.arrayBuffer;
            var arrayType = WEBGLCOMPONENTTYPES[accessor.componentType];
            var data = null;
            if (arrayBuffer)
                data = new arrayType(arrayBuffer, accessor.bufferOffset, accessor.count * itemSize);
            if (accessor.bufferViewData.target === BufferTarget.ELEMENT_ARRAY_BUFFER)
                bufferAttribute = new WebGLElementArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
            else if (accessor.bufferViewData.target === BufferTarget.ARRAY_BUFFER)
                bufferAttribute = new WebGLArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
            else
                return null;
            bufferAttribute.name = accessor.name;
            bufferAttribute.setGLTFAccessor(accessor);
            Mesh.bufferAttributeCache.add(key, bufferAttribute);
        }
        return bufferAttribute;
    };
    Mesh.prototype.getBufferAttrib = function (accessorLoader) {
        var accessor = accessorLoader.getAccessor();
        if (accessor) {
            //let key :string = 'bufferView : ' + accessor.bufferView;
            var key = accessor.index;
            if (accessor.uid)
                key = accessor.uid;
            else
                accessor.uid = key;
            var bufferAttribute = WEBGLBufferCache.get(key);
            if (bufferAttribute === undefined) {
                var accessorType = accessor.type;
                var itemSize = WEBGLTYPESIZES[accessorType];
                var bufferViewData = accessor.bufferViewLoader.getBufferView();
                var arrayBuffer = bufferViewData.arrayBuffer;
                var arrayType = WEBGLCOMPONENTTYPES[accessor.componentType];
                var bufferOffset = accessor.bufferOffset || 0;
                var data = null;
                if (arrayBuffer)
                    data = new arrayType(arrayBuffer, bufferOffset, accessor.count * itemSize);
                if (bufferViewData.target === BufferTarget.ELEMENT_ARRAY_BUFFER)
                    bufferAttribute = new WebGLElementArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
                else if (bufferViewData.target === BufferTarget.ARRAY_BUFFER)
                    bufferAttribute = new WebGLArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
                else
                    return null;
                bufferAttribute.name = accessor.name;
                bufferAttribute.setGLTFAccessor(accessorLoader);
                WEBGLBufferCache.add(key, bufferAttribute);
            }
            return bufferAttribute;
        }
        else {
            throw new Error("Invalid accessorLoader in Mesh:getBufferAttrib");
        }
    };
    Mesh.prototype.delete = function () {
        if (this.mainMesh) {
            this.mainMesh.delete();
        }
        if (!(Object.keys(this.subMeshes).length === 0 && this.subMeshes.constructor === Object))
            for (var key in this.subMeshes) {
                var mesh = this.subMeshes[key];
                mesh.delete();
            }
    };
    Mesh.prototype.setTransparency = function (value) {
        if (this.mainMesh)
            this.mainMesh.setTransparency(value);
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setTransparency(value);
    };
    Mesh.prototype.setColorMask = function (value) {
        if (this.mainMesh) {
            this.mainMesh.setColorMask(value);
        }
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setColorMask(value);
    };
    Mesh.prototype.setUseTexture = function (value) {
        if (this.mainMesh) {
            this.mainMesh.setUseTexture(value);
        }
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setUseTexture(value);
    };
    Mesh.prototype.setTextureData = function (textureData) {
        if (this.mainMesh) {
            this.mainMesh.setTextureData(textureData);
        }
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setTextureData(textureData);
    };
    Mesh.prototype.setUserDefinedColor = function (value) {
        if (this.mainMesh)
            this.mainMesh.setUserDefinedColor(value);
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setUserDefinedColor(value);
    };
    Mesh.prototype.setUseUserDefinedColor = function (value) {
        if (this.mainMesh)
            this.mainMesh.setUseUserDefinedColor(value);
        if (this.subMeshes)
            for (var key in this.subMeshes)
                this.subMeshes[key].setUseUserDefinedColor(value);
    };
    Mesh.prototype.clone = function (isDeep) {
        var m = Object.create(this);
        if (this.subMeshes) {
            for (var key in this.subMeshes) {
                m.subMeshes[key] = this.subMeshes[key].clone();
            }
        }
        return m;
    };
    Mesh.bufferAttributeCache = new Utility.Registry(); // used in old  code 
    return Mesh;
}());var SceneNode = /** @class */ (function () {
    function SceneNode(_name) {
        this.name = _name;
        this.children = [];
        this.attachedLabels = [];
        this.type = AppConstants.NodeType.NONE;
        this.subType = AppConstants.NodeSubType.NONE;
        this.localMatrix = create$1();
        this.worldMatrix = create$1();
        this.parent = null;
        this.key = null;
        this.attributes = {};
        this._visible = false;
        this.renderPass = AppConstants.RenderPass.FIRSTPASS;
    }
    SceneNode.prototype.traverse = function (callback) {
        callback(this);
        var children = this.children;
        if (children == undefined || null)
            return;
        for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverse(callback);
        }
    };
    Object.defineProperty(SceneNode.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            if (this.children) {
                this.children.forEach(function (childNode) {
                    childNode.visible = value;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    SceneNode.prototype.getUpDir = function () {
        return fromValues$1(this.worldMatrix[4], this.worldMatrix[5], this.worldMatrix[6]);
    };
    SceneNode.prototype.getFrontDir = function () {
        return fromValues$1(this.worldMatrix[8], this.worldMatrix[9], this.worldMatrix[10]);
    };
    SceneNode.prototype.getLeftDir = function () {
        return fromValues$1(this.worldMatrix[0], this.worldMatrix[1], this.worldMatrix[2]);
    };
    SceneNode.prototype.getPosition = function () {
        return fromValues$1(this.worldMatrix[12], this.worldMatrix[13], this.worldMatrix[14]);
    };
    SceneNode.prototype.rotateX = function (angle) {
        rotateX(this.worldMatrix, this.worldMatrix, angle * 3.142 / 180);
    };
    SceneNode.prototype.rotateY = function (angle) {
        rotateY(this.worldMatrix, this.worldMatrix, angle * 3.142 / 180);
    };
    SceneNode.prototype.rotateZ = function (angle) {
        rotateZ(this.worldMatrix, this.worldMatrix, angle * 3.142 / 180);
    };
    SceneNode.prototype.rotate = function (angleInRad, axis) {
        rotate(this.worldMatrix, this.worldMatrix, angleInRad, axis);
    };
    SceneNode.prototype.rotateOnWorldAxis = function (angleInRad, axis) {
        var translation = this.getPosition();
        var scale = create$2();
        getScaling(scale, this.worldMatrix);
        var _quat = create$4();
        setAxisAngle(_quat, axis, angleInRad);
        var quat = create$4();
        getRotation(quat, this.worldMatrix);
        mul$1(quat, _quat, quat);
        fromRotationTranslationScale(this.worldMatrix, quat, translation, scale);
    };
    SceneNode.prototype.translate = function (x, y, z) {
        translate(this.worldMatrix, this.worldMatrix, fromValues$1(x, y, z));
    };
    SceneNode.prototype.scale = function (x, y, z) {
        scale(this.worldMatrix, this.worldMatrix, fromValues$1(x, y, z));
    };
    SceneNode.prototype.setPosition = function (vec) {
        this.worldMatrix[12] = vec[0];
        this.worldMatrix[13] = vec[1];
        this.worldMatrix[14] = vec[2];
    };
    SceneNode.prototype.getQuaternion = function () {
        var out = create$4();
        return getRotation(out, this.worldMatrix);
    };
    SceneNode.prototype.addAttachedLabels = function (object) {
        this.attachedLabels.push(object);
    };
    return SceneNode;
}());
var TransFormNode = /** @class */ (function (_super) {
    __extends(TransFormNode, _super);
    function TransFormNode(_name) {
        var _this = _super.call(this, _name) || this;
        _this.type = AppConstants.NodeType.TRANSFORM;
        _this.children = [];
        _this.explodeTranslation = create$2();
        _this.pickAndMoveMatrix = create$1();
        _this.initialMatrix = null;
        return _this;
    }
    TransFormNode.prototype.addChild = function (node) {
        this.children.push(node);
    };
    TransFormNode.prototype.delete = function () {
        this.children.forEach(function (childNode) {
            if (childNode.type == AppConstants.NodeType.SHAPE) {
                var node = childNode;
                node.delete();
            }
            else if (childNode.type == AppConstants.NodeType.TRANSFORM) {
                var node = childNode;
                node.delete();
            }
        });
    };
    return TransFormNode;
}(SceneNode));
var ShapeNode = /** @class */ (function (_super) {
    __extends(ShapeNode, _super);
    function ShapeNode(_name) {
        var _this = _super.call(this, _name) || this;
        _this.uid = Utility.getGUID();
        _this.type = AppConstants.NodeType.SHAPE;
        _this.children = null;
        _this.mesh = null;
        _this.displayMode = AppState.DefaultDisplayMode;
        //this.colorPlot = AppState.DefaultColorPlotState;
        _this.explodeTranslation = create$2();
        _this.pickAndMoveMatrix = create$1();
        _this.initialMatrix = null;
        return _this;
    }
    ShapeNode.prototype.getUid = function () {
        return this.uid;
    };
    ShapeNode.prototype.intersectBBox = function (raycaster) {
        if (!this.mesh.subMeshes['bbox']) {
            //console.log("No bbox found on this mesh");
            return;
        }
        var bbox = this.mesh.subMeshes['bbox'];
        return bbox.intersect(raycaster.ray, this.worldMatrix);
    };
    ShapeNode.prototype.intersectPlane = function (raycaster) {
        if (!this.name.includes('Plane')) {
            //console.log("No SectionplaneMesh found on this mesh");
            return;
        }
        var plane = this.mesh;
        return plane.intersect(raycaster.ray, this.worldMatrix);
    };
    ShapeNode.prototype.getBBoxCenter = function (worldSpace) {
        if (worldSpace === void 0) { worldSpace = true; }
        if (this.mesh.subMeshes['primitive_0']) {
            var bbox = this.mesh.subMeshes['primitive_0']["BBox"];
            var center = bbox.getCenter();
            return (worldSpace) ? transformMat4(center, center, this.worldMatrix) : center;
        }
        else {
            //console.warn('getBBoxCenter: bbox not found');
            return null;
        }
    };
    ShapeNode.prototype.getBBoxMinMax_old = function () {
        if (this.mesh.subMeshes['bbox']) {
            var bbox = this.mesh.subMeshes['bbox'];
            var min = bbox.getMin();
            var max = bbox.getMax();
            transformMat4(min, min, this.worldMatrix);
            transformMat4(max, max, this.worldMatrix);
            return [min, max];
        }
        else {
            //console.warn('getBBoxMinMax: bbox not found');
            return null;
        }
    };
    ShapeNode.prototype.getBBoxMinMax = function () {
        if (this.attributes && this.attributes.bbox) {
            var min = clone$1(this.attributes.bbox.min);
            var max = clone$1(this.attributes.bbox.max);
            transformMat4(min, min, this.worldMatrix);
            transformMat4(max, max, this.worldMatrix);
            return [min, max];
        }
        else {
            //console.warn('Node attributes: bbox not found');
            return null;
        }
    };
    ShapeNode.prototype.setTransparency = function (value) {
        if (this.mesh) {
            this.mesh.setTransparency(value);
        }
    };
    ShapeNode.prototype.setColorMask = function (value) {
        if (this.mesh != null) {
            this.mesh.setColorMask(value);
        }
    };
    ShapeNode.prototype.setUseTexture = function (value) {
        if (this.mesh != null) {
            this.mesh.setUseTexture(value);
        }
    };
    ShapeNode.prototype.setTextureData = function (textureData) {
        if (this.mesh != null) {
            this.mesh.setTextureData(textureData);
        }
    };
    ShapeNode.prototype.clone = function (isDeep) {
        var node = Object.create(this);
        node.mesh = this.mesh.clone();
        return node;
    };
    ShapeNode.prototype.delete = function () {
        this.mesh.delete();
    };
    return ShapeNode;
}(SceneNode));var SceneGraph = /** @class */ (function () {
    function SceneGraph(_name) {
        this.root = new TransFormNode("RootNode");
        this.name = _name;
        this.count = 0;
    }
    SceneGraph.prototype.constructFrom = function (sceneRoot) {
        if (sceneRoot) {
            var rootNode = new TransFormNode(sceneRoot.name);
            rootNode.index = sceneRoot.index;
            rootNode.attributes = sceneRoot.attributes;
            if (sceneRoot.type === AppConstants.NodeType.TRANSFORM || sceneRoot.type === undefined) {
                if (sceneRoot.children) {
                    for (var i = 0; i < sceneRoot.children.length; i++) {
                        var child = this.getNode(sceneRoot.children[i]);
                        if (child !== null) {
                            child.parent = rootNode;
                            rootNode.addChild(child);
                        }
                    }
                }
                this.root = rootNode;
                return true;
            }
            else if (sceneRoot.index.type === AppConstants.NodeType.SHAPE) ;
            return false;
        }
        return false;
    };
    SceneGraph.prototype.getNode = function (node) {
        if (node) {
            if (node.type === AppConstants.NodeType.TRANSFORM) {
                var TNode = new TransFormNode(node.name);
                TNode.index = node.index;
                TNode.attributes = node.attributes;
                var localMatrix = create$1();
                identity(localMatrix);
                if (node.matrix) ;
                if (node.translation)
                    translate(localMatrix, localMatrix, [node.translation[0], node.translation[1], node.translation[2]]);
                if (node.rotation) {
                    var quad = fromValues$3(node.rotation[0], node.rotation[1], node.rotation[2], node.rotation[3]);
                    //let quad = glmatrix.quat.fromValues(0,0,0,1);
                    var axis = create$2();
                    var angleInRad = getAxisAngle(axis, quad);
                    rotate(localMatrix, localMatrix, angleInRad, axis);
                    //TNode.rotate(angleInRad,axis);
                    //TNode.rotateOnWorldAxis(angleInRad, axis);
                }
                if (node.scale)
                    scale(localMatrix, localMatrix, [node.scale[0], node.scale[1], node.scale[2]]);
                TNode.localMatrix = localMatrix;
                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        var child = this.getNode(node.children[i]);
                        if (child !== null) {
                            child.parent = TNode;
                            TNode.addChild(child);
                        }
                    }
                }
                return TNode;
            }
            else if (node.type === AppConstants.NodeType.SHAPE) {
                var SNode = new ShapeNode(node.name);
                SNode.index = node.index;
                SNode.attributes = node.attributes;
                SNode.mesh = new Mesh("mesh_" + SNode.index);
                SNode.mesh.parseData(node.mesh);
                /*
                if(node.attributes && node.attributes.bbox ){
                    let bmin = node.attributes.bbox.min;
                    let bmax = node.attributes.bbox.max;
                    SNode.mesh.subMeshes["bbox"] = new BoxMesh(node.name+ '_BBox',
                    glmatrix.vec3.fromValues(bmin[0],bmin[1],bmin[2]),
                    glmatrix.vec3.fromValues(bmax[0],bmax[1],bmax[2]),
                    0.5);
                }
                */
                return SNode;
            }
        }
        return null;
    };
    SceneGraph.prototype.getRenderableNode = function (topNode, transformation) {
        if (topNode == null || topNode == undefined)
            topNode = this.root;
        var nodes = [];
        var transform = transformation;
        if (transform == null || transform == undefined) {
            transform = new Float32Array([1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1]);
        }
        else {
            transform = new Float32Array(transformation);
        }
        if (topNode["type"] === AppConstants.NodeType.TRANSFORM) {
            var transformNode = topNode;
            var temp = create$1();
            if (topNode.localMatrix) {
                if (transformNode.pickAndMoveMatrix) {
                    mul(temp, transformNode.pickAndMoveMatrix, topNode["localMatrix"]);
                }
                multiply(transform, transform, temp);
            }
        }
        //var newNode= {};
        //newNode["node"] = topNode;
        topNode.worldMatrix = transform;
        if (topNode["type"] === AppConstants.NodeType.SHAPE) {
            var shapeNode = topNode;
            nodes[nodes.length] = shapeNode;
            multiply(shapeNode.worldMatrix, shapeNode.pickAndMoveMatrix, shapeNode.worldMatrix);
            translate(shapeNode.worldMatrix, shapeNode.worldMatrix, shapeNode.explodeTranslation);
        }
        if (topNode["children"]) {
            for (var i = 0; i < topNode["children"].length; i++) {
                nodes = nodes.concat(this.getRenderableNode(topNode["children"][i], transform));
            }
        }
        return nodes;
    };
    SceneGraph.prototype.getSortedRenderableObjects = function (topNode, transformation) {
        if (topNode == null || topNode == undefined)
            topNode = this.root;
        var nodes = [];
        var transparent = [];
        var opaque = [];
        var transform = transformation;
        if (transform == null || transform == undefined) {
            transform = new Float32Array([1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1]);
        }
        else {
            transform = new Float32Array(transformation);
        }
        if (topNode["type"] === AppConstants.NodeType.TRANSFORM) {
            if (topNode["localMatrix"]) {
                multiply(transform, transform, topNode["localMatrix"]);
            }
        }
        //var newNode= {};
        //newNode["node"] = topNode;
        topNode.worldMatrix = transform;
        if (topNode["type"] === AppConstants.NodeType.SHAPE) {
            var node = topNode;
            var submeshName = "primitive_" + 0;
            var material = (node.mesh.mainMesh) ? node.mesh.mainMesh.material : node.mesh.subMeshes[submeshName].material;
            (material.transparency < 1 ? transparent : opaque).push(node);
        }
        if (topNode["children"]) {
            for (var i = 0; i < topNode["children"].length; i++) {
                nodes = __spread(nodes, this.getSortedRenderableObjects(topNode["children"][i], transform));
            }
        }
        return nodes = __spread(nodes, opaque, transparent.reverse());
    };
    SceneGraph.prototype.traverse = function (cbk, parent, node) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (node === void 0) { node = this.root; }
        cbk(parent, node);
        if (node.children) {
            node.children.forEach(function (child) {
                _this.traverse(cbk, node, child);
            });
        }
    };
    return SceneGraph;
}());var WebGLState = /** @class */ (function () {
    function WebGLState() {
    }
    WebGLState.isEqual = function (cache, array) {
        if (cache.length != array.length)
            return false;
        for (var i = 0; i < array.length; i++)
            if (cache[i] !== array[i])
                return false;
        return true;
    };
    WebGLState.clear = function () {
        this.programId = undefined;
        this.uniforms = new Map();
        this.attributeState = new Map();
        this.attributeEnableState = new Map();
    };
    WebGLState.uniforms = new Map();
    WebGLState.attributeState = new Map();
    WebGLState.attributeEnableState = new Map();
    return WebGLState;
}());var uniforms = {
    "uProjectionMatrix": "uProjectionMatrix",
    "uModelViewMatrix": "uModelViewMatrix",
    "uNormalMatrix": "uNormalMatrix",
    "uCameraPosition": "uCameraPosition",
    "uColor": "uColor",
    "uTexture_0": "uTexture_0",
    "uUseTexture": "uUseTexture",
    "uUnlit": "uUnlit",
    "uDisplayMode": "uDisplayMode",
    "uLightDirection": "uLightDirection",
    "uUseTransparency": "uUseTransparency",
    "uTransparencyFactor": "uTransparencyFactor",
    "uPrimitiveSize": "uPrimitiveSize",
    //section unifroms
    "uClipPlane0": "uClipPlane0",
    "uClipPlane1": "uClipPlane1",
    "uClipPlane2": "uClipPlane2",
    "uClipPlane3": "uClipPlane3",
    "uClipPlane4": "uClipPlane4",
    "uClipPlane5": "uClipPlane5",
    "uClipPlane0State": "uClipPlane0State",
    "uClipPlane1State": "uClipPlane1State",
    "uClipPlane2State": "uClipPlane2State",
    "uClipPlane3State": "uClipPlane3State",
    "uClipPlane4State": "uClipPlane4State",
    "uClipPlane5State": "uClipPlane5State",
    "uAnimationType": "uAnimationType",
    "uScaleFactor": "uScaleFactor",
    "uFrameFactor": "uFrameFactor",
    "uIsDeformed": "uIsDeformed",
    "uValueMinMax": "uValueMinMax",
    "uMinMAXNoresultColorArray": "uMinMAXNoresultColorArray"
};
var attributes = {
    "aPosition": "aPosition",
    "aNormal": "aNormal",
    "aUV": "aUV",
    "aColor": "aColor",
    "aDeformValues": "aDeformValues",
    "aResultValues": "aResultValues"
};
var Shader = /** @class */ (function () {
    function Shader(vShader, fShader) {
        this.vertexSource = null;
        this.fragmentSource = null;
        this.uniformLocationMap = new Map();
        this.attributeLocationMap = new Map();
        this.vertexSource = vShader;
        this.fragmentSource = fShader;
        this.GLContext = AppState.GLContext;
        this.shaderProgram = this.createShaderProgram();
        if (this.shaderProgram) {
            this.fillUniforms();
            this.fillAttribs();
        }
    }
    Shader.prototype.bind = function () {
        if (this.shaderProgram && this.GLContext) {
            var cache = WebGLState.programId;
            if (cache === this.shaderProgram) {
                return false;
            }
            WebGLState.clear();
            this.GLContext.useProgram(this.shaderProgram);
            WebGLState.programId = this.shaderProgram;
            return true;
        }
        return false;
    };
    Shader.prototype.unbind = function () {
        if (this.GLContext) {
            this.GLContext.useProgram(null);
            WebGLState.programId = undefined;
            return true;
        }
        return false;
    };
    //#region Attributes
    Shader.prototype.enablePosition = function () {
        if (this.attributeLocationMap.has(attributes['aPosition'])) {
            var location_1 = this.attributeLocationMap.get(attributes['aPosition']);
            var cache = WebGLState.attributeEnableState.get('aPosition');
            if (cache === undefined && location_1 >= 0) {
                WebGLState.attributeEnableState.set('aPosition', 1);
                this.GLContext.enableVertexAttribArray(location_1);
            }
            else if (cache === 0 && location_1 >= 0) {
                this.GLContext.enableVertexAttribArray(location_1);
                WebGLState.attributeEnableState.set('aPosition', 1);
            }
        }
    };
    Shader.prototype.disablePosition = function () {
        if (this.attributeLocationMap.has(attributes['aPosition'])) {
            var location_2 = this.attributeLocationMap.get(attributes['aPosition']);
            var cache = WebGLState.attributeEnableState.get('aPosition');
            if (cache === undefined && location_2 >= 0) {
                WebGLState.attributeEnableState.set('aPosition', 0);
                this.GLContext.disableVertexAttribArray(location_2);
            }
            else if (cache === 1 && location_2 >= 0) {
                this.GLContext.disableVertexAttribArray(location_2);
                WebGLState.attributeEnableState.set('aPosition', 0);
            }
        }
    };
    Shader.prototype.setPosition = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aPosition'])) {
            var location_3 = this.attributeLocationMap.get(attributes['aPosition']);
            var cache = WebGLState.attributeState.get('aPosition');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aPosition', uid);
                this.GLContext.vertexAttribPointer(location_3, 3, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_3 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_3, 3, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aPosition', uid);
            }
        }
    };
    Shader.prototype.enableNormal = function () {
        if (this.attributeLocationMap.has(attributes['aNormal'])) {
            var location_4 = this.attributeLocationMap.get(attributes['aNormal']);
            var cache = WebGLState.attributeEnableState.get('aNormal');
            if (cache === undefined && location_4 >= 0) {
                WebGLState.attributeEnableState.set('aNormal', 1);
                this.GLContext.enableVertexAttribArray(location_4);
            }
            else if (cache === 0 && location_4 >= 0) {
                this.GLContext.enableVertexAttribArray(location_4);
                WebGLState.attributeEnableState.set('aNormal', 1);
            }
        }
    };
    Shader.prototype.disableNormal = function () {
        if (this.attributeLocationMap.has(attributes['aNormal'])) {
            var location_5 = this.attributeLocationMap.get(attributes['aNormal']);
            var cache = WebGLState.attributeEnableState.get('aNormal');
            if (cache === undefined && location_5 >= 0) {
                WebGLState.attributeEnableState.set('aNormal', 0);
                this.GLContext.disableVertexAttribArray(location_5);
            }
            else if (cache === 1 && location_5 >= 0) {
                this.GLContext.disableVertexAttribArray(location_5);
                WebGLState.attributeEnableState.set('aNormal', 0);
            }
        }
    };
    Shader.prototype.setNormal = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aNormal'])) {
            var location_6 = this.attributeLocationMap.get(attributes['aNormal']);
            var cache = WebGLState.attributeState.get('aNormal');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aNormal', uid);
                this.GLContext.vertexAttribPointer(location_6, 3, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_6 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_6, 3, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aNormal', uid);
            }
        }
    };
    Shader.prototype.enableColor = function () {
        if (this.attributeLocationMap.has(attributes['aColor'])) {
            var location_7 = this.attributeLocationMap.get(attributes['aColor']);
            var cache = WebGLState.attributeEnableState.get('aColor');
            if (cache === undefined && location_7 >= 0) {
                WebGLState.attributeEnableState.set('aColor', 1);
                this.GLContext.enableVertexAttribArray(location_7);
            }
            else if (cache === 0 && location_7 >= 0) {
                this.GLContext.enableVertexAttribArray(location_7);
                WebGLState.attributeEnableState.set('aColor', 1);
            }
        }
    };
    Shader.prototype.disableColor = function () {
        if (this.attributeLocationMap.has(attributes['aColor'])) {
            var location_8 = this.attributeLocationMap.get(attributes['aColor']);
            var cache = WebGLState.attributeEnableState.get('aColor');
            if (cache === undefined && location_8 >= 0) {
                WebGLState.attributeEnableState.set('aColor', 0);
                this.GLContext.disableVertexAttribArray(location_8);
            }
            else if (cache === 1 && location_8 >= 0) {
                this.GLContext.disableVertexAttribArray(location_8);
                WebGLState.attributeEnableState.set('aColor', 0);
            }
        }
    };
    Shader.prototype.setColor = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aColor'])) {
            var location_9 = this.attributeLocationMap.get(attributes['aColor']);
            var cache = WebGLState.attributeState.get('aColor');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aColor', uid);
                this.GLContext.vertexAttribPointer(location_9, 3, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_9 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_9, 3, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aColor', uid);
            }
        }
    };
    Shader.prototype.enableUV = function () {
        if (this.attributeLocationMap.has(attributes['aUV'])) {
            var location_10 = this.attributeLocationMap.get(attributes['aUV']);
            var cache = WebGLState.attributeEnableState.get('aUV');
            if (cache === undefined && location_10 >= 0) {
                WebGLState.attributeEnableState.set('aUV', 1);
                this.GLContext.enableVertexAttribArray(location_10);
            }
            else if (cache === 0 && location_10 >= 0) {
                this.GLContext.enableVertexAttribArray(location_10);
                WebGLState.attributeEnableState.set('aUV', 1);
            }
        }
    };
    Shader.prototype.disableUV = function () {
        if (this.attributeLocationMap.has(attributes['aUV'])) {
            var location_11 = this.attributeLocationMap.get(attributes['aUV']);
            var cache = WebGLState.attributeEnableState.get('aUV');
            if (cache === undefined && location_11 >= 0) {
                WebGLState.attributeEnableState.set('aUV', 0);
                this.GLContext.disableVertexAttribArray(location_11);
            }
            else if (cache === 1 && location_11 >= 0) {
                this.GLContext.disableVertexAttribArray(location_11);
                WebGLState.attributeEnableState.set('aUV', 0);
            }
        }
    };
    Shader.prototype.setUV = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aUV'])) {
            var location_12 = this.attributeLocationMap.get(attributes['aUV']);
            var cache = WebGLState.attributeState.get('aUV');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aUV', uid);
                this.GLContext.vertexAttribPointer(location_12, 2, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_12 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_12, 2, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aUV', uid);
            }
        }
    };
    Shader.prototype.enableDeformValues = function () {
        if (this.attributeLocationMap.has(attributes['aDeformValues'])) {
            var location_13 = this.attributeLocationMap.get(attributes['aDeformValues']);
            var cache = WebGLState.attributeEnableState.get('aDeformValues');
            if (cache === undefined && location_13 >= 0) {
                WebGLState.attributeEnableState.set('aDeformValues', 1);
                this.GLContext.enableVertexAttribArray(location_13);
            }
            else if (cache === 0 && location_13 >= 0) {
                this.GLContext.enableVertexAttribArray(location_13);
                WebGLState.attributeEnableState.set('aDeformValues', 1);
            }
        }
    };
    Shader.prototype.disableDeformValues = function () {
        if (this.attributeLocationMap.has(attributes['aDeformValues'])) {
            var location_14 = this.attributeLocationMap.get(attributes['aDeformValues']);
            var cache = WebGLState.attributeEnableState.get('aDeformValues');
            if (cache === undefined && location_14 >= 0) {
                WebGLState.attributeEnableState.set('aDeformValues', 0);
                this.GLContext.disableVertexAttribArray(location_14);
            }
            else if (cache === 1 && location_14 >= 0) {
                this.GLContext.disableVertexAttribArray(location_14);
                WebGLState.attributeEnableState.set('aDeformValues', 0);
            }
        }
    };
    Shader.prototype.setDeformValues = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aDeformValues'])) {
            var location_15 = this.attributeLocationMap.get(attributes['aDeformValues']);
            var cache = WebGLState.attributeState.get('aDeformValues');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aDeformValues', uid);
                this.GLContext.vertexAttribPointer(location_15, 3, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_15 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_15, 3, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aDeformValues', uid);
            }
        }
    };
    Shader.prototype.enableResultValues = function () {
        if (this.attributeLocationMap.has(attributes['aResultValues'])) {
            var location_16 = this.attributeLocationMap.get(attributes['aResultValues']);
            var cache = WebGLState.attributeEnableState.get('aResultValues');
            if (cache === undefined && location_16 >= 0) {
                WebGLState.attributeEnableState.set('aResultValues', 1);
                this.GLContext.enableVertexAttribArray(location_16);
            }
            else if (cache === 0 && location_16 >= 0) {
                this.GLContext.enableVertexAttribArray(location_16);
                WebGLState.attributeEnableState.set('aResultValues', 1);
            }
        }
    };
    Shader.prototype.disableResultValues = function () {
        if (this.attributeLocationMap.has(attributes['aResultValues'])) {
            var location_17 = this.attributeLocationMap.get(attributes['aResultValues']);
            var cache = WebGLState.attributeEnableState.get('aResultValues');
            if (cache === undefined && location_17 >= 0) {
                WebGLState.attributeEnableState.set('aResultValues', 0);
                this.GLContext.disableVertexAttribArray(location_17);
            }
            else if (cache === 1 && location_17 >= 0) {
                this.GLContext.disableVertexAttribArray(location_17);
                WebGLState.attributeEnableState.set('aResultValues', 0);
            }
        }
    };
    Shader.prototype.setResultValues = function (attrib) {
        if (this.attributeLocationMap.has(attributes['aResultValues'])) {
            var location_18 = this.attributeLocationMap.get(attributes['aResultValues']);
            var cache = WebGLState.attributeState.get('aResultValues');
            var uid = attrib.getUid();
            if (cache === undefined) {
                attrib.bind();
                WebGLState.attributeState.set('aResultValues', uid);
                this.GLContext.vertexAttribPointer(location_18, 1, this.GLContext.FLOAT, false, 0, 0);
            }
            else if (location_18 >= 0 && uid !== cache) {
                attrib.bind();
                this.GLContext.vertexAttribPointer(location_18, 1, this.GLContext.FLOAT, false, 0, 0);
                WebGLState.attributeState.set('aResultValues', uid);
            }
        }
    };
    //#endregion
    //#region uniforms
    Shader.prototype.setVector2f = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        var lMatrix = new Float32Array(data);
        if (!cache)
            WebGLState.uniforms.set(s, lMatrix);
        else if (WebGLState.isEqual(cache, data)) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform2f(location, data[0], data[1]);
        WebGLState.uniforms.set(s, lMatrix);
    };
    Shader.prototype.setVector3f = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        var lMatrix = new Float32Array(data);
        if (!cache)
            WebGLState.uniforms.set(s, lMatrix);
        else if (WebGLState.isEqual(cache, data)) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform3f(location, data[0], data[1], data[2]);
        WebGLState.uniforms.set(s, lMatrix);
    };
    Shader.prototype.setVector4f = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        var lMatrix = new Float32Array(data);
        if (!cache)
            WebGLState.uniforms.set(s, lMatrix);
        else if (WebGLState.isEqual(cache, data)) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform4f(location, data[0], data[1], data[2], data[3]);
        WebGLState.uniforms.set(s, lMatrix);
    };
    Shader.prototype.setVector4fv = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        var lMatrix = new Float32Array(data);
        if (!cache)
            WebGLState.uniforms.set(s, lMatrix);
        else if (WebGLState.isEqual(cache, data)) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform4fv(location, data);
        WebGLState.uniforms.set(s, lMatrix);
    };
    Shader.prototype.setMat4f = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        var lPMatrix = new Float32Array(data);
        if (!cache)
            WebGLState.uniforms.set(s, lPMatrix);
        else if (WebGLState.isEqual(cache, data)) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniformMatrix4fv(location, false, data);
        WebGLState.uniforms.set(s, lPMatrix);
    };
    Shader.prototype.setInt = function (s, data) {
        if (data === undefined || data === null)
            data = 0;
        var cache = WebGLState.uniforms.get(s);
        if (cache === undefined)
            WebGLState.uniforms.set(s, data);
        else if (cache === data) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform1i(location, data);
        WebGLState.uniforms.set(s, data);
    };
    Shader.prototype.setBool = function (s, data) {
        var cache = WebGLState.uniforms.get(s);
        if (cache === undefined)
            WebGLState.uniforms.set(s, data);
        else if (cache === data) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform1f(location, (data) ? 1.0 : 0.0);
        WebGLState.uniforms.set(s, data);
    };
    Shader.prototype.setFloat = function (s, data) {
        if (data === undefined || data === null)
            data = 0.0;
        var cache = WebGLState.uniforms.get(s);
        if (cache === undefined)
            WebGLState.uniforms.set(s, data);
        else if (cache === data) {
            return;
        }
        var location = this.uniformLocationMap.get(s);
        this.GLContext.uniform1f(location, data);
        WebGLState.uniforms.set(s, data);
    };
    Shader.prototype.updateClipPlaneUniforms = function () {
        var _this = this;
        if (AppObjects.sectionManager.planeStates.size > 0) {
            AppObjects.sectionManager.planeStates.forEach(function (planeState) {
                var id = planeState.internalId % AppObjects.sectionManager.MaxPlanes;
                _this.setBool(uniforms['uClipPlane' + id + 'State'], planeState.isPlaneEnabled);
                _this.setVector4f(uniforms['uClipPlane' + id], planeState.eqn.getClipEquation());
            });
        }
        else {
            for (var i = 0; i < 6; i++) {
                this.setBool(uniforms['uClipPlane' + i.toString() + 'State'], false);
            }
        }
    };
    //#endregion
    Shader.prototype.compileShader = function (type, shaderSource) {
        var shader = this.GLContext.createShader(type);
        this.GLContext.shaderSource(shader, shaderSource);
        this.GLContext.compileShader(shader);
        //check errors
        if (!this.GLContext.getShaderParameter(shader, this.GLContext.COMPILE_STATUS)) {
            var info = this.GLContext.getShaderInfoLog(shader);
            //this.GLContext.deleteShader(shader);
            console.error("ERROR IN " + type + " SHADER : " + info, shaderSource);
            return null;
        }
        else {
            return shader;
        }
    };
    Shader.prototype.createShaderProgram = function () {
        var vShader = this.compileShader(this.GLContext.VERTEX_SHADER, this.vertexSource);
        var fShader = this.compileShader(this.GLContext.FRAGMENT_SHADER, this.fragmentSource);
        if (vShader === null || fShader === null) {
            //console.log("Shader compilation error");
            return null;
        }
        var shaderProgram = this.GLContext.createProgram();
        this.GLContext.attachShader(shaderProgram, vShader);
        this.GLContext.attachShader(shaderProgram, fShader);
        this.GLContext.linkProgram(shaderProgram);
        if (!this.GLContext.getProgramParameter(shaderProgram, this.GLContext.LINK_STATUS)) {
            var info = this.GLContext.getProgramInfoLog(shaderProgram);
            //this.GLContext.deleteProgram(this.shaderProgram);
            console.error("Shader Program creation failed", info);
            return null;
        }
        else {
            this.GLContext.validateProgram(shaderProgram);
            return shaderProgram;
        }
    };
    Shader.prototype.fillUniforms = function () {
        for (var name_1 in uniforms) {
            var element = uniforms[name_1];
            if (!this.uniformLocationMap.has(element)) {
                var location_19 = this.GLContext.getUniformLocation(this.shaderProgram, element);
                if (location_19 == -1) ;
                else {
                    this.uniformLocationMap.set(element, location_19);
                }
            }
        }
    };
    Shader.prototype.fillAttribs = function () {
        for (var name_2 in attributes) {
            var element = attributes[name_2];
            if (!this.attributeLocationMap.has(element)) {
                var location_20 = this.GLContext.getAttribLocation(this.shaderProgram, element);
                if (location_20 == -1) ;
                else {
                    this.attributeLocationMap.set(element, location_20);
                }
            }
        }
    };
    return Shader;
}());var BoxMesh = /** @class */ (function (_super) {
    __extends(BoxMesh, _super);
    function BoxMesh(name, min, max, precentOffset) {
        if (precentOffset === void 0) { precentOffset = 0; }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.visible = false;
        _this.min = min;
        _this.max = max;
        _this.uid = Utility.getGUID();
        _this.rendingMode = RenderMode.LINES;
        _this.createBoxMesh(min, max, precentOffset);
        _this.material = new Material(name);
        _this.material.diffuseColor = [0, 0, 0];
        return _this;
    }
    BoxMesh.prototype.createBoxMesh = function (min, max, precentOffset) {
        //Set offset
        var percent = precentOffset / 100;
        var offset = squaredDistance(min, max) * percent * percent;
        sub(min, min, fromValues$1(offset, offset, offset));
        add(max, max, fromValues$1(offset, offset, offset));
        var vertices = new Float32Array([
            //back vertices
            min[0], min[1], min[2],
            min[0], max[1], min[2],
            max[0], max[1], min[2],
            max[0], min[1], min[2],
            //front vertices
            min[0], min[1], max[2],
            min[0], max[1], max[2],
            max[0], max[1], max[2],
            max[0], min[1], max[2] //x,-y,z
        ]);
        var indices = new Uint32Array([
            0, 1, 1, 2, 2, 3, 3, 0,
            0, 4, 5, 1,
            4, 5, 5, 6, 6, 7, 7, 4,
            6, 2, 7, 3,
        ]);
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    BoxMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        //attrib.color = new WebGLArrayBuffer("bboxColorBuff",BufferUsage.STATIC_DRAW,color);
        return attrib;
    };
    BoxMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    BoxMesh.prototype.updateAttribute = function (vertices) {
        this.attribs.position.updateData(vertices);
    };
    BoxMesh.prototype.updateIndices = function (indices) {
        this.indices.updateData(indices);
    };
    BoxMesh.prototype.updateBBox = function (min, max, precentOffset) {
        //Set offset
        this.min = min;
        this.max = max;
        var percent = precentOffset / 100;
        var offset = squaredDistance(min, max) * percent * percent;
        sub(min, min, fromValues$1(offset, offset, offset));
        add(max, max, fromValues$1(offset, offset, offset));
        var vertices = new Float32Array([
            //back vertices
            min[0], min[1], min[2],
            min[0], max[1], min[2],
            max[0], max[1], min[2],
            max[0], min[1], min[2],
            //front vertices
            min[0], min[1], max[2],
            min[0], max[1], max[2],
            max[0], max[1], max[2],
            max[0], min[1], max[2] //x,-y,z
        ]);
        var indices = new Uint32Array([
            0, 1, 1, 2, 2, 3, 3, 0,
            0, 4, 5, 1,
            4, 5, 5, 6, 6, 7, 7, 4,
            6, 2, 7, 3,
        ]);
        this.updateAttribute(vertices);
        this.updateIndices(indices);
    };
    BoxMesh.prototype.intersect = function (r, transform) {
        var tmin, tmax, tymin, tymax, tzmin, tzmax;
        //update mesh bounds
        var boundMin = create$2();
        var boundMax = create$2();
        transformMat4(boundMin, this.min, transform);
        transformMat4(boundMax, this.max, transform);
        var bounds = [boundMin, boundMax];
        tmin = (bounds[r.sign[0]][0] - r.orig[0]) * r.invdir[0];
        tmax = (bounds[1 - r.sign[0]][0] - r.orig[0]) * r.invdir[0];
        tymin = (bounds[r.sign[1]][1] - r.orig[1]) * r.invdir[1];
        tymax = (bounds[1 - r.sign[1]][1] - r.orig[1]) * r.invdir[1];
        if ((tmin > tymax) || (tymin > tmax))
            return false;
        if (tymin > tmin)
            tmin = tymin;
        if (tymax < tmax)
            tmax = tymax;
        tzmin = (bounds[r.sign[2]][2] - r.orig[2]) * r.invdir[2];
        tzmax = (bounds[1 - r.sign[2]][2] - r.orig[2]) * r.invdir[2];
        if ((tmin > tzmax) || (tzmin > tmax))
            return false;
        if (tzmin > tmin)
            tmin = tzmin;
        if (tzmax < tmax)
            tmax = tzmax;
        return true;
    };
    BoxMesh.prototype.getCenter = function () {
        var center = create$2();
        center[0] = (this.min[0] + this.max[0]) / 2;
        center[1] = (this.min[1] + this.max[1]) / 2;
        center[2] = (this.min[2] + this.max[2]) / 2;
        return center;
    };
    BoxMesh.prototype.getMin = function () {
        return clone$1(this.min);
    };
    BoxMesh.prototype.getMax = function () {
        return clone$1(this.max);
    };
    return BoxMesh;
}(CoreMesh));function GetAnimationType(inputString) {
    var upperCaseInput = inputString.toUpperCase();
    if (AnimationType.hasOwnProperty(upperCaseInput)) {
        return AnimationType[upperCaseInput];
    }
    else {
        return null;
    }
}function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}var arraybufferConcat = createCommonjsModule(function (module, exports) {
(function(root) {

  function isValidArray(x) {
    return /Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Float32Array|Float64Array|ArrayBuffer/gi.test(Object.prototype.toString.call(x))
  }

  function arrayBufferConcat(/* arraybuffers */) {
    var arrays = [].slice.call(arguments);

    if (arrays.length <= 0 || !isValidArray(arrays[0])) {
      return new Uint8Array(0).buffer
    }

    var arrayBuffer = arrays.reduce(function(cbuf, buf, i) {
      if (i === 0) return cbuf
      if (!isValidArray(buf)) return cbuf

      var tmp = new Uint8Array(cbuf.byteLength + buf.byteLength);
      tmp.set(new Uint8Array(cbuf), 0);
      tmp.set(new Uint8Array(buf), cbuf.byteLength);

      return tmp.buffer
    }, arrays[0]);

    return arrayBuffer
  }

  {
    if ( module.exports) {
      exports = module.exports = arrayBufferConcat;
    }
    exports.arrayBufferConcat = arrayBufferConcat;
  }
})();
});
var arraybufferConcat_1 = arraybufferConcat.arrayBufferConcat;var Scene = /** @class */ (function () {
    function Scene(_name, _key) {
        this.name = _name;
        if (_key != null)
            this.key = Utility.getGUID();
        else
            this.key = _key;
        this.sceneGraph = new SceneGraph(_name);
        this.renderableNodes = null;
        this.bbox = null;
    }
    Scene.prototype.constructFrom = function (scene) {
        if (scene && scene.children && scene.children.length > 0) {
            //let res = this.sceneGraph.constructFrom(scene.children[0]);
            var res = this.sceneGraph.constructFrom(scene);
            this.renderableNodes = this.getRenderableObjects();
            return res;
        }
        return false;
    };
    Scene.prototype.traverse = function (cbk) {
        this.sceneGraph.traverse(cbk);
    };
    Scene.prototype.getRenderableObjects = function () {
        if (this.renderableNodes) {
            return this.renderableNodes;
        }
        else if (this.sceneGraph) {
            //return this.sceneGraph.getRenderableNode();
            return this.sceneGraph.getSortedRenderableObjects();
        }
        return null;
    };
    Scene.prototype.addRenderNodes = function (adjacentNodeId, nodes) {
        this.traverse(function (parent, child) {
            var _a;
            if (child.type === AppConstants.NodeType.SHAPE && child.index === adjacentNodeId) {
                if (parent) {
                    (_a = parent.children).push.apply(_a, __spread(nodes));
                }
            }
        });
        this.updateRenderableObjects();
    };
    Scene.prototype.updateRenderableObjects = function () {
        this.renderableNodes = (this.sceneGraph) ? this.sceneGraph.getRenderableNode() : null;
    };
    Scene.prototype.getSortedRenderableObjects = function () {
        if (this.sceneGraph) {
            return this.sceneGraph.getSortedRenderableObjects();
        }
        return null;
    };
    Scene.prototype.getMergedNodes = function () {
        var renderNodes = this.renderableNodes;
        var length = 0;
        var submeshName = "primitive_" + 0;
        renderNodes.forEach(function (node) {
            length += node.mesh.subMeshes[submeshName].indices.getDataArray.byteLength;
        });
        var mergedIndices = null;
        renderNodes.forEach(function (node) {
            var buffer = node.mesh.subMeshes[submeshName].indices.getDataArray;
            if (mergedIndices == null)
                mergedIndices = buffer;
            else
                mergedIndices = arraybufferConcat_1(mergedIndices, buffer);
        });
        var mergedNode = new ShapeNode('merged');
        mergedNode.mesh = new Mesh('merged');
        var coreMesh = new CoreMesh(submeshName);
        coreMesh.attribs = renderNodes[0].mesh.subMeshes[submeshName].attribs;
        var indices = new WebGLElementArrayBuffer('indices', BufferUsage.STATIC_DRAW, new Uint32Array(mergedIndices));
        coreMesh.indices = indices;
        coreMesh.material = renderNodes[0].mesh.subMeshes[submeshName].material;
        coreMesh.rendingMode = renderNodes[0].mesh.subMeshes[submeshName].rendingMode;
        mergedNode.mesh.subMeshes[submeshName] = coreMesh;
        mergedNode.visible = true;
        return mergedNode;
    };
    Scene.prototype.render_old = function (shader, renderPass) {
        //this.renderableNodes = this.getRenderableObjects();
        var _this = this;
        if (this.renderableNodes === null) {
            this.renderableNodes = this.getRenderableObjects();
            //this.renderableNodes = [this.getMergedNodes()];
            //console.log("sorting nodes");
        }
        if (this.renderableNodes != null) {
            this.renderableNodes.forEach(function (node) {
                if (node.visible === true) {
                    if (node.mesh) {
                        if (node.mesh.mainMesh && renderPass !== AppConstants.RenderPass.SECONDPASS) {
                            _this.renderMesh(shader, node.mesh.mainMesh, node, renderPass);
                        }
                        for (var key in node.mesh.subMeshes) {
                            var submesh = node.mesh.subMeshes[key];
                            //check bbox visiblity
                            if (submesh.name.includes('_BBox')) {
                                var bbox = submesh;
                                if (!bbox.visible) {
                                    continue;
                                }
                            }
                            if (renderPass === AppConstants.RenderPass.SECONDPASS) {
                                //if(!(submesh.name === 'Wireframe' && node.displayMode ===  AppConstants.DisplayMode.HIDDENWIREFRAME))
                                _this.renderMesh(shader, submesh, node, renderPass);
                            }
                            else if (renderPass === AppConstants.RenderPass.FIRSTPASS) {
                                if ((submesh.name === 'Shaded' && node.displayMode === AppConstants.DisplayMode.HIDDENWIREFRAME))
                                    _this.renderMesh(shader, submesh, node, renderPass);
                            }
                        }
                    }
                }
            });
        }
    };
    Scene.prototype.renderMesh_old = function (shader, mesh, node, renderPass) {
        if (AppState.GLContext) {
            if (mesh.name === 'Shaded') {
                if (node.displayMode !== AppConstants.DisplayMode.WIREFRAME &&
                    node.displayMode !== AppConstants.DisplayMode.POINT) {
                    if (node.displayMode === AppConstants.DisplayMode.SHADEDMESH ||
                        node.displayMode === AppConstants.DisplayMode.HIDDENWIREFRAME) {
                        AppState.GLContext.enable(AppState.GLContext.POLYGON_OFFSET_FILL); // to avoid over lapping of wiremesh
                        AppState.GLContext.polygonOffset(1, 1);
                        if (node.displayMode === AppConstants.DisplayMode.HIDDENWIREFRAME)
                            AppState.GLContext.colorMask(false, false, false, false);
                        this.drawElements(shader, mesh, node, renderPass);
                        if (node.displayMode === AppConstants.DisplayMode.HIDDENWIREFRAME)
                            AppState.GLContext.colorMask(true, true, true, true);
                        AppState.GLContext.disable(AppState.GLContext.POLYGON_OFFSET_FILL);
                    }
                    else if (node.displayMode === AppConstants.DisplayMode.TRANSPARENT) {
                        AppState.GLContext.depthMask(false);
                        AppState.GLContext.enable(AppState.GLContext.BLEND);
                        AppState.GLContext.blendFunc(AppState.GLContext.ONE, AppState.GLContext.ONE_MINUS_SRC_ALPHA);
                        //shader.setUniformUseTransparency(true);
                        shader.setBool(uniforms.uUseTransparency, true);
                        //shader.setUniformTransparencyFactor(0.07);
                        shader.setFloat(uniforms.uTransparencyFactor, 0.07);
                        this.drawElements(shader, mesh, node, renderPass);
                        shader.setBool(uniforms.uUseTransparency, false);
                        AppState.GLContext.disable(AppState.GLContext.BLEND);
                        AppState.GLContext.depthMask(true);
                    }
                    else
                        this.drawElements(shader, mesh, node, renderPass);
                }
                else if (node.displayMode === AppConstants.DisplayMode.POINT) {
                    this.drawElements(shader, mesh, node, renderPass);
                }
            }
            else if (mesh.name === 'Wireframe') {
                if (node.displayMode === AppConstants.DisplayMode.SHADEDMESH ||
                    node.displayMode === AppConstants.DisplayMode.WIREFRAME ||
                    node.displayMode === AppConstants.DisplayMode.HIDDENWIREFRAME) {
                    this.drawElements(shader, mesh, node, renderPass);
                }
            }
            else {
                this.drawElements(shader, mesh, node, renderPass);
            }
        }
        return true;
    };
    Scene.prototype.drawElements_old = function (shader, mesh, node, renderPass) {
        if (mesh.isDataAvailable() === false) {
            mesh.getData();
            return false;
        }
        if (mesh.attribs.position) {
            shader.enablePosition();
            shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        if (mesh.attribs.normal) {
            shader.enableNormal();
            shader.setNormal(mesh.attribs.normal);
        }
        else {
            shader.disableNormal();
        }
        //if(mesh.attribs.texCoord && node.colorPlot)
        if (mesh.attribs.texCoord) {
            shader.enableUV();
            shader.setUV(mesh.attribs.texCoord);
        }
        else {
            shader.disableUV();
        }
        mesh.indices.bind();
        shader.setFloat(uniforms.uDisplayMode, 0.0);
        shader.setMat4f(uniforms.uModelViewMatrix, node.worldMatrix);
        var normalMatrix = create$1();
        invert(normalMatrix, node.worldMatrix);
        transpose(normalMatrix, normalMatrix);
        shader.setMat4f(uniforms.uNormalMatrix, normalMatrix);
        if (mesh.material) {
            if (mesh.material.isTextureAvailable && mesh.attribs.texCoord) 
            //if(mesh.material.isTextureAvailable &&  mesh.attribs.texCoord && node.colorPlot)
            {
                mesh.material.texture.bind();
                shader.setInt(uniforms.uTexture_0, mesh.material.texture.index);
                shader.setBool(uniforms.uUseTexture, true);
            }
            else {
                shader.setVector3f(uniforms.uColor, new Float32Array(mesh.material.diffuseColor));
                shader.setBool(uniforms.uUseTexture, false);
            }
        }
        var GLDrawType = mesh.indices.getType();
        if (node.displayMode === AppConstants.DisplayMode.POINT) {
            shader.setBool(uniforms.uUnlit, true);
            if (mesh.name.includes('_BBox')) {
                AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
            }
            AppState.GLContext.drawElements(RenderMode.POINTS, mesh.indices.getDataArrayCount(), GLDrawType, 0);
        }
        else if (mesh.name === 'Wireframe') {
            shader.setBool(uniforms.uUnlit, true);
            if (node.displayMode === AppConstants.DisplayMode.SHADEDMESH) {
                if (AppState.UseDefaultWireFrameColor == true) {
                    shader.setBool(uniforms.uUseTexture, false);
                    shader.setVector3f(uniforms.uColor, new Float32Array(AppState.DefaultWireFrameColor));
                }
                else {
                    shader.setFloat(uniforms.uDisplayMode, 1.0);
                }
            }
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
        }
        else {
            shader.setBool(uniforms.uUnlit, false);
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
        }
    };
    Scene.prototype.render = function (shader, renderPass) {
        var _this = this;
        if (this.renderableNodes === null) {
            this.renderableNodes = this.getRenderableObjects();
            //console.log("sorting nodes");
        }
        if (this.renderableNodes != null) {
            this.renderableNodes.forEach(function (node) {
                if (node.visible === true && node.renderPass === renderPass) {
                    if (node.mesh) {
                        if (node.mesh.mainMesh) {
                            _this.renderMesh(shader, node.mesh.mainMesh, node, renderPass);
                        }
                        for (var key in node.mesh.subMeshes) {
                            var submesh = node.mesh.subMeshes[key];
                            _this.renderMesh(shader, submesh, node, renderPass);
                        }
                    }
                }
            });
        }
    };
    Scene.prototype.renderMesh = function (shader, mesh, node, renderPass) {
        if (AppState.GLContext) {
            this.drawElements(shader, mesh, node, renderPass);
        }
        return true;
    };
    Scene.prototype.drawElements = function (shader, mesh, node, renderPass) {
        if (mesh.isDataAvailable() === false) {
            //mesh.getData();
            return false;
        }
        if (mesh.attribs.position) {
            shader.enablePosition();
            shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        if (mesh.attribs.normal) {
            shader.enableNormal();
            shader.setNormal(mesh.attribs.normal);
        }
        else {
            shader.disableNormal();
        }
        shader.setVector3f(uniforms.uScaleFactor, AppObjects.animationManager.scaleFactor);
        if (AppObjects.animationManager && AppObjects.animationManager.IsAnimationOn) {
            if (mesh.attribs.CustomBuffers['deformvalues']) {
                shader.enableDeformValues();
                shader.setDeformValues(mesh.attribs.CustomBuffers['deformvalues']);
                //shader.setBool(uniforms.uIsDeformed, true);
                shader.setInt(uniforms.uAnimationType, GetAnimationType(AppObjects.animationManager.type));
                if (AppObjects.animationManager.type === AppConstants.AnimationType.LINEAR)
                    shader.setFloat(uniforms.uFrameFactor, AppObjects.animationManager.frameFactor);
                else if (AppObjects.animationManager.type === AppConstants.AnimationType.EIGENNONCOMPEX) {
                    var totalAnimationFrames = AppObjects.animationManager.numberOfFrames;
                    var angle_in_Radian = (Math.PI * 2) / (totalAnimationFrames); //  360/frame or (pi*2) / frame
                    var currentFrameNumber = AppObjects.animationManager.frameFactor * (totalAnimationFrames - 1);
                    var frameFactor = Math.sin(currentFrameNumber * angle_in_Radian);
                    shader.setFloat(uniforms.uFrameFactor, frameFactor);
                }
            }
            else {
                shader.setInt(uniforms.uAnimationType, GetAnimationType(AppConstants.AnimationType.NONE));
                shader.disableDeformValues();
            }
        }
        else {
            shader.setInt(uniforms.uAnimationType, GetAnimationType(AppConstants.AnimationType.NONE));
        }
        mesh.indices.bind();
        shader.setFloat(uniforms.uDisplayMode, 0.0);
        shader.setMat4f(uniforms.uModelViewMatrix, node.worldMatrix);
        var normalMatrix = create$1();
        invert(normalMatrix, node.worldMatrix);
        transpose(normalMatrix, normalMatrix);
        shader.setMat4f(uniforms.uNormalMatrix, normalMatrix);
        if (mesh.material) {
            if (mesh.material.useUserDefinedColor === true) {
                shader.disableUV();
                shader.setVector3f(uniforms.uColor, new Float32Array(mesh.material.userDefinedColor));
                shader.setBool(uniforms.uUseTexture, false);
            }
            else {
                if (mesh.material.useTexture === true && mesh.material.isTextureAvailable) {
                    shader.setVector2f(uniforms.uValueMinMax, AppObjects.colorValueManager.getValueMinMax());
                    shader.setVector4fv(uniforms.uMinMAXNoresultColorArray, AppObjects.colorValueManager.getMinMAXNoResultColor());
                    shader.enableResultValues();
                    shader.setResultValues(mesh.attribs.value);
                    var texCoordBuffer = mesh.attribs.texCoord;
                    var texCoordKey = "TEXCOORD_" + mesh.material.texture.texCoordIndex;
                    if (texCoordKey !== "TEXCOORD_0")
                        texCoordBuffer = mesh.attribs.CustomBuffers[texCoordKey];
                    if (texCoordBuffer && texCoordBuffer.isDataAvailable() && mesh.material.useTexture) {
                        //setting uv buffer  
                        shader.enableUV();
                        shader.setUV(texCoordBuffer);
                        //setting 2D texture
                        mesh.material.texture.bind();
                        shader.setInt(uniforms.uTexture_0, mesh.material.texture.index);
                        shader.setBool(uniforms.uUseTexture, true);
                    }
                    else {
                        //disable uv buffer
                        shader.disableUV();
                        shader.setVector3f(uniforms.uColor, new Float32Array(mesh.material.diffuseColor));
                        shader.setBool(uniforms.uUseTexture, false);
                    }
                }
                else {
                    //disable uv buffer
                    shader.disableUV();
                    shader.setVector3f(uniforms.uColor, new Float32Array(mesh.material.diffuseColor));
                    shader.setBool(uniforms.uUseTexture, false);
                }
            }
        }
        if (mesh.material && mesh.material.isColorMaskEnabled)
            AppState.GLContext.colorMask(true, true, true, true);
        else
            AppState.GLContext.colorMask(false, false, false, false);
        if (mesh.rendingMode === RenderMode.TRIANGLES ||
            mesh.rendingMode === RenderMode.TRIANGLE_FAN ||
            mesh.rendingMode === RenderMode.TRIANGLE_STRIP) {
            shader.setBool(uniforms.uUnlit, false);
        }
        else {
            //AppState.GLContext.enable(  AppState.GLContext.POLYGON_OFFSET_FILL);
            //AppState.GLContext.polygonOffset(1, 1);
            shader.setBool(uniforms.uUnlit, true);
        }
        var GLDrawType = mesh.indices.getType();
        if (mesh.material && mesh.material.transparency > 0) {
            AppState.GLContext.depthMask(false);
            AppState.GLContext.enable(AppState.GLContext.BLEND);
            AppState.GLContext.blendFunc(AppState.GLContext.ONE, AppState.GLContext.ONE_MINUS_SRC_ALPHA);
            shader.setBool(uniforms.uUseTransparency, true);
            shader.setFloat(uniforms.uTransparencyFactor, 1.0 - mesh.material.transparency);
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
            shader.setBool(uniforms.uUseTransparency, false);
            AppState.GLContext.disable(AppState.GLContext.BLEND);
            AppState.GLContext.depthMask(true);
        }
        else
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
    };
    Scene.prototype.getBoundingBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        return this.updateBBox(onlyVisible);
    };
    Scene.getBoundingBoxFromNodes = function (nodes) {
        var bbox = new BoundingBox();
        return Scene.calculateBBox(nodes, bbox);
    };
    Scene.calculateBBox = function (nodes, bbox, onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        if (nodes) {
            nodes.forEach(function (node) {
                var _a;
                var goInside = onlyVisible ? node.visible : true;
                if (goInside) {
                    if (node.attributes && node.attributes.bbox) {
                        var nodeMin = void 0;
                        var nodeMax = void 0;
                        _a = __read(node.getBBoxMinMax(), 2), nodeMin = _a[0], nodeMax = _a[1];
                        if (bbox.isDefault == true) {
                            bbox.Min.x = nodeMin[0];
                            bbox.Min.y = nodeMin[1];
                            bbox.Min.z = nodeMin[2];
                            bbox.Max.x = nodeMax[0];
                            bbox.Max.y = nodeMax[1];
                            bbox.Max.z = nodeMax[2];
                            bbox.isDefault = false;
                        }
                        else {
                            if (nodeMin[0] < bbox.Min.x)
                                bbox.Min.x = nodeMin[0];
                            if (nodeMin[1] < bbox.Min.y)
                                bbox.Min.y = nodeMin[1];
                            if (nodeMin[2] < bbox.Min.z)
                                bbox.Min.z = nodeMin[2];
                            if (nodeMax[0] > bbox.Max.x)
                                bbox.Max.x = nodeMax[0];
                            if (nodeMax[1] > bbox.Max.y)
                                bbox.Max.y = nodeMax[1];
                            if (nodeMax[2] > bbox.Max.z)
                                bbox.Max.z = nodeMax[2];
                        }
                    }
                    else if (node.mesh) {
                        if (node.mesh.mainMesh) {
                            var mesh = node.mesh.mainMesh;
                            if (mesh.BBox) {
                                mesh.BBox.multiply(node.worldMatrix);
                                if (bbox.isDefault == true) {
                                    bbox.setMin(mesh.BBox.Min);
                                    bbox.setMax(mesh.BBox.Max);
                                    bbox.isDefault = false;
                                }
                                else {
                                    if (mesh.BBox.Min.x < bbox.Min.x)
                                        bbox.Min.x = mesh.BBox.Min.x;
                                    if (mesh.BBox.Min.y < bbox.Min.y)
                                        bbox.Min.y = mesh.BBox.Min.y;
                                    if (mesh.BBox.Min.z < bbox.Min.z)
                                        bbox.Min.z = mesh.BBox.Min.z;
                                    if (mesh.BBox.Max.x > bbox.Max.x)
                                        bbox.Max.x = mesh.BBox.Max.x;
                                    if (mesh.BBox.Max.y > bbox.Max.y)
                                        bbox.Max.y = mesh.BBox.Max.y;
                                    if (mesh.BBox.Max.z > bbox.Max.z)
                                        bbox.Max.z = mesh.BBox.Max.z;
                                }
                            }
                        }
                        if (node.mesh.subMeshes) {
                            for (var key in node.mesh.subMeshes) {
                                if (node.mesh.subMeshes.hasOwnProperty(key)) {
                                    var submesh = node.mesh.subMeshes[key];
                                    if (submesh.BBox) {
                                        var submesh_bbox = submesh.BBox.clone();
                                        submesh_bbox.multiply(node.worldMatrix);
                                        if (bbox.isDefault == true) {
                                            bbox.Min = submesh_bbox.Min;
                                            bbox.Max = submesh_bbox.Max;
                                            bbox.isDefault = false;
                                        }
                                        else {
                                            if (submesh_bbox.Min.x < bbox.Min.x)
                                                bbox.Min.x = submesh_bbox.Min.x;
                                            if (submesh_bbox.Min.y < bbox.Min.y)
                                                bbox.Min.y = submesh_bbox.Min.y;
                                            if (submesh_bbox.Min.z < bbox.Min.z)
                                                bbox.Min.z = submesh_bbox.Min.z;
                                            if (submesh_bbox.Max.x > bbox.Max.x)
                                                bbox.Max.x = submesh_bbox.Max.x;
                                            if (submesh_bbox.Max.y > bbox.Max.y)
                                                bbox.Max.y = submesh_bbox.Max.y;
                                            if (submesh_bbox.Max.z > bbox.Max.z)
                                                bbox.Max.z = submesh_bbox.Max.z;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        return bbox;
    };
    Scene.prototype.updateBBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        var bbox = new BoundingBox();
        var nodes = this.renderableNodes;
        this.bbox = Scene.calculateBBox(nodes, bbox, onlyVisible);
        return this.bbox;
    };
    Scene.prototype.applyResult = function (scene) {
        //let scene = event.message;
        var newNodeList = this.getModels(scene);
        var sceneNodelist = this.getModels(this.sceneGraph.root);
        for (var i = 1; i < newNodeList.length; i++) {
            var node = newNodeList[i];
            if (node.type && node.type === AppConstants.NodeType.SHAPE) {
                var SceneNode_1 = this.getNodeByName(sceneNodelist, node.name);
                //console.log(SceneNode)
                if (SceneNode_1) {
                    if (SceneNode_1.type === AppConstants.NodeType.SHAPE) {
                        if (node.mesh !== undefined) {
                            if (node.attributes !== undefined &&
                                node.attributes.bbox !== undefined)
                                if (node.mesh.primitives) {
                                    for (var ji = 0; ji < node.mesh.primitives.length; ji++) {
                                        var primitive = node.mesh.primitives[ji];
                                        var mesh = null;
                                        var meshName = node.name + '_' + primitive.name;
                                        var keys = Object.keys(SceneNode_1.mesh.subMeshes);
                                        for (var z = 0; z < keys.length; z++) {
                                            var item = SceneNode_1.mesh.subMeshes[keys[z]];
                                            if (node.name + '_' + item.name === meshName) {
                                                mesh = item;
                                                break;
                                            }
                                        }
                                        if (mesh === null)
                                            continue;
                                        var material = this.getMaterial(primitive);
                                        //console.log(material);
                                        for (var key in primitive.attributes) {
                                            if (primitive.attributes.hasOwnProperty(key)) {
                                                if (key === 'POSITION') {
                                                    if (mesh.attribs.position
                                                        .getUid() !==
                                                        primitive.attributes[key]
                                                            .uid)
                                                        this.updateBufferAttrib(mesh.attribs.position, primitive.attributes[key]);
                                                }
                                                else if (key === 'NORMAL') {
                                                    if (mesh.attribs.normal
                                                        .getUid() !==
                                                        primitive.attributes[key]
                                                            .uid)
                                                        this.updateBufferAttrib(mesh.attribs
                                                            .normal, primitive.attributes[key]);
                                                }
                                                else if (key === 'TEXCOORD_0') {
                                                    if (mesh.attribs.texCoord
                                                        .getUid() !==
                                                        primitive.attributes[key]
                                                            .uid)
                                                        this.updateBufferAttrib(mesh.attribs.texCoord, primitive.attributes[key]);
                                                }
                                                else if (key === 'COLOR_0') {
                                                    if (mesh.attribs.color
                                                        .getUid() !==
                                                        primitive.attributes[key]
                                                            .uid)
                                                        this.updateBufferAttrib(mesh.attribs
                                                            .color, primitive.attributes[key]);
                                                }
                                                else {
                                                    mesh.attribs.CustomBuffers.key =
                                                        this.getBufferAttrib(primitive.attributes[key]);
                                                    if (mesh.attribs.CustomBuffers[key]
                                                        .getUid() !==
                                                        primitive.attributes[key]
                                                            .uid)
                                                        this.updateBufferAttrib(mesh.attribs.CustomBuffers[key], primitive.attributes[key]);
                                                }
                                            }
                                        }
                                        if (primitive.indices)
                                            if (mesh.indices.getUid() !==
                                                primitive.indices.uid)
                                                this.updateBufferAttrib(mesh.indices, primitive.indices);
                                        if (primitive.mode !== mesh.rendingMode)
                                            if (primitive.mode ===
                                                RenderMode
                                                    .TRIANGLES ||
                                                primitive.mode ===
                                                    RenderMode
                                                        .TRIANGLE_STRIP ||
                                                primitive.mode ===
                                                    RenderMode
                                                        .TRIANGLE_FAN ||
                                                primitive.mode === undefined) {
                                                mesh.material = material;
                                                if (primitive.mode ===
                                                    RenderMode
                                                        .TRIANGLE_STRIP) {
                                                    mesh.rendingMode =
                                                        RenderMode
                                                            .TRIANGLE_STRIP;
                                                }
                                                else if (primitive.mode ===
                                                    RenderMode
                                                        .TRIANGLE_FAN) {
                                                    mesh.rendingMode =
                                                        RenderMode.TRIANGLE_FAN;
                                                }
                                            }
                                            else if (primitive.mode ===
                                                RenderMode.LINES) {
                                                mesh.material = material;
                                                mesh.rendingMode = RenderMode.LINES;
                                            }
                                            else if (primitive.mode ===
                                                RenderMode.LINE_STRIP) {
                                                mesh.material = material;
                                                mesh.rendingMode = RenderMode.LINE_STRIP;
                                            }
                                            else if (primitive.mode ===
                                                RenderMode
                                                    .LINE_LOOP) {
                                                mesh.material = material;
                                                mesh.rendingMode = RenderMode.LINE_LOOP;
                                            }
                                            else if (primitive.mode ===
                                                RenderMode
                                                    .POINTS) {
                                                mesh.material = material;
                                                mesh.rendingMode = RenderMode.POINTS;
                                            }
                                            else {
                                                throw new Error('GLTFLoader: Primitive mode unsupported: ' +
                                                    primitive.mode);
                                            }
                                    }
                                }
                            if (node.attributes !== undefined &&
                                node.attributes.bbox !== undefined) {
                                var bboxmax = node.attributes.bbox.max;
                                var bboxmin = node.attributes.bbox.min;
                                var box = SceneNode_1.mesh.subMeshes['bbox'];
                                if (box === undefined || null) {
                                    box = new BoxMesh(node.name + '_boundingbox', fromValues$1(bboxmin[0], bboxmin[1], bboxmin[2]), fromValues$1(bboxmax[0], bboxmax[1], bboxmax[2]), 0.5);
                                }
                                else {
                                    box.updateBBox(fromValues$1(bboxmin[0], bboxmin[1], bboxmin[2]), fromValues$1(bboxmax[0], bboxmax[1], bboxmax[2]), 0.5);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    //Private methods
    Scene.prototype.getNodeByName = function (nodeList, name) {
        var selectedNode = null;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].name === name) {
                selectedNode = nodeList[i];
                break;
            }
        }
        return selectedNode;
    };
    Scene.prototype.getModels = function (node, type) {
        if (!node)
            return;
        if (type !== undefined)
            if (node.type !== type)
                return;
        var models = [];
        models[models.length] = node;
        if (node['children']) {
            for (var i = 0; i < node['children'].length; i++) {
                var data = this.getModels(node['children'][i], type);
                if (data)
                    models = models.concat(data);
            }
        }
        return models;
    };
    Scene.prototype.getMaterial = function (primitive) {
        var newMat = MaterialManager.parseServerJSON(primitive.material);
        return newMat;
        // let materialObject = primitive.material;
        // let key = 'material_' + materialObject.id;
        // let material = this.materialMap[key];
        // if (material === undefined) {
        //     material = materialObject;
        //     if (material.pbrMetallicRoughness !== undefined) {
        //         let baseColorTexture = null;
        //         if (
        //             material.pbrMetallicRoughness.baseColorTexture !== undefined
        //         ) {
        //             let textureKey =
        //                 'baseColorTexture_ ' +
        //                 material.pbrMetallicRoughness.baseColorTexture.source;
        //             baseColorTexture = this.textureMap[textureKey];
        //             if (
        //                 baseColorTexture === undefined ||
        //                 baseColorTexture === null
        //             ) {
        //                 baseColorTexture = TextureManager.parseServerJSON(materialObject.pbrMetallicRoughness.baseColorTexture);
        //                 this.textureMap[textureKey] = baseColorTexture;
        //             }
        //         }
        //         material.pbrMetallicRoughness.baseColorTexture = baseColorTexture;
        //     }
        //     this.materialMap[key] = material;
        // }
        // let newMaterial = new Material(material.id);
        // let materialColor = material.pbrMetallicRoughness.baseColorFactor;
        // let materialTexture = material.pbrMetallicRoughness.baseColorTexture;
        // if( primitive.mode === RenderMode.TRIANGLES ||
        //     primitive.mode === RenderMode.TRIANGLE_FAN ||
        //     primitive.mode === RenderMode.TRIANGLE_STRIP || 
        //     primitive.mode === undefined){
        //         newMaterial.diffuseColor = materialColor;
        //         newMaterial.texture = materialTexture;
        //         newMaterial.isTextureAvailable = true;
        //     }
        // else if (
        //      primitive.mode === RenderMode.LINES ||
        //      primitive.mode === RenderMode.LINE_STRIP ||
        //      primitive.mode === RenderMode.LINE_LOOP
        //  ) {
        //           newMaterial.isTextureAvailable = false;
        //           newMaterial.diffuseColor = [0,0,0];
        // } else if (primitive.mode === RenderMode.POINTS) {
        //             newMaterial.isTextureAvailable = false;
        //             newMaterial.diffuseColor = [0,0,0];
        // } else {
        //     throw new Error(
        //         'GLTFLoader: Primitive mode unsupported: ' +
        //             primitive.mode
        //     );
        //  }
        // if (materialTexture === undefined || materialTexture === null) {
        //     newMaterial.isTextureAvailable = false;
        //     newMaterial.diffuseColor = materialColor;
        // } else {
        //     newMaterial.isTextureAvailable = true;
        //     newMaterial.texture = materialTexture;
        //  }
        //  return newMaterial;
    };
    Scene.prototype.updateBufferAttrib = function (BufferAttribute, accessor) {
        if (BufferAttribute && accessor) {
            var arrayData = null;
            BufferAttribute.name = accessor.name;
            BufferAttribute.setUid(accessor.uid);
            var accessorType = accessor.type;
            var itemSize = WEBGLTYPESIZES[accessorType];
            var arrayBuffer = accessor.bufferViewData.arrayBuffer;
            var arrayType = WEBGLCOMPONENTTYPES[accessor.componentType];
            var size = accessor.count * itemSize;
            arrayData = new arrayType(arrayBuffer, accessor.bufferOffset, size);
            var currentSize = BufferAttribute.getDataArrayCount();
            if (currentSize === size) {
                BufferAttribute.updateData(arrayData);
            }
        }
    };
    Scene.prototype.getBufferAttrib = function (accessor) {
        var key = 'bufferView : ' + accessor.bufferView;
        var bufferAttribute = Mesh.bufferAttributeCache.get(key);
        if (bufferAttribute === undefined) {
            var accessorType = accessor.type;
            var itemSize = WEBGLTYPESIZES[accessorType];
            var arrayBuffer = accessor.bufferViewData.arrayBuffer;
            var arrayType = WEBGLCOMPONENTTYPES[accessor.componentType];
            var data = new arrayType(arrayBuffer, accessor.bufferOffset, accessor.count * itemSize);
            if (accessor.bufferViewData.target === BufferTarget.ELEMENT_ARRAY_BUFFER)
                bufferAttribute = new WebGLElementArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
            else if (accessor.bufferViewData.target === BufferTarget.ARRAY_BUFFER)
                bufferAttribute = new WebGLArrayBuffer(accessor.uid, BufferUsage.STATIC_DRAW, data);
            else
                return null;
            bufferAttribute.name = accessor.name;
            Mesh.bufferAttributeCache.add(key, bufferAttribute);
        }
        return bufferAttribute;
    };
    return Scene;
}());var SceneManager = /** @class */ (function () {
    function SceneManager(container) {
        this.container = container;
        this.scenes = [];
        this.nodeCount = 0;
        this.shapeNodeCount = 0;
        /*
        this.renderer = new Renderer(this.container);
        this.renderer2d = new Renderer2D(this.container);
        this.scene = new THREE.Object3D();
        this.camera = this.renderer.camera;
        this.bufferAttributeCache = new Registry();

        this.lights = [];
        
        this.bufferAttributeCache.removeAll();
        this.initialized = false;
        */
    }
    SceneManager.prototype.addScene = function (scene) {
        this.scenes.push(scene);
    };
    SceneManager.prototype.render = function (shader, renderPass) {
        if (this.scenes) {
            this.scenes.forEach(function (scene) {
                scene.render(shader, renderPass);
            });
        }
    };
    SceneManager.prototype.isReady = function () {
        return true;
    };
    SceneManager.prototype.getBoundingBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        var BBox = new BoundingBox();
        this.scenes.forEach(function (scene) {
            var bbox = scene.getBoundingBox(onlyVisible);
            if (bbox) {
                if (BBox.isDefault) {
                    BBox = bbox;
                    BBox.isDefault = false;
                }
                else {
                    if (bbox.Min.x < BBox.Min.x)
                        BBox.Min.x = bbox.Min.x;
                    if (bbox.Min.y < BBox.Min.y)
                        BBox.Min.y = bbox.Min.y;
                    if (bbox.Min.z < BBox.Min.z)
                        BBox.Min.z = bbox.Min.z;
                    if (bbox.Max.x > BBox.Max.x)
                        BBox.Max.x = bbox.Max.x;
                    if (bbox.Max.y > BBox.Max.y)
                        BBox.Max.y = bbox.Max.y;
                    if (bbox.Max.z > BBox.Max.z)
                        BBox.Max.z = bbox.Max.z;
                }
            }
        });
        return BBox;
    };
    SceneManager.prototype.getBoundingBoxFromNodes = function (nodes) {
        return Scene.getBoundingBoxFromNodes(nodes);
    };
    SceneManager.prototype.updateBBox = function () {
        this.scenes.forEach(function (scene) {
            scene.updateBBox();
        });
        return this.getBoundingBox();
    };
    SceneManager.prototype.getScenes = function () {
        return this.scenes;
    };
    SceneManager.prototype.getSceneName = function (sceneIndex) {
        if (this.scenes && this.scenes.length > 0) {
            if (sceneIndex === null || sceneIndex === undefined)
                sceneIndex = 0;
            if (sceneIndex < this.scenes.length)
                return this.scenes[sceneIndex].name;
        }
        return "Noname";
    };
    SceneManager.prototype.applyResult = function (scene) {
        this.scenes[0].applyResult(scene);
    };
    SceneManager.prototype.getPartNodes = function () {
        var out = [];
        this.scenes.forEach(function (scene) {
            scene.traverse(function (parent, node) {
                var _a;
                if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0 && node.children[0].type === AppConstants.NodeType.SHAPE) {
                    out.push(node);
                }
            });
        });
        return out;
    };
    SceneManager.prototype.getRenderNodes = function () {
        var nodes = [];
        if (this.scenes instanceof Array)
            this.scenes.forEach(function (scene) {
                //nodes.push(scene.getRenderableObjects());
                nodes = nodes.concat.apply(nodes, __spread(scene.getRenderableObjects()));
                /*
                scene.getRenderableObjects().forEach((node) =>{
                    nodes.push(node);
                });
                */
            });
        return nodes;
    };
    SceneManager.prototype.traverse = function (cbk) {
        this.scenes.forEach(function (scene) {
            scene.traverse(cbk);
        });
    };
    SceneManager.prototype.addRenderNodes = function (adjacentNodeId, nodes) {
        if (this.scenes instanceof Array) {
            this.scenes[0].addRenderNodes(adjacentNodeId, nodes);
        }
    };
    SceneManager.prototype.updateRenderNodes = function () {
        if (this.scenes instanceof Array)
            this.scenes.forEach(function (scene) {
                scene.updateRenderableObjects();
            });
    };
    SceneManager.prototype.getMergedNodes = function () {
        return this.scenes[0].getMergedNodes();
    };
    SceneManager.prototype.getSceneGraphJSON = function (child) {
        var _a;
        if (child === void 0) { child = null; }
        var sceneTree = [];
        var sceneGraph = {};
        var root = (child) ? child : this.scenes[0].sceneGraph.root;
        if (root) {
            sceneGraph.id = this.nodeCount++;
            sceneGraph.index = (root.type == AppConstants.NodeType.TRANSFORM) ? null : this.shapeNodeCount++;
            sceneGraph.name = root.name;
            sceneGraph.attributes = root.attributes;
            sceneGraph.children = [];
            if (root.children) {
                for (var index = 0; index < root.children.length; index++) {
                    var e = root.children[index];
                    (_a = sceneGraph.children).push.apply(_a, __spread(this.getSceneGraphJSON(e)));
                }
            }
            else {
                delete sceneGraph.children;
            }
            sceneGraph.getAllNodes = function () {
                var nodeArray = [];
                nodeArray.push(this);
                if (this.children && this.children.length > 0) {
                    this.children.forEach(function (element) {
                        nodeArray.push.apply(nodeArray, __spread(element.getAllNodes()));
                    });
                }
                return nodeArray;
            };
            sceneTree.push(sceneGraph);
            return sceneTree;
        }
    };
    SceneManager.prototype.update = function () {
        WebGLState.clear();
        this.updateRenderNodes();
        this.updateBBox();
    };
    SceneManager.prototype.getPartPickandMoveMatrix = function (nodeIndex) {
        var nodes = this.getRenderNodes();
        if (nodeIndex !== null && nodeIndex !== undefined) {
            for (var i = 0; i < nodes.length; i++)
                if (nodeIndex === nodes[i].index)
                    return nodes[i].parent.pickAndMoveMatrix;
        }
        var identityMat = create$1();
        identity(identityMat);
        return identityMat;
    };
    SceneManager.prototype.setPartPickandMoveMatrix = function (nodeIndexList, mat4) {
        var nodes = this.getRenderNodes();
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            nodeIndexList.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        nodes[i].parent.pickAndMoveMatrix = mat4;
                    }
            });
        }
        this.update();
    };
    return SceneManager;
}());var MainVertexShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec3 aPosition;in vec3 aNormal;in vec2 aUV;in vec3 aColor;in vec3 aDeformValues;in highp float aResultValues;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;uniform mat4 uNormalMatrix;uniform vec3 uColor;uniform int uAnimationType;uniform vec3 uScaleFactor;uniform highp float uFrameFactor;uniform bool uIsDeformed;uniform vec2 uValueMinMax;out highp vec2 vUV;out highp vec4 vPositionWorldSpace;out highp vec3 vNormal;out highp float vResultValues;highp float getU(float result){if(result>=3.4028234663852886e+38){return 3.4028234663852886e+38;}highp float fUser_MIN=uValueMinMax.x;highp float fUser_MAX=uValueMinMax.y;highp float U=(result-fUser_MIN)/(fUser_MAX-fUser_MIN);highp float textureAdjustment=1.0/4096.0;highp float textureMIN=textureAdjustment+0.0000005;highp float textureMAX=1.0-textureAdjustment;highp float NewU=textureMIN+(U*(textureMAX-textureMIN));return NewU;}void main(void){gl_PointSize=3.0;vUV=aUV;vec3 positionWorldSpace=aPosition;if(uIsDeformed)positionWorldSpace=aPosition+(aDeformValues*uScaleFactor);if(uAnimationType==1||uAnimationType==2){positionWorldSpace=aPosition+(aDeformValues*uFrameFactor*uScaleFactor);vUV.x=aUV.x*abs(uFrameFactor);}vResultValues=aResultValues;vNormal=(uNormalMatrix*vec4(aNormal,0.0)).xyz;vPositionWorldSpace=uModelViewMatrix*vec4(positionWorldSpace,1.0);gl_Position=uProjectionMatrix*uModelViewMatrix*vec4(positionWorldSpace,1.0);}"; // eslint-disable-line
var MainFragmentShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform highp mat4 uProjectionMatrix;uniform highp mat4 uModelViewMatrix;uniform highp mat4 uNormalMatrix;uniform highp vec3 uCameraPosition;uniform vec3 uColor;uniform sampler2D uTexture_0;uniform highp float uUseTexture;uniform highp vec3 uLightDirection;uniform highp float uUnlit;uniform highp float uDisplayMode;uniform highp float uUseTransparency;uniform highp float uTransparencyFactor;uniform highp vec4 uClipPlane0;uniform highp vec4 uClipPlane1;uniform highp vec4 uClipPlane2;uniform highp vec4 uClipPlane3;uniform highp vec4 uClipPlane4;uniform highp vec4 uClipPlane5;uniform highp float uClipPlane0State;uniform highp float uClipPlane1State;uniform highp float uClipPlane2State;uniform highp float uClipPlane3State;uniform highp float uClipPlane4State;uniform highp float uClipPlane5State;uniform highp float uBoundRadius;uniform highp vec4 uMinMAXNoresultColorArray[3];uniform vec2 uValueMinMax;uniform highp int uAnimationType;uniform highp float uFrameFactor;in highp vec2 vUV;in highp vec4 vPositionWorldSpace;in highp vec3 vNormal;in highp float vResultValues;out highp vec4 outColor;void updateClipPlane(float planeState,vec4 clipPlane,float OutlinePercent){if(planeState==1.0){if(dot(vPositionWorldSpace,clipPlane)<0.0){discard;}else if(abs(dot(vPositionWorldSpace,clipPlane))<uBoundRadius*OutlinePercent){outColor=vec4(1.0,0.0,0.0,1.0);}}}void updateClipPlanes(float OutlinePercent){updateClipPlane(uClipPlane0State,uClipPlane0,OutlinePercent);updateClipPlane(uClipPlane1State,uClipPlane1,OutlinePercent);updateClipPlane(uClipPlane2State,uClipPlane2,OutlinePercent);updateClipPlane(uClipPlane3State,uClipPlane3,OutlinePercent);updateClipPlane(uClipPlane4State,uClipPlane4,OutlinePercent);updateClipPlane(uClipPlane5State,uClipPlane5,OutlinePercent);}vec4 getColor(float result){vec4 color=vec4(1.0,0.0,0.0,1.0);highp float fUser_MIN=uValueMinMax.x;highp float fUser_MAX=uValueMinMax.y;if(result>=3.4028e+38){return uMinMAXNoresultColorArray[2];}else if(result>fUser_MAX){return uMinMAXNoresultColorArray[1];}else if(result<=fUser_MAX&&result>=fUser_MIN){highp float U=(result-fUser_MIN)/(fUser_MAX-fUser_MIN);if(uAnimationType==1||uAnimationType==2){U=U*abs(uFrameFactor);}highp vec2 newUValue=vec2(U,0.5);return texture(uTexture_0,newUValue);}else if(result<fUser_MIN){return uMinMAXNoresultColorArray[0];}return color;}void main(void){highp float diffuseFactor=1.0;highp vec3 diffuseColor=(1.0-uUseTexture)*uColor.xyz+uUseTexture*getColor(vResultValues).xyz;if(uUnlit!=1.0){highp vec3 fdx=vec3(dFdx(vPositionWorldSpace.x),dFdx(vPositionWorldSpace.y),dFdx(vPositionWorldSpace.z));highp vec3 fdy=vec3(dFdy(vPositionWorldSpace.x),dFdy(vPositionWorldSpace.y),dFdy(vPositionWorldSpace.z));highp vec3 nNormal=normalize(cross(fdx,fdy));highp vec3 nLightDirection=normalize(uLightDirection);diffuseFactor=dot(nLightDirection,nNormal)*0.5;diffuseFactor=max(0.0,diffuseFactor+max(0.0,dot(normalize(uCameraPosition.xyz-vPositionWorldSpace.xyz),nNormal))*1.0);diffuseFactor=clamp(diffuseFactor,0.0,1.0);}else if(uDisplayMode==1.0){diffuseColor-=vec3(0.1);}if(uUseTransparency==1.0){outColor.rgb=diffuseColor.rgb*diffuseFactor*uTransparencyFactor;outColor.w=uTransparencyFactor;}else{outColor=vec4((diffuseColor*diffuseFactor),1.0);}updateClipPlanes(0.008);}"; // eslint-disable-line
var MathUtils;
(function (MathUtils) {
    function getArcballVector(x, y, canvas) {
        //https://en.wikibooks.org/wiki/OpenGL_Programming/Modern_OpenGL_Tutorial_Arcball
        var screen_width = canvas.width;
        var screen_height = canvas.height;
        var P = create$2();
        // y = screen_height;
        //var centeredModelScreenPos = [0, 0, 0, 0]
        //centeredModelScreenPos[0] = translation[0];
        //centeredModelScreenPos[1] = 0.0;
        //centeredModelScreenPos[2] = 0.0;
        //centeredModelScreenPos[3] = 1.0;
        P[0] = (1.0 * x / screen_width) * 2 - 1.0;
        P[1] = (1.0 * y / screen_height) * 2 - 1.0;
        P[2] = 0;
        // P[0] = modelCenter[0] - P[0];
        //P[1] = -modelCenter[1] - P[1];
        // P[0] = -P[0];
        // P[1] = P[1];
        P[1] = -P[1];
        var OP_squared = P[0] * P[0] + P[1] * P[1];
        if (OP_squared <= 1 * 1)
            P[2] = Math.sqrt(1 * 1 - OP_squared); // Pythagorean
        else
            P = normalize(P, P); // nearest point
        return P;
    }
    MathUtils.getArcballVector = getArcballVector;
    function getContainerBox(container) {
        var box = [0, 0, 0, 0];
        if (container !== undefined && container !== null) {
            try {
                var rect = container.getBoundingClientRect();
                box[0] = rect.top;
                box[1] = rect.left;
                box[2] = rect.bottom;
                box[3] = rect.right;
            }
            catch (err) {
                throw new err();
            }
        }
        return box;
    }
    MathUtils.getContainerBox = getContainerBox;
    function projectOnVector(target, v) {
        var denominator = squaredLength(v);
        if (denominator === 0)
            return create$2();
        var scalar = dot(v, target) / denominator;
        scale$1(target, v, scalar);
        return target;
    }
    MathUtils.projectOnVector = projectOnVector;
    function projectPointOnLine(point, line) {
        var out = create$2();
        var AP = create$2();
        var AB = create$2();
        sub(AP, line.x, point);
        sub(AB, line.x, line.y);
        var projection = dot(AP, AB) / dot(AB, AB);
        scaleAndAdd(out, line.x, AB, projection);
        return out;
    }
    MathUtils.projectPointOnLine = projectPointOnLine;
    function rotateOnWorldAxis(worldMatrix, angleInRad, axis) {
        var translation = create$2();
        getTranslation(translation, worldMatrix);
        var scale = create$2();
        getScaling(scale, worldMatrix);
        var _quat = create$4();
        setAxisAngle(_quat, axis, angleInRad);
        var quat = create$4();
        getRotation(quat, worldMatrix);
        mul$1(quat, _quat, quat);
        fromRotationTranslationScale(worldMatrix, quat, translation, scale);
    }
    MathUtils.rotateOnWorldAxis = rotateOnWorldAxis;
    function translateOnWorld(worldMatrix, trans) {
        worldMatrix[12] += trans[0];
        worldMatrix[13] += trans[1];
        worldMatrix[14] += trans[2];
    }
    MathUtils.translateOnWorld = translateOnWorld;
    function getUpVector(matrix) { return fromValues$1(matrix[4], matrix[5], matrix[6]); }
    MathUtils.getUpVector = getUpVector;
    function getRightVector(matrix) { return fromValues$1(matrix[0], matrix[1], matrix[2]); }
    MathUtils.getRightVector = getRightVector;
    function getDirVector(matrix) { return fromValues$1(matrix[8], matrix[9], matrix[10]); }
    MathUtils.getDirVector = getDirVector;
    function getPositionVector(matrix) { return fromValues$1(matrix[12], matrix[13], matrix[14]); }
    MathUtils.getPositionVector = getPositionVector;
    function getPerpendicular(v) {
        var perpendicular = create$2();
        cross(perpendicular, v, [1, 0, 0]);
        if (sqrLen(perpendicular) <= 0.000001 * 0.000001) {
            cross(perpendicular, v, [0, 1, 0]);
        }
        normalize(perpendicular, perpendicular);
        return perpendicular;
    }
    MathUtils.getPerpendicular = getPerpendicular;
    function deg2Rad(degrees) {
        return degrees * Math.PI / 180;
    }
    MathUtils.deg2Rad = deg2Rad;
    function rad2Deg(rad) {
        return rad * 180 / Math.PI;
    }
    MathUtils.rad2Deg = rad2Deg;
    function getMidPoint(a, b) {
        var out = create$2();
        add(out, a, b);
        scale$1(out, out, 0.5);
        return out;
    }
    MathUtils.getMidPoint = getMidPoint;
    function arraysEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length !== b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    MathUtils.arraysEqual = arraysEqual;
})(MathUtils || (MathUtils = {}));var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this._listeners = {};
    }
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        if (this._listeners === undefined)
            this._listeners = {};
        var listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        if (this._listeners === undefined)
            return false;
        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener) {
        if (this._listeners === undefined)
            return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            var index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    };
    EventDispatcher.prototype.dispatchEvent = function (event) {
        if (this._listeners === undefined)
            return;
        var listeners = this._listeners;
        var listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            var array = listenerArray.slice(0);
            for (var i = 0, l = array.length; i < l; i++) {
                array[i].call(this, event);
            }
        }
    };
    return EventDispatcher;
}());var PerspCamera = /** @class */ (function () {
    function PerspCamera() {
        this.camMatrix = create$1();
        this.pMatrix = create$1();
        this.projectionViewMatrix = create$1();
    }
    return PerspCamera;
}());var OrthCamera = /** @class */ (function () {
    function OrthCamera() {
        this.camMatrix = create$1();
        this.pMatrix = create$1();
        this.projectionViewMatrix = create$1();
    }
    return OrthCamera;
}());var Events;
(function (Events) {
    Events["MOUSE_DOWN"] = "MOUSE_DOWN";
    Events["MOUSE_UP"] = "MOUSE_UP";
    Events["MOUSE_MOVE"] = "MOUSE_MOVE";
    Events["MOUSE_SCROLL"] = "MOUSE_SCROLL";
    Events["CLICK"] = "CLICK";
    Events["DBL_CLICK"] = "DBL_CLICK";
    Events["MODEL_LOADED"] = "MODEL_LOADED";
    Events["PART_PICKED"] = "PART_PICKED";
    Events["PROBE_FINISH"] = "PROBE_FINISH";
    Events["CAMERA_MOVED"] = "CAMERA_MOVED";
    Events["LABEL3D_CREATED"] = "LABEL3D_CREATED";
    Events["LABEL3D_DESTROYED"] = "LABEL3D_DESTROYED";
    Events["ANIMATION_FRAME_NUMBER"] = "ANIMATION_FRAME_NUMBER";
    Events["LABEL_MOVED"] = "LABEL_MOVED";
    Events["LABEL_VISIBILITY"] = "LABEL_VISIBILITY";
})(Events || (Events = {}));var ZoomType;
(function (ZoomType) {
    ZoomType[ZoomType["MOUSE_WHEEL"] = 0] = "MOUSE_WHEEL";
    ZoomType[ZoomType["MIDDLE_ZOOM"] = 1] = "MIDDLE_ZOOM";
    ZoomType[ZoomType["TOUCH_ZOOM"] = 2] = "TOUCH_ZOOM";
})(ZoomType || (ZoomType = {}));
var CameraControl = /** @class */ (function (_super) {
    __extends(CameraControl, _super);
    function CameraControl(container, canvas, camType) {
        var _this = _super.call(this) || this;
        _this.camType = camType;
        _this.container = container;
        _this.canvas = canvas;
        _this.translation = create$2();
        _this.sceneBoundingBox = new BoundingBox();
        //control params initialization
        _this.params = {
            pointOfRotation: null,
            rotationSensitivity: 1,
            zoomSensitivity: 1,
            zoomType: ZoomType.MOUSE_WHEEL,
            zoomScale: 0.0015 * 0.25,
            fWheelFactor: 1,
            fWheelFactorPositive: 1,
            fWheelFactorNegative: 1
        };
        //Perspective Camera Parameters
        _this.perspParams = {
            fov: 34,
            aspect: _this.canvas.clientWidth / _this.canvas.clientHeight,
            near: 1.0,
            far: 1000
        };
        //OrthoCamera parameters
        _this.orthoParams = {
            zDist: 0,
            orthoWindowWidth: 1,
            orthoWindowHeight: 1,
            orthoWidth: _this.canvas.clientWidth,
            orthoHeight: _this.canvas.clientHeight,
            left: -_this.canvas.clientWidth / 2,
            right: _this.canvas.clientWidth / 2,
            bottom: -_this.canvas.clientHeight / 2,
            top: _this.canvas.clientHeight / 2,
            near: 1,
            far: 1000,
            orthoZoomFactor: 1,
            orthoSensitivityScale: 2
        };
        _this.perspCamera = new PerspCamera();
        _this.orthCamera = new OrthCamera();
        AppObjects.externalEventDispatcher.addEventListener('MODEL_LOADED', _this.onSceneLoad.bind(_this));
        _this.update();
        return _this;
    }
    CameraControl.prototype.onSceneLoad = function () {
        this.sceneBoundingBox = AppObjects.sceneManager.getBoundingBox(false);
        var radius = this.sceneBoundingBox.getRadius();
        this.orthoParams.zDist = (radius / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251)));
        this.resetPosition();
    };
    CameraControl.prototype.resetPosition = function () {
        this.moveToCenter();
        var translate$1 = fromValues$1(0, 0, 0);
        var radius = this.sceneBoundingBox.getRadius();
        var zPos = (radius / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251)));
        translate$1[2] = -zPos;
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, translate$1);
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, translate$1);
        this.orthoParams.orthoWindowWidth = (this.sceneBoundingBox.Max.x - this.sceneBoundingBox.Min.x) * 1.05;
        this.orthoParams.orthoWindowHeight = (this.sceneBoundingBox.Max.y - this.sceneBoundingBox.Min.y) * 1.05;
    };
    CameraControl.prototype.update = function () {
        this.updateNearFarPlane();
        this.updateProjectionMatrix();
    };
    CameraControl.prototype.project = function (point3DArray, NewMVMatrix, widthHeight, cameraMat) {
        var point2D = create$3();
        var point3D = create$3();
        var tempMatrix = create$1();
        identity(tempMatrix);
        var viewportArray = [0.0, 0.0, widthHeight[0], widthHeight[1]];
        point3D[0] = point3DArray[0];
        point3D[1] = point3DArray[1];
        point3D[2] = point3DArray[2];
        point3D[3] = 1.0;
        if (NewMVMatrix)
            multiply(tempMatrix, cameraMat, NewMVMatrix);
        else
            multiply(tempMatrix, cameraMat, this.getCameraMatrix(this.camType));
        transformMat4$1(point2D, point3D, tempMatrix);
        point2D[0] = point2D[0] / point2D[3];
        point2D[1] = point2D[1] / point2D[3];
        point2D[2] = point2D[2] / point2D[3];
        /* Map to range 0 to 1 */
        point2D[0] = (point2D[0] + 1) / 2;
        point2D[1] = (point2D[1] + 1) / 2;
        /* Map x and y to window coordinates */
        point2D[0] = Math.round((point2D[0] * viewportArray[2]) + viewportArray[0]);
        point2D[1] = Math.round(widthHeight[1] - ((point2D[1] * viewportArray[3]) + viewportArray[1]));
        return fromValues$1(point2D[0], point2D[1], point2D[2]);
    };
    CameraControl.prototype.unproject = function (point2DArray, NewMVMatrix, widthHeight, cameraMat) {
        //console.log(point2DArray);  
        var viewport = [0.0, 0.0, widthHeight[0], widthHeight[1]];
        var point2D = create$3();
        var point3D = create$3();
        var tempMatrix = create$1();
        point2DArray[1] = widthHeight[1] - point2DArray[1];
        /* Map x and y from window coordinates */
        point2D[0] = (point2DArray[0] - viewport[0]) / viewport[2];
        point2D[1] = (point2DArray[1] - viewport[1]) / viewport[3];
        point2D[2] = point2DArray[2];
        /* Map to range -1 to 1 */
        point2D[0] = point2D[0] * 2 - 1;
        point2D[1] = point2D[1] * 2 - 1;
        point2D[2] = point2D[2] * 2 - 1;
        point2D[3] = 1.0;
        multiply(tempMatrix, cameraMat, NewMVMatrix);
        if (!invert(tempMatrix, tempMatrix)) {
            return null;
        }
        transformMat4$1(point3D, point2D, tempMatrix);
        if (point3D[3] == 0.0) {
            point3D[3] = 0.000000000000000000000001;
            //return null;
        }
        //console.log(point3D);
        point3D[0] = (point3D[0] / point3D[3]);
        point3D[1] = (point3D[1] / point3D[3]);
        point3D[2] = (point3D[2] / point3D[3]);
        return fromValues$1(point3D[0], point3D[1], point3D[2]);
    };
    CameraControl.prototype.setRotationPoint = function (v) {
        this.params.pointOfRotation = v;
    };
    CameraControl.prototype.getRotationPoint = function () {
        if (this.params.pointOfRotation) {
            return clone$1(this.params.pointOfRotation);
        }
        else {
            return this.sceneBoundingBox.getCenter();
        }
    };
    CameraControl.prototype.setOrthoWindowWidth = function (width) {
        this.orthoParams.orthoWindowWidth = width;
    };
    CameraControl.prototype.getPosition = function (type) {
        if (type === void 0) { type = this.camType; }
        var cameraMatrix = this.getCameraMatrix(type);
        var camPos = fromValues$2(0, 0, 0, 1);
        invert(cameraMatrix, cameraMatrix);
        transformMat4$1(camPos, camPos, cameraMatrix);
        return fromValues$1(camPos[0], camPos[1], camPos[2]);
    };
    CameraControl.prototype.getGLMatrix = function () {
        return (this.camType === CameraType.Perspective) ? this.perspCamera.projectionViewMatrix : this.orthCamera.projectionViewMatrix;
    };
    CameraControl.prototype.onMouseRotation = function (newX, newY, lastX, lastY) {
        var rotationObject = this.getRotAngleAndNormalizedCamAxis(newX, newY, lastX, lastY);
        if (!rotationObject) {
            return;
        }
        var angle = rotationObject.angle * this.params.rotationSensitivity;
        var axis_in_object_coord = create$3();
        var axis_in_object_coord_ortho = create$3();
        var axis_in_camera_coord = fromValues$2(rotationObject.axis_in_camera_coord[0], rotationObject.axis_in_camera_coord[1], rotationObject.axis_in_camera_coord[2], 0);
        var camera2object = create$1();
        var camera2objectOrtho = create$1();
        multiply(camera2object, camera2object, this.perspCamera.camMatrix);
        multiply(camera2objectOrtho, camera2objectOrtho, this.orthCamera.camMatrix);
        invert(camera2object, camera2object);
        invert(camera2objectOrtho, camera2objectOrtho);
        var rotationPoint = fromValues$1(-0, -0, -0);
        rotationPoint = (this.params.pointOfRotation != null ? clone$1(this.params.pointOfRotation) : this.sceneBoundingBox.getCenter());
        transformMat4$1(axis_in_object_coord, axis_in_camera_coord, camera2object);
        transformMat4$1(axis_in_object_coord_ortho, axis_in_camera_coord, camera2objectOrtho);
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, rotationPoint);
        rotate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, angle, fromValues$1(axis_in_object_coord[0], axis_in_object_coord[1], axis_in_object_coord[2]));
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(rotationPoint, rotationPoint));
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, negate(rotationPoint, rotationPoint));
        rotate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, angle, fromValues$1(axis_in_object_coord_ortho[0], axis_in_object_coord_ortho[1], axis_in_object_coord_ortho[2]));
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, negate(rotationPoint, rotationPoint));
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.rotateCamera = function (angleInRadian, axisInCameraCoord) {
        var angle = angleInRadian * this.params.rotationSensitivity;
        var axis_in_object_coord = create$3();
        var axis_in_object_coord_ortho = create$3();
        var axis_in_camera_coord = fromValues$2(axisInCameraCoord[0], axisInCameraCoord[1], axisInCameraCoord[2], 0);
        var camera2object = create$1();
        var camera2objectOrtho = create$1();
        multiply(camera2object, camera2object, this.perspCamera.camMatrix);
        multiply(camera2objectOrtho, camera2objectOrtho, this.orthCamera.camMatrix);
        invert(camera2object, camera2object);
        invert(camera2objectOrtho, camera2objectOrtho);
        var rotationPoint = fromValues$1(-0, -0, -0);
        rotationPoint = (this.params.pointOfRotation != null ? clone$1(this.params.pointOfRotation) : this.sceneBoundingBox.getCenter());
        transformMat4$1(axis_in_object_coord, axis_in_camera_coord, camera2object);
        transformMat4$1(axis_in_object_coord_ortho, axis_in_camera_coord, camera2objectOrtho);
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, rotationPoint);
        rotate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, angle, fromValues$1(axis_in_object_coord[0], axis_in_object_coord[1], axis_in_object_coord[2]));
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(rotationPoint, rotationPoint));
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, negate(rotationPoint, rotationPoint));
        rotate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, angle, fromValues$1(axis_in_object_coord_ortho[0], axis_in_object_coord_ortho[1], axis_in_object_coord_ortho[2]));
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, negate(rotationPoint, rotationPoint));
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.panCamera = function (deltaX, deltaY) {
        if (deltaX != 0 || deltaY != 0) {
            var panSensitivity = 0.2;
            this.perspCamera.camMatrix[12] += deltaX * panSensitivity;
            this.perspCamera.camMatrix[13] += -deltaY * panSensitivity;
            var width = this.canvas.clientWidth; //1280;
            var height = this.canvas.clientHeight; //800;
            var zPos = (this.orthoParams.orthoHeight / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var y = zPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var x = y * this.perspParams.aspect;
            var _orthoWindowWidth = (x * 2) * this.orthoParams.orthoZoomFactor;
            var _orthoWindowHeight = (x * 2 / this.perspParams.aspect) * this.orthoParams.orthoZoomFactor;
            this.translation[0] = (_orthoWindowWidth * deltaX) / width;
            this.translation[1] = (_orthoWindowHeight * deltaY) / height;
            var trans = fromValues$1(this.translation[0], this.translation[1], 0);
            this.orthCamera.camMatrix[12] += trans[0];
            this.orthCamera.camMatrix[13] += trans[1];
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
        }
    };
    CameraControl.prototype.panRotateCamera = function (deltaX, deltaY) {
        if (deltaX != 0 || deltaY != 0) {
            var lastMouseX = 0;
            var lastMouseY = 0;
            var newMouseX = lastMouseX + deltaX;
            var newMouseY = lastMouseX + deltaY;
            var mvMatrix = create$1();
            var camMatrix = this.getCameraMatrix2(CameraType.Perspective);
            var point3d1 = this.unproject([lastMouseX, lastMouseY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
            var point3d2 = this.unproject([newMouseX, newMouseY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
            if (point3d1 == null || point3d2 == null)
                return;
            var point3d11 = this.unproject([lastMouseX, lastMouseY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
            var point3d22 = this.unproject([newMouseX, newMouseY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
            if (point3d11 == null || point3d22 == null)
                return;
            var cameraPosition = fromValues$2(0, 0, 0, 1);
            var CameraMatrix = this.getCameraMatrix(CameraType.Perspective);
            invert(CameraMatrix, CameraMatrix);
            transformMat4$1(cameraPosition, cameraPosition, CameraMatrix);
            var ray1 = create$2();
            subtract(ray1, point3d1, point3d11);
            var ray2 = create$2();
            subtract(ray2, point3d2, point3d22);
            normalize(ray1, ray1);
            normalize(ray2, ray2);
            var angle = Math.acos(Math.min(1.0, dot(ray1, ray2)));
            var right = fromValues$1(CameraMatrix[0], CameraMatrix[1], CameraMatrix[2]);
            var up = fromValues$1(CameraMatrix[4], CameraMatrix[5], CameraMatrix[6]);
            normalize(up, up);
            normalize(right, right);
            var v1 = create$2();
            scale$1(v1, right, deltaY);
            var v2 = create$2();
            scale$1(v2, up, deltaX);
            var axis_in_camera_coord = create$2();
            add(axis_in_camera_coord, v1, v2);
            negate(axis_in_camera_coord, axis_in_camera_coord);
            normalize(axis_in_camera_coord, axis_in_camera_coord);
            var rotationPoint = fromValues$1(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
            translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, rotationPoint);
            rotate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, angle, axis_in_camera_coord);
            translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(rotationPoint, rotationPoint));
            var width = this.canvas.clientWidth; //1280;
            var height = this.canvas.clientHeight; //800;
            var zPos = (this.orthoParams.orthoHeight / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var y = zPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var x = y * this.perspParams.aspect;
            var _orthoWindowWidth = (x * 2) * this.orthoParams.orthoZoomFactor;
            var _orthoWindowHeight = (x * 2 / this.perspParams.aspect) * this.orthoParams.orthoZoomFactor;
            this.translation[0] = (_orthoWindowWidth * deltaX) / width;
            this.translation[1] = (_orthoWindowHeight * -deltaY) / height;
            var trans = fromValues$1(this.translation[0], this.translation[1], 0);
            this.orthCamera.camMatrix[12] += trans[0];
            this.orthCamera.camMatrix[13] += trans[1];
            //this.orthCamera.camMatrix[14] = this.perspCamera.camMatrix[14];
            //glmatrix.mat4.translate(this.orthCamera.camMatrix,this.orthCamera.camMatrix,trans);
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
        }
    };
    CameraControl.prototype.onMousePanRotation = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        if (newMouseX != lastMouseX || newMouseY != lastMouseY) {
            var deltaX = newMouseX - lastMouseX;
            var deltaY = newMouseY - lastMouseY;
            var mvMatrix = create$1();
            var camMatrix = this.getCameraMatrix2(CameraType.Perspective);
            var point3d1 = this.unproject([lastMouseX, lastMouseY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
            var point3d2 = this.unproject([newMouseX, newMouseY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
            if (point3d1 == null || point3d2 == null)
                return;
            var point3d11 = this.unproject([lastMouseX, lastMouseY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
            var point3d22 = this.unproject([newMouseX, newMouseY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
            if (point3d11 == null || point3d22 == null)
                return;
            var cameraPosition = fromValues$2(0, 0, 0, 1);
            var CameraMatrix = this.getCameraMatrix(CameraType.Perspective);
            invert(CameraMatrix, CameraMatrix);
            transformMat4$1(cameraPosition, cameraPosition, CameraMatrix);
            var ray1 = create$2();
            subtract(ray1, point3d1, point3d11);
            var ray2 = create$2();
            subtract(ray2, point3d2, point3d22);
            normalize(ray1, ray1);
            normalize(ray2, ray2);
            var angle = Math.acos(Math.min(1.0, dot(ray1, ray2)));
            var right = fromValues$1(CameraMatrix[0], CameraMatrix[1], CameraMatrix[2]);
            var up = fromValues$1(CameraMatrix[4], CameraMatrix[5], CameraMatrix[6]);
            normalize(up, up);
            normalize(right, right);
            var v1 = create$2();
            scale$1(v1, right, deltaY);
            var v2 = create$2();
            scale$1(v2, up, deltaX);
            var axis_in_camera_coord = create$2();
            add(axis_in_camera_coord, v1, v2);
            negate(axis_in_camera_coord, axis_in_camera_coord);
            normalize(axis_in_camera_coord, axis_in_camera_coord);
            var rotationPoint = fromValues$1(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
            translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, rotationPoint);
            rotate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, angle, axis_in_camera_coord);
            translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(rotationPoint, rotationPoint));
            deltaX = newMouseX - lastMouseX;
            deltaY = lastMouseY - newMouseY;
            var width = this.canvas.clientWidth; //1280;
            var height = this.canvas.clientHeight; //800;
            var zPos = (this.orthoParams.orthoHeight / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var y = zPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            var x = y * this.perspParams.aspect;
            var _orthoWindowWidth = (x * 2) * this.orthoParams.orthoZoomFactor;
            var _orthoWindowHeight = (x * 2 / this.perspParams.aspect) * this.orthoParams.orthoZoomFactor;
            this.translation[0] = (_orthoWindowWidth * deltaX) / width;
            this.translation[1] = (_orthoWindowHeight * deltaY) / height;
            var trans = fromValues$1(this.translation[0], this.translation[1], 0);
            this.orthCamera.camMatrix[12] += trans[0];
            this.orthCamera.camMatrix[13] += trans[1];
            //this.orthCamera.camMatrix[14] = this.perspCamera.camMatrix[14];
            //glmatrix.mat4.translate(this.orthCamera.camMatrix,this.orthCamera.camMatrix,trans);
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
        }
    };
    CameraControl.prototype.zoomIn = function (scale) {
        this.updateSensitivity();
        if (this.params.zoomType == ZoomType.MOUSE_WHEEL) {
            this.params.fWheelFactorNegative *= 1.1;
            this.params.fWheelFactorPositive = 1.0;
            this.params.fWheelFactor = this.params.fWheelFactorNegative;
        }
        //if (this.camType == CameraType.Ortho) 
        {
            if (this.params.zoomType == ZoomType.MOUSE_WHEEL)
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + (-0.12 * this.params.zoomScale * this.params.zoomSensitivity * this.params.fWheelFactor);
            else if (this.params.zoomType == ZoomType.MIDDLE_ZOOM) // 1--mouse middle zoom 
             {
                var bbox = this.sceneBoundingBox;
                var diameter = bbox.getRadius() * 2;
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((-scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0) / (this.orthoParams.orthoSensitivityScale * diameter));
            }
            else // 2  touch zoom
                // orthoProjectionZoomFactor = orthoProjectionZoomFactor + (-0.12 * 4 * zoomScale * zoomSensitivity);
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((-0.0001 / window.devicePixelRatio) * scale * this.params.zoomSensitivity);
        }
        // else 
        {
            if (this.params.zoomType == ZoomType.MOUSE_WHEEL) // 0 -- mouse wheel
                this.translation[2] = (12 * this.params.zoomScale * this.params.zoomSensitivity * this.params.fWheelFactor);
            else if (this.params.zoomType == ZoomType.MIDDLE_ZOOM) //1--mouse middle zoom 
                this.translation[2] = (scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0);
            else if (this.params.zoomType == ZoomType.TOUCH_ZOOM)
                //translation[2] = translation[2] + (12 * 4 * zoomScale * zoomSensitivity);
                this.translation[2] = ((0.015 / window.devicePixelRatio) * scale * this.params.zoomSensitivity);
            this.perspCamera.camMatrix[14] += this.translation[2];
        }
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.zoomInCamera = function (scale) {
        this.updateSensitivity();
        var bbox = this.sceneBoundingBox;
        var diameter = bbox.getRadius() * 2;
        this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((-scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0) / (this.orthoParams.orthoSensitivityScale * diameter));
        this.translation[2] = (scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0);
        this.perspCamera.camMatrix[14] += this.translation[2];
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.zoomOut = function (scale) {
        this.updateSensitivity();
        if (this.params.zoomType == ZoomType.MOUSE_WHEEL) {
            this.params.fWheelFactorNegative = 1.0;
            this.params.fWheelFactorPositive *= 1.1;
            this.params.fWheelFactor = this.params.fWheelFactorPositive;
        }
        //if (this.camType == CameraType.Ortho) 
        {
            if (this.params.zoomType == ZoomType.MOUSE_WHEEL) // 0 -- mouse wheel
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + (0.12 * this.params.zoomScale * this.params.zoomSensitivity * this.params.fWheelFactor);
            else if (this.params.zoomType == ZoomType.MIDDLE_ZOOM) //1--mouse middle zoom 
             {
                var diameter = this.sceneBoundingBox.getRadius() * 2;
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0) / (this.orthoParams.orthoSensitivityScale * diameter));
            }
            else // 2  touch zoom
                //orthoProjectionZoomFactor = orthoProjectionZoomFactor + (0.12 * 4 * zoomScale * zoomSensitivity);
                this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((0.0001 / window.devicePixelRatio) * scale * this.params.zoomSensitivity);
        }
        //else 
        {
            if (this.params.zoomType == ZoomType.MOUSE_WHEEL) // 0 -- mouse wheel
                this.translation[2] = (-12 * this.params.zoomScale * this.params.zoomSensitivity * this.params.fWheelFactor);
            else if (this.params.zoomType == ZoomType.MIDDLE_ZOOM) // 1--mouse middle zoom 
                this.translation[2] = (-scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0);
            else if (this.params.zoomType == ZoomType.TOUCH_ZOOM) // 2  touch zoom
                //translation[2] = translation[2] + (-12 * 4 * zoomScale * zoomSensitivity);
                this.translation[2] = ((-0.015 / window.devicePixelRatio) * scale * this.params.zoomSensitivity);
            this.perspCamera.camMatrix[14] += this.translation[2];
        }
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.zoomOutCamera = function (scale) {
        this.updateSensitivity();
        var diameter = this.sceneBoundingBox.getRadius() * 2;
        this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + ((scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0) / (this.orthoParams.orthoSensitivityScale * diameter));
        this.translation[2] = (-scale * this.params.zoomScale * 4 * this.params.zoomSensitivity * 1.0);
        this.perspCamera.camMatrix[14] += this.translation[2];
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.pointZoomIn = function (posX, posY, factor) {
        this.updateSensitivity();
        this.params.fWheelFactorNegative *= 1.1;
        this.params.fWheelFactorPositive = 1.0;
        this.params.fWheelFactor = this.params.fWheelFactorNegative;
        //console.log("orthoCam",this.orthCamera.camMatrix);
        //console.log("perspCam",this.perspCamera.camMatrix);
        var zSensitivity = (12 * (this.params.zoomScale * 4) * this.params.zoomSensitivity * this.params.fWheelFactor); // zoomScale = 0.0015 * 0.25;
        var diameter = this.sceneBoundingBox.getRadius() * 2;
        var orthoZoomFactorOld = this.orthoParams.orthoZoomFactor;
        this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor - (zSensitivity / (this.orthoParams.orthoSensitivityScale * diameter));
        var zPos = (this.orthoParams.orthoHeight / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var y = zPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var x = y * this.perspParams.aspect;
        var _orthoWindowWidth = (x * 2);
        var step = (_orthoWindowWidth * orthoZoomFactorOld) - (_orthoWindowWidth * this.orthoParams.orthoZoomFactor);
        if (_orthoWindowWidth - step > 0 && this.orthoParams.orthoZoomFactor > 0 && this.orthoParams.orthoZoomFactor < 1000) {
            var iWidth = this.canvas.clientWidth;
            var iHeight = this.canvas.clientHeight;
            // mouse position w.r.t center in screen
            var iX = posX - iWidth * 0.5;
            var iY = posY - iHeight * 0.5;
            // window size reduction or expansion
            var fXStep = step;
            var fYStep = step / this.perspParams.aspect;
            // shift for the camera				
            var fXDelta = iX * fXStep / iWidth;
            var fYDelta = -iY * fYStep / iHeight;
            this.translation[0] = -fXDelta;
            this.translation[1] = -fYDelta;
            this.orthCamera.camMatrix[12] += this.translation[0];
            this.orthCamera.camMatrix[13] += this.translation[1];
            //glmatrix.mat4.translate(this.orthCamera.camMatrix,this.orthCamera.camMatrix,glmatrix.vec3.fromValues(this.translation[0],this.translation[1],0));
        }
        if (this.orthoParams.orthoZoomFactor < 0 && this.orthoParams.orthoZoomFactor < 1000)
            this.orthoParams.orthoZoomFactor = orthoZoomFactorOld;
        var mvMatrix = create$1();
        var camMatrix = this.getCameraMatrix2(CameraType.Perspective);
        var point3d1 = this.unproject([posX, posY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
        var point3d2 = this.unproject([posX, posY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
        if (point3d1 == null || point3d2 == null) {
            return;
        }
        var dir = create$2();
        sub(dir, point3d2, point3d1);
        var unitDir = create$2();
        normalize(unitDir, dir);
        var finalPoint = create$2();
        scale$1(finalPoint, unitDir, zSensitivity);
        if (factor != null && factor != undefined) {
            finalPoint = scale$1(finalPoint, finalPoint, factor);
        }
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(finalPoint, finalPoint));
        //this.orthCamera.camMatrix[14] = this.perspCamera.camMatrix[14];
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.pointZoomOut = function (posX, posY, factor) {
        this.updateSensitivity();
        this.params.fWheelFactorNegative = 1.0;
        this.params.fWheelFactorPositive *= 1.1;
        this.params.fWheelFactor = this.params.fWheelFactorPositive;
        var zSensitivity = (12 * (this.params.zoomScale * 4) * this.params.zoomSensitivity * this.params.fWheelFactor); // zoomScale = 0.0015 * 0.25;
        var diameter = this.sceneBoundingBox.getRadius() * 2;
        var orthoZoomFactorOld = this.orthoParams.orthoZoomFactor;
        this.orthoParams.orthoZoomFactor = this.orthoParams.orthoZoomFactor + (zSensitivity / (this.orthoParams.orthoSensitivityScale * diameter));
        var zPos = (this.orthoParams.orthoHeight / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var y = zPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var x = y * this.perspParams.aspect;
        var _orthoWindowWidth = (x * 2);
        var step = (_orthoWindowWidth * orthoZoomFactorOld) - (_orthoWindowWidth * this.orthoParams.orthoZoomFactor);
        if (_orthoWindowWidth - step > 0 && this.orthoParams.orthoZoomFactor > 0 && this.orthoParams.orthoZoomFactor < 1000) {
            var iWidth = this.canvas.clientWidth;
            var iHeight = this.canvas.clientHeight;
            // mouse position w.r.t center in screen
            var iX = posX - iWidth * 0.5;
            var iY = posY - iHeight * 0.5;
            // window size reduction or expansion
            var fXStep = step;
            var fYStep = step / this.perspParams.aspect;
            // shift for the camera				
            var fXDelta = iX * fXStep / iWidth;
            var fYDelta = -iY * fYStep / iHeight;
            this.translation[0] = -fXDelta;
            this.translation[1] = -fYDelta;
            this.orthCamera.camMatrix[12] += this.translation[0];
            this.orthCamera.camMatrix[13] += this.translation[1];
        }
        if (this.orthoParams.orthoZoomFactor < 0 && this.orthoParams.orthoZoomFactor < 1000)
            this.orthoParams.orthoZoomFactor = orthoZoomFactorOld;
        var mvMatrix = create$1();
        var camMatrix = this.getCameraMatrix2(CameraType.Perspective);
        var point3d1 = this.unproject([posX, posY, 0], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 0 means near plane
        var point3d2 = this.unproject([posX, posY, 1], mvMatrix, [this.canvas.width, this.canvas.height], camMatrix); // 1 means far plane
        if (point3d1 == null || point3d2 == null)
            return;
        var dir = create$2();
        sub(dir, point3d2, point3d1);
        var unitDir = create$2();
        normalize(unitDir, dir);
        var finalPoint = create$2();
        scale$1(finalPoint, unitDir, zSensitivity);
        if (factor != null && factor != undefined) {
            finalPoint = scale$1(finalPoint, finalPoint, factor);
        }
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, finalPoint);
        this.update();
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camType } });
    };
    CameraControl.prototype.setZoomType = function (value) {
        this.params.zoomType = value;
    };
    CameraControl.prototype.getRotAngleAndNormalizedCamAxis = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        var rotationObject = {};
        if (newMouseX != lastMouseX || newMouseY != lastMouseY) {
            var va = MathUtils.getArcballVector(lastMouseX, lastMouseY, this.canvas);
            var vb = MathUtils.getArcballVector(newMouseX, newMouseY, this.canvas);
            var angle = Math.acos(Math.min(1.0, dot(va, vb)));
            var axis_in_camera_coord = create$2();
            cross(axis_in_camera_coord, va, vb);
            normalize(axis_in_camera_coord, axis_in_camera_coord);
            rotationObject.angle = angle;
            rotationObject.axis_in_camera_coord = axis_in_camera_coord;
        }
        else {
            return null;
        }
        return rotationObject;
    };
    CameraControl.prototype.moveToCenter = function () {
        var center = this.sceneBoundingBox.getCenter();
        negate(center, center);
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, center);
        translate(this.orthCamera.camMatrix, this.orthCamera.camMatrix, center);
    };
    CameraControl.prototype.updateNearFarPlane = function () {
        var camPos = this.getPosition(this.camType);
        var distFromCenter = this.sceneBoundingBox.findDistance(camPos, this.sceneBoundingBox.getCenter());
        var radius = this.sceneBoundingBox.getRadius();
        if (distFromCenter <= radius) {
            var near = radius / 1000;
            this.orthoParams.near = near;
            this.perspParams.near = near;
            var far = (distFromCenter + radius) * 1.5 * 1000; // 2 is multiplied for section plane issue -- 1000 no logic just random big number
            this.orthoParams.far = far;
            this.perspParams.far = far;
        }
        else {
            var near = (distFromCenter - radius) * (0.01); //chnaged 0.5 -> 0.01 to work for pointzoom ortho
            this.orthoParams.near = near;
            this.perspParams.near = near;
            var far = distFromCenter + (radius * 1.5 * 1000); // 2 is multiplied for section plane issue -- 1000 no logic just random big number
            this.orthoParams.far = far;
            this.perspParams.far = far;
        }
    };
    CameraControl.prototype.setAspect = function (ratio) {
        this.perspParams.aspect = ratio;
    };
    CameraControl.prototype.updateProjectionMatrix = function () {
        this.perspCamera.pMatrix = this.getPerspectiveCamera(this.perspParams.fov, this.perspParams.aspect, this.perspParams.near, this.perspParams.far);
        multiply(this.perspCamera.projectionViewMatrix, this.perspCamera.pMatrix, this.perspCamera.camMatrix);
        this.orthCamera.pMatrix = this.getOrthographicCamera();
        multiply(this.orthCamera.projectionViewMatrix, this.orthCamera.pMatrix, this.orthCamera.camMatrix);
    };
    CameraControl.prototype.getPerspectiveCamera = function (fovY, aspect, near, far) {
        var PerspectiveProjectionMat = create$1();
        var D2R = Math.PI / 180.0;
        var yScale;
        var xScale;
        if (aspect > 1) //canvas.width > canvas.height
         {
            yScale = 1.0 / Math.tan(D2R * fovY / 2);
            xScale = yScale / aspect;
        }
        else {
            yScale = aspect / Math.tan(D2R * fovY / 2);
            xScale = yScale / aspect;
        }
        var nearmfar = near - far;
        if (!nearmfar)
            nearmfar = 1;
        var m = [
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, (far + near) / nearmfar, -1,
            0, 0, 2 * far * near / nearmfar, 0
        ];
        for (var i = 0; i < m.length; i++)
            PerspectiveProjectionMat[i] = m[i];
        return PerspectiveProjectionMat;
    };
    CameraControl.prototype.getOrthographicCamera = function () {
        var zPosition = ((this.orthoParams.orthoWindowHeight) / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var newZPos = zPosition;
        if (this.orthoParams.orthoWindowHeight < (this.orthoParams.orthoWindowWidth / this.perspParams.aspect)) {
            var verRange = this.orthoParams.orthoWindowWidth / this.perspParams.aspect;
            newZPos = ((verRange) / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        }
        else {
            newZPos = ((this.orthoParams.orthoWindowHeight) / 2) / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
            if (zPosition < newZPos)
                newZPos = zPosition;
        }
        var y = newZPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        var x = y * this.perspParams.aspect;
        this.orthoParams.orthoWidth = (x * 2);
        this.orthoParams.orthoHeight = (x * 2 / this.perspParams.aspect);
        this.orthoParams.left = -(this.orthoParams.orthoWidth / 2) * this.orthoParams.orthoZoomFactor;
        this.orthoParams.right = (this.orthoParams.orthoWidth / 2) * this.orthoParams.orthoZoomFactor;
        this.orthoParams.bottom = -(this.orthoParams.orthoHeight / 2) * this.orthoParams.orthoZoomFactor;
        this.orthoParams.top = (this.orthoParams.orthoHeight / 2) * this.orthoParams.orthoZoomFactor;
        if (this.orthoParams.orthoZoomFactor < 0.00001) // orthoProjectionZoomFactor should not be zero r negative
            this.orthoParams.orthoZoomFactor = 0.00001;
        return ortho(this.orthCamera.pMatrix, this.orthoParams.left, this.orthoParams.right, this.orthoParams.bottom, this.orthoParams.top, this.orthoParams.near, this.orthoParams.far);
    };
    CameraControl.prototype.setBoundingBox = function (bbox) {
        this.sceneBoundingBox = bbox;
    };
    CameraControl.prototype.updateSensitivity = function () {
        var cameraPosition = this.getPosition(this.camType);
        var distance = this.sceneBoundingBox.findDistance(this.sceneBoundingBox.getCenter(), cameraPosition);
        this.params.zoomSensitivity = distance;
    };
    CameraControl.prototype.resetZoomFactor = function () {
        this.params.fWheelFactorNegative = 1.0;
        this.params.fWheelFactorPositive = 1.0;
        this.params.fWheelFactor = 1.0;
        this.params.zoomScale = 0.0015 * 0.25;
        this.orthoParams.orthoZoomFactor = 1;
    };
    CameraControl.prototype.getCameraMatrix = function (type) {
        var matrix = create$1();
        if (type == CameraType.Perspective)
            multiply(matrix, matrix, this.perspCamera.camMatrix);
        else
            multiply(matrix, matrix, this.orthCamera.camMatrix);
        return matrix;
    };
    CameraControl.prototype.setCameraMatrix = function (type, mat) {
        if (type == CameraType.Perspective)
            this.perspCamera.camMatrix = clone(mat);
        else
            this.orthCamera.camMatrix = clone(mat);
        this.update();
    };
    CameraControl.prototype.getCameraMatrix2 = function (type) {
        var matrix = create$1();
        this.update();
        if (type == CameraType.Perspective) {
            multiply(matrix, matrix, this.perspCamera.pMatrix);
            multiply(matrix, matrix, this.perspCamera.camMatrix);
        }
        else {
            multiply(matrix, matrix, this.orthCamera.pMatrix);
            multiply(matrix, matrix, this.orthCamera.camMatrix);
        }
        return matrix;
    };
    CameraControl.prototype.getUpDir = function (type) {
        if (type === void 0) { type = this.camType; }
        var invMat = this.getInverseCameraMatrix(type);
        return fromValues$1(invMat[4], invMat[5], invMat[6]);
    };
    CameraControl.prototype.getFrontDir = function (type) {
        if (type === void 0) { type = this.camType; }
        var invMat = this.getInverseCameraMatrix(type);
        return fromValues$1(invMat[8], invMat[9], invMat[10]);
    };
    CameraControl.prototype.getLeftDir = function (type) {
        if (type === void 0) { type = this.camType; }
        var invMat = this.getInverseCameraMatrix(type);
        return fromValues$1(invMat[0], invMat[1], invMat[2]);
    };
    CameraControl.prototype.fitView = function (bbox) {
        if (bbox === void 0) { bbox = null; }
        var boundingBox = bbox ? bbox : this.sceneBoundingBox;
        var zPos = (boundingBox.getRadius() / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251)));
        var camMatrixPersp = this.getCameraMatrix(CameraType.Perspective);
        var camMatrixOrtho = this.getCameraMatrix(CameraType.Ortho);
        invert(camMatrixPersp, camMatrixPersp);
        invert(camMatrixOrtho, camMatrixOrtho);
        var newZPos = zPos;
        var dimensionPersp = this.GetCamAxisAlignedBBox(camMatrixPersp, boundingBox);
        this.GetCamAxisAlignedBBox(camMatrixOrtho, boundingBox);
        if (dimensionPersp) {
            var verRange = dimensionPersp[1];
            if (dimensionPersp[1] < (dimensionPersp[0] / this.perspParams.aspect)) {
                verRange = dimensionPersp[0] / this.perspParams.aspect;
                newZPos = ((verRange / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251))) + dimensionPersp[2]) * 0.5;
            }
            else {
                newZPos = ((verRange / (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251))) + dimensionPersp[2]) * 0.5;
                if (zPos < newZPos)
                    newZPos = zPos;
            }
            zPos = newZPos + (newZPos * 0.1);
        }
        var distance = create$2();
        distance = sub(distance, boundingBox.getCenter(), MathUtils.getPositionVector(camMatrixPersp));
        translate(this.perspCamera.camMatrix, this.perspCamera.camMatrix, negate(distance, distance));
        fromValues$1(0, 0, -zPos);
        //glmatrix.mat4.translate(this.perspCamera.camMatrix,this.perspCamera.camMatrix,trans);
        this.perspCamera.camMatrix[14] += -zPos;
        this.orthCamera.camMatrix = clone(this.perspCamera.camMatrix);
        this.orthoParams.orthoZoomFactor = 1;
        var x = 0;
        var y = 0;
        y = newZPos * (Math.tan((this.perspParams.fov / 2.0) * 0.01745329251));
        x = y * this.perspParams.aspect;
        this.orthoParams.orthoWindowWidth = x * 2;
        this.orthoParams.orthoWindowHeight = this.orthoParams.orthoWindowWidth / this.perspParams.aspect;
        this.update();
        this.resetZoomFactor();
    };
    CameraControl.prototype.getInverseCameraMatrix = function (type) {
        var inverseCameraMatrix = this.getCameraMatrix(type);
        invert(inverseCameraMatrix, inverseCameraMatrix);
        //glmatrix.mat4.transpose(inverseCameraMatrix, inverseCameraMatrix);                            
        return inverseCameraMatrix;
    };
    CameraControl.prototype.getInverseCameraWithTransposeMatrix = function (type) {
        var inverseCameraMatrix = this.getCameraMatrix(type);
        invert(inverseCameraMatrix, inverseCameraMatrix);
        transpose(inverseCameraMatrix, inverseCameraMatrix);
        return inverseCameraMatrix;
    };
    CameraControl.prototype.GetCamAxisAlignedBBox = function (CameraMatrix, boundingBox) {
        try {
            var right = MathUtils.getRightVector(CameraMatrix);
            var up = MathUtils.getUpVector(CameraMatrix);
            var dir = MathUtils.getDirVector(CameraMatrix);
            var bbCenter = boundingBox.getCenter();
            var corners = [];
            corners.push([boundingBox.Min.x, boundingBox.Min.y, boundingBox.Min.z]);
            corners.push([boundingBox.Max.x, boundingBox.Min.y, boundingBox.Min.z]);
            corners.push([boundingBox.Max.x, boundingBox.Max.y, boundingBox.Min.z]);
            corners.push([boundingBox.Min.x, boundingBox.Max.y, boundingBox.Min.z]);
            corners.push([boundingBox.Min.x, boundingBox.Min.y, boundingBox.Max.z]);
            corners.push([boundingBox.Max.x, boundingBox.Min.y, boundingBox.Max.z]);
            corners.push([boundingBox.Max.x, boundingBox.Max.y, boundingBox.Max.z]);
            corners.push([boundingBox.Min.x, boundingBox.Max.y, boundingBox.Max.z]);
            var minH = 100000000000;
            var minV = 100000000000;
            var minD = 100000000000;
            var maxH = -100000000000;
            var maxV = -100000000000;
            var maxD = -100000000000;
            for (var i = 0; i < 8; i++) {
                var pt = fromValues$1(corners[i][0], corners[i][1], corners[i][2]);
                sub(pt, pt, bbCenter);
                var x = dot(right, pt);
                var y = dot(up, pt);
                var z = dot(dir, pt);
                if (minH > x)
                    minH = x;
                if (minV > y)
                    minV = y;
                if (minD > z)
                    minD = z;
                if (maxH < x)
                    maxH = x;
                if (maxV < y)
                    maxV = y;
                if (maxD < z)
                    maxD = z;
            }
            var dimension = fromValues$1(maxH - minH, maxV - minV, maxD - minD);
            return dimension;
        }
        catch (e) {
            return null;
        }
    };
    return CameraControl;
}(EventDispatcher));/** Class representing a Renderer2D. */
var Renderer2D = /** @class */ (function () {
    function Renderer2D(container) {
        this.container = container;
        var canvasBackPlane = Utility.getElementInsideContainer(this.container.id, 'canvasBackPlane_' + this.container.id);
        if (canvasBackPlane)
            this.container.removeChild(canvasBackPlane);
        this.canvasBackPlane = document.createElement('canvas');
        this.canvasBackPlane.id = 'canvasBackPlane_' + this.container.id;
        this.canvasBackPlane.className = 'canvasBackPlane';
        this.canvasBackPlane.width = this.container.clientWidth;
        this.canvasBackPlane.height = this.container.clientHeight;
        this.canvasBackPlane.style.position = 'absolute';
        this.canvasBackPlane.style.zIndex = '0';
        //this.container.insertBefore(this.canvasBackPlane, this.container.firstChild); // fix for IE11
        //this.container.prepend(this.canvasBackPlane);
        this.backPlane2dctx = this.canvasBackPlane.getContext('2d');
        this.backgroundType = AppConstants.BackgroundType.GRADIENT;
        this.setBackground(this.backgroundType, [AppState._BGColor1, AppState._BGColor2]);
        //let gradientcolor1 = '#9F9FFF';
        //let gradientcolor2 = '#FFFFFF';
        //this.canvasBackPlane.style.background = 'linear-gradient(' + gradientcolor1 + ', ' + gradientcolor2 + ')';
        var canvasFrontPlane = Utility.getElementInsideContainer(this.container.id, 'canvasfrontPlane_' + this.container.id);
        if (canvasFrontPlane)
            this.container.removeChild(canvasFrontPlane);
        this.canvasFrontPlane = document.createElement('canvas');
        this.canvasFrontPlane.id = 'canvasfrontPlane_' + this.container.id;
        this.canvasFrontPlane.className = 'canvasfrontPlane';
        this.canvasFrontPlane.width = this.container.clientWidth;
        this.canvasFrontPlane.height = this.container.clientHeight;
        this.canvasFrontPlane.style.position = 'absolute';
        this.canvasFrontPlane.style.zIndex = '2';
        this.container.appendChild(this.canvasFrontPlane);
        this.frontPlane2dctx = this.canvasFrontPlane.getContext('2d');
        this.backPlane = null;
        this.frontPlane = null;
    }
    /**
     * Window resize event handler function. Called every time when window size is changed.
     * @public
     */
    Renderer2D.prototype.onWindowResize = function () {
        this.canvasBackPlane.width = this.container.clientWidth;
        this.canvasBackPlane.height = this.container.clientHeight;
        this.canvasFrontPlane.width = this.container.clientWidth;
        this.canvasFrontPlane.height = this.container.clientHeight;
        this.updateBackPlane(this.backPlane);
        this.updateFrontPlane(this.frontPlane);
    };
    Renderer2D.prototype.updateBackPlane = function (backPlane) {
        if (backPlane) {
            this.backPlane = backPlane;
            //if(backPlane.background)
            //    this.canvasBackPlane.style.background = backPlane.background;
        }
        this.updateBackground();
    };
    Renderer2D.prototype.updateBackground = function () {
        this.setBackground(this.backgroundType, this.backgroundData);
    };
    Renderer2D.prototype.setBackground = function (type, data) {
        this.backgroundType = type;
        this.backgroundData = data;
        if (type === AppConstants.BackgroundType.LINEAR) ;
        else if (type === AppConstants.BackgroundType.GRADIENT) {
            var grd_1 = this.backPlane2dctx.createLinearGradient(0, 0, 0, this.canvasBackPlane.height);
            if (data instanceof Array) {
                if (data.length === 1) {
                    var e = data[0];
                    grd_1.addColorStop(0, "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] + ")");
                    grd_1.addColorStop(1, "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] + ")");
                }
                else {
                    data.forEach(function (e, idx) {
                        grd_1.addColorStop(idx / (data.length - 1), "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] + ")");
                    });
                }
            }
            this.backPlane2dctx.fillStyle = grd_1;
            this.backPlane2dctx.rect(0, 0, this.canvasBackPlane.width, this.canvasBackPlane.height);
            this.backPlane2dctx.fill();
        }
        else if (type === AppConstants.BackgroundType.IMAGE) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = data;
            var self_1 = this;
            img.addEventListener('load', function () {
                self_1.backPlane2dctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, self_1.canvasBackPlane.width, self_1.canvasBackPlane.height);
            }, false);
        }
    };
    Renderer2D.prototype.updateFrontPlane = function (frontPlane) {
        if (frontPlane) {
            this.frontPlane = frontPlane;
            var x = 5;
            var y = 0;
            if (frontPlane.elements !== undefined && frontPlane.elements.constructor === Array) {
                var height = y;
                for (var i = 0; i < frontPlane.elements.length; i++) {
                    var element = frontPlane.elements[i];
                    if (element.type === 'label') {
                        height += this.drawText(this.frontPlane2dctx, element, x, height);
                    }
                    else if (element.type === 'colormap') {
                        height += this.drawpalette(this.frontPlane2dctx, element, x, height + 5) + 5;
                    }
                }
            }
            //if(frontPlane.layout)
            //    console.log(frontPlane.layout);
        }
    };
    Renderer2D.prototype.drawText = function (context2d, element, x, y) {
        var height = 0;
        var width = 0;
        context2d.font = '12px Times New Roman';
        var bBorder = false;
        if (element.style) {
            if (element.style.font)
                context2d.font = element.style.font;
            if (element.style.color)
                context2d.fillStyle = element.style.color;
            if (element.style.textAlign)
                context2d.textAlign = element.style.textAlign;
            if (element.style.border) {
                bBorder = true;
                element.style.border;
            }
            if (element.style.borderRadius)
                element.style.border;
        }
        var fontHeight = this.determineFontHeight('font: ' + context2d.font + ';');
        if (element.label && element.label.constructor === Array) {
            for (var i = 0; i < element.label.length; i++) {
                var label = element.label[i];
                var metrics = context2d.measureText(label);
                width = (width < metrics.width ? metrics.width : width);
                height = height + fontHeight;
                //context2d.moveTo(x, y + fontHeight + (fontHeight * i));
                //context2d.lineTo(x + 200, y + fontHeight + (fontHeight * i));
                //context2d.stroke();
                context2d.textBaseline = 'bottom';
                context2d.fillText(label, x, y + fontHeight + (fontHeight * i));
            }
            if (bBorder === true) {
                //context2d.rect(x, y  ,  width , height );
                //context2d.stroke();
                this.roundRect(context2d, x, y, width, height, 5);
            }
        }
        return height;
    };
    Renderer2D.prototype.drawpalette = function (context2d, element, x, y) {
        var height = 0;
        //console.log(element);
        var bandHeight = 20;
        var bandWidth = 20;
        var textColor = 'black';
        if (element.style) {
            // if(element.style.bandHeight !== undefined)
            //bandHeight  = element.style.bandHeight;
            //if(element.style.bandHeight !== undefined)
            //bandWidth  = element.style.bandWidth;
            if (element.style.font)
                context2d.font = element.style.font;
            if (element.style.color)
                textColor = element.style.color;
            if (element.style.textAlign)
                context2d.textAlign = element.style.textAlign;
        }
        context2d.textBaseline = 'middle';
        if (element.colormap !== undefined) {
            if (element.colormap.values.constructor === Array && element.colormap.colors.constructor === Array) {
                if (element.colormap.values.length === element.colormap.colors.length) {
                    var ix = 0;
                    var iy = 0;
                    for (var i = 0; i < element.colormap.colors.length; i++) {
                        var colorArray = element.colormap.colors[i];
                        var valueArray = element.colormap.values[i];
                        var colorOrder = 0;
                        var valueType = 'na';
                        var valueNumber = -1;
                        var min = 0;
                        var max = 1;
                        if (colorArray.order !== undefined)
                            colorOrder = colorArray.order;
                        if (valueArray.type !== undefined)
                            valueType = valueArray.type;
                        if (valueArray.scale !== undefined)
                            valueArray.scale;
                        if (valueArray.number !== undefined)
                            valueNumber = valueArray.number;
                        if (valueArray.min !== undefined)
                            min = valueArray.min;
                        if (valueArray.max !== undefined)
                            max = valueArray.max;
                        //colorOrder = 0;
                        //valueNumber = 15;
                        if (colorArray.values !== undefined && colorArray.values.constructor === Array) {
                            var jx = ix;
                            var jy = iy;
                            var colorCount = (colorOrder === 0 ? colorArray.values.length : colorArray.values.length - 1);
                            var showType = (valueNumber === -1 ? 'middle' :
                                (valueNumber === colorArray.values.length && colorOrder === 0 ? 'middle' : 'corner'));
                            for (var j = 0; j < colorCount; j++) {
                                context2d.beginPath();
                                context2d.rect(x + jx, y + jy, bandWidth, bandHeight);
                                context2d.lineWidth = 1;
                                context2d.strokeStyle = 'black';
                                context2d.stroke();
                                if (colorOrder === 0) {
                                    context2d.fillStyle = colorArray.values[j];
                                }
                                else if (colorOrder === 1) {
                                    var grd = context2d.createLinearGradient(x + jx, y + jy, x + jx, bandHeight + y + jy);
                                    grd.addColorStop(0, colorArray.values[j]);
                                    grd.addColorStop(1, colorArray.values[j + 1]);
                                    context2d.fillStyle = grd;
                                }
                                context2d.fillRect(x + jx, y + jy, bandWidth, bandHeight);
                                if (showType === 'middle') {
                                    //context2d.beginPath();
                                    //context2d.moveTo((x + jx) + bandWidth,  y + jy + bandHeight / 2);
                                    //context2d.lineTo((x + jx) + bandWidth + (bandWidth/3), y + jy + bandHeight / 2);
                                    //context2d.stroke(); 
                                    if (valueType === 'na') {
                                        context2d.fillStyle = textColor;
                                        context2d.fillText('NA', (x + jx) + bandWidth + (bandWidth / 3), y + jy + bandHeight / 2);
                                    }
                                    else if (valueType === 'float') {
                                        var value = ((max - min) * j) / (valueNumber - 1);
                                        context2d.fillStyle = textColor;
                                        context2d.fillText(value.toFixed(3), (x + jx) + bandWidth + (bandWidth / 3), y + jy + bandHeight / 2);
                                    }
                                }
                                else if (showType === 'corner') {
                                    //context2d.beginPath();
                                    // context2d.moveTo(x + jx + bandWidth ,  y + jy);
                                    // context2d.lineTo(x + jx + bandWidth + (bandWidth/3), y + jy);
                                    // context2d.stroke(); 
                                    if (valueType === 'na') {
                                        context2d.fillStyle = textColor;
                                        context2d.fillText('NA', x + jx + bandWidth + (bandWidth / 3), y + jy);
                                    }
                                    else if (valueType === 'float') {
                                        var value = ((max - min) * j) / (valueNumber - 1);
                                        context2d.fillStyle = textColor;
                                        context2d.fillText(value.toFixed(3), x + jx + bandWidth + (bandWidth / 3), y + jy);
                                    }
                                }
                                jy = jy + bandHeight;
                            }
                            if (showType === 'corner') {
                                // context2d.beginPath();
                                //  context2d.moveTo(x + jx + bandWidth ,  y + jy);
                                //  context2d.lineTo(x + jx + bandWidth + (bandWidth/3), y + jy);
                                //  context2d.stroke(); 
                                if (valueType === 'na') {
                                    context2d.fillStyle = textColor;
                                    context2d.fillText('NA', x + jx + bandWidth + (bandWidth / 3), y + jy);
                                }
                                else if (valueType === 'float') {
                                    var value = ((max - min) * valueNumber) / valueNumber;
                                    context2d.fillStyle = textColor;
                                    context2d.fillText(value.toFixed(3), x + jx + bandWidth + (bandWidth / 3), y + jy);
                                }
                            }
                            ix = jx;
                            iy = jy + 10;
                        }
                    }
                    height = iy;
                }
            }
        }
        return height;
    };
    Renderer2D.prototype.determineFontHeight = function (fontStyle) {
        var body = document.getElementsByTagName('body')[0];
        var dummy = document.createElement('div');
        var dummyText = document.createTextNode('|gM');
        dummy.appendChild(dummyText);
        dummy.setAttribute('style', fontStyle);
        body.appendChild(dummy);
        var result = dummy.offsetHeight;
        body.removeChild(dummy);
        return result;
    };
    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} [radius = 5] The corner radius; It can also be an object
     *                 to specify different radii for corners
     * @param {Number} [radius.tl = 0] Top left
     * @param {Number} [radius.tr = 0] Top right
     * @param {Number} [radius.br = 0] Bottom right
     * @param {Number} [radius.bl = 0] Bottom left
     * @param {Boolean} [fill = false] Whether to fill the rectangle.
     * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
     */
    Renderer2D.prototype.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        }
        else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    };
    return Renderer2D;
}());var ArrowMesh = /** @class */ (function (_super) {
    __extends(ArrowMesh, _super);
    function ArrowMesh(name, color) {
        if (color === void 0) { color = [0, 0, 0, 1]; }
        var _this = _super.call(this, name) || this;
        _this.uid = Utility.getGUID();
        _this.rendingMode = RenderMode.TRIANGLES;
        _this.createArrowMesh();
        _this.material = new Material(name);
        _this.material.diffuseColor = [color[0], color[1], color[2]];
        return _this;
    }
    ArrowMesh.prototype.createArrowMesh = function () {
        var vertices = new Float32Array([
            -0.076537, 1.841130, 0.184776,
            -0.184776, 1.841130, 0.076537,
            -0.196157, 1.841130, -0.039018,
            -0.111114, 1.841130, -0.166294,
            0.000000, 1.841130, -0.200000,
            0.141421, 1.841130, -0.141421,
            0.196157, 1.841130, -0.039018,
            0.166294, 1.841130, 0.111114,
            0.076537, 1.841130, 0.184776,
            0.000000, 2.341130, 0.000000,
            -0.092388, 2.000000, 0.038268,
            -0.092388, -0.000000, 0.038268,
            -0.038268, -0.000000, 0.092388,
            -0.038268, 2.000000, 0.092388,
            0.083147, -0.000000, 0.055557,
            0.098079, -0.000000, 0.019509,
            0.098079, 2.000000, 0.019509,
            0.083147, 2.000000, 0.055557,
            0.070711, 2.000000, 0.070711,
            0.038268, 2.000000, 0.092388,
            0.038268, -0.000000, 0.092388,
            0.070711, -0.000000, 0.070711,
            0.000000, 2.000000, -0.100000,
            -0.038268, 2.000000, -0.092388,
            -0.098079, 2.000000, -0.019509,
            0.092388, 2.000000, -0.038268,
            0.038268, 2.000000, -0.092388,
            0.019509, 2.000000, -0.098079,
            0.092388, 0.000000, -0.038268,
            -0.038268, 0.000000, -0.092388,
            -0.098079, 0.000000, -0.019509,
            0.000000, 0.000000, -0.100000,
            0.019509, 0.000000, -0.098079,
            0.038268, 0.000000, -0.092388
        ]);
        var indices = new Uint32Array([
            9, 2, 6,
            10, 5, 4,
            12, 14, 11,
            22, 15, 18,
            11, 20, 18,
            26, 16, 29,
            31, 24, 30,
            10, 6, 5,
            34, 16, 13,
            9, 10, 1,
            3, 2, 10,
            11, 31, 12,
            23, 28, 33,
            10, 4, 3,
            7, 10, 8,
            8, 10, 9,
            10, 2, 1,
            29, 27, 26,
            10, 7, 6,
            20, 13, 21,
            9, 1, 2,
            2, 3, 6,
            3, 4, 6,
            4, 5, 6,
            6, 7, 8,
            8, 9, 6,
            12, 13, 14,
            15, 16, 17,
            18, 19, 22,
            19, 20, 22,
            15, 17, 18,
            20, 21, 22,
            28, 23, 24,
            24, 25, 11,
            11, 14, 20,
            20, 19, 18,
            18, 17, 26,
            26, 27, 18,
            27, 28, 18,
            28, 24, 18,
            24, 11, 18,
            26, 17, 16,
            31, 25, 24,
            13, 12, 32,
            12, 31, 32,
            31, 30, 32,
            32, 33, 34,
            34, 29, 16,
            16, 15, 13,
            15, 22, 13,
            22, 21, 13,
            32, 34, 13,
            11, 25, 31,
            28, 27, 34,
            33, 32, 23,
            32, 30, 23,
            28, 34, 33,
            30, 24, 23,
            29, 34, 27,
            20, 14, 13
        ]);
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    ArrowMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        return attrib;
    };
    ArrowMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    return ArrowMesh;
}(CoreMesh));var Arrow3D = /** @class */ (function (_super) {
    __extends(Arrow3D, _super);
    function Arrow3D(name, color) {
        if (color === void 0) { color = [0, 0, 0, 1]; }
        var _this = _super.call(this, name) || this;
        _this.mesh = new Mesh("axisMesh");
        _this.mesh.mainMesh = new ArrowMesh("axis", fromValues$2(color[0], color[1], color[2], color[3]));
        _this.visible = false;
        return _this;
    }
    return Arrow3D;
}(ShapeNode));var Axes3DHelper = /** @class */ (function (_super) {
    __extends(Axes3DHelper, _super);
    function Axes3DHelper(name) {
        var _this = _super.call(this, name) || this;
        _this.x = new Arrow3D("x " + name, [1, 0, 0, 1]);
        _this.y = new Arrow3D("y" + name, [0, 1, 0, 1]);
        _this.z = new Arrow3D("z" + name, [0, 0, 1, 1]);
        _this.x.rotateOnWorldAxis(-90 * Math.PI / 180, fromValues$1(0, 0, 1));
        _this.addChild(_this.x);
        _this.addChild(_this.y);
        _this.z.rotateOnWorldAxis(90 * Math.PI / 180, fromValues$1(1, 0, 0));
        _this.addChild(_this.z);
        _this.visible = false;
        _this.scale(0.5, 0.5, 0.5);
        return _this;
    }
    return Axes3DHelper;
}(TransFormNode));var WebGLRenderTarget = /** @class */ (function () {
    function WebGLRenderTarget(width, height, options) {
        this.buffer = AppState.GLContext.createFramebuffer();
        this.width = width;
        this.height = height;
        this.viewport = fromValues$2(0, 0, width, height);
        this.options = options || {};
        this.texture = new Texture('RenderTargetTexture');
        this.depthTexture = new Texture('RenderTargetDepthTexture');
        this.depthBuffer = true;
        this.stencilBuffer = true;
    }
    WebGLRenderTarget.prototype.bind = function () {
        AppState.GLContext.bindFramebuffer(AppState.GLContext.FRAMEBUFFER, this.buffer);
        if (this.texture) {
            this.texture.width = this.width;
            this.texture.height = this.height;
            this.texture.bind();
            this.texture.setEmptyTexture();
            var filter = {};
            filter.magFilter = AppState.GLContext.NEAREST;
            filter.minFilter = AppState.GLContext.NEAREST;
            filter.wrap_s = AppState.GLContext.CLAMP_TO_EDGE;
            filter.wrap_t = AppState.GLContext.CLAMP_TO_EDGE;
            this.texture.setFilterOptions(filter);
            AppState.GLContext.framebufferTexture2D(AppState.GLContext.FRAMEBUFFER, AppState.GLContext.COLOR_ATTACHMENT0, AppState.GLContext.TEXTURE_2D, this.texture.texture, this.texture.level);
        }
        if (this.depthTexture) {
            this.depthTexture.width = this.width;
            this.depthTexture.height = this.height;
            this.depthTexture.bind();
            //change props
            this.depthTexture.internalformat = AppState.GLContext.DEPTH_COMPONENT24;
            this.depthTexture.format = AppState.GLContext.DEPTH_COMPONENT;
            this.depthTexture.type = AppState.GLContext.UNSIGNED_INT;
            this.depthTexture.setEmptyTexture();
            var filter = {};
            filter.magFilter = AppState.GLContext.NEAREST;
            filter.minFilter = AppState.GLContext.NEAREST;
            filter.wrap_s = AppState.GLContext.CLAMP_TO_EDGE;
            filter.wrap_t = AppState.GLContext.CLAMP_TO_EDGE;
            this.depthTexture.setFilterOptions(filter);
            AppState.GLContext.framebufferTexture2D(AppState.GLContext.FRAMEBUFFER, AppState.GLContext.DEPTH_ATTACHMENT, AppState.GLContext.TEXTURE_2D, this.depthTexture.texture, this.depthTexture.level);
        }
        (AppState.GLContext.checkFramebufferStatus(AppState.GLContext.FRAMEBUFFER) == AppState.GLContext.FRAMEBUFFER_COMPLETE);
        ////console.log("can read from offscreen buffer",canRead);
    };
    WebGLRenderTarget.prototype.unbind = function () {
        AppState.GLContext.bindFramebuffer(AppState.GLContext.FRAMEBUFFER, null);
        this.texture.unBind();
        this.depthTexture.unBind();
    };
    WebGLRenderTarget.prototype.setSize = function (width, height) {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            //this.dispose();
        }
        this.viewport = fromValues$2(0, 0, width, height);
    };
    return WebGLRenderTarget;
}());var ShaderCache = /** @class */ (function () {
    function ShaderCache() {
    }
    Object.defineProperty(ShaderCache, "mainShader", {
        get: function () {
            return this._mainShader;
        },
        set: function (shader) {
            if (!this._mainShader) {
                this._mainShader = shader;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderCache, "labelShader", {
        get: function () {
            return this._labelShader;
        },
        set: function (shader) {
            if (!this._labelShader) {
                this._labelShader = shader;
            }
        },
        enumerable: false,
        configurable: true
    });
    return ShaderCache;
}());var Renderer = /** @class */ (function () {
    function Renderer(_sceneMGR, _containerId) {
        this.sceneManager = _sceneMGR;
        this.container = document.getElementById(_containerId);
        this.times = [];
        this.customRenderNodes = new Map();
        this.highlightedNodes = new Map();
        this.axis3DHelper = null;
        this.frameTime = 0;
        this.animationTimer = null;
        this.animationFrameDelay = 0;
        this.fps = 0;
        if (this.container !== null) {
            var canvas3d = Utility.getElementInsideContainer(this.container.id, '3dcanvas_' + this.container.id);
            if (canvas3d)
                this.container.removeChild(canvas3d);
            this.canvas = document.createElement('canvas');
            this.canvas.id = '3dcanvas_' + this.container.id;
            this.canvas.className = '3dcanvas';
            //this.canvas.width = 800;
            //this.canvas.height = 600;
            this.canvas.width = this.container.clientWidth;
            this.canvas.height = this.container.clientHeight;
            this.canvas.style.position = 'absolute';
            //this.canvas.style.zIndex = '1';
            var divContainer = Utility.getElementInsideContainer(this.container.id, 'divContainer_' + this.container.id);
            if (divContainer)
                this.container.removeChild(divContainer);
            this.divContainer = document.createElement('div');
            this.divContainer.id = 'divContainer_' + this.container.id;
            this.divContainer.className = 'divContainer';
            this.divContainer.style.width = this.container.clientWidth + "px";
            this.divContainer.style.height = this.container.clientHeight + "px";
            this.divContainer.style.position = 'absolute';
            this.divContainer.style.zIndex = '3';
            var fpsMonitor = Utility.getElementInsideContainer(this.divContainer.id, 'spanfps_' + this.container.id);
            if (fpsMonitor)
                this.divContainer.removeChild(fpsMonitor);
            this.fpsMonitor = document.createElement('span');
            this.fpsMonitor.id = 'spanfps_' + this.container.id;
            this.fpsMonitor.className = 'spanfps';
            this.fpsMonitor.style.zIndex = '4';
            this.fpsMonitor.style.position = 'absolute';
            this.fpsMonitor.style.left = '0px';
            this.fpsMonitor.style.bottom = '0px';
            this.container.appendChild(this.canvas);
            this.renderer2D = new Renderer2D(this.container);
            this.container.appendChild(this.fpsMonitor);
            //this.container.appendChild(this.divContainer);
            var CANVASOptions = {
                alpha: true,
                antialias: true,
                depth: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: true,
                stencil: false,
                desynchronized: false,
                failIfMajorPerformanceCaveat: false,
                powerPreference: "default"
            };
            AppState.GLContext = this.canvas.getContext('webgl2', CANVASOptions);
            AppState.CanvasID = this.canvas.id;
            this.GLContext = AppState.GLContext;
            this.GLContext.enable(this.GLContext.DEPTH_TEST);
            this.GLContext.depthFunc(this.GLContext.LEQUAL);
            if (this.GLContext) {
                this.clearColor();
                //this.GLContext.getExtension('OES_element_index_uint');
                //this.GLContext.getExtension('OES_standard_derivatives');
                this.mainShader = new Shader(MainVertexShader, MainFragmentShader);
                this.renderTarget = new WebGLRenderTarget(this.canvas.width, this.canvas.height);
                this.currentShader = this.mainShader;
            }
            else
                console.error("Your browser is not webgl compatible");
            this.camControl = new CameraControl(this.container, this.canvas, CameraType.Perspective);
        }
        this.animationRequestId = null;
    }
    Renderer.prototype.clearColor = function () {
        this.GLContext.enable(this.GLContext.DEPTH_TEST);
        this.GLContext.clear(this.GLContext.DEPTH_BUFFER_BIT | this.GLContext.COLOR_BUFFER_BIT | this.GLContext.STENCIL_BUFFER_BIT);
    };
    Renderer.prototype.setBackgroundColor = function (type, data) {
        this.renderer2D.setBackground(type, data);
    };
    Renderer.prototype.setBackgroundImage = function (data) {
        this.renderer2D.setBackground(AppConstants.BackgroundType.IMAGE, data);
    };
    Renderer.prototype.render = function () {
        var _this = this;
        this.clearColor();
        this.resize();
        this.currentShader.bind();
        if (this.camControl) {
            this.camControl.update();
            this.currentShader.setVector3f(uniforms.uCameraPosition, this.camControl.getPosition(this.camControl.camType));
        }
        this.currentShader.setMat4f(uniforms.uProjectionMatrix, this.camControl.getGLMatrix());
        var lightDir = MathUtils.getDirVector(this.camControl.getInverseCameraMatrix(this.camControl.camType));
        this.currentShader.setVector3f(uniforms.uLightDirection, lightDir);
        if (this.sceneManager.isReady()) {
            var startTime = performance.now();
            this.sceneManager.render(this.currentShader, AppConstants.RenderPass.FIRSTPASS);
            this.sceneManager.render(this.currentShader, AppConstants.RenderPass.SECONDPASS);
            this.currentShader.updateClipPlaneUniforms();
            AppObjects.sectionManager.render();
            //render custom shapeNodes
            if (this.customRenderNodes.size > 0) {
                this.customRenderNodes.forEach(function (node, key) {
                    if (node.visible && node.subType === AppConstants.NodeSubType.NONE) {
                        _this.renderBufferDirect(node.mesh.mainMesh, node.worldMatrix, node.mesh.mainMesh.material.shader, node.mesh.mainMesh.material.diffuseColor);
                    }
                });
            }
            if (!AppObjects.picker.selectNode || !AppObjects.picker.isProbingEnabled) ;
            //render labels
            if (AppObjects.labelManager) {
                AppObjects.labelManager.render();
            }
            //render gizmos
            this.renderGizmos();
            this.frameTime = performance.now() - startTime;
        }
    };
    Renderer.prototype.startAnimation = function () {
        if (this.animationTimer == null)
            this.animationTimer = window.setTimeout(this.changeAnimationFrame.bind(this), 0);
        return true;
    };
    Renderer.prototype.stopAnimation = function () {
        this.animationTimer = null;
        AppObjects.animationManager.frameFactor = 0;
        return true;
    };
    Renderer.prototype.pauseAnimation = function () {
        this.animationTimer = null;
        return true;
    };
    Renderer.prototype.changeAnimationFrameDelay = function (delay) {
        this.animationFrameDelay = delay;
        return true;
    };
    Renderer.prototype.moveForwardAnimationFrame = function () {
        if (!(AppObjects.animationManager && AppObjects.animationManager.IsAnimationOn === true))
            return false;
        var totalAnimationFrames = AppObjects.animationManager.numberOfFrames - 1;
        var frame = AppObjects.animationManager.frameFactor * totalAnimationFrames;
        if (frame >= totalAnimationFrames)
            AppObjects.animationManager.frameFactor = 0;
        else
            AppObjects.animationManager.frameFactor = (frame + 1) / totalAnimationFrames;
        return true;
    };
    Renderer.prototype.moveBackwardAnimationFrame = function () {
        if (!(AppObjects.animationManager && AppObjects.animationManager.IsAnimationOn === true))
            return false;
        var totalAnimationFrames = AppObjects.animationManager.numberOfFrames - 1;
        var frame = AppObjects.animationManager.frameFactor * totalAnimationFrames;
        if (frame <= 0)
            AppObjects.animationManager.frameFactor = 1;
        else
            AppObjects.animationManager.frameFactor = (frame - 1) / totalAnimationFrames;
        return true;
    };
    Renderer.prototype.moveToSpecificAnimationFrame = function (frameNumber) {
        if (!(AppObjects.animationManager && AppObjects.animationManager.IsAnimationOn === true))
            return false;
        var totalAnimationFrames = AppObjects.animationManager.numberOfFrames - 1;
        if (frameNumber >= 0 && frameNumber <= totalAnimationFrames)
            AppObjects.animationManager.frameFactor = frameNumber / totalAnimationFrames;
        else {
            console.error("Invalid frame number : { frameNumber }");
            return true;
        }
        return true;
    };
    Renderer.prototype.changeAnimationFrame = function () {
        var _this = this;
        if (!(AppObjects.animationManager && AppObjects.animationManager.IsAnimationOn === true))
            return;
        if (this.animationTimer !== null) {
            var delay = 0;
            var timeDiff = this.animationFrameDelay - this.frameTime;
            if (timeDiff > 0)
                delay = timeDiff;
            this.animationTimer = window.setTimeout(function () {
                var totalAnimationFrames = AppObjects.animationManager.numberOfFrames - 1;
                var frame = AppObjects.animationManager.frameFactor * totalAnimationFrames;
                if (frame >= totalAnimationFrames)
                    AppObjects.animationManager.frameFactor = 0;
                else
                    AppObjects.animationManager.frameFactor = (frame + 1) / totalAnimationFrames;
                _this.changeAnimationFrame();
            }, delay);
        }
    };
    Renderer.prototype.renderBufferDirect = function (mesh, worldMatrix, shader, color) {
        if (shader === void 0) { shader = this.mainShader; }
        if (color === void 0) { color = [0, 0, 0, 1]; }
        if (mesh.isDataAvailable() === false) {
            return;
        }
        if (shader === undefined || shader === null) {
            shader = this.mainShader;
        }
        shader.bind();
        shader.setMat4f(uniforms.uProjectionMatrix, this.camControl.getGLMatrix());
        shader.setMat4f(uniforms.uModelViewMatrix, worldMatrix);
        shader.setVector3f(uniforms.uColor, new Float32Array(color));
        if (mesh.attribs.position) {
            shader.enablePosition();
            shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        if (mesh.attribs.color) {
            shader.enableColor();
            shader.setColor(mesh.attribs.color);
        }
        else
            shader.disableColor();
        var vertexSize = 3;
        if (mesh.indices) {
            var GLDrawType = mesh.indices.getType();
            mesh.indices.bind();
            var indicesCount = mesh.indices.getDataArrayCount();
            //alert(indicesCount);
            AppState.GLContext.drawElements(mesh.rendingMode, indicesCount, GLDrawType, 0);
        }
        else {
            var verticesCount = mesh.attribs.position.getDataArrayCount() / vertexSize;
            AppState.GLContext.drawArrays(mesh.rendingMode, 0, verticesCount);
        }
    };
    Renderer.prototype.renderBufferAsGizmo = function (mesh, worldMatrix, shader, color) {
        if (shader === void 0) { shader = this.mainShader; }
        if (color === void 0) { color = [0, 0, 0, 1]; }
        if (mesh.isDataAvailable() === false) {
            return;
        }
        shader.bind();
        shader.setMat4f(uniforms.uProjectionMatrix, this.camControl.camType === CameraType.Perspective ? this.camControl.perspCamera.projectionViewMatrix : this.camControl.orthCamera.projectionViewMatrix);
        shader.setMat4f(uniforms.uModelViewMatrix, worldMatrix);
        shader.setVector3f(uniforms.uColor, new Float32Array(color));
        if (mesh.attribs.position) {
            shader.enablePosition();
            shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        if (mesh.attribs.color) {
            shader.enableColor();
            shader.setColor(mesh.attribs.color);
        }
        else
            shader.disableColor();
        var vertexSize = 3;
        if (mesh.indices) {
            var GLDrawType = mesh.indices.getType();
            mesh.indices.bind();
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
        }
        else {
            AppState.GLContext.drawArrays(mesh.rendingMode, 0, mesh.attribs.position.getDataArrayCount() / vertexSize);
        }
    };
    Renderer.prototype.renderGizmos = function () {
        this.GLContext.clear(this.GLContext.DEPTH_BUFFER_BIT);
        this.renderAxisHelper(__spread(this.highlightedNodes.values()));
    };
    Renderer.prototype.renderAxisHelper = function (nodes) {
        var _this = this;
        var center = create$2();
        nodes.forEach(function (node) {
            if (node.visible) {
                var c = node.subType === AppConstants.NodeSubType.SECTION_PLANE ? node.getPosition() : node.getBBoxCenter();
                if (c) {
                    add(center, center, c);
                }
                else {
                    return;
                }
            }
        });
        scale$1(center, center, 1 / nodes.length);
        if (this.axis3DHelper === null && this.GLContext) {
            this.axis3DHelper = new Axes3DHelper("axis");
        }
        if (nodes.length > 0 && this.axis3DHelper && center) {
            var camPos = this.camControl.getPosition();
            var objPos = center;
            var scaleToFit = this.camControl.camType === CameraType.Perspective ?
                dist(camPos, objPos) * Math.tan(Math.PI / 180 * this.camControl.perspParams.fov / 2) * 0.1 // some constant to fit to proper size
                : this.camControl.orthoParams.orthoZoomFactor * 0.25;
            var scale = create$1();
            var trans = create$1();
            trans[12] = objPos[0];
            trans[13] = objPos[1];
            trans[14] = objPos[2];
            var rot = Utility.getAvgRot(__spread(nodes).map(function (node) { return node.worldMatrix; }));
            fromScaling(scale, fromValues$1(scaleToFit, scaleToFit, scaleToFit));
            var shader_1 = ShaderCache.labelShader;
            if (!shader_1)
                return;
            var model_1 = create$1();
            mul(model_1, model_1, trans);
            mul(model_1, model_1, rot);
            mul(model_1, model_1, scale);
            mul(model_1, model_1, this.axis3DHelper.worldMatrix);
            //render axes
            this.axis3DHelper.children.forEach(function (node) {
                var nodeMatrix = create$1();
                mul(nodeMatrix, model_1, node.worldMatrix);
                _this.renderBufferAsGizmo(node.mesh.mainMesh, nodeMatrix, shader_1, node.mesh.mainMesh.material.diffuseColor);
            });
        }
    };
    Renderer.prototype.readPixels = function (x, y) {
        var data = new Uint8Array(4);
        this.GLContext.readPixels(x, y, 1, 1, this.GLContext.RGBA, this.GLContext.UNSIGNED_BYTE, data);
        return fromValues$2(data[0], data[1], data[2], data[3]);
    };
    Renderer.prototype.startRenderLoop = function () {
        this.showFps();
        this.render();
        this.animationRequestId = window.requestAnimationFrame(this.startRenderLoop.bind(this));
    };
    Renderer.prototype.stopRenderLoop = function () {
        if (this.animationRequestId) {
            window.cancelAnimationFrame(this.animationRequestId);
            this.animationRequestId = null;
        }
    };
    Renderer.prototype.updateCamera = function (camera) {
        if (camera.type == "perspective") {
            this.camControl.camType = CameraType.Perspective;
            this.camControl.perspParams.fov = camera.perspective.yfov * 180 / Math.PI;
            this.camControl.perspParams.near = camera.perspective.znear;
            this.camControl.perspParams.far = camera.perspective.zfar;
        }
        else
            this.camControl.camType = CameraType.Ortho;
    };
    Renderer.prototype.resize = function () {
        var displayWidth = this.container.clientWidth;
        var displayHeight = this.container.clientHeight;
        if (this.canvas.width != displayWidth
            || this.canvas.height != displayHeight) {
            this.renderer2D.onWindowResize();
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.camControl.setAspect(this.canvas.width / this.canvas.height);
            this.renderTarget.setSize(this.canvas.width, this.canvas.height);
            this.GLContext.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
            this.divContainer.style.width = displayWidth + "px";
            this.divContainer.style.height = displayHeight + "px";
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.CAMERA_MOVED, data: { camType: this.camControl.camType } });
        }
    };
    Renderer.prototype.showFps = function () {
        if (AppState.showFPS === false) {
            this.fpsMonitor.textContent = "";
            return;
        }
        var now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.fpsMonitor.textContent = "FPS " + (this.fps).toString();
    };
    Renderer.prototype.captureImage = function (_imageType, _imageQuality) {
        var Canvas3D = this.canvas;
        var Canvas2D_back = this.renderer2D.canvasBackPlane;
        var Canvas2D_front = this.renderer2D.canvasFrontPlane;
        var imageType = _imageType || 'image/jpeg';
        var imageQuality = _imageQuality || 1.0;
        var width = Canvas3D.width; //1280;
        var height = Canvas3D.height; //800;
        var MergedCanvas = document.createElement('canvas');
        MergedCanvas.id = 'MergedCanvas';
        MergedCanvas.width = width;
        MergedCanvas.height = height;
        var MergedCanvasContext = MergedCanvas.getContext('2d');
        MergedCanvasContext.drawImage(Canvas2D_back, 0, 0, Canvas2D_back.width, Canvas2D_back.height, 0, 0, width, height);
        MergedCanvasContext.drawImage(Canvas3D, 0, 0, Canvas3D.width, Canvas3D.height, 0, 0, width, height);
        MergedCanvasContext.drawImage(Canvas2D_front, 0, 0, Canvas2D_front.width, Canvas2D_front.height, 0, 0, width, height);
        //let imgData = MergedCanvas.toDataURL('image/jpeg', 1.0);
        var imageData = MergedCanvas.toDataURL(imageType, imageQuality);
        var imageDataUrl = imageData;
        var bmpBlob = null;
        if (imageType === 'image/bmp') {
            bmpBlob = Utility.CanvasToBMP.toBlob(MergedCanvas);
            imageDataUrl = URL.createObjectURL(bmpBlob);
        }
        var URLs = {
            imageData: imageData,
            imageDataUrl: imageDataUrl,
            bmpBlob: bmpBlob
        };
        return URLs;
    };
    Renderer.prototype.addCustomRenderNode = function (node) {
        this.deleteCustomRenderNode(node.getUid());
        this.customRenderNodes.set(node.getUid(), node);
    };
    Renderer.prototype.deleteCustomRenderNode = function (shapeNodeId) {
        var existingNode = this.customRenderNodes.get(shapeNodeId);
        if (existingNode) {
            (existingNode).delete();
            this.customRenderNodes.delete(existingNode.getUid());
        }
    };
    Renderer.prototype.getLabelContainer = function () {
        return this.divContainer;
    };
    return Renderer;
}());var AjaxConnector = /** @class */ (function () {
    function AjaxConnector() {
    }
    AjaxConnector.xhr2 = function (_url, _data, _callback, _method, _async, responseType) {
        var asyncRequest = true;
        var resultData = {};
        var errorMsgCode = errorCode.noerror;
        if (_async === false)
            asyncRequest = false;
        //if(this.xhrRequest === undefined)
        //    this.xhrRequest =  new XMLHttpRequest();
        //let oReq = this.xhrRequest;
        var oReq = new XMLHttpRequest();
        var returnData = null;
        //oReq.addEventListener('progress', updateProgress);
        //oReq.addEventListener('error', transferFailed);
        //oReq.addEventListener('abort', transferCanceled);
        oReq.onload = function () {
            if (oReq.status === 200)
                resultData = this.response;
            else {
                if (oReq.status === 0) {
                    errorMsgCode = errorCode.connectionError;
                }
                else if (oReq.status === 404) {
                    errorMsgCode = errorCode.error404;
                }
                else if (oReq.status === 500) {
                    errorMsgCode = errorCode.serverError;
                }
                else {
                    errorMsgCode = errorCode.unknownError;
                }
            }
            if (_callback)
                _callback(resultData, errorMsgCode);
        };
        oReq.open(_method, _url, asyncRequest);
        //oReq.withCredentials = true; //Access-Control-Allow-Origin = * will not work if withCredentials = true;
        oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        //oReq.setRequestHeader('Range', 'bytes=0-47');
        if (responseType === ResponseType.BUFFER)
            oReq.responseType = 'arraybuffer';
        else if (responseType === ResponseType.JSON)
            oReq.responseType = 'json';
        else
            oReq.responseType = 'text';
        //if (_method == 'POST')
        //_data['client_id'] = clientID;
        oReq.send(JSON.stringify(_data));
        if (_async === false) {
            returnData = {};
            returnData.Data = resultData;
            returnData.errorMsgCode = errorMsgCode;
            return returnData;
        }
    };
    AjaxConnector.send = function (_url, _data, _method, _async, _reponseType) {
        return new Promise(function (resolve, reject) {
            if (!_url) {
                throw new Error('Invalid request parameters');
            }
            var _callbackFn = function (resultData, errorMsgCode) {
                if (errorMsgCode !== errorCode.noerror)
                    reject(errorMsgCode);
                if (errorMsgCode === errorCode.noerror && resultData)
                    resolve(resultData);
                resolve(errorCode.unknownError);
            };
            var syncCallResult = null;
            var responseType = _reponseType || ResponseType.JSON;
            if (responseType === ResponseType.JSON || responseType === ResponseType.BUFFER)
                syncCallResult = AjaxConnector.xhr2(_url, _data, _callbackFn, _method, _async, responseType);
            else
                throw new Error('Invalid Response Type');
            if (_async === true && syncCallResult) {
                if (syncCallResult.errorMsgCode !== -1)
                    reject(syncCallResult.errorMsgCode);
                if (syncCallResult.errorMsgCode === -1 && syncCallResult.Data)
                    resolve(syncCallResult.Data);
                resolve(errorCode.unknownError);
            }
        });
    };
    return AjaxConnector;
}());var serverURLs = {
    getLicense: '/api/1.0/license/acquire',
    releaseLicense: '/api/1.0/license/release',
    ping: '/api/1.0/ping',
    is_free: '/api/1.0/isfree',
    getCAEResultList: '/api/1.0/getCAEResultList',
    connect: '/api/1.0/connect',
    disconnect: '/api/1.0/disconnect',
    taskState: '/api/1.0/task'
};
var errorCode$1 = {
    noerror: '',
    connectionError: 'Not connected. Please verify your network connection.',
    error404: 'The requested page not found [404].',
    serverError: 'Internal server error [500].',
    jsonError: 'Requested JSON parse failed.',
    timeoutError: 'Time out error.',
    ajaxError: 'Ajax request aborted.',
    unknownError: 'Unkown network error.',
    noresponseError: 'No response from server',
    invalidDataError: 'Invalid data received from server',
    downloadInProgress: 'Download in progress'
};
var range = [" seconds ", " minutes ", " hours ", " days ", " weeks "];
var SizeRange = ["Bytes", "KB", "MB", "GB", "TB"];
var SpeedRange = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
//Convert number of seconds to structure string E.g. 65 as input returns 1minutes 5seconds
var SecondsToStructuredString = function (time) {
    var min;
    var sec;
    var hr;
    var days;
    var wks;
    if (time < 1)
        return "0 milliseconds";
    if (time < 1000)
        return Math.floor(time) + " milliseconds";
    else
        time = time / 1000;
    if (time < 60) //Seconds
     {
        return Math.floor(time) + range[0];
    }
    else if ((time / 60) < 60) //Minutes
     {
        min = Math.floor(time / 60);
        sec = Math.floor(time - (min * 60));
        return min + range[1] + (sec > 0 ? sec + range[0] : "");
    }
    else if ((time / (60 * 60)) >= 1 && (time / (60 * 60)) < 24) //Hours
     {
        hr = Math.floor(time / (60 * 60));
        min = time - (hr * (60 * 60));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((hr * (60 * 60)) + (min * 60)));
        return hr + range[2] + (min > 0 ? min + range[1] : "") + (sec > 0 ? Math.floor(sec) + range[0] : "");
    }
    else if ((time / (60 * 60)) >= 24 && (time / (60 * 60 * 24)) < 7) //Days
     {
        days = Math.floor(time / (60 * 60 * 24));
        hr = time - (days * 60 * 60 * 24);
        hr = Math.floor(hr / (60 * 60));
        min = time - ((days * 60 * 60 * 24) + (hr * 60 * 60));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
        return days + range[3] + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
    }
    else //if((time / (60*60*24)) >= 7) //Weeks
     {
        wks = Math.floor(time / (60 * 60 * 24 * 7));
        days = time - (wks * (60 * 60 * 24 * 7));
        days = Math.floor(days / (60 * 60 * 24));
        hr = time - ((wks * 60 * 60 * 24 * 7) + (days * 60 * 60 * 24));
        hr = Math.floor(hr / (60 * 60));
        min = time - (((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60)));
        min = Math.floor(min / 60);
        sec = Math.floor(time - ((wks * (60 * 60 * 24 * 7)) + (days * 60 * 60 * 24) + (hr * 60 * 60) + (min * 60)));
        return wks + range[4] + (days > 0 ? days + range[3] : "") + (hr > 0 ? hr + range[2] : "") + (min > 0 ? min + range[1] : "") + (sec > 0 ? sec + range[0] : "");
    }
};
//Returns number of bytes as structure string E.g. 1076 as input returns 1.05KB  
var BytesToStructuredString = function (bytes) {
    if (bytes < 1)
        return "0 Byte";
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + SizeRange[i];
};
//Returns number of bytes/sec as structure string E.g. 1076 as input returns 1.05KB/s
var SpeedToStructuredString = function (speed) {
    if (speed < 1)
        return "0 B/s";
    var i = Math.floor(Math.log(speed) / Math.log(1024));
    return (speed / Math.pow(1024, i)).toFixed(2) + " " + SpeedRange[i];
};var RequestMeter = /** @class */ (function () {
    function RequestMeter(url) {
        this._url = url,
            this._requestInitaitedOn = null,
            this._firstResponseReceivedOn = null,
            this._finalResponseReceivedOn = null,
            this._isErrorOccurred = false,
            this._isSuccess = false,
            this._loaded = 0;
        this._progessList = [];
        this._error = null;
        this.size = 0;
        this.timeForFirstResponse = null;
        this.timeForDownload = null;
    }
    RequestMeter.prototype.requestInitaited = function () {
        this._requestInitaitedOn = new Date().getTime();
    };
    RequestMeter.prototype.addProgress = function (event) {
        //console.log("event : ", event);
        if (event) {
            var current_time = new Date().getTime();
            if (this._progessList.length === 0) {
                this._firstResponseReceivedOn = current_time;
                this.timeForFirstResponse = this._firstResponseReceivedOn - this._requestInitaitedOn;
                this.size = event.total;
            }
            if (event.loaded === event.total) {
                this._finalResponseReceivedOn = current_time;
                this.timeForDownload = this._finalResponseReceivedOn - this._requestInitaitedOn;
            }
            var prvTime = this._requestInitaitedOn;
            var bitsLoaded = event.loaded;
            if (this._progessList.length > 0) {
                prvTime = this._progessList[this._progessList.length - 1].time;
                bitsLoaded = event.loaded - this._progessList[this._progessList.length - 1].loaded;
            }
            var durationInMS = (current_time - prvTime);
            var durationInSec = durationInMS / 1000;
            //bitsLoaded = bitsLoaded * 8;
            var speedBps = bitsLoaded / durationInSec;
            var progressEvent = {
                time: current_time,
                loaded: event.loaded,
                duration: durationInMS,
                //event : event,
                speed: speedBps
            };
            this._progessList.push(progressEvent);
            this._loaded = event.loaded;
        }
    };
    RequestMeter.prototype.succeeded = function () {
        this._isSuccess = true;
    };
    RequestMeter.prototype.errorOccurred = function (errorString) {
        this._isErrorOccurred = true;
        this._error = errorString;
    };
    RequestMeter.prototype.getTransferSpeed = function () {
        var transferSpeed = {
            maxSpeed: 0,
            avgSpeed: 0,
            minSpeed: 0,
        };
        for (var i = 1; i < this._progessList.length; i++) //skip the first response since in contains server processing time
         {
            var item = this._progessList[i];
            if (item.speed < transferSpeed.minSpeed || transferSpeed.minSpeed == 0)
                transferSpeed.minSpeed = item.speed;
            if (item.speed > transferSpeed.maxSpeed)
                transferSpeed.maxSpeed = item.speed;
            transferSpeed.avgSpeed = transferSpeed.avgSpeed + item.speed;
        }
        if (this._progessList.length > 1)
            transferSpeed.avgSpeed = transferSpeed.avgSpeed / (this._progessList.length - 1);
        return transferSpeed;
    };
    RequestMeter.prototype.getMetrics = function () {
        var metricsString = "";
        if (this._isSuccess === true && this._isErrorOccurred === false) {
            var transferSpeed = this.getTransferSpeed();
            var size = BytesToStructuredString(this.size);
            var timeForFirstResponse = SecondsToStructuredString(this.timeForFirstResponse);
            var timeToDownload = SecondsToStructuredString(this.timeForDownload);
            var minSpeed = SpeedToStructuredString(transferSpeed.minSpeed);
            var maxSpeed = SpeedToStructuredString(transferSpeed.maxSpeed);
            var avgSpeed = SpeedToStructuredString(transferSpeed.avgSpeed);
            metricsString =
                "URL :  " + this._url + "\nSize :  " + size + "\nWaiting (TTFB) :  " + timeForFirstResponse + "\nTimeToDownload :  " + timeToDownload + "\nMIN Speed :  " + minSpeed + "\nMAX Speed :  " + maxSpeed + "\nAVG Speed :  " + avgSpeed + "\nChunk Count :  " + this._progessList.length;
        }
        else if (this._isErrorOccurred === true && this._error !== null) {
            metricsString =
                "URL :  " + this._url + "\nError :  " + this._error;
        }
        else {
            metricsString =
                "URL :  " + this._url + "\nError :  Unknown Error";
        }
        return metricsString;
    };
    return RequestMeter;
}());var NetworkMetrics = /** @class */ (function () {
    function NetworkMetrics() {
    }
    NetworkMetrics.addURL = function (url) {
        var reqObj = new RequestMeter(url);
        NetworkMetrics.URLMap.set(url, reqObj);
        return reqObj;
    };
    NetworkMetrics.getRequestObject = function (url) {
        return NetworkMetrics.URLMap.get(url);
    };
    NetworkMetrics.getAllMetrics = function () {
        var rtnString = "";
        NetworkMetrics.URLMap.forEach(function (value) {
            if (rtnString === "") {
                rtnString = "" + value.getMetrics();
            }
            else {
                rtnString =
                    rtnString + " \n\n" + value.getMetrics();
            }
        });
        return rtnString;
    };
    NetworkMetrics.URLMap = new Map();
    return NetworkMetrics;
}());var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach$2(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach$2(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach$2(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach$2,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;var axios$1 = axios_1;var AxiosConnector = /** @class */ (function () {
    function AxiosConnector() {
    }
    AxiosConnector.send = function (_url, _data, _method, _reponseType) {
        if (!_url)
            throw new Error('Invalid request parameters');
        var responseType = _reponseType || ResponseType.JSON;
        if (responseType === ResponseType.JSON || responseType === ResponseType.BUFFER) {
            return new Promise(function (resolve, reject) {
                var requestObject = NetworkMetrics.addURL(_url);
                requestObject.requestInitaited();
                axios$1({
                    method: _method,
                    url: _url,
                    data: _data,
                    responseType: responseType,
                    onDownloadProgress: function (event) {
                        requestObject.addProgress(event);
                    }
                })
                    .then(function (response) {
                    if (response) {
                        requestObject.succeeded();
                        resolve(response.data);
                    }
                    else {
                        requestObject.errorOccurred(errorCode.invalidDataError);
                        reject(errorCode.invalidDataError);
                    }
                })
                    .catch(function (error) {
                    var errorMsgCode = errorCode.noerror;
                    if (error.response) {
                        if (error.response.status === 0) {
                            errorMsgCode = errorCode.connectionError;
                        }
                        else if (error.response.status === 404) {
                            errorMsgCode = errorCode.error404;
                        }
                        else if (error.response.status === 500) {
                            errorMsgCode = errorCode.serverError;
                        }
                        else {
                            errorMsgCode = errorCode.unknownError;
                        }
                    }
                    else if (error.request) {
                        errorMsgCode = errorCode.noresponseError;
                    }
                    else {
                        errorMsgCode = errorCode.unknownError;
                    }
                    requestObject.errorOccurred(errorMsgCode);
                    reject(errorMsgCode);
                });
            });
        }
        else
            throw new Error('Invalid Response Type');
    };
    return AxiosConnector;
}());var ServerConnector = /** @class */ (function () {
    function ServerConnector(connectionType) {
        this.connectionType = connectionType || ServerConnectionType.AXIOS;
    }
    ServerConnector.prototype.getJsonData = function (url) {
        if (this.connectionType === ServerConnectionType.XHR) {
            return AjaxConnector.send(url, null, 'GET', true, ResponseType.JSON);
        }
        else if (this.connectionType === ServerConnectionType.AXIOS) {
            return AxiosConnector.send(url, null, 'GET', ResponseType.JSON);
        }
        else {
            throw new Error('Invalid server connection type');
        }
    };
    ServerConnector.prototype.getArrayBuffer = function (url) {
        if (this.connectionType === ServerConnectionType.XHR) {
            return AjaxConnector.send(url, null, 'GET', true, ResponseType.BUFFER);
        }
        else if (this.connectionType === ServerConnectionType.AXIOS) {
            return AxiosConnector.send(url, null, 'GET', ResponseType.BUFFER);
        }
        else {
            throw new Error('Invalid server connection type');
        }
    };
    ServerConnector.prototype.getNetworkMetrics = function () {
        return NetworkMetrics.getAllMetrics();
    };
    return ServerConnector;
}());var BufferCache = /** @class */ (function () {
    function BufferCache() {
    }
    BufferCache.get = function (key) {
        return BufferCache.cache.get(key);
    };
    BufferCache.add = function (key, object) {
        BufferCache.cache.add(key, object);
    };
    BufferCache.remove = function (key) {
        BufferCache.cache.remove(key);
    };
    BufferCache.removeAll = function () {
        BufferCache.cache.removeAll();
    };
    BufferCache.cache = new Utility.Registry();
    return BufferCache;
}());var GLTFBufferLoader = /** @class */ (function () {
    function GLTFBufferLoader(_buffer) {
        this.buffer = null;
        this.buffer = _buffer;
        this.isBufferLoading = false;
        this.promise = null;
    }
    GLTFBufferLoader.prototype.getBuffer = function () {
        return this.buffer;
    };
    GLTFBufferLoader.prototype.clearPromise = function () {
        this.promise = null;
    };
    GLTFBufferLoader.prototype.getData = function (_url, _byteLength) {
        var scope = this;
        //if(this.promise === null)      
        var promise = new Promise(function (resolve, reject) {
            if (scope.buffer) {
                //let key :string = scope.buffer.index;  
                var uri_1 = _url || scope.buffer.uri;
                var byteLength_1 = _byteLength || scope.buffer.byteLength;
                var key_1 = uri_1;
                var chachedData = BufferCache.get(key_1);
                if (chachedData) {
                    resolve(chachedData);
                }
                else {
                    if (scope.isBufferLoading === false) {
                        //scope.isBufferLoading  = true;           
                        var promiseResult = null;
                        if (AppObjects.serverConnection)
                            promiseResult = AppObjects.serverConnection.getArrayBuffer(uri_1);
                        else
                            promiseResult = AjaxConnector.send(uri_1, null, 'GET', true, ResponseType.BUFFER);
                        if (promiseResult) {
                            promiseResult.then(function (arrayBuffer) {
                                if (arrayBuffer.byteLength === byteLength_1) {
                                    BufferCache.add(key_1, arrayBuffer);
                                    resolve(arrayBuffer);
                                }
                                else {
                                    reject("Invalid Buffer length in GLTFBufferLoader");
                                }
                            }).catch(function (error) {
                                var errorMsg = error + " : " + uri_1;
                                //console.error(errorMsg);                  
                                reject(errorMsg);
                            }).finally(function () {
                                scope.isBufferLoading = false;
                            });
                        }
                        else
                            reject("Connector error in GLTFBufferLoader");
                    }
                    else {
                        reject(errorCode.downloadInProgress);
                    }
                }
            }
            else
                reject("Invalid Buffer in GLTFBufferLoader");
        });
        //return this.promise;
        return promise;
    };
    GLTFBufferLoader.prototype.getPartData = function (offset, length) {
        if (this.buffer && this.buffer.uri) {
            offset = offset || 0;
            length = length || 0;
            var url = (this.buffer.uri.includes('?') ?
                this.buffer.uri + "&offset=" + offset + "&length=" + length :
                this.buffer.uri + "?offset=" + offset + "&length=" + length);
            return this.getData(url, length);
        }
        else {
            return Promise.reject("Invalid Buffer in GLTFBufferLoader");
        }
    };
    GLTFBufferLoader.prototype.getURI = function () {
        var uri = null;
        if (this.buffer) {
            uri = this.buffer.uri;
        }
        return uri;
    };
    GLTFBufferLoader.prototype.replaceBufferData = function (arrayBufferData) {
        var scope = this;
        this.promise = new Promise(function (resolve, reject) {
            if (arrayBufferData.byteLength === scope.buffer.byteLength)
                resolve(arrayBufferData);
            else
                reject("Invalid Buffer length in GLTFBufferLoader");
        });
        return this.promise;
    };
    return GLTFBufferLoader;
}());var AccessorCache = /** @class */ (function () {
    function AccessorCache() {
    }
    AccessorCache.get = function (key) {
        return AccessorCache.cache.get(key);
    };
    AccessorCache.add = function (key, object) {
        AccessorCache.cache.add(key, object);
    };
    AccessorCache.remove = function (key) {
        AccessorCache.cache.remove(key);
    };
    AccessorCache.removeAll = function () {
        AccessorCache.cache.removeAll();
    };
    AccessorCache.cache = new Utility.Registry();
    return AccessorCache;
}());var GLTFAccessorLoader = /** @class */ (function () {
    function GLTFAccessorLoader(_accessor) {
        this.accessor = null;
        this.accessor = _accessor;
        this.isBufferLoading = false;
        this.promise = null;
    }
    GLTFAccessorLoader.prototype.getAccessor = function () {
        return this.accessor;
    };
    GLTFAccessorLoader.prototype.clearPromise = function () {
        this.promise = null;
    };
    GLTFAccessorLoader.prototype.getData = function () {
        var scope = this;
        if (this.promise === null)
            this.promise = new Promise(function (resolve, reject) {
                var bufferViewData = scope.accessor.bufferViewLoader.getBufferView();
                if (scope.accessor && bufferViewData) {
                    //let key :string = 'bufferView : ' + scope.accessor.bufferView;
                    var key_1 = scope.accessor.index;
                    //let byteLength = bufferViewData.byteLength !== undefined ? bufferViewData.byteLength : 0;
                    //let key :string = 'buffer_' + bufferViewData.buffer + "_" + bufferViewData.byteOffset + "_" + byteLength + "_" + bufferViewData.target;
                    //let bufferOffset = scope.accessor.bufferOffset || 0;   
                    //key = key + "_" + 'bufferView_' + bufferOffset +"_" + scope.accessor.componentType + "_" + scope.accessor.count + "_" + scope.accessor.type ;
                    if (scope.accessor.uid)
                        key_1 = scope.accessor.uid;
                    var chachedAccessorData = AccessorCache.get(key_1);
                    if (chachedAccessorData) {
                        resolve(chachedAccessorData);
                    }
                    else {
                        if (scope.isBufferLoading === false) {
                            scope.isBufferLoading = true;
                            AccessorCache.add(key_1, null);
                            var promise = scope.accessor.bufferViewLoader.getData();
                            promise.then(function (arrayBuffer) {
                                var accessorType = scope.accessor.type;
                                var itemSize = WEBGLTYPESIZES[accessorType];
                                var arrayType = WEBGLCOMPONENTTYPES[scope.accessor.componentType];
                                var bufferOffset = scope.accessor.bufferOffset || 0;
                                var data = new arrayType(arrayBuffer, bufferOffset, scope.accessor.count * itemSize);
                                AccessorCache.add(key_1, data);
                                resolve(AccessorCache.get(key_1));
                            })
                                .catch(function (error) {
                                reject(error);
                            })
                                .finally(function () {
                                scope.isBufferLoading = false;
                            });
                        }
                        else {
                            //console.log("GLTFAccessorLoader", errorCode.downloadInProgress);
                            reject(errorCode.downloadInProgress);
                        }
                    }
                }
                else
                    reject("Invalid accessor in GLTFAccessorLoader");
            });
        return this.promise;
    };
    GLTFAccessorLoader.prototype.getURI = function () {
        var uri = null;
        if (this.accessor && this.accessor.bufferViewLoader) {
            uri = this.accessor.bufferViewLoader.getURI();
        }
        return uri;
    };
    GLTFAccessorLoader.prototype.replaceBufferData = function (arrayBufferData) {
        var scope = this;
        this.promise = new Promise(function (resolve, reject) {
            if (scope.accessor && scope.accessor.bufferViewLoader) {
                var promise = scope.accessor.bufferViewLoader.replaceBufferData(arrayBufferData);
                promise.then(function (arrayBuffer) {
                    var accessorType = scope.accessor.type;
                    var itemSize = WEBGLTYPESIZES[accessorType];
                    var arrayType = WEBGLCOMPONENTTYPES[scope.accessor.componentType];
                    var bufferOffset = scope.accessor.bufferOffset || 0;
                    var data = new arrayType(arrayBuffer, bufferOffset, scope.accessor.count * itemSize);
                    resolve(data);
                })
                    .catch(function (error) {
                    reject(error);
                })
                    .finally(function () {
                });
            }
            else
                reject("Invalid accessor in GLTFAccessorLoader");
        });
        return this.promise;
    };
    GLTFAccessorLoader.prototype.getTypedBuffer = function (arrayBufferData) {
        var accessorType = this.accessor.type;
        var itemSize = WEBGLTYPESIZES[accessorType];
        var arrayType = WEBGLCOMPONENTTYPES[this.accessor.componentType];
        var bufferOffset = this.accessor.bufferOffset || 0;
        return new arrayType(arrayBufferData, bufferOffset, this.accessor.count * itemSize);
    };
    return GLTFAccessorLoader;
}());var BufferViewCache = /** @class */ (function () {
    function BufferViewCache() {
    }
    BufferViewCache.get = function (key) {
        return BufferViewCache.cache.get(key);
    };
    BufferViewCache.add = function (key, object) {
        BufferViewCache.cache.add(key, object);
    };
    BufferViewCache.remove = function (key) {
        BufferViewCache.cache.remove(key);
    };
    BufferViewCache.removeAll = function () {
        BufferViewCache.cache.removeAll();
    };
    BufferViewCache.cache = new Utility.Registry();
    return BufferViewCache;
}());var LoaderState = /** @class */ (function () {
    function LoaderState() {
    }
    LoaderState.chuckBasedLoding = true;
    return LoaderState;
}());var GLTFBufferViewLoader = /** @class */ (function () {
    function GLTFBufferViewLoader(_bufferView) {
        this.bufferView = null;
        this.bufferView = _bufferView;
        this.isBufferLoading = false;
        this.promise = null;
    }
    GLTFBufferViewLoader.prototype.getBufferView = function () {
        return this.bufferView;
    };
    GLTFBufferViewLoader.prototype.clearPromise = function () {
        this.promise = null;
    };
    GLTFBufferViewLoader.prototype.getData = function () {
        var scope = this;
        if (this.promise === null)
            this.promise = new Promise(function (resolve, reject) {
                if (scope.bufferView && scope.bufferView.bufferLoader) {
                    //let key :string = 'buffer : ' + scope.bufferView.buffer;
                    var key_1 = scope.bufferView.index;
                    //let byteLength = scope.bufferView.byteLength !== undefined ? scope.bufferView.byteLength : 0;
                    //let key :string = 'buffer_' + scope.bufferView.buffer + "_" + scope.bufferView.byteOffset + "_" + byteLength + "_" + scope.bufferView.target;
                    if (scope.bufferView.uid)
                        key_1 = scope.bufferView.uid;
                    var chachedBufferViewData = BufferViewCache.get(key_1);
                    if (chachedBufferViewData) {
                        resolve(chachedBufferViewData);
                    }
                    else {
                        if (scope.isBufferLoading === false) {
                            scope.isBufferLoading = true;
                            var promise = null;
                            if (LoaderState.chuckBasedLoding)
                                promise = scope.bufferView.bufferLoader.getPartData(scope.bufferView.byteOffset, scope.bufferView.byteLength);
                            else
                                promise = scope.bufferView.bufferLoader.getData();
                            promise.then(function (arrayData) {
                                if (LoaderState.chuckBasedLoding) {
                                    BufferViewCache.add(key_1, arrayData);
                                    resolve(arrayData);
                                }
                                else {
                                    var byteLength = scope.bufferView.byteLength !== undefined ? scope.bufferView.byteLength : 0;
                                    var bufferViewData = arrayData.slice(scope.bufferView.byteOffset, scope.bufferView.byteOffset + byteLength);
                                    BufferViewCache.add(key_1, bufferViewData);
                                    resolve(bufferViewData);
                                }
                            })
                                .catch(function (error) {
                                reject(error);
                            })
                                .finally(function () {
                                scope.isBufferLoading = false;
                            });
                        }
                        else {
                            //console.log("GLTFBufferViewLoader", errorCode.downloadInProgress);
                            reject(errorCode.downloadInProgress);
                        }
                    }
                }
                else
                    reject("Invalid bufferView in GLTFBufferViewLoader");
            });
        return this.promise;
    };
    GLTFBufferViewLoader.prototype.getURI = function () {
        var uri = null;
        if (this.bufferView && this.bufferView.bufferLoader) {
            uri = this.bufferView.bufferLoader.getURI();
        }
        return uri;
    };
    GLTFBufferViewLoader.prototype.replaceBufferData = function (arrayBufferData) {
        var scope = this;
        this.promise = new Promise(function (resolve, reject) {
            if (scope.bufferView && scope.bufferView.bufferLoader) {
                var promise = scope.bufferView.bufferLoader.replaceBufferData(arrayBufferData);
                promise.then(function (arrayData) {
                    var byteLength = scope.bufferView.byteLength !== undefined ? scope.bufferView.byteLength : 0;
                    var bufferViewData = arrayData.slice(scope.bufferView.byteOffset, scope.bufferView.byteOffset + byteLength);
                    resolve(bufferViewData);
                })
                    .catch(function (error) {
                    reject(error);
                })
                    .finally(function () {
                });
            }
            else
                reject("Invalid bufferView in GLTFBufferViewLoader");
        });
        return this.promise;
    };
    return GLTFBufferViewLoader;
}());var GLTFLoader = /** @class */ (function () {
    function GLTFLoader(_serverConnection) {
        this.serverConnection = _serverConnection || null;
        this.json = {};
        this.scenes = [];
        this.cache = new Utility.Registry();
        this.bufferCache = new Utility.Registry();
        this.baseURL = null;
        this.isDeferredLoadingEnabled = true;
    }
    GLTFLoader.prototype.setBaseURL = function (baseURL) {
        this.baseURL = baseURL;
    };
    GLTFLoader.prototype.getScene = function (sceneIndex) {
        if (sceneIndex < this.scenes.length) {
            return this.scenes[sceneIndex];
        }
        else
            throw new Error('Invalid scene index' + sceneIndex);
    };
    GLTFLoader.prototype.parse = function (jsonString, _callback) {
        this.json = jsonString;
        this.scenes = [];
        this.cache.removeAll(); // Clear the loader cache
        this.bufferCache.removeAll();
        var scope = this;
        var json = jsonString;
        this.withDependencies([
            'scenes'
        ]).then(function (dependencies) {
            var scenes = [];
            for (var name_1 in dependencies.scenes) {
                scenes.push(dependencies.scenes[name_1]);
            }
            var scene = json.scene !== undefined ? dependencies.scenes[json.scene] : scenes[0];
            scope.scenes = scenes;
            scope.cache.removeAll();
            scope.bufferCache.removeAll();
            // Fire the callback on complete
            _callback(scene);
        });
    };
    GLTFLoader.prototype.parseAccessor = function (jsonString, _callback) {
        this.json = jsonString;
        this.cache.removeAll();
        return this.withDependencies([
            'accessors'
        ]).then(function (dependencies) {
            _callback(dependencies.accessors);
        });
    };
    GLTFLoader.prototype.loadScenes = function () {
        var json = this.json;
        // scene node hierachy builder
        function buildNodeHierachy(nodeId, parentObject, allNodes, index) {
            if (index === void 0) { index = 0; }
            var _node = allNodes[nodeId];
            _node.index = nodeId;
            if (_node.camera) {
                if (parentObject.cameras === undefined)
                    parentObject.cameras = [];
                parentObject.cameras.push(_node);
            }
            else {
                if (parentObject.children === undefined)
                    parentObject.children = [];
                parentObject.children[index] = _node;
                var node = json.nodes[nodeId];
                if (node.children) {
                    var children = node.children;
                    for (var i = 0, l = children.length; i < l; i++) {
                        var child = children[i];
                        buildNodeHierachy(child, _node, allNodes, i);
                    }
                }
            }
        }
        return this.withDependencies([
            'nodes',
            'planes'
        ]).then(function (dependencies) {
            return Utility.each(json.scenes, function (scene) {
                var _scene = {};
                _scene.name = scene.name || "Scene_Untitled";
                _scene.index = -1;
                var nodes = scene.nodes || [];
                if (scene.front !== undefined && dependencies.planes !== undefined)
                    _scene.frontPlane = dependencies.planes[scene.front];
                if (scene.back !== undefined && dependencies.planes !== undefined)
                    _scene.backPlane = dependencies.planes[scene.back];
                for (var i = 0, l = nodes.length; i < l; i++) {
                    var nodeId = nodes[i];
                    buildNodeHierachy(nodeId, _scene, dependencies.nodes, i);
                }
                if (scene.camera !== undefined) {
                    var cameraNode = dependencies.nodes[scene.camera];
                    if (cameraNode !== null && cameraNode !== undefined)
                        _scene.camera = cameraNode.camera || undefined;
                }
                else if (_scene.cameras && _scene.cameras.length > 0) {
                    _scene.camera = _scene.cameras[0].camera;
                }
                else {
                    nodes.forEach(function (nodeIndex) {
                        var node = dependencies.nodes[nodeIndex];
                        if (node && node.camera) {
                            _scene.camera = node.camera;
                        }
                    });
                }
                return _scene;
            });
        });
    };
    GLTFLoader.prototype.loadPlanes = function () {
        var json = this.json;
        return this.withDependencies([
            'labels',
            'colormaps',
            'styles'
        ]).then(function (dependencies) {
            return Utility.each(json.planes, function (plane, index) {
                plane.index = index;
                if (plane.elements !== undefined && plane.elements.constructor === Array) {
                    for (var i = 0; i < plane.elements.length; i++) {
                        var type = plane.elements[i].type;
                        plane.elements[i][type] = dependencies[type + 's'][plane.elements[i].index];
                        plane.elements[i].style = dependencies.styles[plane.elements[i].style];
                    }
                }
                return plane;
            });
        });
    };
    GLTFLoader.prototype.loadStyles = function () {
        var json = this.json;
        return Utility.each(json.styles, function (style) {
            return style;
        });
    };
    GLTFLoader.prototype.loadLabels = function () {
        var json = this.json;
        return Utility.each(json.labels, function (label) {
            return label;
        });
    };
    GLTFLoader.prototype.loadColormaps = function () {
        var json = this.json;
        return this.withDependencies([
            'points'
        ]).then(function (dependencies) {
            return Utility.each(json.colormaps, function (colormap) {
                if (colormap.colors !== undefined && colormap.colors.constructor === Array) {
                    var colors = [];
                    for (var i = 0; i < colormap.colors.length; i++)
                        colors.push(dependencies.points[colormap.colors[i]]);
                    colormap.colors = colors;
                }
                if (colormap.values !== undefined && colormap.values.constructor === Array) {
                    var values = [];
                    for (var i = 0; i < colormap.values.length; i++)
                        values.push(dependencies.points[colormap.values[i]]);
                    colormap.values = values;
                }
                return colormap;
            });
        });
    };
    GLTFLoader.prototype.loadPoints = function () {
        var json = this.json;
        return Utility.each(json.points, function (point) {
            return point;
        });
    };
    GLTFLoader.prototype.loadNodes = function () {
        var json = this.json;
        return this.withDependencies([
            'meshes',
            'cameras'
        ]).then(function (dependencies) {
            return Utility.each(json.nodes, function (node, index) {
                if (node.name === undefined) {
                    node.name = "node_" + index;
                }
                if (node.children !== undefined && node.children.length >= 0)
                    node.type = AppConstants.NodeType.TRANSFORM;
                if (node.mesh !== undefined) {
                    node.type = AppConstants.NodeType.SHAPE;
                    node.mesh = dependencies.meshes[node.mesh];
                }
                if (node.camera !== undefined) {
                    node.type = AppConstants.NodeType.CAMERA;
                    node.camera = dependencies.cameras[node.camera];
                }
                return node;
            });
        });
    };
    GLTFLoader.prototype.loadCameras = function () {
        var json = this.json;
        return Utility.each(json.cameras, function (camera) {
            return camera;
        });
    };
    GLTFLoader.prototype.loadMeshes = function () {
        var json = this.json;
        return this.withDependencies([
            'materials',
            'accessors'
        ]).then(function (dependencies) {
            return Utility.each(json.meshes, function (_mesh, index) {
                var selectedMesh = _mesh;
                var mesh = null;
                if (selectedMesh) {
                    mesh = JSON.parse(JSON.stringify(selectedMesh));
                    if (mesh.name === undefined) {
                        mesh.name = "mesh_" + index;
                    }
                    mesh.primitives = [];
                    if (selectedMesh.primitives) {
                        for (var i = 0; i < selectedMesh.primitives.length; i++) {
                            var primitiveObject = selectedMesh.primitives[i];
                            var primitive = JSON.parse(JSON.stringify(primitiveObject));
                            if (primitive) {
                                if (primitive.name === undefined) {
                                    primitive.name = "primitive_" + i;
                                }
                                //need to create enum
                                primitive.mode = primitiveObject.mode;
                                primitive.material = dependencies.materials[primitiveObject.material];
                                if (primitiveObject.indices !== null && primitiveObject.indices !== undefined)
                                    primitive.indices = dependencies.accessors[primitiveObject.indices];
                                if (primitiveObject.attributes) {
                                    var attributes = primitiveObject.attributes;
                                    primitive.attributes = {};
                                    for (var key in attributes) {
                                        if (attributes.hasOwnProperty(key)) {
                                            primitive.attributes[key] = dependencies.accessors[attributes[key]];
                                        }
                                    }
                                }
                            }
                            mesh.primitives.push(primitive);
                        }
                    }
                }
                return mesh;
            });
        });
    };
    GLTFLoader.prototype.loadMaterials = function () {
        var json = this.json;
        return this.withDependencies([
            'textures'
        ]).then(function (dependencies) {
            return Utility.each(json.materials, function (_material, index) {
                var material = JSON.parse(JSON.stringify(_material));
                material.id = 'material_' + index;
                if (material.pbrMetallicRoughness !== undefined && material.pbrMetallicRoughness.baseColorTexture !== undefined)
                    material.pbrMetallicRoughness.baseColorTexture.texture = dependencies.textures[material.pbrMetallicRoughness.baseColorTexture.index];
                return material;
            });
        });
    };
    GLTFLoader.prototype.loadTextures = function () {
        var json = this.json;
        return this.withDependencies([
            'bufferViews'
        ]).then(function (dependencies) {
            return Utility.each(json.textures, function (_texture) {
                var texture = JSON.parse(JSON.stringify(_texture));
                if (texture.source !== undefined) {
                    var imageSource = json.images[texture.source];
                    var bufferViewLoader = dependencies.bufferViews[imageSource.bufferView];
                    texture.bufferViewLoader = bufferViewLoader;
                    texture.mimeType = imageSource.mimeType;
                    var bufferView = bufferViewLoader.getBufferView();
                    if (bufferView.arrayBuffer) {
                        var stringData = Utility.convertUint8ArrayToString(new Uint8Array(bufferView.arrayBuffer));
                        texture.data = 'data:' + imageSource.mimeType + ';base64,' + btoa(stringData);
                    }
                    else {
                        texture.data = null;
                    }
                }
                return texture;
            });
        });
    };
    GLTFLoader.prototype.loadAccessors = function () {
        var json = this.json;
        return this.withDependencies([
            'bufferViews'
        ]).then(function (dependencies) {
            return Utility.each(json.accessors, function (accessor, index) {
                //let selectedAccessor = JSON.parse(JSON.stringify(accessor));
                //selectedAccessor.bufferViewData = dependencies.bufferViews[ accessor.bufferView ]; 
                //accessor.bufferViewData = dependencies.bufferViews[ accessor.bufferView ]; 
                //selectedAccessor.deferredAccessorLoader = new GLTFAccessorLoader(accessor);
                //return selectedAccessor;    
                var selectedAccessor = JSON.parse(JSON.stringify(accessor));
                if (selectedAccessor.name === undefined)
                    selectedAccessor.name = "accessor_" + index;
                selectedAccessor.index = "accessor_" + index;
                selectedAccessor.bufferViewLoader = dependencies.bufferViews[accessor.bufferView];
                return new GLTFAccessorLoader(selectedAccessor);
            });
        });
    };
    GLTFLoader.prototype.loadBufferViews = function () {
        var json = this.json;
        return this.withDependencies([
            'buffers'
        ]).then(function (dependencies) {
            return Utility.each(json.bufferViews, function (bufferView, index) {
                /*
                let selectedBufferView = JSON.parse(JSON.stringify(bufferView));
                let bufferObject = dependencies.buffers[ bufferView.buffer ];
               
                bufferView.bufferData = bufferObject;
                selectedBufferView.deferredBufferViewLoader = new GLTFBufferViewLoader(bufferView);
                
                selectedBufferView.buffer = {
                    byteLength : bufferObject.byteLength,
                    name : bufferObject.name,
                    uid : bufferObject.uid,
                    uri : bufferObject.uri,
                    deferredLoader : bufferObject.deferredLoader
                };

                let arraybuffer = bufferObject.arrayBuffer;
                let byteLength = bufferView.byteLength !== undefined ? bufferView.byteLength : 0;

                if(arraybuffer)
                    selectedBufferView.arrayBuffer = arraybuffer.slice( bufferView.byteOffset, bufferView.byteOffset + byteLength );
                else
                    selectedBufferView.arrayBuffer = null;

                return selectedBufferView;
                */
                var bufferLoader = dependencies.buffers[bufferView.buffer];
                var selectedBufferView = JSON.parse(JSON.stringify(bufferView));
                if (selectedBufferView.name === undefined)
                    selectedBufferView.name = "bufferView_" + index;
                selectedBufferView.index = "bufferView_" + index;
                selectedBufferView.bufferLoader = bufferLoader;
                var bufferObject = bufferLoader.getBuffer();
                var arraybuffer = bufferObject.arrayBuffer;
                var byteLength = bufferView.byteLength !== undefined ? bufferView.byteLength : 0;
                if (arraybuffer)
                    selectedBufferView.arrayBuffer = arraybuffer.slice(bufferView.byteOffset, bufferView.byteOffset + byteLength);
                else
                    selectedBufferView.arrayBuffer = null;
                return new GLTFBufferViewLoader(selectedBufferView);
            });
        });
    };
    GLTFLoader.prototype.loadBuffers = function () {
        var scope = this;
        var json = this.json;
        json.buffers.length;
        return Utility.each(json.buffers, function (buffer, index) {
            return new Promise(function (resolve, reject) {
                if (buffer.uri) {
                    var bufferObject = scope.bufferCache.get(buffer.uri);
                    if (bufferObject) {
                        //AppState.Statusbar.setInfo('Buffer ' + (loadedBufferCounter)  + '/'+ numberofBuffers);		
                        //console.log('Buffer ' + (loadedBufferCounter)  + '/'+ numberofBuffers);
                        resolve(bufferObject);
                    }
                    else {
                        var selectedBuffer_1 = JSON.parse(JSON.stringify(buffer));
                        if (selectedBuffer_1.name === undefined)
                            selectedBuffer_1.name = "buffer_" + index;
                        selectedBuffer_1.index = "buffer_" + index;
                        var option = {
                            url: buffer.uri,
                            contentType: 'application/octet-stream'
                        };
                        var promiseResult = null;
                        var deffered = scope.isDeferredLoadingEnabled;
                        var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
                        var dataUriRegexResult = buffer.uri.match(dataUriRegex);
                        if (dataUriRegexResult)
                            deffered = false;
                        if (deffered === true) {
                            selectedBuffer_1.arrayBuffer = null;
                            //resolve( selectedBuffer );
                            resolve(new GLTFBufferLoader(selectedBuffer_1));
                        }
                        else {
                            if (dataUriRegexResult) {
                                promiseResult = new Promise(function (resolve, reject) {
                                    try {
                                        //let mimeType = dataUriRegexResult[ 1 ];
                                        //let isBase64 = !! dataUriRegexResult[ 2 ];
                                        var data = dataUriRegexResult[3];
                                        var arrayBuffer = Utility.base64.decode(data);
                                        resolve(arrayBuffer);
                                    }
                                    catch (error) {
                                        reject(error);
                                    }
                                });
                            }
                            else {
                                if (scope.serverConnection)
                                    promiseResult = scope.serverConnection.getArrayBuffer(option.url);
                                else
                                    promiseResult = AjaxConnector.send(option.url, null, 'GET', true, ResponseType.BUFFER);
                            }
                            if (promiseResult)
                                promiseResult.then(function (arrayBuffer) {
                                    selectedBuffer_1.arrayBuffer = arrayBuffer;
                                    var bufferLoader = new GLTFBufferLoader(selectedBuffer_1);
                                    scope.bufferCache.add(buffer.uri, bufferLoader);
                                    //AppState.Statusbar.setInfo('Buffer ' + (loadedBufferCounter)  + '/'+ numberofBuffers);	
                                    //console.log('Buffer ' + (loadedBufferCounter)  + '/'+ numberofBuffers);	
                                    //resolve( selectedBuffer );
                                    resolve(bufferLoader);
                                }).catch(function (error) {
                                    reject(error);
                                });
                            else
                                reject("Invalid promise in loadBuffers.");
                        }
                    }
                }
                else
                    reject('Invalid buffer uri : ' + buffer.uri);
            });
        });
    };
    GLTFLoader.prototype.dispose = function () {
        this.scenes = [];
    };
    GLTFLoader.prototype.withDependencies = function (dependencies) {
        var _dependencies = {};
        for (var i = 0; i < dependencies.length; i++) {
            var dependency = dependencies[i];
            var fnName = 'load' + dependency.charAt(0).toUpperCase() + dependency.slice(1);
            var cached = this.cache.get(dependency);
            if (cached !== undefined) {
                _dependencies[dependency] = cached;
            }
            else if (this[fnName]) {
                var fn = this[fnName]();
                this.cache.add(dependency, fn);
                _dependencies[dependency] = fn;
            }
        }
        return Utility.each(_dependencies, function (dependency) {
            return dependency;
        });
    };
    return GLTFLoader;
}());var DataManager = /** @class */ (function () {
    function DataManager(serverAddress, _serverConnection, _vueConnector) {
        this.isExternalConnector = false;
        this.serverAddress = serverAddress;
        this.vueConnector = _vueConnector;
        this.serverConnection = _serverConnection;
        if (_vueConnector !== null)
            this.isExternalConnector = true;
        if ((_vueConnector == null && _serverConnection == null) ||
            (_vueConnector == undefined && _serverConnection == undefined))
            throw new Error('Server Connector is not defined');
        //this.gltfLoader = new GLTFLoader();
        if (_vueConnector !== null)
            this.gltfLoader = new GLTFLoader(this.vueConnector);
        else
            this.gltfLoader = new GLTFLoader(this.serverConnection);
    }
    DataManager.prototype.addCaxFile = function (caxFilePath) {
        //console.log('Downloading file on the server.');	
        var scope = this;
        var url = caxFilePath;
        var returnPromise = new Promise(function (resolve, reject) {
            var promiseResult = null;
            if (scope.isExternalConnector == true)
                promiseResult = scope.vueConnector.addCaxFile(url);
            else
                promiseResult = scope.serverConnection.getJsonData(url);
            promiseResult
                .then(function (_jsonResult) {
                if (scope.isJson(_jsonResult) === true && _jsonResult) {
                    var jsonResult_1 = _jsonResult;
                    if (jsonResult_1["json_url"]) {
                        if (jsonResult_1["data"]) {
                            var status_1 = jsonResult_1["data"]["status"];
                            var taskId = jsonResult_1["data"]["task_id"];
                            var taskURL = jsonResult_1["data"]["task_url"];
                            if (status_1 === "available") {
                                //this.load(jsonResult['json_url']);
                                resolve(jsonResult_1);
                            }
                            else if (status_1 === "download_in_progress") {
                                var statusMessage = "File download in progress";
                                //this.checkStatus(taskId, statusMessage, () => this.load(jsonResult['json_url']));
                                scope.checkStatus(taskURL, taskId, statusMessage, function () {
                                    return resolve(jsonResult_1);
                                });
                                // AppState.Statusbar.setInfo(jsonResult['data']['status']);
                            }
                        }
                    }
                    else if (jsonResult_1["error"]) {
                        //console.log(jsonResult["error"]);
                        reject(jsonResult_1["error"]);
                    }
                    else {
                        //console.log(errorCode.jsonError);
                        reject(errorCode$1.jsonError);
                    }
                }
                else {
                    //console.log(errorCode.jsonError);
                    reject(errorCode$1.jsonError);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode$1.noerror) {
                    //console.log(errorMsgCode);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    reject(errorCode$1.unknownError);
                }
            });
        });
        return returnPromise;
    };
    DataManager.prototype.load = function (filePath) {
        var url = filePath;
        //url = "http://localhost:8181/api/1.0/js/test.json";
        var scope = this;
        var returnPromise = new Promise(function (resolve, reject) {
            var promiseResult = null;
            if (scope.isExternalConnector == true)
                promiseResult = scope.vueConnector.load(url);
            else
                promiseResult = scope.serverConnection.getJsonData(url);
            promiseResult
                .then(function (data) {
                if (data) {
                    if (data["error"])
                        reject("Error occured at server");
                    else {
                        var baseURL = "./";
                        var index = filePath.lastIndexOf("/");
                        if (index > -1)
                            baseURL = filePath.substr(0, index + 1);
                        //console.log(data);
                        scope.gltfLoader.setBaseURL(baseURL);
                        if (data.gltf !== undefined) {
                            scope.gltfLoader.parse(data.gltf, function (scene) {
                                data.scene = scene;
                                //console.log(scene);
                                resolve(data);
                            });
                        }
                        else {
                            reject("Error in data");
                        }
                    }
                }
                else {
                    //console.log(errorCode.invalidDataError);
                    reject(errorCode$1.invalidDataError);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode$1.noerror) {
                    //console.log(errorMsgCode);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    reject(errorCode$1.unknownError);
                }
            });
        });
        return returnPromise;
    };
    DataManager.prototype.getData = function (url) {
        var scope = this;
        var returnPromise = new Promise(function (resolve, reject) {
            var promiseResult = null;
            if (scope.isExternalConnector == true)
                promiseResult = scope.vueConnector.load(url);
            else
                promiseResult = scope.serverConnection.getJsonData(url);
            promiseResult
                .then(function (data) {
                if (data) {
                    if (data["error"])
                        reject("Error occured at server");
                    else {
                        resolve(data);
                    }
                }
                else {
                    //console.log(errorCode.invalidDataError);
                    reject(errorCode$1.invalidDataError);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode$1.noerror) {
                    //console.log(errorMsgCode);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    reject(errorCode$1.unknownError);
                }
            });
        });
        return returnPromise;
    };
    DataManager.prototype.checkStatus = function (taskURL, taskId, statusMessage, onCompleteCallbackFn) {
        var _this = this;
        if ((taskId || taskURL) && onCompleteCallbackFn) {
            var promiseResult = null;
            var url = this.serverAddress + serverURLs["taskState"] + "/" + taskId;
            if (taskURL)
                url = taskURL;
            if (this.isExternalConnector == true)
                promiseResult = this.vueConnector.checkStatus(url);
            else
                promiseResult = this.serverConnection.getJsonData(url);
            promiseResult
                .then(function (jsonResult) {
                if (_this.isJson(jsonResult) === true && jsonResult) {
                    if (jsonResult["state"] === "SUCCESS") {
                        onCompleteCallbackFn();
                    }
                    else {
                        if (jsonResult["info"] &&
                            jsonResult["info"]["bytes_downloaded"] &&
                            jsonResult["info"]["total_bytes"]) {
                            var bytes_downloaded = jsonResult["info"]["bytes_downloaded"];
                            var total_bytes = jsonResult["info"]["total_bytes"];
                            var percetage = (bytes_downloaded / total_bytes) * 100;
                            statusMessage + " : " + percetage.toFixed(1) + "% completed.";
                        }
                        //console.log(msg);
                        setTimeout(function () {
                            this.checkStatus(taskURL, taskId, statusMessage, onCompleteCallbackFn);
                        }.bind(_this, taskURL, taskId, statusMessage, onCompleteCallbackFn), 3000);
                    }
                }
                else
                    console.error(errorCode$1.jsonError);
            })
                .catch(function (errorMsgCode) {
            });
        }
    };
    DataManager.prototype.applyResult = function (filePath) {
        //console.log("Loading result...");
        var url = filePath;
        var scope = this;
        var returnPromise = new Promise(function (resolve, reject) {
            var promiseResult = null;
            if (scope.isExternalConnector == true)
                promiseResult = scope.vueConnector.applyResult(url);
            else
                promiseResult = scope.serverConnection.getJsonData(url);
            promiseResult
                .then(function (data) {
                if (data["error"])
                    console.error(data["error"]);
                else {
                    if (data.gltf) {
                        //console.log(data);
                        scope.gltfLoader.parse(data.gltf, function (scene) {
                            /*
                                        if(scene !== undefined && scene !== null)
                                        {
            
                                            if(data.csel !== undefined || data.csel !== null)
                                            {
                                                if(data.csel.bbox !== undefined)
                                                    scene.bbox = data.csel.bbox;
            
                                                if(data.csel.result  !== undefined)
                                                    scene.result  = data.csel.result;
                                                
                                                if(data.csel.step !== undefined)
                                                    scene.step = data.csel.step;
            
                                                if(data.csel.derivedType !== undefined)
                                                    scene.derivedType = data.csel.derivedType;
                                            }
                                    
                                            if(scene.result  !== undefined)
                                                AppState.result = scene.result;
                                            
                                            if(scene.step !== undefined)
                                                AppState.step = scene.step;
            
                                            if(scene.derivedType !== undefined)
                                                AppState.derivedType = scene.derivedType;
                                        }
                                        */
                            resolve(scene);
                            //this.dispatchEvent( { type: 'applyResult', message: scene } );
                        });
                    }
                    else {
                        reject(errorCode$1.invalidDataError);
                    }
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode$1.noerror) {
                    //console.log(errorMsgCode);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    reject(errorCode$1.unknownError);
                }
            });
        });
        return returnPromise;
    };
    DataManager.prototype.isJson = function (item) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        }
        catch (e) {
            return false;
        }
        if (typeof item === "object" && item !== null) {
            return true;
        }
        return false;
    };
    DataManager.prototype.addFile = function (API, caxFilePath) {
        //console.log("Downloading file on the server.");
        var scope = this;
        //let url = caxFilePath;
        var url = API + "?url=" + caxFilePath;
        var returnPromise = new Promise(function (resolve, reject) {
            var promiseResult = null;
            if (scope.isExternalConnector == true)
                promiseResult = scope.vueConnector.addCaxFile(url);
            else
                promiseResult = scope.serverConnection.getJsonData(url);
            promiseResult
                .then(function (_jsonResult) {
                if (scope.isJson(_jsonResult) === true && _jsonResult) {
                    var jsonResult_2 = _jsonResult;
                    if (jsonResult_2["json_url"]) {
                        if (jsonResult_2["data"]) {
                            var status_2 = jsonResult_2["data"]["status"];
                            var taskId = jsonResult_2["data"]["task_id"];
                            var taskURL = jsonResult_2["data"]["task_url"];
                            if (status_2 === "available") {
                                //this.load(jsonResult['json_url']);
                                resolve(jsonResult_2);
                            }
                            else if (status_2 === "download_in_progress") {
                                var statusMessage = "File download in progress";
                                //this.checkStatus(taskId, statusMessage, () => this.load(jsonResult['json_url']));
                                scope.checkStatus(taskURL, taskId, statusMessage, function () {
                                    return resolve(jsonResult_2);
                                });
                                // AppState.Statusbar.setInfo(jsonResult['data']['status']);
                            }
                        }
                    }
                    else if (jsonResult_2["error"]) {
                        //console.log(jsonResult["error"]);
                        reject(jsonResult_2["error"]);
                    }
                    else {
                        //console.log(errorCode.jsonError);
                        reject(errorCode$1.jsonError);
                    }
                }
                else {
                    //console.log(errorCode.jsonError);
                    reject(errorCode$1.jsonError);
                }
            })
                .catch(function (errorMsgCode) {
                if (errorMsgCode !== errorCode$1.noerror) {
                    //console.log(errorMsgCode);
                    reject(errorMsgCode);
                }
                else {
                    //console.log(errorCode.unknownError);
                    reject(errorCode$1.unknownError);
                }
            });
        });
        return returnPromise;
    };
    DataManager.prototype.getNetworkMetrics = function () {
        if (this.isExternalConnector == true)
            return this.vueConnector.getNetworkMetrics();
        else
            return this.serverConnection.getNetworkMetrics();
    };
    DataManager.prototype.loadGLTF = function (gltf) {
        var scope = this;
        var returnPromise = new Promise(function (resolve, reject) {
            scope.gltfLoader.parse(gltf, function (scene) {
                resolve(scene);
            });
        });
        return returnPromise;
    };
    return DataManager;
}());var PointMesh = /** @class */ (function (_super) {
    __extends(PointMesh, _super);
    function PointMesh(name, point) {
        var _this = _super.call(this, name) || this;
        _this.pt = point;
        _this.uid = Utility.getGUID();
        _this.rendingMode = RenderMode.POINTS;
        _this.createPointMesh(point);
        _this.material = new Material(name);
        _this.material.diffuseColor = [0, 1, 0];
        return _this;
    }
    PointMesh.prototype.createPointMesh = function (point) {
        var vertices = new Float32Array([
            point[0], point[1], point[2]
        ]);
        var indices = new Uint32Array([
            0
        ]);
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    PointMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        return attrib;
    };
    PointMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    PointMesh.prototype.update = function (point) {
        this.attribs.position.updateData(point.buffer);
    };
    return PointMesh;
}(CoreMesh));var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["NONE"] = 0] = "NONE";
    MouseButton[MouseButton["LEFT"] = 1] = "LEFT";
    MouseButton[MouseButton["MIDDLE"] = 2] = "MIDDLE";
    MouseButton[MouseButton["RIGHT"] = 3] = "RIGHT";
})(MouseButton || (MouseButton = {}));
var KeyState;
(function (KeyState) {
    KeyState[KeyState["UP"] = 0] = "UP";
    KeyState[KeyState["DOWN"] = 1] = "DOWN";
})(KeyState || (KeyState = {}));
/** Class representing a MouseControl. */
var MouseControl = /** @class */ (function (_super) {
    __extends(MouseControl, _super);
    function MouseControl(camControls) {
        var _this = _super.call(this) || this;
        _this.camControls = camControls;
        _this.container = camControls.container;
        _this.enabled = true;
        _this.mouseDown = KeyState.UP;
        _this.mouseButtonPressed = MouseButton.NONE;
        _this.lastMouseX = 0;
        _this.lastMouseY = 0;
        //call back functions 
        //this.container.onmousedown = this.handleContainerMouseDown.bind(this);
        //this.container.onmouseup = this.handleContainerMouseUp.bind(this);
        //this.container.onmousemove = this.handleContainerMouseMove.bind(this);
        //this.container.ondblclick = this.handleContatinerDoubleClick.bind(this);
        //this.container.addEventListener( 'contextmenu', this.contextmenu.bind(this), false );
        //mousewheel Event
        if (_this.container.addEventListener) ;
        _this.rotationPointNode = null;
        return _this;
    }
    // public handleContatinerDoubleClick(event){
    //     event = event || window.event;
    //     this.mouseDown = KeyState.DOWN;
    //     this.mouseButtonPressed = (event.keyCode || event.which);
    //     let mouse = glmatrix.vec2.fromValues(event.clientX,event.clientY);
    //     let contatinerPos = MathUtils.getContainerBox(this.container);
    //     let containerTop = contatinerPos[0];
    //     let containerLeft = contatinerPos[1];
    //     this.lastMouseX = mouse[0] - containerLeft;
    //     this.lastMouseY = mouse[1] - containerTop;
    //     if(this.mouseButtonPressed == 1)
    //      {
    //          let mouseXY = glmatrix.vec2.fromValues(
    //             this.lastMouseX,(contatinerPos[2]-containerTop)-this.lastMouseY
    //         )
    //         AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.DBL_CLICK, message: event })
    //          //let triangle = AppObjects.picker.probePart();
    //          //AppObjects.picker.highlightPart();
    //      }
    //      event.preventDefault();
    //      this.handleContainerMouseUp(event);
    // }
    // public handleContainerMouseDown(event)
    // {
    //     event = event || window.event; //window.event for IE
    //     this.mouseDown = KeyState.DOWN;
    //     this.mouseButtonPressed = (event.keyCode || event.which);
    //     let mouse = glmatrix.vec2.fromValues(event.clientX,event.clientY);
    //     let contatinerPos = MathUtils.getContainerBox(this.container);
    //     let containerTop = contatinerPos[0];
    //     let containerLeft = contatinerPos[1];
    //     this.lastMouseX = mouse[0] - containerLeft;
    //     this.lastMouseY = mouse[1] - containerTop;
    //     let _altKeyPressed = event.altKey;
    //     let _ctrlKeyPressed = event.ctrlKey;
    //      if ((AppObjects.picker.isProbingEnabled == true || _altKeyPressed == true) 
    //           && this.mouseButtonPressed == 1) {
    //         let rotationPoint = undefined;
    //          if(rotationPoint!==undefined && _altKeyPressed == true)
    //          {
    //             this.camControls.setRotationPoint(glmatrix.vec3.fromValues(rotationPoint[0],rotationPoint[1],rotationPoint[2]));
    //             //visualize point
    //             if(!this.rotationPointNode){
    //                 this.rotationPointNode = this.getPointMesh('rotationPoint',rotationPoint);
    //                 AppObjects.renderer.addCustomRenderNode(this.rotationPointNode);
    //             }
    //         }else if(_altKeyPressed == true){
    //             let pointOfRotation = this.camControls.getRotationPoint();
    //             if(!this.rotationPointNode){
    //                 this.rotationPointNode = this.getPointMesh('rotationPoint',pointOfRotation);
    //                 this.rotationPointNode.visible = true;
    //                 AppObjects.renderer.addCustomRenderNode(this.rotationPointNode);
    //             }
    //         }
    //      }
    //     if (_ctrlKeyPressed == true && this.mouseButtonPressed == 1) {
    //         this.mouseButtonPressed = 2;
    //     }
    //     // AppState.AltKeyState = _altKeyPressed;
    //     // AppState.CtrlKeyState = _ctrlKeyPressed;
    //     this.camControls.resetZoomFactor();
    //     event.preventDefault();
    //     AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.MOUSE_DOWN, message: event })
    // }
    // public handleContainerMouseUp(event)
    // {
    //     event = event || window.event; //window.event for IE
    //     event.preventDefault();
    //     if(this.rotationPointNode){
    //         AppObjects.renderer.deleteCustomRenderNode(this.rotationPointNode);
    //         this.rotationPointNode = null;
    //     }
    //     this.mouseDown = KeyState.UP;
    //     this.mouseButtonPressed = MouseButton.NONE;
    //     this.dispatchEvent( { type: 'end', message: null } );
    //     AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.MOUSE_UP, message: event })
    // }
    // public handleContainerMouseMove(event)
    // {
    //     event = event || window.event; //window.event for IE
    //     if( this.mouseDown == KeyState.DOWN )
    //     {
    //         let contatinerPos = MathUtils.getContainerBox(this.container);
    //         let containerTop = contatinerPos[0];
    //         let containerLeft = contatinerPos[1];
    //         let newX = event.clientX - containerLeft;
    //         let newY = event.clientY - containerTop;
    //         //this.camControls.resetZoomSensitivity();
    //         let isPartMoveEnabled = AppObjects.partManipulator.isPartMoveEnabled;
    //         if(this.mouseButtonPressed === MouseButton.LEFT)//Left button
    //         {
    //             if(isPartMoveEnabled){
    //                 AppObjects.partManipulator.rotatePart(newX,newY,this.lastMouseX,this.lastMouseY);
    //             }else
    //             this.camControls.onMouseRotation(newX,newY,this.lastMouseX,this.lastMouseY);
    //         }
    //         else if(this.mouseButtonPressed === MouseButton.MIDDLE) //middle Button
    //         {
    //             let diff = ( this.lastMouseY - newY);
    //             if(isPartMoveEnabled){
    //                 AppObjects.partManipulator.translateZ(diff);
    //             }else{
    //                 this.camControls.setZoomType(ZoomType.MIDDLE_ZOOM);
    //                 if(diff >0)
    //                 this.camControls.zoomOut(diff);
    //                 else if(diff<0)
    //                 this.camControls.zoomIn(Math.abs(diff));
    //             }
    //         }
    //         else if(this.mouseButtonPressed === MouseButton.RIGHT) //right Button
    //         {
    //             if(isPartMoveEnabled){
    //                 AppObjects.partManipulator.translatePart(newX,newY,this.lastMouseX,this.lastMouseY);
    //             }else
    //             this.camControls.onMousePanRotation(newX,newY,this.lastMouseX,this.lastMouseY);
    //         }
    //         this.lastMouseX = newX;
    //         this.lastMouseY = newY;
    //     }
    //     event.preventDefault();
    //     AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.MOUSE_MOVE, message: event })
    // }
    // public scroll(event)
    // {
    //     let factor = 1;
    //     let rect = this.container.getBoundingClientRect();
    //     let newX = Math.round((event.clientX - rect.left) / (rect.right - rect.left) * rect.width);
    //     let newY = rect.height - Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * rect.height);
    //     //newY = newY + CAXViewer.ViewerTopOffset;
    //     let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    //     this.camControls.setZoomType(ZoomType.MOUSE_WHEEL);
    //     if (delta > 0) {
    //         this.camControls.pointZoomIn(newX, rect.height - newY, factor);
    //     }
    //     else {
    //         this.camControls.pointZoomOut(newX, rect.height - newY, factor);
    //     }
    //     event.preventDefault();
    //     AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.MOUSE_SCROLL, message: event })
    // } 
    MouseControl.prototype.contextmenu = function (event) {
        if (this.enabled === false)
            return;
        event.preventDefault();
    };
    MouseControl.prototype.getPointMesh = function (name, rotationPoint) {
        var pointNode = new ShapeNode(name);
        pointNode.mesh = new Mesh(pointNode.name);
        pointNode.mesh.mainMesh = new PointMesh(pointNode.name, rotationPoint);
        pointNode.mesh.mainMesh.material.diffuseColor = [1, 0, 0];
        pointNode.mesh.mainMesh.material.shader = AppObjects.picker.pickShader;
        return pointNode;
    };
    return MouseControl;
}(EventDispatcher));var PickVertexShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec3 aPosition;out vec4 vColor;out highp vec4 vPositionWorldSpace;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;uniform int uPrimitiveSize;vec4 getPickColor(int index){int r=0,g=0,b=0,a=0;int value=index;int val_g=int(value/256);int val_b=int(val_g/256);int val_a=int(val_b/256);r=int(value % 256);g=int(val_g % 256);b=int(val_b % 256);a=int(val_a % 256);return vec4(float(r)/255.0,float(g)/255.0,float(b)/255.0,float(a)/255.0);}void main(void){gl_PointSize=3.0;vec4 vPosWorldSpace=uModelViewMatrix*vec4(aPosition,1.0);gl_Position=uProjectionMatrix*vPosWorldSpace;vPositionWorldSpace=vPosWorldSpace;vColor=getPickColor(gl_VertexID/uPrimitiveSize);}"; // eslint-disable-line
var PickFragmentShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec4 vColor;uniform highp vec3 uColor;out vec4 outColor;uniform highp vec4 uClipPlane0;uniform highp vec4 uClipPlane1;uniform highp vec4 uClipPlane2;uniform highp vec4 uClipPlane3;uniform highp vec4 uClipPlane4;uniform highp vec4 uClipPlane5;uniform highp float uClipPlane0State;uniform highp float uClipPlane1State;uniform highp float uClipPlane2State;uniform highp float uClipPlane3State;uniform highp float uClipPlane4State;uniform highp float uClipPlane5State;uniform highp float uBoundRadius;in highp vec4 vPositionWorldSpace;void updateClipPlane(float planeState,vec4 clipPlane,float OutlinePercent){if(planeState==1.0){if(dot(vPositionWorldSpace,clipPlane)<0.0){discard;}else if(abs(dot(vPositionWorldSpace,clipPlane))<uBoundRadius*OutlinePercent){outColor=vec4(1.0,0.0,0.0,1.0);}}}void updateClipPlanes(float OutlinePercent){updateClipPlane(uClipPlane0State,uClipPlane0,OutlinePercent);updateClipPlane(uClipPlane1State,uClipPlane1,OutlinePercent);updateClipPlane(uClipPlane2State,uClipPlane2,OutlinePercent);updateClipPlane(uClipPlane3State,uClipPlane3,OutlinePercent);updateClipPlane(uClipPlane4State,uClipPlane4,OutlinePercent);updateClipPlane(uClipPlane5State,uClipPlane5,OutlinePercent);}void main(void){vec4 col=vec4(uColor,1.0);if(col.xyz==vec3(0.0))col=vColor;outColor=col;updateClipPlanes(0.008);}"; // eslint-disable-line
var Triangle = /** @class */ (function () {
    function Triangle(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    Triangle.prototype.data = function () {
        return new Float32Array(__spread(this.v1.values(), this.v2.values(), this.v3.values()));
    };
    Triangle.prototype.transformCopy = function (data) {
        var a = create$2();
        var b = create$2();
        var c = create$2();
        transformMat4(a, this.v1, data);
        transformMat4(b, this.v2, data);
        transformMat4(c, this.v3, data);
        return new Triangle(a, b, c);
    };
    return Triangle;
}());
var Line = /** @class */ (function () {
    function Line(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }
    Line.prototype.data = function () {
        return new Float32Array(__spread(this.v1.values(), this.v2.values()));
    };
    Line.prototype.transformCopy = function (data) {
        var a = create$2();
        var b = create$2();
        transformMat4(a, this.v1, data);
        transformMat4(b, this.v2, data);
        return new Line(a, b);
    };
    return Line;
}());
var Point = /** @class */ (function () {
    function Point(v1) {
        this.v1 = v1;
    }
    Point.prototype.data = function () {
        return new Float32Array(__spread(this.v1.values()));
    };
    Point.prototype.transformCopy = function (data) {
        var a = create$2();
        transformMat4(a, this.v1, data);
        return new Point(a);
    };
    return Point;
}());var PointNode = /** @class */ (function (_super) {
    __extends(PointNode, _super);
    function PointNode(name, point, color) {
        if (color === void 0) { color = [0, 0, 0, 1]; }
        var _this = _super.call(this, name) || this;
        _this.mesh = new Mesh(name);
        _this.mesh.mainMesh = new PointMesh(name, point);
        _this.mesh.mainMesh.material = new Material(name + '_material');
        _this.mesh.mainMesh.material.diffuseColor = [color[0], color[1], color[2]];
        _this.mesh.mainMesh.material.transparency = 1 - color[3];
        _this.mesh.mainMesh.material.shader = AppObjects.renderer.mainShader;
        _this.visible = true;
        return _this;
    }
    return PointNode;
}(ShapeNode));var Picker = /** @class */ (function () {
    function Picker() {
        this.getElementIndexFromColor = function (pickedColor) {
            var index = -1;
            if (pickedColor && pickedColor.length >= 4) {
                var r = pickedColor[0];
                var g = pickedColor[1];
                var b = pickedColor[2];
                var a = pickedColor[3];
                var val_g = 256;
                var val_b = 65536; // 256 * 256
                var val_a = 16777216; //256 * 256
                val_a = 0;
                index = r + (g * val_g) + (b * val_b) + (a * val_a);
            }
            return index;
        };
        this.sceneManager = AppObjects.sceneManager;
        this.isProbingEnabled = false;
        this.prevSelectedId = -1;
        this.probeMesh = null;
        this.renderer = AppObjects.renderer;
        this.pickShader = new Shader(PickVertexShader, PickFragmentShader);
    }
    Picker.prototype.getIntersectPart = function (ray) {
        var scenes = this.sceneManager.getScenes();
        for (var i = 0; i < scenes.length; i++) {
            var scene = scenes[i];
            var nodes = scene.sceneGraph.getRenderableNode();
            for (var j = 0; j < nodes.length; j++) {
                this.checkBboxIntersect(nodes[j], ray);
            }
        }
    };
    Picker.prototype.pickPart = function (nodes, mouseData) {
        var mouse = [mouseData.xyFromTop[0], mouseData.height - mouseData.xyFromTop[1]];
        this.renderer.stopRenderLoop();
        WebGLState.clear();
        this.renderer.clearColor();
        var bbox = this.sceneManager.getBoundingBox();
        if (this.renderer.camControl) {
            this.renderer.camControl.setBoundingBox(bbox);
            this.renderer.camControl.update();
        }
        this.pickShader.bind();
        this.pickShader.updateClipPlaneUniforms();
        for (var j = 0; j < nodes.length; j++) {
            var currNode = nodes[j];
            var submeshName = "primitive_" + 0;
            var mesh = currNode.mesh.subMeshes[submeshName];
            var pickColor = this.getColorFromIndex(j + 1);
            if (nodes[j].visible == true)
                this.renderer.renderBufferDirect(mesh, nodes[j].worldMatrix, this.pickShader, pickColor);
        }
        var pixelBuffer = this.renderer.readPixels(mouse[0], mouse[1]);
        var id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
        var selectedPartId = id - 1;
        this.pickShader.unbind();
        this.renderer.startRenderLoop();
        return selectedPartId;
    };
    Picker.prototype.getProbeMeshData = function () {
        var submeshName = "primitive_" + 0;
        var vertexSize = 3; // vertex count x,y,z
        var primitiveSize = 3; // triangle vertices 
        if (this.selectNode.mesh.subMeshes[submeshName].rendingMode === RenderMode.LINES) {
            primitiveSize = 2;
        }
        else if (this.selectNode.mesh.subMeshes[submeshName].rendingMode === RenderMode.POINTS) {
            primitiveSize = 1;
        }
        var positionArray = this.selectNode.mesh.subMeshes[submeshName].attribs.position.getDataArray;
        var indices = this.selectNode.mesh.subMeshes[submeshName].indices.getDataArray;
        if (this.probeMesh === null || this.prevSelectedId !== this.selectNode.index) {
            if (this.probeMesh) {
                this.probeMesh.delete();
                this.probeMesh.clearData();
            }
            var probeMesh = new CoreMesh('probeMesh');
            var attribs = new WebGLArrayBufferAttribute();
            var newPosition = new Float32Array(indices.length * vertexSize);
            var counter = 0;
            for (var j = 0; j < indices.length; j++) {
                var index = indices[j];
                for (var i = 0; i < vertexSize; i++) {
                    newPosition[counter] = positionArray[index * vertexSize + i];
                    counter += 1;
                }
            }
            //let end = performance.now();
            //let bufferCreationTime = end - start;
            //start = performance.now();
            attribs.position = new WebGLArrayBuffer('probePos', BufferUsage.STATIC_DRAW, newPosition);
            //end = performance.now();
            //let bufferCopyTime = end - start;
            probeMesh.attribs = attribs;
            probeMesh.rendingMode = this.selectNode.mesh.subMeshes[submeshName].rendingMode;
            this.probeMesh = probeMesh;
            this.prevSelectedId = this.selectNode.index;
        }
        return { probeMesh: this.probeMesh, primitiveSize: primitiveSize };
    };
    Picker.prototype.getHitPrimitiveData = function (mouseData, probeMesh, primitiveId, primitiveSize) {
        var primitivePos = null;
        //console.log(probeMesh.attribs.position.getDataArray);
        var indicesId = primitiveId * primitiveSize;
        //get ray from camera
        var cam = AppObjects.mouseControl.camControls;
        var nearPoint = cam.unproject(__spread(mouseData.xyFromTop, [0]), create$1(), [cam.canvas.width, cam.canvas.height], this.renderer.camControl.getCameraMatrix2(this.renderer.camControl.camType));
        var farPoint = cam.unproject(__spread(mouseData.xyFromTop, [1]), create$1(), [cam.canvas.width, cam.canvas.height], this.renderer.camControl.getCameraMatrix2(this.renderer.camControl.camType));
        var transPrimitive = null;
        var vertexSize = 3;
        var newPosition = probeMesh.attribs.position.getDataArray;
        var out = {};
        if (primitiveSize == 3) {
            primitivePos = new Triangle(fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize], newPosition[primitiveId * vertexSize * primitiveSize + 1], newPosition[primitiveId * vertexSize * primitiveSize + 2]), fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize + 3], newPosition[primitiveId * vertexSize * primitiveSize + 4], newPosition[primitiveId * vertexSize * primitiveSize + 5]), fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize + 6], newPosition[primitiveId * vertexSize * primitiveSize + 7], newPosition[primitiveId * vertexSize * primitiveSize + 8]));
            transPrimitive = primitivePos.transformCopy(this.selectNode.worldMatrix);
            out = this.intersectTriangle(nearPoint, farPoint, transPrimitive);
        }
        else if (primitiveSize == 2) {
            primitivePos = new Line(fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize], newPosition[primitiveId * vertexSize * primitiveSize + 1], newPosition[primitiveId * vertexSize * primitiveSize + 2]), fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize + 3], newPosition[primitiveId * vertexSize * primitiveSize + 4], newPosition[primitiveId * vertexSize * primitiveSize + 5]));
            transPrimitive = primitivePos.transformCopy(this.selectNode.worldMatrix);
            out = this.intersectLine(nearPoint, farPoint, transPrimitive);
        }
        else if (primitiveSize == 1) {
            primitivePos = new Point(fromValues$1(newPosition[primitiveId * vertexSize * primitiveSize], newPosition[primitiveId * vertexSize * primitiveSize + 1], newPosition[primitiveId * vertexSize * primitiveSize + 2]));
            transPrimitive = primitivePos.transformCopy(this.selectNode.worldMatrix);
            out = {
                hitPoint: transPrimitive.v1,
                nearPoint: transPrimitive.v1,
                nearPointIndex: 0
            };
        }
        var pickedVertexIndex = this.getPickedVertexIndex(indicesId + out.nearPointIndex);
        //console.log("pickedVertexIdnex : ", pickedVertexIndex);
        var invertedWorldMatrix = create$1();
        invert(invertedWorldMatrix, this.selectNode.worldMatrix);
        var withoutTranformationHitPoint = create$2();
        transformMat4(withoutTranformationHitPoint, out.hitPoint, invertedWorldMatrix);
        var withoutTranformationNearPoint = create$2();
        transformMat4(withoutTranformationNearPoint, out.nearPoint, invertedWorldMatrix);
        return {
            transformedHitPoint: out.hitPoint,
            hitPoint: withoutTranformationHitPoint,
            nearPoint: withoutTranformationNearPoint,
            nearPointIndex: out.nearPointIndex,
            pickedVertexIndex: pickedVertexIndex,
            indicesId: indicesId,
            primitivePos: primitivePos,
            transPrimitive: transPrimitive
        };
    };
    Picker.prototype.performProbing = function (mouseData) {
        var mouse = [mouseData.xyFromTop[0], mouseData.height - mouseData.xyFromTop[1]];
        var _a = this.getProbeMeshData(), probeMesh = _a.probeMesh, primitiveSize = _a.primitiveSize;
        this.renderer.stopRenderLoop();
        WebGLState.clear();
        if (this.renderer.camControl)
            this.renderer.camControl.update();
        this.pickShader.bind();
        this.renderer.renderTarget.bind();
        this.renderer.clearColor();
        AppState.GLContext.enable(AppState.GLContext.DEPTH_TEST);
        AppState.GLContext.depthFunc(AppState.GLContext.LEQUAL);
        this.pickShader.setInt(uniforms.uPrimitiveSize, primitiveSize);
        this.renderer.renderBufferDirect(probeMesh, this.selectNode.worldMatrix, this.pickShader);
        var pixelBuffer = this.renderer.readPixels(mouse[0], mouse[1]);
        this.renderer.renderTarget.unbind();
        var out = {};
        var primitiveId = this.getElementIndexFromColor(pixelBuffer);
        //console.log("id",primitiveId);
        if (primitiveId < 0) {
            probeMesh.delete();
            probeMesh.clearData();
            probeMesh = null;
            this.renderer.startRenderLoop();
            return out;
        }
        var hitData = this.getHitPrimitiveData(mouseData, probeMesh, primitiveId, primitiveSize);
        //draw primitive for visualization
        var probeDisplay = new PointNode("probe_display", hitData.transformedHitPoint, [1, 0, 0, 1]);
        probeDisplay.mesh.mainMesh.material.shader = this.pickShader;
        probeDisplay.visible = true;
        this.triangleID = probeDisplay.getUid();
        this.renderer.addCustomRenderNode(probeDisplay);
        // //draw ray for testing
        // this.line= new LineMesh('ray',nearPoint,farPoint);
        this.renderer.startRenderLoop();
        var probeData = {
            debugInfo: "Buffer ms",
            hitPoint: hitData ? hitData.hitPoint : null,
            nearPoint: hitData ? hitData.nearPoint : null,
            nearPointIndex: hitData ? hitData.nearPointIndex : null,
            pickedVertexIndex: hitData ? hitData.pickedVertexIndex : null,
            connectivityIndex: hitData.indicesId,
            primitiveSize: primitiveSize,
            renderNodeId: this.selectNode ? this.selectNode.index : -1,
            primitiveData: hitData.transPrimitive.data()
        };
        return probeData;
    };
    Picker.prototype.probePart = function (nodes, mouseData) {
        var selectedPartId = this.pickPart(nodes, mouseData);
        this.selectNode = nodes[selectedPartId];
        if (this.triangleID) {
            this.renderer.deleteCustomRenderNode(this.triangleID);
            this.triangleID = null;
            this.line = null;
        }
        if (this.selectNode == undefined || null)
            return;
        this.renderer.stopRenderLoop();
        var probeData = this.performProbing(mouseData);
        AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.PROBE_FINISH, data: probeData });
        return probeData;
    };
    Picker.prototype.checkBboxIntersect = function (node, ray) {
        if (node.type == AppConstants.NodeType.SHAPE) {
            var bbox = node.mesh.subMeshes["BBox"];
            if (bbox.intersect(ray)) {
                alert("Hit " + bbox.name);
            }
        }
    };
    Picker.prototype.getColorFromIndex = function (colorIndex) {
        var maxColors = 256 * 256 * 256;
        if (colorIndex >= maxColors)
            colorIndex = 1;
        var color = [Math.floor((colorIndex / 256 / 256) % 256) / 255, (Math.floor((colorIndex / 256)) % 256) / 255, Math.floor(colorIndex % 256) / 255];
        return color;
    };
    Picker.prototype.intersectTriangle = function (point3d1, point3d2, triangle) {
        var EPSILON = 0.000001;
        var noIntersection = false;
        //var HitPos = null;
        var pt = point3d1;
        var dir = create$2();
        sub(dir, point3d2, point3d1);
        normalize(dir, dir);
        var edge1 = create$2();
        sub(edge1, triangle.v2, triangle.v1);
        var edge2 = create$2();
        sub(edge2, triangle.v3, triangle.v1);
        var pvec = create$2();
        cross(pvec, dir, edge2);
        var det = dot(pvec, edge1);
        if (det < EPSILON)
            noIntersection = true;
        var tvec = create$2();
        sub(tvec, pt, triangle.v1);
        var u = dot(tvec, pvec);
        if (u < 0 || u > det)
            noIntersection = true;
        var qvec = create$2();
        cross(qvec, tvec, edge1);
        var v = dot(dir, qvec);
        if (v < 0 || u + v > det)
            noIntersection = true;
        var out = [];
        var t = dot(edge2, qvec) / det;
        out[0] = pt[0] + t * dir[0];
        out[1] = pt[1] + t * dir[1];
        out[2] = pt[2] + t * dir[2];
        out[3] = 1;
        if (noIntersection) {
            var intersection = fromValues$1(out[0], out[1], out[2]);
            var nearPointWorld = this.projectToEdge(triangle.v1, triangle.v2, triangle.v3, intersection);
            sqrDist(intersection, nearPointWorld);
            out = [nearPointWorld[0], nearPointWorld[1], nearPointWorld[2]];
            out = [intersection[0], intersection[1], intersection[2]];
        }
        var nearPt = this.findNearPoint(triangle.v1, triangle.v2, triangle.v3, fromValues$1(out[0], out[1], out[2]));
        var nearPointIndex = 0;
        if (this.isSameValue(triangle.v2, nearPt))
            nearPointIndex = 1;
        else if (this.isSameValue(triangle.v3, nearPt))
            nearPointIndex = 2;
        var obj = {
            hitPoint: out,
            nearPoint: nearPt,
            nearPointIndex: nearPointIndex
        };
        return obj;
    };
    Picker.prototype.intersectLine = function (point3d1, point3d2, line) {
        var p1 = line.v1;
        var p2 = point3d1;
        var d1 = create$2();
        var d2 = create$2();
        sub(d1, line.v2, line.v1);
        sub(d2, point3d2, point3d1);
        var d1xd2 = create$2();
        cross(d1xd2, d1, d2);
        var p2p1 = create$2();
        sub(p2p1, p2, p1);
        var d1xd2sq = sqrLen(d1xd2);
        if (d1xd2sq == 0)
            return {};
        var p2p1xd2 = create$2();
        var p2p1xd1 = create$2();
        cross(p2p1xd2, p2p1, d2);
        cross(p2p1xd1, p2p1, d1);
        var t1 = dot(p2p1xd2, d1xd2) / d1xd2sq;
        var t2 = dot(p2p1xd1, d1xd2) / d1xd2sq;
        var lineIntersect = create$2();
        var rayIntersect = create$2();
        scaleAndAdd(lineIntersect, p1, d1, t1);
        scaleAndAdd(rayIntersect, p2, d2, t2);
        sqrDist(lineIntersect, rayIntersect);
        var hitPoint = lineIntersect;
        var nearPoint = create$2();
        var v1dist = sqrDist(line.v1, hitPoint);
        var v2dist = sqrDist(line.v2, hitPoint);
        nearPoint = (v1dist < v2dist) ? line.v1 : line.v2;
        var nearPointIndex = (v1dist < v2dist) ? 0 : 1;
        var obj = {
            hitPoint: [hitPoint[0], hitPoint[1], hitPoint[2]],
            nearPoint: [nearPoint[0], nearPoint[1], nearPoint[2]],
            nearPointIndex: nearPointIndex
        };
        return obj;
    };
    Picker.prototype.findNearPoint = function (pA, pB, pC, pt) {
        var disToE1 = sqrDist(pt, pA);
        var disToE2 = sqrDist(pt, pB);
        var disToE3 = sqrDist(pt, pC);
        if (disToE1 < disToE2 && disToE1 < disToE3) {
            return clone$1(pA);
        }
        else if (disToE2 < disToE3) {
            return clone$1(pB);
        }
        else {
            return clone$1(pC);
        }
    };
    Picker.prototype.projectToEdge = function (pA, pB, pC, pt) {
        var E1 = create$2();
        var edge1 = { a: pA, b: pC };
        sub(E1, pC, pA);
        var E2 = create$2();
        var edge2 = { a: pA, b: pB };
        sub(E2, pB, pA);
        var E3 = create$2();
        var edge3 = { a: pB, b: pC };
        sub(E3, pC, pB);
        var nearPt = create$2();
        var nearPointWorldE1 = create$2();
        var nearPointWorldE2 = create$2();
        var nearPointWorldE3 = create$2();
        sub(nearPt, pt, edge1.a);
        MathUtils.projectOnVector(nearPt, E1);
        add(nearPointWorldE1, edge1.a, nearPt);
        sub(nearPt, pt, edge2.a);
        MathUtils.projectOnVector(nearPt, E2);
        add(nearPointWorldE2, edge2.a, nearPt);
        sub(nearPt, pt, edge3.a);
        MathUtils.projectOnVector(nearPt, E3);
        add(nearPointWorldE3, edge3.a, nearPt);
        var disToE1 = sqrDist(pt, nearPointWorldE1);
        var disToE2 = sqrDist(pt, nearPointWorldE2);
        var disToE3 = sqrDist(pt, nearPointWorldE3);
        if (disToE1 < disToE2 && disToE1 < disToE3) {
            return nearPointWorldE1;
        }
        else if (disToE2 < disToE3) {
            return nearPointWorldE2;
        }
        else {
            return nearPointWorldE3;
        }
    };
    Picker.prototype.isSameValue = function (a, b) {
        if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2])
            return true;
        else
            return false;
    };
    Picker.prototype.getPickedVertexIndex = function (connectivityIndex) {
        if (connectivityIndex >= 0) {
            var submeshName = "primitive_" + 0;
            var positionArray = this.selectNode.mesh.subMeshes[submeshName].attribs.position.getDataArray;
            var indices = this.selectNode.mesh.subMeshes[submeshName].indices.getDataArray;
            if (connectivityIndex < indices.length) {
                var vertexIndex = indices[connectivityIndex];
                if (vertexIndex < positionArray.length)
                    return vertexIndex;
            }
        }
        return -1;
    };
    return Picker;
}());var PlaneVShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;uniform vec3 uColor;out highp vec4 vPositionWorldSpace;void main(void){vec4 positionWorldSpace=uModelViewMatrix*vec4(aPosition,1.0);vPositionWorldSpace=positionWorldSpace;gl_Position=uProjectionMatrix*positionWorldSpace;}"; // eslint-disable-line
var PlaneFShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform highp mat4 uProjectionMatrix;uniform highp mat4 uModelViewMatrix;uniform highp vec3 uLightDirection;uniform highp vec3 uCameraPosition;uniform float uTransparencyFactor;uniform bool uUseTransparency;uniform vec3 uColor;in highp vec4 vPositionWorldSpace;out highp vec4 outColor;void main(void){highp float diffuseFactor=1.0;highp vec3 diffuseColor=uColor.xyz;if(uUseTransparency&&uTransparencyFactor>0.){outColor=vec4((diffuseColor),uTransparencyFactor);}else{outColor=vec4((diffuseColor*diffuseFactor),1.0);}}"; // eslint-disable-line
var LabelVertex = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec3 aPosition;in vec3 aColor;out vec3 vColor;uniform mat4 uProjectionMatrix;uniform mat4 uModelViewMatrix;void main(void){gl_PointSize=5.0;vec4 vPosWorldSpace=uModelViewMatrix*vec4(aPosition,1.0);gl_Position=uProjectionMatrix*vPosWorldSpace;vColor=aColor;}"; // eslint-disable-line
var LabelFrag = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec3 vColor;uniform highp vec3 uColor;out vec4 outColor;void main(void){vec3 col=uColor;if(col==vec3(0.0))col=vColor;outColor=vec4(col,1);}"; // eslint-disable-line
var Plane = /** @class */ (function () {
    function Plane(normal, constant) {
        if (normal === void 0) { normal = fromValues$1(1, 0, 0); }
        if (constant === void 0) { constant = 0; }
        this.normal = normal;
        this.constant = constant;
    }
    Plane.prototype.applyMatrix4 = function (mat) {
        var quat = create$4();
        getRotation(quat, mat);
        transformQuat(this.normal, fromValues$1(0, 0, 1), quat);
        var position = MathUtils.getPositionVector(mat);
        this.constant = dot(this.normal, position);
    };
    Plane.prototype.getClipEquation = function () {
        return fromValues$2(this.normal[0], this.normal[1], this.normal[2], -this.constant);
    };
    Plane.prototype.setFromNormalAndCoplanarPoint = function (normal, point) {
        copy(this.normal, normal);
        this.constant = dot(point, this.normal);
    };
    Plane.prototype.distanceToPoint = function (point) {
        return dot(this.normal, point) - this.constant;
    };
    Plane.prototype.projectPoint = function (point) {
        var out = create$2();
        copy(out, this.normal);
        scale$1(out, out, -this.distanceToPoint(point));
        return add(out, out, point);
    };
    Plane.from3points = function (rkPoint0, rkPoint1, rkPoint2) {
        var kEdge1 = create$2();
        var kEdge2 = create$2();
        sub(kEdge1, rkPoint1, rkPoint0);
        sub(kEdge2, rkPoint2, rkPoint0);
        var n = create$2();
        cross(n, kEdge2, kEdge1);
        normalize(n, n);
        var d = -dot(n, rkPoint0);
        return new Plane(n, d);
    };
    return Plane;
}());var AxisMesh = /** @class */ (function (_super) {
    __extends(AxisMesh, _super);
    function AxisMesh(name, origin, x, y, z, scale) {
        if (scale === void 0) { scale = 1; }
        var _this = _super.call(this, name) || this;
        _this.rendingMode = RenderMode.LINES;
        _this.createMesh(scale, origin, x, y, z);
        return _this;
    }
    AxisMesh.prototype.createMesh = function (scale, origin, x, y, z) {
        //Set offset
        var vertices = new Float32Array([
            origin[0], origin[1], origin[2],
            x[0] * scale, x[1], x[2],
            origin[0], origin[1], origin[2],
            y[0], y[1] * scale, y[2],
            origin[0], origin[1], origin[2],
            z[0], z[1], z[2] * scale,
        ]);
        var color = new Float32Array([
            1, 0, 0,
            1, 0, 0,
            0, 1, 0,
            0, 1, 0,
            0, 0, 1,
            0, 0, 1
        ]);
        var indices = new Uint32Array([
            0, 1,
            2, 3,
            4, 5
        ]);
        this.setattribs(this.generateAttribute(vertices, color));
        this.setIndex(this.generateIndices(indices));
    };
    AxisMesh.prototype.generateAttribute = function (vertices, color) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer("AxisBuffer", BufferUsage.STATIC_DRAW, vertices);
        attrib.color = new WebGLArrayBuffer("AxisColorBuffer", BufferUsage.STATIC_DRAW, color);
        return attrib;
    };
    AxisMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer("lineIndexBuffer", BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    return AxisMesh;
}(CoreMesh));var Axes2DHelper = /** @class */ (function (_super) {
    __extends(Axes2DHelper, _super);
    function Axes2DHelper(name, origin, scale) {
        var _this = _super.call(this, name) || this;
        _this.mesh = new Mesh("axisMesh");
        _this.mesh.mainMesh = new AxisMesh("axis", origin, fromValues$1(scale, 0, 0), fromValues$1(0, scale, 0), fromValues$1(0, 0, scale));
        _this.visible = false;
        return _this;
    }
    return Axes2DHelper;
}(ShapeNode));var PlaneMesh = /** @class */ (function (_super) {
    __extends(PlaneMesh, _super);
    function PlaneMesh(name, width, height, color) {
        if (width === void 0) { width = 10; }
        if (height === void 0) { height = 10; }
        if (color === void 0) { color = [1, 0, 0, 1]; }
        var _this = _super.call(this, name) || this;
        _this.width = width;
        _this.height = height;
        _this.uid = Utility.getGUID();
        _this.rendingMode = RenderMode.TRIANGLES;
        _this.material = new Material(name);
        _this.material.diffuseColor = [color[0], color[1], color[2]];
        _this.material.transparency = 1 - color[3];
        _this.createPlaneMesh();
        return _this;
    }
    PlaneMesh.prototype.createPlaneMesh = function () {
        //Set offset
        var vertices = new Float32Array([
            -this.width / 2, -this.height / 2, 0,
            -this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, 0,
            this.width / 2, -this.height / 2, 0,
        ]);
        var indices = new Uint32Array([
            0, 2, 1,
            0, 3, 2
        ]);
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    PlaneMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        return attrib;
    };
    PlaneMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    PlaneMesh.prototype.updateAttribute = function (vertices) {
        this.attribs.position.updateData(vertices);
    };
    PlaneMesh.prototype.updateIndices = function (indices) {
        this.indices.updateData(indices);
    };
    return PlaneMesh;
}(CoreMesh));var RectangleMesh = /** @class */ (function (_super) {
    __extends(RectangleMesh, _super);
    function RectangleMesh(name, width, height, color, precentOffset) {
        if (color === void 0) { color = [0, 0, 0, 1]; }
        if (precentOffset === void 0) { precentOffset = 0; }
        var _this = _super.call(this, name) || this;
        _this.width = width;
        _this.height = height;
        _this.uid = Utility.getGUID();
        _this.rendingMode = RenderMode.LINES;
        _this.createRectangleMesh(precentOffset);
        _this.material = new Material(name);
        _this.material.diffuseColor = color;
        _this.material.transparency = 1 - color[3];
        return _this;
    }
    RectangleMesh.prototype.createRectangleMesh = function (precentOffset) {
        //Set offset
        var vertices = new Float32Array([
            -this.width / 2 - precentOffset, -this.height / 2 - precentOffset, 0,
            -this.width / 2 - precentOffset, this.height / 2 + precentOffset, 0,
            this.width / 2 + precentOffset, this.height / 2 + precentOffset, 0,
            this.width / 2 + precentOffset, -this.height / 2 - precentOffset, 0,
        ]);
        var indices = new Uint32Array([
            0, 1,
            1, 2,
            2, 3,
            3, 0
        ]);
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    RectangleMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        return attrib;
    };
    RectangleMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    return RectangleMesh;
}(CoreMesh));var SectionManager = /** @class */ (function () {
    //Constructor
    function SectionManager(cameraControl) {
        this.initialized = false;
        this.counter = 0;
        this.maxPlanes = 6;
        this.planeHalfWidthRatio = 1.2;
        this.activePlaneId = -1;
        this.selectedPlaneColor = [1, 1, 0, 1];
        this.camControl = cameraControl;
        this.bbox = null;
        this.shader = new Shader(PlaneVShader, PlaneFShader);
        this.gizmoShader = new Shader(LabelVertex, LabelFrag);
        this.planeStates = new Map();
        this.sensitivity = 100;
        this.axis3DHelper = null;
        this.refAxis2DHelper = null;
        AppObjects.externalEventDispatcher.addEventListener('MODEL_LOADED', this.onSceneLoad.bind(this));
    }
    SectionManager.prototype.onSceneLoad = function () {
        this.bbox = AppObjects.sceneManager.getBoundingBox(false);
        this.initialized = true;
    };
    Object.defineProperty(SectionManager.prototype, "MaxPlanes", {
        get: function () {
            return this.maxPlanes;
        },
        enumerable: false,
        configurable: true
    });
    SectionManager.prototype.createPlane = function (name, transform, color) {
        var plane = new ShapeNode(name);
        plane.subType = AppConstants.NodeSubType.SECTION_PLANE;
        var radius = this.bbox.getRadius() * this.planeHalfWidthRatio;
        plane.mesh = new Mesh(name);
        plane.mesh.mainMesh = new PlaneMesh(name, radius * 2, radius * 2, color);
        plane.mesh.subMeshes['bbox'] = new RectangleMesh(name + "border", radius * 2, radius * 2, [0, 0, 0, 1]);
        plane.mesh.mainMesh.material.transparency = color[3];
        plane.worldMatrix = clone(transform);
        return plane;
    };
    SectionManager.prototype.createPrimaryPlaneFromEqn = function (id, transform, color) {
        var plane = this.createPlane(id.toString(), transform, color);
        return plane;
    };
    SectionManager.prototype.setPlaneEqn = function (id, eqn) {
        if (eqn === void 0) { eqn = [1, 0, 0, 0]; }
        var planeEqn = new Plane();
        planeEqn.normal = fromValues$1(eqn[0], eqn[1], eqn[2]);
        normalize(planeEqn.normal, planeEqn.normal);
        planeEqn.constant = -eqn[3];
        var planeState = this.planeStates.get(id);
        if (planeState) {
            planeState.eqn = planeEqn;
            this.planeStates.set(id, planeState);
        }
    };
    SectionManager.prototype.drawElements = function (node, mesh) {
        if (node.visible != true)
            return;
        if (mesh.attribs.position) {
            mesh.attribs.position.bind();
            this.shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        mesh.indices.bind();
        this.shader.setMat4f(uniforms.uProjectionMatrix, this.camControl.getGLMatrix());
        this.shader.setMat4f(uniforms.uModelViewMatrix, node.worldMatrix);
        if (mesh.material) {
            var color = mesh.material.diffuseColor;
            this.shader.setVector3f(uniforms.uColor, fromValues$1(color[0], color[1], color[2]));
        }
        if (mesh.material.transparency > 0) {
            this.shader.setBool(uniforms.uUseTransparency, true);
            this.shader.setFloat(uniforms.uTransparencyFactor, mesh.material.transparency);
            AppState.GLContext.depthMask(false);
            AppState.GLContext.enable(AppState.GLContext.BLEND);
            AppState.GLContext.blendFunc(AppState.GLContext.SRC_ALPHA, AppState.GLContext.ONE_MINUS_SRC_ALPHA);
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), AppState.GLContext.UNSIGNED_INT, 0);
            AppState.GLContext.disable(AppState.GLContext.BLEND);
            AppState.GLContext.depthMask(true);
        }
        else {
            var lightDir = MathUtils.getDirVector(this.camControl.getInverseCameraMatrix(this.camControl.camType));
            this.shader.setVector3f(uniforms.uLightDirection, lightDir);
            this.shader.setVector3f(uniforms.uCameraPosition, this.camControl.getPosition());
            this.shader.setBool(uniforms.uUseTransparency, false);
            this.shader.setFloat(uniforms.uTransparencyFactor, mesh.material.transparency);
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), AppState.GLContext.UNSIGNED_INT, 0);
        }
    };
    SectionManager.prototype.renderGizmos = function () {
        AppState.GLContext.clear(AppState.GLContext.DEPTH_BUFFER_BIT);
        this.renderAxisHelper();
    };
    SectionManager.prototype.renderRefAxis = function () {
    };
    SectionManager.prototype.renderAxisHelper = function () {
        var _this = this;
        if (this.refAxis2DHelper === null && AppState.GLContext) {
            this.refAxis2DHelper = new Axes2DHelper("axis2d", create$2(), 1);
        }
        if (this.refAxis2DHelper) {
            this.planeStates.forEach(function (planeState, key) {
                var planeGroup = planeState.plane;
                if (planeGroup.visible && key === _this.activePlaneId) {
                    var plane = planeGroup.children[0];
                    plane.visible = planeGroup.visible;
                    AppObjects.renderer.renderAxisHelper([plane]);
                    //render reference axis
                    // let initTransform = planeState.initialTransform;
                    // const refObjPos = glmatrix.vec3.create();
                    // glmatrix.mat4.getTranslation(refObjPos,initTransform);
                    // const refScaleToFit = glmatrix.vec3.dist(camPos,refObjPos) * Math.tan(this.camControl.perspParams.fov/2) *0.5; // some constant to fit to proper size
                    // const refScale = glmatrix.mat4.create();
                    // const refModel = glmatrix.mat4.create();
                    // glmatrix.mat4.fromScaling(refScale,glmatrix.vec3.fromValues(refScaleToFit,refScaleToFit,refScaleToFit))
                    // glmatrix.mat4.mul(refModel,initTransform,refScale);
                    // glmatrix.mat4.mul(refModel,refModel,this.refAxis2DHelper.worldMatrix);
                    // const nodeMatrix = glmatrix.mat4.create();
                    // glmatrix.mat4.mul(nodeMatrix,refModel,this.refAxis2DHelper.worldMatrix);
                    // this.renderBufferAsGizmo(this.refAxis2DHelper.mesh.mainMesh,nodeMatrix,shader,[0,0,0]);
                }
            });
        }
    };
    SectionManager.prototype.renderBufferAsGizmo = function (mesh, worldMatrix, shader, color) {
        if (mesh.isDataAvailable() === false) {
            return;
        }
        shader.bind();
        shader.setMat4f(uniforms.uProjectionMatrix, this.camControl.perspCamera.projectionViewMatrix);
        shader.setMat4f(uniforms.uModelViewMatrix, worldMatrix);
        if (color)
            shader.setVector3f(uniforms.uColor, new Float32Array(color));
        if (mesh.attribs.position) {
            shader.enablePosition();
            shader.setPosition(mesh.attribs.position);
        }
        else
            return false;
        if (mesh.attribs.color) {
            shader.enableColor();
            shader.setColor(mesh.attribs.color);
        }
        else
            shader.disableColor();
        var vertexSize = 3;
        if (mesh.indices) {
            var GLDrawType = mesh.indices.getType();
            mesh.indices.bind();
            AppState.GLContext.drawElements(mesh.rendingMode, mesh.indices.getDataArrayCount(), GLDrawType, 0);
        }
        else {
            AppState.GLContext.drawArrays(mesh.rendingMode, 0, mesh.attribs.position.getDataArrayCount() / vertexSize);
        }
    };
    SectionManager.prototype.updateVisualPlane = function (id, transform) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            var plane = planeState.plane.children[0];
            var color = __spread(plane.mesh.mainMesh.material.diffuseColor, [plane.mesh.mainMesh.material.transparency]);
            plane.delete();
            planeState.plane.children[0] = this.createPrimaryPlaneFromEqn(id, transform, color);
        }
    };
    //API
    SectionManager.prototype.render = function () {
        var _this = this;
        this.shader.bind();
        this.planeStates.forEach(function (planeState, key) {
            var planeGroup = planeState.plane;
            if (planeGroup.visible) {
                var plane = planeGroup.children[0];
                plane.visible = planeGroup.visible;
                if (key === _this.activePlaneId) {
                    plane.mesh.subMeshes['bbox'].material.diffuseColor = [_this.selectedPlaneColor[0], _this.selectedPlaneColor[1], _this.selectedPlaneColor[2]];
                }
                else {
                    plane.mesh.subMeshes['bbox'].material.diffuseColor = [0, 0, 0];
                }
                planeGroup.children.forEach(function (node) {
                    if (node.type == AppConstants.NodeType.SHAPE) {
                        var plane_1 = node;
                        _this.drawElements(plane_1, plane_1.mesh.mainMesh);
                        for (var key_1 in plane_1.mesh.subMeshes) {
                            _this.drawElements(plane_1, plane_1.mesh.subMeshes[key_1]);
                        }
                    }
                });
            }
        });
        this.renderGizmos();
    };
    SectionManager.prototype.addPlane = function (id, transform, color) {
        if (this.maxPlanes === this.planeStates.size) {
            ////console.warn(`Max plane count reached, operation ignored`);
            return;
        }
        if (this.planeStates.has(id) === false) {
            var planeEqn = new Plane();
            var e = Utility.getPlaneEqnFromTransfromMat(transform);
            planeEqn.normal = fromValues$1(e[0], e[1], e[2]);
            normalize(planeEqn.normal, planeEqn.normal);
            planeEqn.constant = -e[3];
            var plane = this.createPrimaryPlaneFromEqn(id, transform, __spread(color));
            var planeGroup = new TransFormNode(id + 'group');
            planeGroup.addChild(plane);
            var newPlaneState = {
                id: id,
                internalId: this.counter++,
                isPlaneEnabled: false,
                eqn: planeEqn,
                plane: planeGroup,
                initialTransform: clone(transform)
            };
            this.planeStates.set(id, newPlaneState);
        }
    };
    SectionManager.prototype.deletePlane = function (id) {
        if (this.planeStates.size === 0) ;
        if (this.planeStates.has(id) === true) {
            var planeState = this.planeStates.get(id);
            this.disableClipPlane(id);
            planeState.plane.delete();
            this.planeStates.delete(id);
        }
    };
    //not used
    // public intersectPlane(raycaster:RayCaster){
    //     let minDist = Infinity;
    //     let intersectPlane:ShapeNode;
    //     for(let plane of this.primaryPlanes){
    //         if(plane.visible==false)
    //         continue;
    //         let planeNode = plane.children[0] as ShapeNode;
    //         let intersection = planeNode.intersectPlane(raycaster);
    //         if(intersection>0 && intersection < minDist){
    //             minDist=intersection;
    //             intersectPlane = planeNode;
    //         }
    //     }
    //     for(let plane of this.slicePlanes){
    //         if(plane.visible==false)
    //         continue;
    //         let planeNode = plane.children[0] as ShapeNode;
    //         let intersection = planeNode.intersectPlane(raycaster);
    //         if(intersection>0 && intersection < minDist){
    //             minDist=intersection;
    //             intersectPlane = planeNode;
    //         }
    //     }
    //     if(intersectPlane === undefined )
    //         return;
    //     this.selectedPlane = intersectPlane;
    //     this.setSelectPlaneEqn();
    //     this.originalPlaneColor = intersectPlane.mesh.mainMesh.material.diffuseColor;
    //     this.selectedPlane.mesh.mainMesh.material.diffuseColor = this.selectedPlaneColor;
    // }
    //used
    SectionManager.prototype.setActivePlane = function (id) {
        this.activePlaneId = id;
    };
    SectionManager.prototype.enableClipPlane = function (id) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            planeState.isPlaneEnabled = true;
            this.planeStates.set(id, planeState);
        }
    };
    SectionManager.prototype.disableClipPlane = function (id) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            planeState.isPlaneEnabled = false;
            this.planeStates.set(id, planeState);
        }
    };
    SectionManager.prototype.showClipPlane = function (id) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            planeState.plane.visible = true;
            this.planeStates.set(id, planeState);
        }
    };
    SectionManager.prototype.hideClipPlane = function (id) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            planeState.plane.visible = false;
            this.planeStates.set(id, planeState);
        }
    };
    SectionManager.prototype.setPlaneEquation = function (id, transform, initTransform) {
        var e = Utility.getPlaneEqnFromTransfromMat(transform);
        var planeState = this.planeStates.get(id);
        if (planeState) {
            if (initTransform) {
                planeState.initialTransform = initTransform;
            }
            this.setPlaneEqn(id, e);
            this.updateVisualPlane(id, transform);
        }
    };
    SectionManager.prototype.getPlaneEquation = function (id) {
        var planeState = this.planeStates.get(id);
        if (planeState) {
            var n = planeState.eqn.normal;
            planeState.eqn.constant;
            var plane = planeState.plane.children[0];
            var planeMesh = plane.mesh;
            var x = planeMesh.getRightDir();
            var y = planeMesh.getTopDir();
            var c = planeMesh.getCenter();
            return {
                initTransform: planeState.initialTransform,
                transform: fromValues(x[0], x[1], x[2], 0, y[0], y[1], y[2], 0, n[0], n[1], n[2], 0, c[0], c[1], c[2], 1),
            };
        }
    };
    return SectionManager;
}());var PartManipulator = /** @class */ (function () {
    function PartManipulator() {
        this.zoomFactor = 0.01;
        this.parts = null;
        this.isPartMoveEnabled = false;
    }
    PartManipulator.prototype.explodeParts = function (percent, center, constraint) {
        //return;
        // this.parts = AppObjects.sceneManager.getPartNodes();
        // if(this.parts){
        //     this.resetPickAndMove();
        //     let overallCenter = AppObjects.sceneManager.getBoundingBox().getCenter();
        //     let constrain = glmatrix.vec3.fromValues(constraint[0],constraint[1],constraint[2]);
        //     if(center)
        //     {
        //         overallCenter = glmatrix.vec3.fromValues(center[0],center[1],center[2]);
        //     }
        //     this.parts.forEach(part => {
        //         let partCenter = part.getBBoxCenter();
        //         console.log("part center",partCenter);
        //         let transDir = glmatrix.vec3.create();
        //         glmatrix.vec3.subtract(transDir,partCenter,overallCenter);
        //         let distance = glmatrix.vec3.length(transDir);
        //         glmatrix.vec3.normalize(transDir,transDir);
        //         transDir[0] *= constrain[0];
        //         transDir[1] *= constrain[1];
        //         transDir[2] *= constrain[2];
        //         let newPos = glmatrix.vec3.create();
        //         let oldPos = glmatrix.vec3.create();
        //         glmatrix.vec3.copy(oldPos,partCenter);
        //         glmatrix.vec3.scaleAndAdd(newPos,oldPos,transDir,distance*percent);
        //        //store explode translation
        //        glmatrix.vec3.sub(part.explodeTranslation,newPos,oldPos);
        //        AppObjects.sceneManager.update();
        //     });
    };
    PartManipulator.prototype.translatePart = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        var selectedNodes = AppObjects.renderer.highlightedNodes;
        var camControl = AppObjects.renderer.camControl;
        if (selectedNodes.size > 0 && (newMouseX != lastMouseX || newMouseY != lastMouseY)) {
            var deltaX = newMouseX - lastMouseX;
            var deltaY = newMouseY - lastMouseY;
            var mvMatrix = create$1();
            var camMatrix = camControl.getCameraMatrix2(CameraType.Perspective);
            var point3d1 = camControl.unproject([lastMouseX, lastMouseY, 0], mvMatrix, [camControl.canvas.width, camControl.canvas.height], camMatrix); // 0 means near plane
            var point3d2 = camControl.unproject([newMouseX, newMouseY, 0], mvMatrix, [camControl.canvas.width, camControl.canvas.height], camMatrix); // 0 means near plane
            if (point3d1 == null || point3d2 == null)
                return;
            var point3d11 = camControl.unproject([lastMouseX, lastMouseY, 1], mvMatrix, [camControl.canvas.width, camControl.canvas.height], camMatrix); // 1 means far plane
            var point3d22 = camControl.unproject([newMouseX, newMouseY, 1], mvMatrix, [camControl.canvas.width, camControl.canvas.height], camMatrix); // 1 means far plane
            if (point3d11 == null || point3d22 == null)
                return;
            var cameraPosition_1 = fromValues$2(0, 0, 0, 1);
            var CameraMatrix = camControl.getCameraMatrix(CameraType.Perspective);
            invert(CameraMatrix, CameraMatrix);
            transformMat4$1(cameraPosition_1, cameraPosition_1, CameraMatrix);
            var ray1 = create$2();
            subtract(ray1, point3d1, point3d11);
            var ray2 = create$2();
            subtract(ray2, point3d2, point3d22);
            normalize(ray1, ray1);
            normalize(ray2, ray2);
            var angle_1 = Math.acos(Math.min(1.0, dot(ray1, ray2)));
            var right = fromValues$1(CameraMatrix[0], CameraMatrix[1], CameraMatrix[2]);
            var up = fromValues$1(CameraMatrix[4], CameraMatrix[5], CameraMatrix[6]);
            normalize(up, up);
            normalize(right, right);
            var v1 = create$2();
            scale$1(v1, right, deltaY);
            var v2 = create$2();
            scale$1(v2, up, deltaX);
            var axis_in_camera_coord_1 = create$2();
            add(axis_in_camera_coord_1, v1, v2);
            negate(axis_in_camera_coord_1, axis_in_camera_coord_1);
            normalize(axis_in_camera_coord_1, axis_in_camera_coord_1);
            selectedNodes.forEach(function (node) {
                var selectNode = node.parent;
                if (selectNode) {
                    var pickAndMoveInv = create$1();
                    invert(pickAndMoveInv, selectNode.pickAndMoveMatrix);
                    var rotationPointInModelSpace = create$3();
                    transformMat4$1(rotationPointInModelSpace, fromValues$2(cameraPosition_1[0], cameraPosition_1[1], cameraPosition_1[2], 1), pickAndMoveInv);
                    var rotationPoint = fromValues$1(rotationPointInModelSpace[0], rotationPointInModelSpace[1], rotationPointInModelSpace[2]);
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, rotationPoint);
                    MathUtils.rotateOnWorldAxis(selectNode.pickAndMoveMatrix, angle_1, fromValues$1(axis_in_camera_coord_1[0], axis_in_camera_coord_1[1], axis_in_camera_coord_1[2]));
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, negate(rotationPoint, rotationPoint));
                }
            });
            AppObjects.sceneManager.update();
        }
    };
    PartManipulator.prototype.rotatePart = function (newX, newY, lastMouseX, lastMouseY) {
        var selectedNodes = AppObjects.renderer.highlightedNodes;
        if (selectedNodes.size > 0) {
            var partCenter_1 = create$2();
            selectedNodes.forEach(function (node) { return add(partCenter_1, partCenter_1, node.getBBoxCenter(true)); });
            scale$1(partCenter_1, partCenter_1, 1 / selectedNodes.size);
            var angleAxis_1 = this.getRotAngleAndNormalizedAxis(newX, newY, lastMouseX, lastMouseY);
            if (!angleAxis_1)
                return;
            var axis_in_camera_coord = fromValues$2(angleAxis_1.axis_in_camera_coord[0], angleAxis_1.axis_in_camera_coord[1], angleAxis_1.axis_in_camera_coord[2], 0);
            var axis_in_obj_coord_1 = create$3();
            normalize$1(axis_in_camera_coord, axis_in_camera_coord);
            var camControl = AppObjects.renderer.camControl;
            var camMat = (camControl.camType == CameraType.Perspective) ? camControl.perspCamera.camMatrix : camControl.orthCamera.camMatrix;
            var cam2object = create$1();
            invert(cam2object, camMat);
            transformMat4$1(axis_in_obj_coord_1, axis_in_camera_coord, cam2object);
            normalize$1(axis_in_obj_coord_1, axis_in_obj_coord_1);
            selectedNodes.forEach(function (node) {
                var selectNode = node.parent;
                if (selectNode) {
                    var world_center = clone$1(partCenter_1);
                    var local_center = create$2();
                    var world_inverse = create$1();
                    invert(world_inverse, selectNode.worldMatrix);
                    transformMat4(local_center, world_center, world_inverse);
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, local_center);
                    MathUtils.rotateOnWorldAxis(selectNode.pickAndMoveMatrix, angleAxis_1.angle, fromValues$1(axis_in_obj_coord_1[0], axis_in_obj_coord_1[1], axis_in_obj_coord_1[2]));
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, negate(local_center, local_center));
                }
            });
            AppObjects.sceneManager.update();
        }
    };
    PartManipulator.prototype.rotatePartCamera = function (angleInRadian, axisInCameraCoord) {
        var selectedNodes = AppObjects.renderer.highlightedNodes;
        if (selectedNodes.size > 0) {
            var angleAxis_2 = angleInRadian;
            // let angleAxis:MathUtils.AngleAxis = this.getRotAngleAndNormalizedAxis(newX,newY,lastMouseX,lastMouseY);
            if (!angleAxis_2)
                return;
            var axis_in_camera_coord = fromValues$2(axisInCameraCoord[0], axisInCameraCoord[1], axisInCameraCoord[2], 0);
            var axis_in_obj_coord_2 = create$3();
            normalize$1(axis_in_camera_coord, axis_in_camera_coord);
            var partCenter_2 = create$2();
            selectedNodes.forEach(function (node) { return add(partCenter_2, partCenter_2, node.getBBoxCenter(true)); });
            scale$1(partCenter_2, partCenter_2, 1 / selectedNodes.size);
            var camControl = AppObjects.renderer.camControl;
            var camMat = (camControl.camType == CameraType.Perspective) ? camControl.perspCamera.camMatrix : camControl.orthCamera.camMatrix;
            var cam2object = create$1();
            invert(cam2object, camMat);
            transformMat4$1(axis_in_obj_coord_2, axis_in_camera_coord, cam2object);
            normalize$1(axis_in_obj_coord_2, axis_in_obj_coord_2);
            selectedNodes.forEach(function (node) {
                var selectNode = node.parent;
                if (selectNode) {
                    var world_center = clone$1(partCenter_2);
                    var local_center = create$2();
                    var world_inverse = create$1();
                    invert(world_inverse, selectNode.worldMatrix);
                    transformMat4(local_center, world_center, world_inverse);
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, local_center);
                    MathUtils.rotateOnWorldAxis(selectNode.pickAndMoveMatrix, angleAxis_2, fromValues$1(axis_in_obj_coord_2[0], axis_in_obj_coord_2[1], axis_in_obj_coord_2[2]));
                    translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, negate(local_center, local_center));
                }
            });
            AppObjects.sceneManager.update();
        }
    };
    PartManipulator.prototype.translateZ = function (scale) {
        var _this = this;
        var selectedNodes = AppObjects.renderer.highlightedNodes;
        var camControl = AppObjects.renderer.camControl;
        var partCenter = create$2();
        selectedNodes.forEach(function (node) { return add(partCenter, partCenter, node.getBBoxCenter(true)); });
        scale$1(partCenter, partCenter, 1 / selectedNodes.size);
        var CameraMatrix = camControl.getCameraMatrix(CameraType.Perspective);
        invert(CameraMatrix, CameraMatrix);
        var cameraPosition = fromValues$2(0, 0, 0, 1);
        transformMat4$1(cameraPosition, cameraPosition, CameraMatrix);
        var camDir = create$2();
        sub(camDir, fromValues$1(cameraPosition[0], cameraPosition[1], cameraPosition[2]), partCenter);
        selectedNodes.forEach(function (node) {
            var selectNode = node.parent;
            if (selectNode) {
                var pickAndMoveInv = create$1();
                invert(pickAndMoveInv, selectNode.pickAndMoveMatrix);
                var dist2Cam = len(camDir);
                var front = MathUtils.getDirVector(CameraMatrix);
                var frontInModelSpace = create$3();
                transformMat4$1(frontInModelSpace, fromValues$2(front[0], front[1], front[2], 0), pickAndMoveInv);
                normalize$1(frontInModelSpace, frontInModelSpace);
                scale$2(frontInModelSpace, frontInModelSpace, scale * dist2Cam * _this.zoomFactor);
                translate(selectNode.pickAndMoveMatrix, selectNode.pickAndMoveMatrix, fromValues$1(frontInModelSpace[0], frontInModelSpace[1], frontInModelSpace[2]));
            }
        });
        AppObjects.sceneManager.update();
    };
    PartManipulator.prototype.resetExplode = function () {
        this.parts = AppObjects.sceneManager.getPartNodes();
        if (this.parts) {
            this.parts.forEach(function (part) {
                part.explodeTranslation = create$2();
            });
            AppObjects.sceneManager.update();
        }
    };
    PartManipulator.prototype.resetPickAndMove = function () {
        this.parts = AppObjects.sceneManager.getPartNodes();
        if (this.parts) {
            this.parts.forEach(function (part) {
                part.pickAndMoveMatrix = create$1();
            });
            AppObjects.sceneManager.update();
            var bbox = AppObjects.sceneManager.getBoundingBox(true);
            AppObjects.renderer.camControl.setRotationPoint(bbox.getCenter());
        }
    };
    PartManipulator.prototype.enablePickAndMove = function (value) {
        this.isPartMoveEnabled = value;
    };
    PartManipulator.prototype.getRotAngleAndNormalizedAxis = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        var rotationObject = {};
        var canvas = AppObjects.renderer.camControl.canvas;
        if (newMouseX != lastMouseX || newMouseY != lastMouseY) {
            var va = MathUtils.getArcballVector(lastMouseX, lastMouseY, canvas);
            var vb = MathUtils.getArcballVector(newMouseX, newMouseY, canvas);
            var angle = Math.acos(Math.min(1.0, dot(va, vb)));
            var axis_in_camera_coord = create$2();
            cross(axis_in_camera_coord, va, vb);
            normalize(axis_in_camera_coord, axis_in_camera_coord);
            rotationObject.angle = angle;
            rotationObject.axis_in_camera_coord = axis_in_camera_coord;
        }
        else {
            return null;
        }
        return rotationObject;
    };
    return PartManipulator;
}());var KeyboardControl = /** @class */ (function () {
    function KeyboardControl(container, app) {
        this.container = container;
        this.app = app;
        document.onkeyup = this.handleContainerKeyup.bind(this);
        document.onkeydown = this.handleContainerKeyDown.bind(this);
    }
    KeyboardControl.prototype.handleContainerKeyup = function (event) {
        event = event || window.event; //window.event for IE
        //event.preventDefault();
        var keycode = event.keyCode || event.which;
        String.fromCharCode(keycode).toLowerCase();
        /*
        if(event.shiftKey === true && cmd === 'd') // ctrl + d
        {
            if(this.app)
                this.app.downloadNetworkMetrics();
        }

        if(event.shiftKey === true && cmd === 'p') // ctrl + p
        {
            if(this.app)
                this.app.printNetworkMetrics();
        }
        */
    };
    KeyboardControl.prototype.handleContainerKeyDown = function (event) {
        //event = event || window.event; //window.event for IE
        //event.preventDefault();     
    };
    return KeyboardControl;
}());var Label3DType;
(function (Label3DType) {
    Label3DType["ANNOTATION"] = "ANNOTATION";
    Label3DType["MINMAX"] = "MINMAX";
    Label3DType["PROBE"] = "PROBE";
    Label3DType["DISTANCE"] = "DISTANCE";
    Label3DType["ARC"] = "ARC";
    Label3DType["EDGE"] = "EDGE";
    Label3DType["FACE"] = "FACE";
    Label3DType["HOTSPOT"] = "HOTSPOT";
    Label3DType["LINECHART"] = "LINECHART";
})(Label3DType || (Label3DType = {}));
var LabelState;
(function (LabelState) {
    LabelState[LabelState["NOTHING"] = 0] = "NOTHING";
    LabelState[LabelState["ADDLABEL"] = 1] = "ADDLABEL";
    LabelState[LabelState["ADDLABELPOINT"] = 2] = "ADDLABELPOINT";
    LabelState[LabelState["EDITLABEL"] = 3] = "EDITLABEL";
    LabelState[LabelState["MOVING"] = 4] = "MOVING";
})(LabelState || (LabelState = {}));var LineMesh = /** @class */ (function (_super) {
    __extends(LineMesh, _super);
    function LineMesh(name, points) {
        var _this = _super.call(this, name) || this;
        _this.uid = Utility.getGUID();
        _this.points = points;
        _this.rendingMode = RenderMode.LINE_STRIP;
        _this.createLineMesh();
        _this.material = new Material(name);
        _this.material.diffuseColor = [0, 0, 0];
        return _this;
    }
    LineMesh.prototype.createLineMesh = function () {
        var vertices = new Float32Array(this.points.length * 3);
        var prevLen = 0;
        this.points.forEach(function (pt) {
            vertices.set(pt, prevLen);
            prevLen += pt.length;
        });
        var indices = new Uint32Array(this.points.map(function (e, i) { return i; }));
        this.setattribs(this.generateAttribute(vertices));
        this.setIndex(this.generateIndices(indices));
    };
    LineMesh.prototype.generateAttribute = function (vertices) {
        var attrib = new WebGLArrayBufferAttribute();
        attrib.position = new WebGLArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, vertices);
        return attrib;
    };
    LineMesh.prototype.generateIndices = function (indices) {
        var index = new WebGLElementArrayBuffer(this.uid, BufferUsage.STATIC_DRAW, indices);
        return index;
    };
    LineMesh.prototype.update = function (p1, p2) {
        this.attribs.position.updateData(new Float32Array(__spread(p1, p2)).buffer);
    };
    return LineMesh;
}(CoreMesh));var LineNode = /** @class */ (function (_super) {
    __extends(LineNode, _super);
    function LineNode(name, points, color) {
        if (color === void 0) { color = [0, 0, 0, 1]; }
        var _this = _super.call(this, name) || this;
        _this.mesh = new Mesh(name);
        _this.mesh.mainMesh = new LineMesh(name, points);
        _this.mesh.mainMesh.material = new Material(name + '_material');
        _this.mesh.mainMesh.material.diffuseColor = [color[0], color[1], color[2]];
        _this.mesh.mainMesh.material.transparency = 1 - color[3];
        _this.visible = true;
        return _this;
    }
    return LineNode;
}(ShapeNode));var Curve = /** @class */ (function () {
    function Curve() {
        this.type = 'Curve';
        this.arcLengthDivisions = 200;
    }
    Curve.prototype.getPoints = function (divisions) {
        if (divisions === void 0) { divisions = 5; }
        var points = [];
        for (var d = 0; d <= divisions; d++) {
            points.push(this.getPoint(d / divisions));
        }
        return points;
    };
    return Curve;
}());var ThreePtArcCurve = /** @class */ (function (_super) {
    __extends(ThreePtArcCurve, _super);
    function ThreePtArcCurve(v1, v2, v3) {
        var _this = _super.call(this) || this;
        _this.type = "ThreePtArcCurve";
        _this.v1 = v1;
        _this.v2 = v2;
        _this.v3 = v3;
        _this.center = create$2();
        _this.normal = create$2();
        _this.radius = 0;
        _this.init();
        return _this;
    }
    ThreePtArcCurve.prototype.init = function () {
        var v21 = create$2();
        var v31 = create$2();
        cross(this.normal, sub(v21, this.v2, this.v1), sub(v31, this.v3, this.v1));
        normalize(this.normal, this.normal);
        var planeConst = dot(this.v1, this.normal);
        // finding two linear equations for circle center variables using sphere equation
        var lConst1 = (this.v2[0] * this.v2[0] - this.v1[0] * this.v1[0] + this.v2[1] * this.v2[1] - this.v1[1] * this.v1[1] + this.v2[2] * this.v2[2] - this.v1[2] * this.v1[2]) / 2;
        var lConst2 = (this.v3[0] * this.v3[0] - this.v1[0] * this.v1[0] + this.v3[1] * this.v3[1] - this.v1[1] * this.v1[1] + this.v3[2] * this.v3[2] - this.v1[2] * this.v1[2]) / 2;
        //Crammer's Rule
        var delX, delY, delZ, Cnst;
        delX = (this.v2[1] - this.v1[1]) * ((this.v3[2] - this.v1[2]) * planeConst - this.normal[2] * lConst2)
            - (this.v2[2] - this.v1[2]) * ((this.v3[1] - this.v1[1]) * planeConst - this.normal[1] * lConst2)
            + lConst1 * ((this.v3[1] - this.v1[1]) * this.normal[2] - this.normal[1] * (this.v3[2] - this.v1[2]));
        delY = -(this.v2[0] - this.v1[0]) * ((this.v3[2] - this.v1[2]) * planeConst - this.normal[2] * lConst2)
            + (this.v2[2] - this.v1[2]) * ((this.v3[0] - this.v1[0]) * planeConst - this.normal[0] * lConst2)
            - lConst1 * ((this.v3[0] - this.v1[0]) * this.normal[2] - this.normal[0] * (this.v3[2] - this.v1[2]));
        delZ = (this.v2[0] - this.v1[0]) * ((this.v3[1] - this.v1[1]) * planeConst - this.normal[1] * lConst2)
            - (this.v2[1] - this.v1[1]) * ((this.v3[0] - this.v1[0]) * planeConst - this.normal[0] * lConst2)
            + lConst1 * ((this.v3[0] - this.v1[0]) * this.normal[1] - this.normal[0] * (this.v3[1] - this.v1[1]));
        Cnst = -(this.v2[0] - this.v1[0]) * ((this.v3[1] - this.v1[1]) * this.normal[2] - this.normal[1] * (this.v3[2] - this.v1[2]))
            + (this.v2[1] - this.v1[1]) * ((this.v3[0] - this.v1[0]) * this.normal[2] - this.normal[0] * (this.v3[2] - this.v1[2]))
            - (this.v2[2] - this.v1[2]) * ((this.v3[0] - this.v1[0]) * this.normal[1] - this.normal[0] * (this.v3[1] - this.v1[1]));
        //	Finding the center using crammer's rule.
        if (Cnst !== 0) {
            this.center[0] = -delX / Cnst;
            this.center[1] = -delY / Cnst;
            this.center[2] = -delZ / Cnst;
        }
        this.radius = Math.sqrt((this.center[0] - this.v1[0]) * (this.center[0] - this.v1[0])
            + (this.center[1] - this.v1[1]) * (this.center[1] - this.v1[1])
            + (this.center[2] - this.v1[2]) * (this.center[2] - this.v1[2]));
        var angle1, angle2, angle3;
        var a1 = create$2();
        var a2 = create$2();
        var a3 = create$2();
        a1[0] = this.v1[0] - this.center[0];
        a1[1] = this.v1[1] - this.center[1];
        a1[2] = this.v1[2] - this.center[2];
        a2[0] = this.v2[0] - this.center[0];
        a2[1] = this.v2[1] - this.center[1];
        a2[2] = this.v2[2] - this.center[2];
        a3[0] = this.v3[0] - this.center[0];
        a3[1] = this.v3[1] - this.center[1];
        a3[2] = this.v3[2] - this.center[2];
        normalize(a1, a1);
        normalize(a2, a2);
        normalize(a3, a3);
        angle1 = Math.acos(dot(a1, a2));
        angle2 = Math.acos(dot(a2, a3));
        angle3 = Math.acos(dot(a1, a3));
        var angleSum = angle1 + angle2 + angle3;
        this.includedAngle = angle1 + angle2;
        if ((2 * Math.PI - angleSum) < 0.001 && (2 * Math.PI - angleSum) > -0.001) {
            this.includedAngle = angle1 + angle2;
        }
        else if (angle2 > angle1 && angle2 > angle3) {
            this.includedAngle = angle1 + 2 * Math.PI - angle2;
        }
        else if (angle1 > angle2 && angle1 > angle3) {
            this.includedAngle = 2 * Math.PI - angle1 + angle2;
        }
    };
    ThreePtArcCurve.prototype.getPoint = function (t, targetPoint) {
        if (targetPoint === void 0) { targetPoint = create$2(); }
        var arcAngle = t;
        var temp = create$2();
        var cpoint = create$2();
        cpoint[0] = this.v1[0] - this.center[0];
        cpoint[1] = this.v1[1] - this.center[1];
        cpoint[2] = this.v1[2] - this.center[2];
        var c = Math.cos(arcAngle);
        var s = Math.sin(arcAngle);
        var d = 1 - c;
        var X = this.normal[0];
        var Y = this.normal[1];
        var Z = this.normal[2];
        temp[0] = (d * X * X + c) * cpoint[0] + (d * X * Y + s * Z) * cpoint[1] + (d * X * Z - s * Y) * cpoint[2];
        temp[1] = (d * X * Y - s * Z) * cpoint[0] + (d * Y * Y + c) * cpoint[1] + (d * Y * Z + s * X) * cpoint[2];
        temp[2] = (d * X * Z + s * Y) * cpoint[0] + (d * Y * Z - s * X) * cpoint[1] + (d * Z * Z + c) * cpoint[2];
        cpoint[0] = temp[0] + this.center[0];
        cpoint[1] = temp[1] + this.center[1];
        cpoint[2] = temp[2] + this.center[2];
        return cpoint;
    };
    ThreePtArcCurve.prototype.getPoints = function (divison) {
        if (divison === void 0) { divison = 50; }
        var arcPts = [];
        negate(this.normal, this.normal);
        var increment = 2 * Math.PI / divison;
        arcPts.push(this.v1);
        for (var arcAngle = increment; arcAngle < this.includedAngle; arcAngle += increment) {
            arcPts.push(this.getPoint(arcAngle));
        }
        arcPts.push(this.v3);
        return arcPts;
    };
    ThreePtArcCurve.prototype.getRadius = function () {
        return this.radius;
    };
    ThreePtArcCurve.prototype.getCenter = function () {
        return this.center;
    };
    return ThreePtArcCurve;
}(Curve));var Label = /** @class */ (function () {
    function Label(id) {
        this.id = id;
        this.visible = true;
        this.state = LabelState.NOTHING;
        this.htmlDiv = null;
        this.position = [0, 0];
        this.message = '';
        this.style = {
            borderStyle: "solid",
            borderWidth: 1,
            cursor: "default",
            width: 50,
            height: 20,
            zIndex: 15,
            opacity: 1,
            filter: "alpha(opacity=" + (100) + ")",
            stylePosition: "absolute",
            fontFace: "Arial",
            fontSize: 15,
            fontColor: "#000000",
            backgroundColor: "#f5f37f",
            isBGVisible: true,
            borderColor: "#000000",
            isBorderVisible: true
        };
    }
    Label.prototype.getId = function () {
        return this.id;
    };
    Label.prototype.setHTMLContainer = function (parent) {
        this.htmlContainer = parent;
    };
    Label.prototype.setHTML = function (div) {
        if (this.htmlContainer) {
            var existing = Utility.getElementInsideContainer(this.htmlContainer.id, div.id);
            if (existing != null) {
                this.htmlContainer.removeChild(existing);
            }
            this.htmlContainer.appendChild(div);
            this.htmlDiv = div;
            this.updateStyle();
        }
        else {
            throw new Error("HTML container not set");
        }
    };
    Label.prototype.updateStyle = function () {
        this.htmlDiv.innerHTML = "<pre style='margin:0px'>" + this.message + "</pre>";
        this.htmlDiv.style.cursor = this.style.cursor;
        //divObject.style.width = width + 'px';
        //divObject.style.height = height + 'px';
        this.htmlDiv.style.zIndex = this.style.zIndex.toString(); // if you still don't see the label, try uncommenting this
        this.htmlDiv.style.opacity = this.style.opacity.toString();
        this.htmlDiv.style.filter = this.style.filter; // For IE8 and earlier 
        this.htmlDiv.style.position = this.style.stylePosition;
        // divObject.style.visibility = visibility;
        if (this.visible)
            this.htmlDiv.style.visibility = "visible";
        else
            this.htmlDiv.style.visibility = "hidden";
        this.htmlDiv.style.fontFamily = this.style.fontFace;
        this.htmlDiv.style.fontSize = this.style.fontSize + "px";
        this.htmlDiv.style.color = this.style.fontColor;
        if (this.style.isBGVisible == true)
            this.htmlDiv.style.backgroundColor = this.style.backgroundColor;
        if (this.style.borderColor != "" && this.style.isBorderVisible == true) {
            this.htmlDiv.style.borderColor = this.style.borderColor;
            this.htmlDiv.style.borderStyle = this.style.borderStyle;
            this.htmlDiv.style.borderRadius = "0px 0px";
            this.htmlDiv.style.borderWidth = this.style.borderWidth + 'px';
        }
        else {
            this.htmlDiv.style.borderColor = "";
            this.htmlDiv.style.borderStyle = "";
            this.htmlDiv.style.borderRadius = "";
            this.htmlDiv.style.borderWidth = "";
        }
        //To make it not selectable
        var crossStyle = this.htmlDiv.style;
        this.htmlDiv.style.userSelect = "none";
        crossStyle.MozUserSelect = "none";
        crossStyle.webkitUserSelect = "none";
        this.htmlDiv.setAttribute("unselectable", "on");
        //divObject.setAttribute("contentEditable", true);
        //divObject.style.resize = "both";
        //divObject.style.overflow = "auto";
        this.htmlDiv.style.whiteSpace = "nowrap";
    };
    Label.prototype.getHTML = function () {
        return this.htmlDiv;
    };
    Label.prototype.getState = function () {
        return this.state;
    };
    Label.prototype.setState = function (state) {
        this.state = state;
    };
    Label.prototype.setMessage = function (value) {
        this.message = value;
    };
    Label.prototype.getMessage = function () {
        return this.message;
    };
    Label.prototype.getCanvasPosition = function () {
        return this.position;
    };
    Label.prototype.setCanvasPosition = function (labelPos) {
        //this.htmlDiv.style.left = labelPos[0] + "px";
        //this.htmlDiv.style.top = labelPos[1] + "px";
        this.position = __spread(labelPos);
    };
    Label.prototype.isVisible = function () {
        return this.visible;
    };
    Label.prototype.hide = function () {
        this.visible = false;
        if (this.htmlDiv)
            this.htmlDiv.style.display = "none";
    };
    Label.prototype.show = function () {
        this.visible = true;
        if (this.htmlDiv)
            this.htmlDiv.style.display = "block";
    };
    Label.prototype.render = function () {
    };
    Label.prototype.delete = function () {
    };
    return Label;
}());
var Label3D = /** @class */ (function () {
    function Label3D(id, type) {
        this.nodeId = null;
        this.elementId = null;
        this.type = type;
        this.parentNode = null;
        this.label = null;
        this.shader = null;
        this.visible = true;
        this.showConnector = false;
        this.lineStartPos = fromValues$1(0, 6, 0);
        this.lineEndPos = fromValues$1(10, 20, 0);
        this.pointDisplay = new PointNode(id + '_pointDisplay', this.lineStartPos);
        this.lineDisplay = new LineNode(id + '_lineDisplay', [this.lineStartPos, this.lineEndPos]);
        this.renderer = AppObjects.renderer;
        this.primitives = [];
        this.handleEvents();
        this.createLabel(id);
        this.probeData = null;
    }
    Label3D.prototype.handleEvents = function () {
        AppObjects.externalEventDispatcher.addEventListener(Events.MOUSE_DOWN, this.handleMouseDown.bind(this));
        AppObjects.externalEventDispatcher.addEventListener(Events.MOUSE_UP, this.handleMouseUp.bind(this));
        AppObjects.externalEventDispatcher.addEventListener(Events.MOUSE_SCROLL, this.handleMouseScroll.bind(this));
    };
    Label3D.prototype.handleMouseDown = function () {
        this.label.setState(LabelState.MOVING);
    };
    Label3D.prototype.handleMouseUp = function () {
        this.label.setState(LabelState.NOTHING);
    };
    Label3D.prototype.handleMouseScroll = function () {
        this.label.setState(LabelState.MOVING);
    };
    Label3D.prototype.is3DPointVisible = function (labelPosition) {
        var normal_cameraDir = this.renderer.camControl.getFrontDir(); // a,b,c
        var cameraposition = this.renderer.camControl.getPosition(); // x,y,z
        var d = -((normal_cameraDir[0] * cameraposition[0]) + (normal_cameraDir[1] * cameraposition[1]) + (normal_cameraDir[2] * cameraposition[2])); // ax + by + cz + d = 0 plane equation
        var result = (normal_cameraDir[0] * labelPosition[0]) + (normal_cameraDir[1] * labelPosition[1]) + (normal_cameraDir[2] * labelPosition[2]) + d; //ax + by + cz + d = 0 plane equation
        if (result < 0)
            return true;
        else
            return false;
    };
    Label3D.prototype.updateDisplay = function (lineStartPos, lineEndPos) {
        var _this = this;
        var point = this.pointDisplay.mesh.mainMesh;
        var line = this.lineDisplay.mesh.mainMesh;
        point.update(lineStartPos);
        line.update(lineStartPos, lineEndPos);
        if (this.shader && this.visible) {
            if (this.showConnector) {
                this.renderer.renderBufferDirect(point, this.pointDisplay.worldMatrix, this.shader);
                this.renderer.renderBufferDirect(line, this.lineDisplay.worldMatrix, this.shader);
            }
            this.primitives.forEach(function (node) {
                _this.renderer.renderBufferDirect(node.mesh.mainMesh, node.worldMatrix, _this.shader);
            });
        }
    };
    Label3D.prototype.createLabel = function (id) {
        var label = new Label(id);
        label.setCanvasPosition([0, 0]);
        this.label = label;
    };
    Label3D.prototype.getDeformedPosition = function () {
        var _a, _b, _c, _d;
        var deformedPos = [0, 0, 0];
        try {
            var animationManger = AppObjects.animationManager;
            if (animationManger.IsAnimationOn === true) {
                var frameFactor = animationManger.frameFactor;
                if (this.probeData) {
                    var selectedNode = null;
                    var nodes = AppObjects.sceneManager.getRenderNodes();
                    for (var i = 0; i < nodes.length; i++) {
                        if (this.probeData.renderNodeId === nodes[i].index) {
                            selectedNode = nodes[i];
                            break;
                        }
                    }
                    if (selectedNode) {
                        var dataArray = (_d = (_c = (_b = (_a = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.mesh) === null || _a === void 0 ? void 0 : _a.subMeshes['primitive_0']) === null || _b === void 0 ? void 0 : _b.attribs) === null || _c === void 0 ? void 0 : _c.CustomBuffers['deformvalues']) === null || _d === void 0 ? void 0 : _d.dataArray;
                        var index = this.probeData.primitiveSize * this.probeData.pickedVertexIndex;
                        deformedPos = [dataArray[index] * frameFactor, dataArray[index + 1] * frameFactor, dataArray[index + 2] * frameFactor];
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        return deformedPos;
    };
    Label3D.prototype.getId = function () {
        return this.label.getId();
    };
    Label3D.prototype.getType = function () {
        return this.type;
    };
    Label3D.prototype.isVisible = function () {
        return this.label.isVisible();
    };
    Label3D.prototype.setParent = function (node) {
        this.parentNode = node;
    };
    Label3D.prototype.setType = function (type) {
        this.type = type;
    };
    Label3D.prototype.setOrigin = function (pt) {
        this.lineStartPos = pt;
    };
    Label3D.prototype.getOrigin = function () {
        return this.lineStartPos;
    };
    Label3D.prototype.setShader = function (shader) {
        this.shader = shader;
    };
    Label3D.prototype.getState = function () {
        return this.label.getState();
    };
    Label3D.prototype.setState = function (state) {
        this.label.setState(state);
    };
    Label3D.prototype.setHTMLContainer = function (parent) {
        this.label.setHTMLContainer(parent);
    };
    Label3D.prototype.setHTML = function (div) {
        this.label.setHTML(div);
    };
    Label3D.prototype.getHTML = function () {
        return this.label.getHTML();
    };
    Label3D.prototype.setMessage = function (m) {
        this.label.setMessage(m);
    };
    Label3D.prototype.getMessage = function () {
        return this.label.getMessage();
    };
    Label3D.prototype.hide = function () {
        this.label.hide();
        this.visible = false;
    };
    Label3D.prototype.show = function () {
        this.label.show();
        this.visible = true;
    };
    Label3D.prototype.getCanvasPosition = function () {
        return this.label.getCanvasPosition();
    };
    Label3D.prototype.setCanvasPosition = function (labelPos) {
        var oldPosition = this.getCanvasPosition();
        if (oldPosition[0] !== labelPos[0] || oldPosition[1] !== labelPos[1]) {
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.LABEL_MOVED, data: { labelId: this.getId(), labelPosition: labelPos } });
            this.label.setCanvasPosition(__spread(labelPos));
        }
    };
    Label3D.prototype.setPrimitives = function (nodes) {
        if (this.primitives.length > 0) {
            this.primitives.forEach(function (e) { return e.delete(); });
        }
        this.primitives = nodes;
    };
    Label3D.prototype.render = function () {
        var _a;
        if (this.lineStartPos) {
            if (!this.is3DPointVisible(this.lineStartPos)) {
                this.label.hide();
                return;
            }
            this.label.show();
            //if(this.parentNode)
            //   glmatrix.vec3.transformMat4(this.lineStartPos, this.lineStartPos,this.parentNode.worldMatrix);
            var canvas = this.renderer.camControl.canvas;
            var x = 0;
            var y = 0;
            var mvMatrix = create$1();
            identity(mvMatrix);
            if (this.attachedPart) {
                mvMatrix = new Float32Array(this.attachedPart.worldMatrix);
            }
            /*
            let bbox = AppObjects.sceneManager.getBoundingBox();
            let center = bbox.getCenter();
            let lineDir = glmatrix.vec3.create();
            glmatrix.vec3.sub(lineDir,this.lineStartPos,center);
            glmatrix.vec3.normalize(lineDir,lineDir);
            glmatrix.vec3.scaleAndAdd(this.lineEndPos,this.lineStartPos,lineDir,bbox.getRadius());
            */
            //manual reset for different implementation
            this.lineEndPos = clone$1(this.lineStartPos);
            var animationManger = AppObjects.animationManager;
            if (animationManger.IsAnimationOn) {
                var deformedPos = this.getDeformedPosition();
                this.lineEndPos[0] += deformedPos[0];
                this.lineEndPos[1] += deformedPos[1];
                this.lineEndPos[2] += deformedPos[2];
            }
            if (this.is3DPointVisible(this.lineEndPos)) {
                var point2d = this.renderer.camControl.project(__spread(this.lineEndPos), mvMatrix, [canvas.width, canvas.height], this.renderer.camControl.getCameraMatrix2(this.renderer.camControl.camType));
                x = point2d[0];
                y = point2d[1];
                point2d[2];
                this.setCanvasPosition([x, y]);
            }
            else {
                _a = __read(this.label.getCanvasPosition(), 2), x = _a[0], y = _a[1];
            }
            var lineEndOnNearPlane = this.renderer.camControl.unproject([x, y, 0], mvMatrix, [canvas.width, canvas.height], this.renderer.camControl.getCameraMatrix2(this.renderer.camControl.camType));
            this.updateDisplay(this.lineStartPos, lineEndOnNearPlane);
        }
    };
    Label3D.prototype.delete = function () {
        this.pointDisplay.delete();
        this.lineDisplay.delete();
        this.primitives.forEach(function (p) { return p.delete(); });
    };
    Label3D.prototype.setNodeId = function (value) {
        this.nodeId = value;
    };
    Label3D.prototype.getNodeId = function () {
        return this.nodeId;
    };
    Label3D.prototype.setElementId = function (value) {
        this.elementId = value;
    };
    Label3D.prototype.getElementId = function () {
        return this.elementId;
    };
    Label3D.prototype.getProbeData = function () {
        return this.probeData;
    };
    Label3D.prototype.setProbeData = function (_probeData) {
        this.probeData = _probeData;
    };
    Label3D.prototype.setAttachedPart = function (node) {
        this.attachedPart = node;
        node.addAttachedLabels(this);
    };
    Label3D.prototype.getAttachedPart = function () {
        return this.attachedPart;
    };
    return Label3D;
}());
/*
export class Label3DProbe extends Label3D implements ILabel3DProbe{
    private probeData: IProbeData;

    constructor(id:string, type: Label3DType){
        super(id, type);
        this.probeData = null;
    }

    public getProbeData():IProbeData{
        return this.probeData;
    }

    public setProbeData(_probeData:IProbeData){
        this.probeData = _probeData;
    }

}
*/var buildProbeLabel = function (selectedPoint, label, data) {
    label.setOrigin(selectedPoint);
    label.setProbeData(data);
    label.setMessage(selectedPoint.toString());
    label.render();
};
var buildFaceLabel = function (selectedPoint, label, data) {
    var p1 = fromValues$1(data.primitiveData[0], data.primitiveData[1], data.primitiveData[2]);
    var p2 = fromValues$1(data.primitiveData[3], data.primitiveData[4], data.primitiveData[5]);
    var p3 = fromValues$1(data.primitiveData[6], data.primitiveData[7], data.primitiveData[8]);
    var line1 = new LineNode('L1', [p1, p2]);
    var line2 = new LineNode('L2', [p2, p3]);
    var line3 = new LineNode('L3', [p3, p1]);
    label.setPrimitives([line1, line2, line3]);
    var mid = create$2();
    add(mid, p1, p2);
    scale$1(mid, mid, 0.5);
    add(mid, mid, p3);
    scale$1(mid, mid, 0.5);
    label.setOrigin(mid);
    //label.setOrigin(selectedPoint);
    label.setProbeData(data);
    label.setMessage(selectedPoint.toString());
    label.render();
};
var buildDistanceLabel = function (selectedPts, label) {
    var p1 = selectedPts[0];
    var p2 = selectedPts[1];
    var line = new LineNode('measurement', [p1, p2]);
    var pt13d = new PointNode('mp1', p1, [1, 0, 0, 1]);
    var pt23d = new PointNode('mp2', p2, [1, 0, 0, 1]);
    label.setPrimitives([line, pt13d, pt23d]);
    var mid = create$2();
    add(mid, p1, p2);
    scale$1(mid, mid, 0.5);
    label.setOrigin(mid);
    label.setMessage(dist(p1, p2).toString());
    label.render();
};
var buildArcLabel = function (selectedPts, label) {
    var p1 = selectedPts[0];
    var p2 = selectedPts[1];
    var p3 = selectedPts[2];
    var curve = new ThreePtArcCurve(p1, p2, p3);
    var curvePoints = curve.getPoints();
    var arc = new LineNode('arc', curvePoints);
    var pt13d = new PointNode('arcp1', p1, [1, 0, 0, 1]);
    var pt23d = new PointNode('arcp2', p2, [1, 0, 0, 1]);
    var pt33d = new PointNode('arcp3', p3, [1, 0, 0, 1]);
    var center = curve.getCenter();
    var radius = new LineNode('radius', [curvePoints[Math.floor((curvePoints.length - 1) / 2)], center]);
    label.setPrimitives([arc, pt13d, pt23d, pt33d, radius]);
    label.setOrigin(center);
    var mid = create$2();
    add(mid, p1, p3);
    scale$1(mid, mid, 0.5);
    label.setMessage(curve.getRadius().toString());
    label.render();
};
var Label3DBuilder = /** @class */ (function () {
    function Label3DBuilder(id, eventDispatcher) {
        this.id = id;
        this.eventDispatcher = eventDispatcher;
        this.type = null;
        this.shader = null;
    }
    Label3DBuilder.prototype.setSelectedPoints = function (points) {
        this.selectedPoints = points;
        return this;
    };
    Label3DBuilder.prototype.setProbeData = function (data) {
        this.probeData = data;
        return this;
    };
    Label3DBuilder.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    Label3DBuilder.prototype.getType = function () {
        return this.type;
    };
    Label3DBuilder.prototype.setShader = function (shader) {
        this.shader = shader;
        return this;
    };
    Label3DBuilder.prototype.build = function () {
        if (!(this.selectedPoints && this.shader && this.probeData)) {
            return null;
        }
        var label = new Label3D(this.id, this.type);
        //let label = new Label3DProbe(this.id,this.type);
        label.setShader(this.shader);
        switch (this.type) {
            case Label3DType.PROBE:
                buildProbeLabel(this.selectedPoints[0], label, this.probeData);
                break;
            case Label3DType.HOTSPOT:
                buildProbeLabel(this.selectedPoints[0], label, this.probeData);
                break;
            case Label3DType.FACE:
                buildFaceLabel(this.selectedPoints[0], label, this.probeData);
                break;
            case Label3DType.DISTANCE:
                buildDistanceLabel(this.selectedPoints, label);
                break;
            case Label3DType.ARC:
                buildArcLabel(this.selectedPoints, label);
                break;
        }
        return label;
    };
    return Label3DBuilder;
}());var LabelManager = /** @class */ (function () {
    function LabelManager() {
        this.labelMap = new Map();
        this.shader = new Shader(LabelVertex, LabelFrag);
        ShaderCache.labelShader = this.shader;
        this.eventListener = AppObjects.externalEventDispatcher;
    }
    LabelManager.prototype.render = function () {
        __spread(this.labelMap.values()).forEach(function (label) {
            label.render();
        });
    };
    LabelManager.prototype.dispatchLabelEvent = function (label, selectedPoints, probeData) {
        this.eventListener.dispatchEvent({
            type: Events.LABEL3D_CREATED,
            data: {
                labelId: label.getId(),
                canvasPos: label.getCanvasPosition(),
                msg: label.getMessage(),
                nodeId: label.getNodeId(),
                elementId: label.getElementId(),
                type: label.getType(),
                selectedPoints: selectedPoints,
                probeData: probeData
            }
        });
    };
    LabelManager.prototype.addLabel3D = function (id, hitpt, type, probeData) {
        var _a, _b;
        var labelBuilder = new Label3DBuilder(id, this.eventListener)
            .setSelectedPoints(hitpt)
            .setType(type)
            .setProbeData(probeData)
            .setShader(this.shader);
        var label = labelBuilder.build();
        if (label.getType() === Label3DType.PROBE) {
            if (probeData) {
                this.updateLabelMessage(label);
                label.setNodeId(this.getPickedVertexIndexfromBuffer(probeData.renderNodeId, probeData.pickedVertexIndex));
                //Testing
                var renderNodeId_1 = (_a = label.getProbeData()) === null || _a === void 0 ? void 0 : _a.renderNodeId;
                var nodes = AppObjects.sceneManager.getRenderNodes();
                var selectedNode = nodes === null || nodes === void 0 ? void 0 : nodes.filter(function (node) { return node.index === renderNodeId_1; });
                if (selectedNode && selectedNode[0])
                    label.setAttachedPart(selectedNode[0].parent);
            }
        }
        if (label.getType() === Label3DType.HOTSPOT) {
            if (probeData) {
                this.updateLabelMessage(label);
                label.setNodeId(this.getPickedVertexIndexfromBuffer(probeData.renderNodeId, probeData.pickedVertexIndex));
                //Testing
                var renderNodeId_2 = (_b = label.getProbeData()) === null || _b === void 0 ? void 0 : _b.renderNodeId;
                var nodes = AppObjects.sceneManager.getRenderNodes();
                var selectedNode = nodes === null || nodes === void 0 ? void 0 : nodes.filter(function (node) { return node.index === renderNodeId_2; });
                if (selectedNode && selectedNode[0])
                    label.setAttachedPart(selectedNode[0].parent);
            }
        }
        else if (label.getType() === Label3DType.FACE) {
            if (probeData) {
                this.updateLabelMessage(label);
                label.setElementId(this.getPickedVertexIndexfromBuffer(probeData.renderNodeId, probeData.pickedVertexIndex));
            }
        }
        this.labelMap.set(id, label);
        this.dispatchLabelEvent(label, hitpt, probeData);
    };
    LabelManager.prototype.showHideLabelVisibility = function (id, flag) {
        var label = this.labelMap.get(id);
        if (label) {
            if (flag) {
                label.show();
            }
            else {
                label.hide();
            }
        }
    };
    LabelManager.prototype.add3dLabelforNodeId = function (id, type, nodeid, modelIndex, nodeidIndex, nodes) {
        var selectedNode = null;
        var hitpt = null;
        var pickedVertexIndex = null;
        nodes.every(function (node) {
            var _a, _b, _c, _d, _e, _f, _g;
            if ((_a = node === null || node === void 0 ? void 0 : node.mesh) === null || _a === void 0 ? void 0 : _a.subMeshes['primitive_0']) {
                var gltfAccessorLoader = (_e = (_d = (_c = (_b = node === null || node === void 0 ? void 0 : node.mesh) === null || _b === void 0 ? void 0 : _b.subMeshes['primitive_0']) === null || _c === void 0 ? void 0 : _c.attribs) === null || _d === void 0 ? void 0 : _d.position) === null || _e === void 0 ? void 0 : _e.getGLTFAccessor();
                var accessor = gltfAccessorLoader.getAccessor();
                var type_1 = accessor.type;
                var componentType = accessor.componentType;
                var itemSize = WEBGLTYPESIZES[type_1];
                var arrayType = WEBGLCOMPONENTTYPES[componentType];
                var dataTypeSize = new arrayType().BYTES_PER_ELEMENT;
                var index = nodeidIndex * itemSize * dataTypeSize;
                var bufferViewerLoader = accessor.bufferViewLoader;
                var bufferViewe = bufferViewerLoader.getBufferView();
                var byteOffset = bufferViewe.byteOffset;
                var byteLength = bufferViewe.byteLength;
                if (index >= byteOffset && index < (byteOffset + byteLength)) {
                    var dataArray = new arrayType((_g = (_f = node === null || node === void 0 ? void 0 : node.mesh) === null || _f === void 0 ? void 0 : _f.subMeshes['primitive_0']) === null || _g === void 0 ? void 0 : _g.attribs.position.getDataArray);
                    var vIndex = (index - byteOffset) / dataTypeSize;
                    pickedVertexIndex = vIndex / itemSize;
                    if (vIndex + 2 < dataArray.length) {
                        hitpt = [dataArray[vIndex], dataArray[vIndex + 1], dataArray[vIndex + 2]];
                        selectedNode = node;
                        return false;
                    }
                }
            }
            return true;
        });
        var probeData = {
            debugInfo: "Buffer ms",
            hitPoint: hitpt,
            nearPoint: hitpt,
            nearPointIndex: -1,
            pickedVertexIndex: pickedVertexIndex,
            connectivityIndex: -1,
            primitiveSize: null,
            renderNodeId: selectedNode ? selectedNode.index : -1,
            primitiveData: null
        };
        if (hitpt) {
            this.addLabel3D(id, [hitpt], type, probeData);
            return true;
        }
        return false;
    };
    LabelManager.prototype.deleteLabel = function (id) {
        var label = this.labelMap.get(id);
        if (label) {
            label.delete();
            this.labelMap.delete(id);
            return true;
        }
        else {
            return false;
        }
    };
    LabelManager.prototype.get3DLabelCanvasPos = function (id) {
        var label = this.labelMap.get(id);
        return label ? label.getCanvasPosition() : null;
    };
    LabelManager.prototype.updateLabelMessageFromUV = function (label) {
        var probeData = label.getProbeData();
        var nodes = AppObjects.sceneManager.getRenderNodes();
        for (var i = 0; i < nodes.length; i++) {
            if (probeData.renderNodeId === nodes[i].index) {
                var submeshName = "primitive_" + 0;
                var textureArray = nodes[i].mesh.subMeshes[submeshName].attribs.texCoord.getDataArray;
                if (textureArray) {
                    var texture = textureArray;
                    var index = probeData.pickedVertexIndex * 2;
                    if (index < texture.length) {
                        var u = texture[index];
                        //let v = texture[index + 1];
                        //console.log("U", u);
                        label.setMessage(u.toString());
                        return true;
                    }
                }
                //console.log(nodes[i])
            }
        }
        label.setMessage("NA");
        return true;
    };
    LabelManager.prototype.updateLabelMessage = function (label) {
        var probeData = label.getProbeData();
        var nodes = AppObjects.sceneManager.getRenderNodes();
        for (var i = 0; i < nodes.length; i++) {
            if (probeData && probeData.renderNodeId === nodes[i].index) {
                var submeshName = "primitive_" + 0;
                var valuesArray = nodes[i].mesh.subMeshes[submeshName].attribs.value.getDataArray;
                if (valuesArray) {
                    var values = valuesArray;
                    var index = probeData.pickedVertexIndex;
                    if (index < values.length) {
                        var value = values[index];
                        label.setMessage(value.toString());
                        return true;
                    }
                }
            }
        }
        label.setMessage("NA");
        return true;
    };
    LabelManager.prototype.getPickedVertexIndexfromBuffer = function (renderNodeId, pickedVertexIndex) {
        var _a, _b, _c, _d, _e;
        var nodes = AppObjects.sceneManager.getRenderNodes();
        var selectedNode = nodes.filter(function (node) { return node.index === renderNodeId; });
        if (selectedNode && selectedNode[0]) {
            var submeshName = "primitive_" + 0;
            var gltfAccessorLoader = (_e = (_d = (_c = (_b = (_a = selectedNode[0]) === null || _a === void 0 ? void 0 : _a.mesh) === null || _b === void 0 ? void 0 : _b.subMeshes[submeshName]) === null || _c === void 0 ? void 0 : _c.attribs) === null || _d === void 0 ? void 0 : _d.position) === null || _e === void 0 ? void 0 : _e.getGLTFAccessor();
            var accessor = gltfAccessorLoader.getAccessor();
            var type = accessor.type;
            var componentType = accessor.componentType;
            var itemSize = WEBGLTYPESIZES[type];
            var arrayType = WEBGLCOMPONENTTYPES[componentType];
            var dataTypeSize = new arrayType().BYTES_PER_ELEMENT;
            var bufferViewerLoader = accessor.bufferViewLoader;
            var bufferView = bufferViewerLoader.getBufferView();
            var byteOffset = bufferView.byteOffset / itemSize / dataTypeSize;
            return byteOffset + pickedVertexIndex;
        }
        return -1;
    };
    LabelManager.prototype.getLabel3DInfo = function (id) {
        var label = this.labelMap.get(id);
        if (label && (label.getType() === Label3DType.PROBE || label.getType() === Label3DType.LINECHART))
            this.updateLabelMessage(label); // to update new result data when new result is applied
        return {
            labelId: label.getId(),
            canvasPos: label.getCanvasPosition(),
            msg: label.getMessage(),
            nodeId: label.getNodeId(),
            elementId: label.getElementId(),
            type: label.getType(),
            selectedPoints: label.getOrigin(),
            probeData: label.getProbeData()
        };
    };
    return LabelManager;
}());var MouseState;
(function (MouseState) {
    MouseState["NONE"] = "normal";
    MouseState["DRAGGING"] = "isDragging";
    MouseState["SCROLLING"] = "isScrolling";
    MouseState["DRAG_VERTICAL"] = "vertical";
    MouseState["DRAG_HORIZONTAL"] = "horizontal";
})(MouseState || (MouseState = {}));var ActionName;
(function (ActionName) {
    ActionName["PAN"] = "PAN";
    ActionName["ROTATE"] = "ROTATE";
    ActionName["ZOOM_IN"] = "ZOOM_IN";
    ActionName["ZOOM_OUT"] = "ZOOM_OUT";
    ActionName["POINT_ZOOM_IN"] = "POINT_ZOOM_IN";
    ActionName["POINT_ZOOM_OUT"] = "POINT_ZOOM_OUT";
})(ActionName || (ActionName = {}));
var ActionType;
(function (ActionType) {
    ActionType[ActionType["MOUSE"] = 0] = "MOUSE";
    ActionType[ActionType["KEYBOARD"] = 1] = "KEYBOARD";
})(ActionType || (ActionType = {}));
/*
    This class contains a mapping to unique ActionName and data of that action. The IAction interface
    will be used to store data for that action. eg., when the action should be processed and so on.
    Like commands Class this class will be used to add new Actions and its data only
 */
var Actions = /** @class */ (function () {
    function Actions() {
        this.map = new Map([
            //#region Mouse
            [ActionName.PAN, { name: ActionName.PAN, type: ActionType.MOUSE, when: MouseState.DRAGGING },],
            [ActionName.ROTATE, { name: ActionName.ROTATE, type: ActionType.MOUSE, when: MouseState.DRAGGING }],
            [ActionName.ZOOM_IN, { name: ActionName.ZOOM_IN, type: ActionType.MOUSE, when: MouseState.DRAGGING }],
            [ActionName.ZOOM_OUT, { name: ActionName.ZOOM_OUT, type: ActionType.MOUSE, when: MouseState.DRAGGING }],
            [ActionName.POINT_ZOOM_IN, { name: ActionName.POINT_ZOOM_IN, type: ActionType.MOUSE, when: MouseState.SCROLLING }],
            [ActionName.POINT_ZOOM_OUT, { name: ActionName.POINT_ZOOM_OUT, type: ActionType.MOUSE, when: MouseState.SCROLLING }],
        ]);
    }
    Actions.prototype.getData = function (name) {
        return this.map.get(name);
    };
    Actions.prototype.getAll = function () {
        return __spread(this.map.values());
    };
    Actions.prototype.filter = function (type) {
        return __spread(this.map.values()).filter(function (act) { return act.type === type; });
    };
    return Actions;
}());var MouseButton$1;
(function (MouseButton) {
    MouseButton[MouseButton["NONE"] = 0] = "NONE";
    MouseButton[MouseButton["LEFT"] = 1] = "LEFT";
    MouseButton[MouseButton["RIGHT"] = 2] = "RIGHT";
    MouseButton[MouseButton["MIDDLE"] = 4] = "MIDDLE";
    MouseButton[MouseButton["LEFT_RIGHT"] = 3] = "LEFT_RIGHT";
    MouseButton[MouseButton["LEFT_MIDDLE"] = 5] = "LEFT_MIDDLE";
    MouseButton[MouseButton["MIDDLE_RIGHT"] = 6] = "MIDDLE_RIGHT";
    MouseButton[MouseButton["LEFT_MIDDLE_RIGHT"] = 7] = "LEFT_MIDDLE_RIGHT";
})(MouseButton$1 || (MouseButton$1 = {}));
var MouseModifier;
(function (MouseModifier) {
    MouseModifier["ALT"] = "altKey";
    MouseModifier["CTRL"] = "ctrlKey";
    MouseModifier["META"] = "metaKey";
    MouseModifier["SHIFT"] = "shiftKey";
    MouseModifier["CAPSLOCK"] = "CapsLock";
    MouseModifier["NUMLOCK"] = "NumLock";
    MouseModifier["SCROLLLOCK"] = "ScrollLock";
})(MouseModifier || (MouseModifier = {}));
var MouseInput = /** @class */ (function () {
    function MouseInput(container, inputMap) {
        this.container = container;
        this.lastXY = [0, 0];
        this.newXY = [0, 0];
        this.wheelDelta = 0;
        this.buttonsPressed = MouseButton$1.NONE;
        this.modifiers = new Map();
        this.state = MouseState.NONE;
        this.isVerticalDrag = true;
        this.timer = null;
        this.waitTime = 300;
        this.inputMap = inputMap;
    }
    MouseInput.prototype.registerEvents = function () {
        this.container.addEventListener("click", function (event) {
            AppObjects.externalEventDispatcher.dispatchEvent({
                type: Events.CLICK,
                data: event
            });
            event.preventDefault();
        });
        this.container.addEventListener("dblclick", function (event) {
            AppObjects.externalEventDispatcher.dispatchEvent({
                type: Events.DBL_CLICK,
                data: event
            });
            event.preventDefault();
        });
        this.container.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });
        this.container.addEventListener("wheel", this.handleScroll.bind(this));
        this.container.addEventListener('DOMMouseScroll', this.handleScroll.bind(this), false);
        this.container.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.container.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.container.addEventListener("mouseup", this.handleMouseUp.bind(this));
    };
    Object.defineProperty(MouseInput.prototype, "IsVerticalDrag", {
        get: function () {
            return this.isVerticalDrag;
        },
        enumerable: false,
        configurable: true
    });
    MouseInput.prototype.getKeys = function () {
        var e_1, _a, e_2, _b;
        var keys = [];
        try {
            for (var _c = __values(Object.entries(MouseButton$1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                if (Number.isNaN(parseInt(key)))
                    keys.push(this.getKeyObject(MouseButton$1[key]));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _f = __values(Object.entries(MouseModifier)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = __read(_g.value, 2), key = _h[0], value = _h[1];
                if (Number.isNaN(parseInt(key)))
                    keys.push(this.getModifierObject(MouseModifier[key]));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return keys;
    };
    MouseInput.prototype.getKeyObject = function (key) {
        var out = {};
        switch (key) {
            case MouseButton$1.NONE:
                out = { name: "None", code: MouseButton$1.NONE.toString() };
                break;
            case MouseButton$1.LEFT:
                out = { name: "Left", code: MouseButton$1.LEFT.toString() };
                break;
            case MouseButton$1.RIGHT:
                out = { name: "Right", code: MouseButton$1.RIGHT.toString() };
                break;
            case MouseButton$1.MIDDLE:
                out = { name: "Middle", code: MouseButton$1.MIDDLE.toString() };
                break;
            case MouseButton$1.MIDDLE_RIGHT:
                out = { name: "Middle right", code: MouseButton$1.MIDDLE_RIGHT.toString() };
                break;
            case MouseButton$1.LEFT_MIDDLE:
                out = { name: "Left middle", code: MouseButton$1.LEFT_MIDDLE.toString() };
                break;
            case MouseButton$1.LEFT_MIDDLE_RIGHT:
                out = { name: "Left middle right", code: MouseButton$1.LEFT_MIDDLE_RIGHT.toString() };
                break;
            case MouseButton$1.LEFT_RIGHT:
                out = { name: "Left right", code: MouseButton$1.LEFT_RIGHT.toString() };
                break;
        }
        return out;
    };
    MouseInput.prototype.getModifierObject = function (key) {
        var out = {};
        switch (key) {
            case MouseModifier.CTRL:
                out = { name: "Ctrl", code: MouseModifier.CTRL };
                break;
            case MouseModifier.ALT:
                out = { name: "Alt", code: MouseModifier.ALT };
                break;
            case MouseModifier.SHIFT:
                out = { name: "Shift", code: MouseModifier.SHIFT };
                break;
            case MouseModifier.META:
                out = { name: "Meta", code: MouseModifier.META };
                break;
            case MouseModifier.CAPSLOCK:
                out = { name: "Capslock", code: MouseModifier.CAPSLOCK };
                break;
            case MouseModifier.NUMLOCK:
                out = { name: "Numslock", code: MouseModifier.NUMLOCK };
                break;
            case MouseModifier.SCROLLLOCK:
                out = { name: "Scroll lock", code: MouseModifier.SCROLLLOCK };
                break;
        }
        return out;
    };
    MouseInput.prototype.getControls = function () {
        return [
            {
                id: '1',
                keys: this.getKeyObject(MouseButton$1.LEFT),
                modifiers: [
                    this.getModifierObject(MouseModifier.CTRL),
                    this.getModifierObject(MouseModifier.ALT)
                ]
            },
            {
                id: '2',
                keys: this.getKeyObject(MouseButton$1.MIDDLE),
                modifiers: [
                    this.getModifierObject(MouseModifier.CTRL),
                    this.getModifierObject(MouseModifier.ALT)
                ]
            },
            {
                id: '3',
                keys: this.getKeyObject(MouseButton$1.NONE),
                modifiers: []
            },
            {
                id: '4',
                keys: this.getKeyObject(MouseButton$1.RIGHT),
                modifiers: [
                    this.getModifierObject(MouseModifier.CTRL),
                    this.getModifierObject(MouseModifier.ALT)
                ]
            },
            {
                id: '5',
                keys: this.getKeyObject(MouseButton$1.MIDDLE),
                modifiers: []
            },
            {
                id: '6',
                keys: this.getKeyObject(MouseButton$1.MIDDLE),
                modifiers: [
                    this.getModifierObject(MouseModifier.CTRL),
                ]
            },
            {
                id: '7',
                keys: this.getKeyObject(MouseButton$1.MIDDLE),
                modifiers: [this.getModifierObject(MouseModifier.SHIFT)]
            },
            {
                id: '8',
                keys: this.getKeyObject(MouseButton$1.LEFT),
                modifiers: [this.getModifierObject(MouseModifier.CTRL)]
            },
            {
                id: '9',
                keys: this.getKeyObject(MouseButton$1.RIGHT),
                modifiers: [this.getModifierObject(MouseModifier.CTRL)]
            },
            {
                id: '10',
                keys: this.getKeyObject(MouseButton$1.MIDDLE_RIGHT),
                modifiers: []
            },
            {
                id: '11',
                keys: this.getKeyObject(MouseButton$1.LEFT_MIDDLE),
                modifiers: []
            },
            {
                id: '12',
                keys: this.getKeyObject(MouseButton$1.LEFT),
                modifiers: []
            },
            {
                id: '13',
                keys: this.getKeyObject(MouseButton$1.RIGHT),
                modifiers: []
            }
        ];
    };
    MouseInput.prototype.getActions = function () {
        return AppObjects.input.Actions.filter(ActionType.MOUSE).map(function (item, index) {
            return { id: (index + 1).toString(), name: item.name, when: item.when };
        });
    };
    Object.defineProperty(MouseInput.prototype, "LastXY", {
        get: function () {
            return __spread(this.lastXY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "NewXY", {
        get: function () {
            return __spread(this.newXY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MouseInput.prototype, "WheelDelta", {
        get: function () {
            return this.wheelDelta;
        },
        enumerable: false,
        configurable: true
    });
    MouseInput.prototype.isMatch = function (binding, event) {
        var keys = binding.keyCombination;
        var when = binding.when;
        var isKeyFound = keys[0] === this.buttonsPressed ? true : false;
        var bindingModifiers = [
            binding.modifiers.includes(MouseModifier.CTRL) ? true : false,
            binding.modifiers.includes(MouseModifier.SHIFT) ? true : false,
            binding.modifiers.includes(MouseModifier.ALT) ? true : false,
            binding.modifiers.includes(MouseModifier.META) ? true : false,
        ];
        var pressedModifiers = [
            this.modifiers.has(MouseModifier.CTRL) ? this.modifiers.get(MouseModifier.CTRL) : false,
            this.modifiers.has(MouseModifier.SHIFT) ? this.modifiers.get(MouseModifier.SHIFT) : false,
            this.modifiers.has(MouseModifier.ALT) ? this.modifiers.get(MouseModifier.ALT) : false,
            this.modifiers.has(MouseModifier.META) ? this.modifiers.get(MouseModifier.META) : false,
        ];
        var isModifierSatisfy = MathUtils.arraysEqual(bindingModifiers, pressedModifiers);
        globalThis.isDragging = this.state === MouseState.DRAGGING;
        globalThis.isScrolling = this.state === MouseState.SCROLLING;
        globalThis.vertical = this.isVerticalDrag;
        globalThis.horizontal = !this.isVerticalDrag;
        var isWhen = Function("return " + when)();
        if (isKeyFound && isModifierSatisfy && isWhen) {
            return true;
        }
        else {
            return false;
        }
    };
    MouseInput.prototype.processInput = function (event) {
        var e_3, _a;
        var commands = AppObjects.commands;
        try {
            for (var _b = __values(this.inputMap.Mapping.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), action = _d[0], binding = _d[1];
                if (this.isMatch(binding, event) && commands.has(action)) {
                    commands.get(action).execute();
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MouseInput.prototype.updateKeys = function (event) {
        if (event.buttons !== undefined) {
            this.buttonsPressed = event.buttons;
            this.modifiers.set(MouseModifier.ALT, event[MouseModifier.ALT]);
            this.modifiers.set(MouseModifier.CTRL, event[MouseModifier.CTRL]);
            this.modifiers.set(MouseModifier.SHIFT, event[MouseModifier.SHIFT]);
            this.modifiers.set(MouseModifier.META, event[MouseModifier.META]);
        }
    };
    MouseInput.prototype.getMousePos = function (event) {
        var contatinerPos = MathUtils.getContainerBox(this.container);
        var containerTop = contatinerPos[0];
        var containerLeft = contatinerPos[1];
        var newX = event.clientX - containerLeft;
        var newY = event.clientY - containerTop;
        return [newX, newY];
    };
    MouseInput.prototype.handleScroll = function (event) {
        event.preventDefault();
        this.state = MouseState.SCROLLING;
        this.wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        this.newXY = this.getMousePos(event);
        this.updateKeys(event);
        this.processInput(event);
        this.lastXY = __spread(this.newXY);
        this.state = MouseState.NONE;
    };
    MouseInput.prototype.handleMouseMove = function (event) {
        this.state = MouseState.DRAGGING;
        this.newXY = this.getMousePos(event);
        var dir = fromValues$1(this.newXY[0] - this.lastXY[0], this.newXY[1] - this.lastXY[1], 0);
        normalize(dir, dir);
        this.isVerticalDrag = Math.abs(dot(dir, fromValues$1(1, 0, 0))) > 0.5 ? false : true;
        this.updateKeys(event);
        this.processInput(event);
        this.lastXY = __spread(this.newXY);
        this.state = MouseState.NONE;
    };
    MouseInput.prototype.handleMouseDown = function (event) {
        this.newXY = this.getMousePos(event);
        this.updateKeys(event);
        this.processInput(event);
        this.lastXY = __spread(this.newXY);
        this.state = MouseState.NONE;
    };
    MouseInput.prototype.handleMouseUp = function (event) {
        var _this = this;
        if (event.detail === 1) {
            this.timer = setTimeout(function () {
                _this.updateKeys(event);
                _this.processInput(event);
            }, this.waitTime);
        }
        else if (event.detail === 2) {
            clearTimeout(this.timer);
            this.updateKeys(event);
            this.processInput(event);
        }
        this.state = MouseState.NONE;
    };
    return MouseInput;
}());var Default = function () {
    var map = new Map();
    map.set(ActionName.ROTATE, {
        keyCombination: [MouseButton$1.LEFT],
        modifiers: [],
        when: MouseState.DRAGGING
    });
    map.set(ActionName.PAN, {
        keyCombination: [MouseButton$1.RIGHT],
        modifiers: [],
        when: MouseState.DRAGGING
    });
    map.set(ActionName.POINT_ZOOM_IN, {
        keyCombination: [MouseButton$1.NONE],
        modifiers: [],
        when: MouseState.SCROLLING
    });
    map.set(ActionName.POINT_ZOOM_OUT, {
        keyCombination: [MouseButton$1.NONE],
        modifiers: [],
        when: MouseState.SCROLLING
    });
    map.set(ActionName.ZOOM_IN, {
        keyCombination: [MouseButton$1.MIDDLE],
        modifiers: [],
        when: MouseState.DRAGGING + " "
    });
    map.set(ActionName.ZOOM_OUT, {
        keyCombination: [MouseButton$1.MIDDLE],
        modifiers: [],
        when: "" + MouseState.DRAGGING
    });
    return map;
};var InputMap = /** @class */ (function () {
    function InputMap() {
        this.map = Default();
    }
    Object.defineProperty(InputMap.prototype, "Mapping", {
        get: function () {
            return this.map;
        },
        set: function (map) {
            this.map = map;
        },
        enumerable: false,
        configurable: true
    });
    return InputMap;
}());
function JsonToInputMap(json) {
    var e_1, _a;
    var map = new Map();
    try {
        for (var _b = __values(Object.entries(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), action = _d[0], binding = _d[1];
            map.set(action, {
                keyCombination: binding.keyCombination,
                modifiers: binding.modifiers,
                when: binding.when
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return map;
}var mouseMappings = [
    {
        id: '1',
        name: 'Vcollab',
        default: true,
        mapping: [
            { id: '1', control: '13', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '12', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '5', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '5', action: '4', when: MouseState.DRAGGING }
        ]
    },
    {
        id: '2',
        name: 'Abaqus',
        default: false,
        mapping: [
            { id: '1', control: '2', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '1', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '4', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '4', action: '4', when: MouseState.DRAGGING }
        ]
    },
    {
        id: '3',
        name: 'SolidWorks',
        default: false,
        mapping: [
            { id: '1', control: '6', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '5', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '7', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '7', action: '4', when: MouseState.DRAGGING }
        ]
    },
    {
        id: '4',
        name: 'HyperView',
        default: false,
        mapping: [
            { id: '1', control: '6', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '5', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '7', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '7', action: '4', when: MouseState.DRAGGING }
        ]
    },
    {
        id: '5',
        name: 'ProEngineer',
        default: false,
        mapping: [
            { id: '1', control: '7', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '5', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '6', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '6', action: '4', when: MouseState.DRAGGING }
        ]
    },
    {
        id: '6',
        name: 'NX',
        default: false,
        mapping: [
            { id: '1', control: '10', action: '1', when: MouseState.DRAGGING },
            { id: '2', control: '5', action: '2', when: MouseState.DRAGGING },
            { id: '3', control: '3', action: '5', when: MouseState.SCROLLING },
            { id: '4', control: '3', action: '6', when: MouseState.SCROLLING },
            { id: '5', control: '11', action: '3', when: MouseState.DRAGGING },
            { id: '6', control: '11', action: '4', when: MouseState.DRAGGING }
        ]
    }
];var Input = /** @class */ (function () {
    function Input(container, disableMouseEvents) {
        this.container = container;
        this.actions = new Actions();
        this.mouseInputMap = new InputMap();
        this.mouse = new MouseInput(container, this.mouseInputMap);
        if (disableMouseEvents !== true)
            this.registerEvents();
    }
    Input.prototype.registerEvents = function () {
        this.mouse.registerEvents();
    };
    Object.defineProperty(Input.prototype, "Actions", {
        get: function () {
            return this.actions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "Mouse", {
        get: function () {
            return this.mouse;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.setMouseMappings = function (json) {
        var out = JsonToInputMap(json);
        if (out instanceof Object) {
            this.mouseInputMap.Mapping = out;
            return true;
        }
        else {
            return false;
        }
    };
    Input.prototype.getSystemMouseMappings = function () {
        return mouseMappings;
    };
    return Input;
}());/*
    This class is the commands registry. It has mapping to action name and the command to be executed.
    Mostly this class wont be changed dynamically, as its only purpose is to add new commands and map it
    to a unique action name provided by the 'ActionName' enum
*/
var Commands = /** @class */ (function () {
    function Commands() {
        this.map = new Map([
            [ActionName.ROTATE, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            var _b = __read(AppObjects.input.Mouse.LastXY, 2), lastX = _b[0], lastY = _b[1];
                            var _c = __read(AppObjects.input.Mouse.NewXY, 2), newX = _c[0], newY = _c[1];
                            if (AppObjects.partManipulator.isPartMoveEnabled)
                                AppObjects.partManipulator.rotatePart(newX, newY, lastX, lastY);
                            else
                                AppObjects.renderer.camControl.onMouseRotation(newX, newY, lastX, lastY);
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
            [ActionName.PAN, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            var _b = __read(AppObjects.input.Mouse.LastXY, 2), lastX = _b[0], lastY = _b[1];
                            var _c = __read(AppObjects.input.Mouse.NewXY, 2), newX = _c[0], newY = _c[1];
                            if (AppObjects.partManipulator.isPartMoveEnabled)
                                AppObjects.partManipulator.translatePart(newX, newY, lastX, lastY);
                            else
                                AppObjects.renderer.camControl.onMousePanRotation(newX, newY, lastX, lastY);
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
            [ActionName.POINT_ZOOM_IN, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            AppObjects.renderer.camControl.setZoomType(ZoomType.MOUSE_WHEEL);
                            var _b = __read(AppObjects.input.Mouse.NewXY, 2), newX = _b[0], newY = _b[1];
                            var delta = AppObjects.input.Mouse.WheelDelta;
                            if (delta > 0)
                                AppObjects.renderer.camControl.pointZoomIn(newX, newY, 1);
                            else
                                return false;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
            [ActionName.POINT_ZOOM_OUT, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            AppObjects.renderer.camControl.setZoomType(ZoomType.MOUSE_WHEEL);
                            var _b = __read(AppObjects.input.Mouse.NewXY, 2), newX = _b[0], newY = _b[1];
                            var delta = AppObjects.input.Mouse.WheelDelta;
                            if (delta < 0)
                                AppObjects.renderer.camControl.pointZoomOut(newX, newY, 1);
                            else
                                return false;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
            [ActionName.ZOOM_IN, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            AppObjects.renderer.camControl.setZoomType(ZoomType.MIDDLE_ZOOM);
                            var _b = __read(AppObjects.input.Mouse.NewXY, 2), newX = _b[0], newY = _b[1];
                            var _c = __read(AppObjects.input.Mouse.LastXY, 2), lastX = _c[0], lastY = _c[1];
                            var delta = AppObjects.input.Mouse.IsVerticalDrag ? lastY - newY : lastX - newX;
                            if (delta > 0) {
                                if (AppObjects.partManipulator.isPartMoveEnabled)
                                    AppObjects.partManipulator.translateZ(delta);
                                else
                                    AppObjects.renderer.camControl.zoomIn(delta);
                            }
                            else
                                return false;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
            [ActionName.ZOOM_OUT, {
                    execute: function () {
                        var _a;
                        if ((_a = AppObjects.input) === null || _a === void 0 ? void 0 : _a.Mouse) {
                            AppObjects.renderer.camControl.setZoomType(ZoomType.MIDDLE_ZOOM);
                            var _b = __read(AppObjects.input.Mouse.NewXY, 2), newX = _b[0], newY = _b[1];
                            var _c = __read(AppObjects.input.Mouse.LastXY, 2), lastX = _c[0], lastY = _c[1];
                            var delta = AppObjects.input.Mouse.IsVerticalDrag ? lastY - newY : lastX - newX;
                            if (delta < 0) {
                                if (AppObjects.partManipulator.isPartMoveEnabled)
                                    AppObjects.partManipulator.translateZ(delta);
                                else
                                    AppObjects.renderer.camControl.zoomOut(Math.abs(delta));
                            }
                            else
                                return false;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }],
        ]);
    }
    Commands.prototype.has = function (action) {
        return this.map.has(action);
    };
    Commands.prototype.get = function (action) {
        return this.map.get(action);
    };
    return Commands;
}());var AnimationManger = /** @class */ (function () {
    function AnimationManger() {
        this._IsAnimationOn = false;
        this._type = AppConstants.AnimationType.NONE;
        this._numberOfFrames = 16;
        this._frameFactor = 0;
        this._scaleFactor = [1, 1, 1];
    }
    Object.defineProperty(AnimationManger.prototype, "IsAnimationOn", {
        get: function () {
            return this._IsAnimationOn;
        },
        set: function (value) {
            this._IsAnimationOn = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationManger.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationManger.prototype, "numberOfFrames", {
        get: function () {
            return this._numberOfFrames;
        },
        set: function (value) {
            this._numberOfFrames = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationManger.prototype, "frameFactor", {
        get: function () {
            return this._frameFactor;
        },
        set: function (value) {
            this._frameFactor = value;
            var frameNumber = (this._frameFactor * (this._numberOfFrames - 1)) + 1;
            AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.ANIMATION_FRAME_NUMBER, data: { frameNumber: frameNumber } });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnimationManger.prototype, "scaleFactor", {
        get: function () {
            return this._scaleFactor;
        },
        set: function (value) {
            this._scaleFactor = value;
        },
        enumerable: false,
        configurable: true
    });
    return AnimationManger;
}());var ColorValueManager = /** @class */ (function () {
    function ColorValueManager() {
        this.valueMinMax = [0, 0];
        this.belowMinColor = [0, 0, 1, 1];
        this.aboveMaxColor = [1, 0, 0, 1];
        this.noResultColor = [0.827, 0.827, 0.827, 1];
    }
    ColorValueManager.prototype.setValueMinMax = function (minMax) {
        this.valueMinMax = minMax;
    };
    ColorValueManager.prototype.getValueMinMax = function () {
        return this.valueMinMax;
    };
    ColorValueManager.prototype.setBelowMinColor = function (color) {
        this.belowMinColor = color;
    };
    ColorValueManager.prototype.getBelowMinColor = function () {
        return this.belowMinColor;
    };
    ColorValueManager.prototype.setAboveMaxColor = function (color) {
        this.aboveMaxColor = color;
    };
    ColorValueManager.prototype.getAboveMaxColor = function () {
        return this.aboveMaxColor;
    };
    ColorValueManager.prototype.setNoResultColor = function (color) {
        this.noResultColor = color;
    };
    ColorValueManager.prototype.getNoResultColor = function () {
        return this.noResultColor;
    };
    ColorValueManager.prototype.getMinMAXNoResultColor = function () {
        return new Float32Array(__spread(this.belowMinColor.map(this.normalizeColor), this.aboveMaxColor.map(this.normalizeColor), this.noResultColor.map(this.normalizeColor)));
    };
    ColorValueManager.prototype.normalizeColor = function (value) {
        return value / 255;
    };
    return ColorValueManager;
}());var App = /** @class */ (function () {
    function App(_containerID, _connectorObject, _disableMouseEvents) {
        this.containerID = _containerID;
        this.externalConnector = _connectorObject;
        this.externalEventDispatcher = null;
        this.GLTFJson = null;
        this.disableMouseEvents = _disableMouseEvents;
    }
    App.prototype.init = function (serverAddress) {
        var containerDom = document.getElementById(this.containerID);
        //FOR TESTING ONLY NEED TO BE COMMENTED
        this.externalEventDispatcher = new EventDispatcher();
        AppObjects.externalEventDispatcher = this.externalEventDispatcher;
        if (this.externalConnector) {
            this.serverConnection = null;
            AppObjects.serverConnection = this.externalConnector;
            this.externalEventDispatcher = new EventDispatcher();
            AppObjects.externalEventDispatcher = this.externalEventDispatcher;
        }
        else {
            this.externalConnector = null;
            this.serverConnection = new ServerConnector(ServerConnectionType.AXIOS);
            AppObjects.serverConnection = this.serverConnection;
        }
        this.dataManager = new DataManager(serverAddress, this.serverConnection, this.externalConnector);
        AppObjects.dataManager = this.dataManager;
        this.sceneManager = new SceneManager(containerDom);
        AppObjects.sceneManager = this.sceneManager;
        this.renderer = new Renderer(this.sceneManager, this.containerID);
        AppObjects.renderer = this.renderer;
        this.picker = new Picker();
        AppObjects.picker = this.picker;
        this.colorValueManager = new ColorValueManager();
        AppObjects.colorValueManager = this.colorValueManager;
        this.sectionManager = new SectionManager(this.renderer.camControl);
        AppObjects.sectionManager = this.sectionManager;
        this.partManipulator = new PartManipulator();
        AppObjects.partManipulator = this.partManipulator;
        this.labelManager = new LabelManager();
        AppObjects.labelManager = this.labelManager;
        this.animationManager = new AnimationManger();
        AppObjects.animationManager = this.animationManager;
        this.input = new Input(containerDom, this.disableMouseEvents);
        AppObjects.input = this.input;
        this.mouseControl = new MouseControl(this.renderer.camControl);
        AppObjects.mouseControl = this.mouseControl;
        this.keyboardControl = new KeyboardControl(containerDom, this);
        AppObjects.keyboardControl = this.keyboardControl;
        this.commands = new Commands();
        AppObjects.commands = this.commands;
        this.renderer.startRenderLoop();
        return true;
    };
    App.prototype.loadGLTF = function (json) {
        var _this = this;
        this.GLTFJson = json;
        return new Promise(function (resolve) {
            _this.dataManager.loadGLTF(json).then(function (scene) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ////console.log(scene);  
                            json.scene = scene;
                            return [4 /*yield*/, this.loadScene(json)];
                        case 1:
                            _a.sent();
                            resolve(true);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    App.prototype.load = function (filePath) {
        var _this = this;
        if (this.dataManager) {
            this.dataManager.load(filePath).then(function (data) {
                ////console.log(data);
                _this.loadScene(data);
            }, function (error) {
                ////console.log(error);
            });
            return true;
        }
        else {
            return false;
        }
    };
    App.prototype.loadScene = function (GLTFJson) {
        return __awaiter(this, void 0, void 0, function () {
            var data, name, scene, resultSet, type_1;
            return __generator(this, function (_a) {
                data = GLTFJson;
                name = "Root";
                try {
                    name = data.scene.children[0].name;
                }
                catch (error) {
                    ////console.error("Model name not exists", error);
                }
                scene = new Scene(name, null);
                if (data.scene.camera)
                    this.renderer.updateCamera(data.scene.camera);
                if (data.scene.backPlane !== undefined)
                    this.renderer.renderer2D.updateBackPlane(data.scene.backPlane);
                if (data.scene.frontPlane !== undefined)
                    this.renderer.renderer2D.updateFrontPlane(data.scene.frontPlane);
                scene.constructFrom(data.scene);
                this.sceneManager.addScene(scene);
                resultSet = {
                    results: [],
                    resultsNameList: [],
                    steps: [],
                    stepsNameList: [],
                    derivedTypes: [],
                    derivedTypesNameList: [],
                    result: null,
                    step: null,
                    derivedType: null,
                };
                if (data.csel !== undefined && data.csel !== null) {
                    if (data.csel.result !== undefined)
                        resultSet.result = data.csel.result;
                    if (data.csel.step !== undefined)
                        resultSet.step = data.csel.step;
                    if (data.csel.derivedType !== undefined)
                        resultSet.derivedType = data.csel.derivedType;
                }
                if (data.rsd !== undefined && data.rsd !== null) {
                    if (data.rsd.results !== undefined
                        && data.rsd.steps !== undefined
                        && data.rsd.derivedTypes !== undefined) {
                        data.rsd.results.forEach(function (element, index) {
                            element.index = index;
                            if (element.display === true) {
                                resultSet.resultsNameList.push({
                                    name: element.name,
                                    value: index
                                });
                            }
                        });
                        data.rsd.steps.forEach(function (element, index) {
                            element.resultBinaryStatus = parseInt(element.resultStatus, 10).toString(2);
                            var checkBit = element.resultBinaryStatus.split('').reverse().join('');
                            var resultIndex = (resultSet.result);
                            var includedStep = false;
                            if (resultIndex <= checkBit.length)
                                includedStep = (checkBit[resultIndex] === '1' ? true : false);
                            if (includedStep) {
                                resultSet.stepsNameList.push({
                                    name: element.name,
                                    value: index
                                });
                            }
                        });
                        type_1 = null;
                        if (resultSet.result != null)
                            type_1 = data.rsd.results[resultSet.result].type;
                        data.rsd.derivedTypes.forEach(function (element) {
                            if (element.name === type_1) {
                                element.children.forEach(function (item, itemIndex) {
                                    resultSet.derivedTypesNameList.push({
                                        name: item.name,
                                        value: itemIndex
                                    });
                                });
                            }
                        });
                        resultSet.results = data.rsd.results;
                        resultSet.steps = data.rsd.steps;
                        resultSet.derivedTypes = data.rsd.derivedTypes;
                    }
                    if (data.rsd.baseUrl !== undefined)
                        AppState.BaseUrl = data.rsd.baseUrl;
                }
                AppState.resultSet = resultSet;
                ////console.log("Result Set :", resultSet); 
                //AppObjects.sectionManager.init();
                AppState.isSceneLoaded = true;
                if (AppObjects.externalEventDispatcher)
                    AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.MODEL_LOADED, data: {} });
                return [2 /*return*/, true];
            });
        });
    };
    App.prototype.addCaxFile = function (filePath) {
        var _this = this;
        if (this.dataManager) {
            this.dataManager.addCaxFile(filePath).then(function (result) {
                _this.load(result.json_url);
            }, function (error) {
                ////console.log(error);
            });
            return true;
        }
        else {
            return false;
        }
    };
    App.prototype.addFile = function (API, filePath) {
        var _this = this;
        if (this.dataManager) {
            this.dataManager.addFile(API, filePath).then(function (result) {
                _this.load(result.json_url);
            }, function (error) {
                ////console.log(error);
            });
            return true;
        }
        else {
            return false;
        }
    };
    App.prototype.getSceneBoundingBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        return this.sceneManager.getBoundingBox(onlyVisible);
    };
    App.prototype.fitView = function (selectedNodeIds) {
        var bbox = this.sceneManager.getBoundingBox();
        this.renderer.camControl.setBoundingBox(bbox);
        if (selectedNodeIds.length !== 0) {
            var selectedNodes = this.getRenderNodesFromId(selectedNodeIds);
            var nodesBBox = this.sceneManager.getBoundingBoxFromNodes(selectedNodes);
            this.renderer.camControl.fitView(nodesBBox);
        }
        else
            this.renderer.camControl.fitView();
    };
    App.prototype.setBackgroundColor = function (colors) {
        this.renderer.setBackgroundColor(AppConstants.BackgroundType.GRADIENT, colors);
    };
    App.prototype.setBackgroundImage = function (data) {
        this.renderer.setBackgroundImage(data);
    };
    App.prototype.setDisplayMode = function (value, arr) {
        var scenes = this.sceneManager.getScenes();
        scenes.forEach(function (scene) {
            var nodes = scene.getRenderableObjects();
            if (nodes && arr.length == 0) {
                nodes.forEach(function (node) {
                    if (node.mesh)
                        node.displayMode = value;
                });
            }
            else if (nodes) {
                arr.forEach(function (id) {
                    for (var i = 0; i < nodes.length; i++)
                        if (id === nodes[i].index) {
                            nodes[i].displayMode = value;
                            break;
                        }
                });
            }
        });
    };
    App.prototype.setHighlightedNodes = function (nodeIds, visibility) {
        this.setNodeVisibility(nodeIds, visibility);
        var nodes = this.getRenderNodesFromId(nodeIds);
        nodes.forEach(function (node) {
            node.subType = AppConstants.NodeSubType.HIGHLIGHT;
            if (visibility) {
                AppObjects.renderer.highlightedNodes.set(node.index, node);
            }
            else {
                AppObjects.renderer.highlightedNodes.delete(node.index);
            }
            ////console.log(node.mesh.subMeshes['primitive_0'].material.diffuseColor = visibility ? [1,1,0] : [0,0,0]);
        });
    };
    App.prototype.cloneRenderNode = function (sourceRenderNodeId, targetRenderNodeId, isDeep) {
        var sourceNode = this.getRenderNodesFromId([sourceRenderNodeId]);
        var targetNode = sourceNode[0].clone();
        targetNode.index = targetRenderNodeId;
        this.sceneManager.addRenderNodes(sourceRenderNodeId, [targetNode]);
    };
    App.prototype.applyResultByURL = function (filePath) {
        var _this = this;
        if (this.dataManager) {
            this.dataManager.applyResult(filePath)
                .then(function (scene) {
                _this.sceneManager.applyResult(scene);
            })
                .catch(function (error) {
                ////console.error(error);
            });
            return true;
        }
        else {
            return false;
        }
    };
    App.prototype.applyResult_old = function (selectedResultName, selectedStepName, derivedTypeFunc) {
        var resultURL = AppState.BaseUrl + ("?result=" + selectedResultName + "&step=" + selectedStepName + "&derived=" + derivedTypeFunc);
        return this.applyResultByURL(resultURL);
    };
    App.prototype.applyResult = function (glft) {
        var _this = this;
        this.dataManager.loadGLTF(glft).then(function (scene) {
            var leafNodes = Utility.getAllLeafNode(scene);
            var meshNodes = Utility.getAllLeafNode(leafNodes.filter(function (item) { return item.mesh; }));
            var sceneNodes = _this.sceneManager.getRenderNodes();
            AccessorCache.removeAll();
            BufferViewCache.removeAll();
            //BufferCache.removeAll();
            meshNodes.forEach(function (item) {
                sceneNodes.forEach(function (node) {
                    if (node.index === item.index) {
                        if (node.mesh && item.mesh) {
                            var primitive_name = item.mesh.primitives[0].name;
                            if (node.mesh.subMeshes[primitive_name].attribs.texCoord) {
                                node.mesh.subMeshes[primitive_name].attribs.clearPromise();
                                node.mesh.subMeshes[primitive_name].attribs.texCoord.setGLTFAccessor(item.mesh.primitives[0].attributes.TEXCOORD_0);
                                node.mesh.subMeshes[primitive_name].attribs.texCoord.clearData();
                                //node.mesh.subMeshes[primitive_name].attribs.texCoord.getData();
                                node.mesh.subMeshes[primitive_name].material.setUseTexture(true);
                            }
                        }
                    }
                });
            });
        });
    };
    App.prototype.setValueMinMax = function (minMax) {
        this.colorValueManager.setValueMinMax(minMax);
    };
    App.prototype.getValueMinMax = function () {
        return this.colorValueManager.getValueMinMax();
    };
    App.prototype.setBelowMinColor = function (color) {
        this.colorValueManager.setBelowMinColor(color);
    };
    App.prototype.setAboveMaxColor = function (color) {
        this.colorValueManager.setAboveMaxColor(color);
    };
    App.prototype.setNoResultColor = function (color) {
        this.colorValueManager.setNoResultColor(color);
    };
    App.prototype.updateTextureCoordsArrayBuffer = function (url, arrayBuffer) {
        ////console.log(url);
        ////console.log(arrayBuffer);
        var scope = this;
        var promises = [];
        var webglBuffers = WEBGLBufferCache.getAll();
        webglBuffers.forEach(function (item) {
            var promise = item.replaceBufferData(url, arrayBuffer);
            if (promise instanceof Promise)
                promises.push(promise);
        });
        Promise.all(promises)
            .then(function () {
            var nodes = scope.sceneManager.getRenderNodes();
            var visibleNodes = nodes.filter(function (node) { return node.visible; }).map(function (node) { return node.index; });
            if (visibleNodes.length > 0)
                scope.setUseTexture(visibleNodes, true);
        })
            .catch(function (error) {
            throw new Error(error);
        });
    };
    App.prototype.updateValuesArrayBuffer = function (url, arrayBuffer) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var promises, webglBuffers;
            return __generator(this, function (_a) {
                promises = [];
                webglBuffers = WEBGLBufferCache.getAll();
                webglBuffers.forEach(function (item) {
                    var promise = item.replaceBufferData(url, arrayBuffer);
                    if (promise instanceof Promise)
                        promises.push(promise);
                });
                Promise.all(promises)
                    .then(function () {
                    //console.log("Values updated successfully");
                    resolve(true);
                })
                    .catch(function (error) {
                    //throw new Error(error);
                    reject(error);
                });
                return [2 /*return*/];
            });
        }); });
    };
    App.prototype.updateDeformationValueBuffer = function (arrayBuffer, selectedPartNodes) {
        var renderNodes = this.getRenderNodesFromId(selectedPartNodes);
        if (renderNodes) {
            var result_1 = [];
            renderNodes.forEach(function (node) {
                var _a, _b, _c, _d, _e;
                var primitive_0 = 'primitive_0';
                if ((_a = node === null || node === void 0 ? void 0 : node.mesh) === null || _a === void 0 ? void 0 : _a.subMeshes[primitive_0]) {
                    var bufferAttribute = null;
                    var gltfAccessorLoader = (_e = (_d = (_c = (_b = node === null || node === void 0 ? void 0 : node.mesh) === null || _b === void 0 ? void 0 : _b.subMeshes[primitive_0]) === null || _c === void 0 ? void 0 : _c.attribs) === null || _d === void 0 ? void 0 : _d.position) === null || _e === void 0 ? void 0 : _e.getGLTFAccessor();
                    var accessor = gltfAccessorLoader.getAccessor();
                    var componentType = accessor.componentType;
                    var arrayType = WEBGLCOMPONENTTYPES[componentType];
                    var dataTypeSize = new arrayType().BYTES_PER_ELEMENT;
                    //const accessorType :string = accessor.type;
                    //const itemSize:number = WEBGLTYPESIZES[accessorType]; 
                    var bufferViewData = accessor.bufferViewLoader.getBufferView();
                    var byteOffset = bufferViewData.byteOffset;
                    var byteLength = bufferViewData.byteLength;
                    var target = bufferViewData.target;
                    var size = (byteLength) / dataTypeSize;
                    var data = null;
                    if (arrayBuffer)
                        data = new arrayType(arrayBuffer, byteOffset, size);
                    if (target === BufferTarget.ARRAY_BUFFER) {
                        bufferAttribute = new WebGLArrayBuffer(accessor.uid + ":deformvalues", BufferUsage.STATIC_DRAW, data);
                        bufferAttribute.name = accessor.name + ";deformvalues";
                        //bufferAttribute.setGLTFAccessor(gltfAccessorLoader);
                        WEBGLBufferCache.add(bufferAttribute.name, bufferAttribute);
                        node.mesh.subMeshes[primitive_0].attribs.CustomBuffers['deformvalues'] = bufferAttribute;
                        //console.log(data);
                        //console.log(node?.mesh?.subMeshes[primitive_0]?.attribs?.position?.getDataArray);
                        result_1.push(true);
                    }
                }
            });
            if (result_1.length === renderNodes.length)
                return true;
        }
        return false;
    };
    App.prototype.replaceWEBGLBuffer = function (obj, arrayBuffer) {
        ////console.log(obj);
        /*
        let nodes = this.sceneManager.getRenderNodes();
        nodes.forEach(node =>
        {
            if(node.index ===  obj.nodeIndex)
                node.visible = true;
                
        });

        */
        var key = "accessor_" + obj.accessorIndex;
        var selectedwebglBuffer = WEBGLBufferCache.get(key);
        ////console.log(arrayBuffer);
        if (selectedwebglBuffer) {
            selectedwebglBuffer.updateBufferData(arrayBuffer);
        }
        ////console.log(selectedwebglBuffer);
    };
    App.prototype.getEventDispatcher = function () {
        return AppObjects.externalEventDispatcher;
    };
    App.prototype.getEvents = function () {
        return Events;
    };
    App.prototype.getResultSet = function () {
        return AppState.resultSet;
    };
    App.prototype.setUseTexture = function (nodeIndexList, useTexture) {
        var nodes = this.sceneManager.getRenderNodes();
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            nodeIndexList.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        nodes[i].setUseTexture(useTexture);
                        break;
                    }
            });
        }
        else {
            nodes.forEach(function (node) {
                node.setUseTexture(useTexture);
            });
        }
        var bbox = this.sceneManager.updateBBox();
        AppObjects.renderer.camControl.setBoundingBox(bbox);
    };
    App.prototype.setTextureData = function (textureData) {
        var nodes = this.sceneManager.getRenderNodes();
        nodes.forEach(function (node) {
            node.setTextureData(textureData);
        });
    };
    App.prototype.setNodeVisibility = function (nodeIndexList, visibility) {
        var nodes = this.sceneManager.getRenderNodes();
        ////console.log(nodes);
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            nodeIndexList.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        nodes[i].visible = visibility;
                        if (nodes[i].parent && nodes[i].parent.addAttachedLabels) {
                            nodes[i].parent.attachedLabels.forEach(function (element) {
                                AppObjects.externalEventDispatcher.dispatchEvent({ type: Events.LABEL_VISIBILITY, data: { labelId: element.getId(), attachedParentVisibility: visibility } });
                            });
                        }
                        break;
                    }
            });
        }
        else {
            nodes.forEach(function (node) {
                node.visible = visibility;
            });
        }
        var bbox = this.sceneManager.updateBBox();
        AppObjects.renderer.camControl.setBoundingBox(bbox);
    };
    App.prototype.showHiddenLines = function (meshNodes, lineNodes) {
        var nodes = this.sceneManager.getRenderNodes();
        if (meshNodes && meshNodes instanceof Array && meshNodes.length > 0 &&
            lineNodes && lineNodes instanceof Array && lineNodes.length > 0) {
            meshNodes.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        if (nodes[i].mesh)
                            nodes[i].setColorMask(false);
                    }
            });
            lineNodes.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        if (nodes[i].mesh)
                            nodes[i].renderPass = AppConstants.RenderPass.SECONDPASS;
                    }
            });
        }
    };
    App.prototype.setColorMask = function (nodes, value) {
        var renderNodes = this.sceneManager.getRenderNodes();
        nodes.forEach(function (node) {
            var matched = renderNodes.find(function (renderNode) { return renderNode.index === node; });
            if (matched) {
                matched.setColorMask(value);
            }
        });
    };
    App.prototype.setUseUserDefinedColor = function (nodeList, useUserDefinedColor) {
        var nodes = this.sceneManager.getRenderNodes();
        if (nodeList && nodeList instanceof Array && nodeList.length > 0) {
            nodeList.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        if (nodes[i].mesh)
                            nodes[i].mesh.setUseUserDefinedColor(useUserDefinedColor);
                    }
            });
        }
    };
    App.prototype.setNodeTransparency = function (nodeIndex, transparency) {
        if (transparency === void 0) { transparency = 0; }
        var nodes = this.sceneManager.getRenderNodes();
        if (nodeIndex && nodeIndex instanceof Array && nodeIndex.length > 0) {
            nodeIndex.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index && nodes[i].type === AppConstants.NodeType.SHAPE) {
                        nodes[i].setTransparency(transparency);
                        break;
                    }
            });
        }
        else {
            nodes.forEach(function (node) {
                if (node.type === AppConstants.NodeType.SHAPE)
                    node.setTransparency(transparency);
            });
        }
    };
    App.prototype.getIsRenderDataAvailable = function (nodeIndexList) {
        var returnValue = true;
        var nodes = this.sceneManager.getRenderNodes();
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            for (var j = 0; j < nodeIndexList.length; j++) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodeIndexList[j] === nodes[i].index) {
                        var node = nodes[i];
                        if (node.mesh) {
                            if (node.mesh.mainMesh) {
                                returnValue = node.mesh.mainMesh.isDataAvailable();
                                if (returnValue === false)
                                    return false;
                            }
                            for (var key in node.mesh.subMeshes) {
                                var submesh = node.mesh.subMeshes[key];
                                returnValue = submesh.isDataAvailable();
                                if (returnValue === false)
                                    return false;
                            }
                        }
                    }
                }
            }
        }
        return returnValue;
    };
    App.prototype.getIsAttributeDataAvailable = function (nodeIdx, accessorId) {
        var _a, _b, _c, _d;
        var node = this.sceneManager.getRenderNodes().find(function (e) { return e.index === nodeIdx; });
        if (node) {
            if (node.mesh) {
                var meshes = [];
                if (node.mesh.mainMesh) {
                    meshes.push(node.mesh.mainMesh);
                }
                for (var key in node.mesh.subMeshes) {
                    var submesh = node.mesh.subMeshes[key];
                    meshes.push(submesh);
                }
                var found = false;
                var isDataAvailable = false;
                for (var i = 0; i < meshes.length; i++) {
                    var attrb = meshes[i].attribs;
                    if (found) {
                        break;
                    }
                    switch (accessorId) {
                        case (_a = attrb.position) === null || _a === void 0 ? void 0 : _a.getGLTFAccessorId():
                            isDataAvailable = attrb.position.isDataAvailable();
                            found = true;
                            break;
                        case (_b = attrb.normal) === null || _b === void 0 ? void 0 : _b.getGLTFAccessorId():
                            isDataAvailable = attrb.normal.isDataAvailable();
                            found = true;
                            break;
                        case (_c = attrb.texCoord) === null || _c === void 0 ? void 0 : _c.getGLTFAccessorId():
                            isDataAvailable = attrb.texCoord.isDataAvailable();
                            found = true;
                            break;
                        case (_d = attrb.color) === null || _d === void 0 ? void 0 : _d.getGLTFAccessorId():
                            isDataAvailable = attrb.color.isDataAvailable();
                            found = true;
                            break;
                    }
                }
                return isDataAvailable;
            }
        }
        return false;
    };
    App.prototype.getDownloadDataSize = function (nodeIndexList) {
        var size = 0;
        var nodes = this.sceneManager.getRenderNodes();
        var bufferViewIndex = [];
        var bufferMap = new Map();
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            for (var j = 0; j < nodeIndexList.length; j++) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodeIndexList[j] === nodes[i].index) {
                        var node = nodes[i];
                        if (node.mesh) {
                            if (node.mesh.mainMesh) {
                                var indexes = node.mesh.mainMesh.getBufferViewIndex();
                                bufferViewIndex = __spread(bufferViewIndex, indexes);
                            }
                            for (var key in node.mesh.subMeshes) {
                                var submesh = node.mesh.subMeshes[key];
                                var indexes = submesh.getBufferViewIndex();
                                bufferViewIndex = __spread(bufferViewIndex, indexes);
                            }
                        }
                    }
                }
            }
        }
        if (this.GLTFJson) {
            var bufferViews_1 = this.GLTFJson.bufferViews;
            bufferViewIndex.forEach(function (element) {
                if (element < bufferViews_1.length) {
                    var bufferView = bufferViews_1[element];
                    var buffer = bufferMap.get(bufferView.buffer);
                    if (buffer) {
                        if (bufferView.byteOffset < buffer.offset)
                            buffer.offset = bufferView.byteOffset;
                        if ((bufferView.byteOffset + bufferView.byteLength) > buffer.length)
                            buffer.length = bufferView.byteOffset + bufferView.byteLength;
                    }
                    else {
                        bufferMap.set(bufferView.buffer, {
                            offset: bufferView.byteOffset,
                            length: bufferView.byteOffset + bufferView.byteLength
                        });
                    }
                }
            });
            bufferMap.forEach(function (value, key) {
                ////console.log(key, value);
                size += value.length - value.offset;
            });
        }
        return size;
    };
    App.prototype.downloadNodeRenderData = function (nodeIndexList) {
        var scope = this;
        return new Promise(function (resolve, reject) {
            var timer = null;
            try {
                timer = setInterval(function () {
                    var isDataAvailable = scope.getIsRenderDataAvailable(nodeIndexList);
                    if (isDataAvailable === true) {
                        clearInterval(timer);
                        resolve(true);
                    }
                    else {
                        var nodes = scope.sceneManager.getRenderNodes();
                        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
                            for (var j = 0; j < nodeIndexList.length; j++) {
                                for (var i = 0; i < nodes.length; i++) {
                                    if (nodeIndexList[j] === nodes[i].index) {
                                        var node = nodes[i];
                                        if (node.mesh) {
                                            if (node.mesh.mainMesh) {
                                                if (node.mesh.mainMesh.isDataAvailable() === false) {
                                                    node.mesh.mainMesh.getData();
                                                }
                                            }
                                            for (var key in node.mesh.subMeshes) {
                                                var submesh = node.mesh.subMeshes[key];
                                                if (submesh.isDataAvailable() === false) {
                                                    submesh.getData();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, 500);
            }
            catch (error) {
                if (timer)
                    clearInterval(timer);
                reject(error);
            }
        });
    };
    App.prototype.downloadNodeDataAndRender = function (nodeIndexList) {
        var scope = this;
        return new Promise(function (resolve, reject) {
            var timer = null;
            try {
                timer = setInterval(function () {
                    var isDataAvailable = scope.getIsRenderDataAvailable(nodeIndexList);
                    if (isDataAvailable === true) {
                        clearInterval(timer);
                        resolve(true);
                    }
                    else {
                        var nodes = scope.sceneManager.getRenderNodes();
                        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
                            for (var j = 0; j < nodeIndexList.length; j++) {
                                for (var i = 0; i < nodes.length; i++) {
                                    if (nodeIndexList[j] === nodes[i].index) {
                                        var node = nodes[i];
                                        if (node.mesh) {
                                            if (node.mesh.mainMesh) {
                                                if (node.mesh.mainMesh.isDataAvailable() === false) {
                                                    node.mesh.mainMesh.getData();
                                                }
                                            }
                                            for (var key in node.mesh.subMeshes) {
                                                var submesh = node.mesh.subMeshes[key];
                                                if (submesh.isDataAvailable() === false) {
                                                    submesh.getData();
                                                }
                                            }
                                            node.visible = true;
                                            var bbox = scope.sceneManager.updateBBox();
                                            AppObjects.renderer.camControl.setBoundingBox(bbox);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, 500);
            }
            catch (error) {
                if (timer)
                    clearInterval(timer);
                reject(error);
            }
        });
    };
    App.prototype.getSceneGraphJSON = function () {
        return this.sceneManager.getSceneGraphJSON();
    };
    App.prototype.captureScreen = function () {
        var imageType = AppConstants.imageFormat.PNG.mimeType;
        var extention = AppConstants.imageFormat.PNG.extension;
        var imageQuality = 1.0;
        var url = this.renderer.captureImage(imageType, imageQuality);
        //window.open(url.imageDataUrl);
        ////console.log(url.imageDataUrl);
        Utility.CopyToClipboard(url.imageData);
        /*
            let copiedState = Utility.CopyToClipboard(url.imageData);
            if(copiedState)
            {
                alert('Copied to clipboard');
            }
            else{
                alert('Copying to clipboard is unsupported');
            }
            */
        var imgFormat = AppConstants.imageFormat;
        for (var key in imgFormat) {
            if (imgFormat.hasOwnProperty(key)) {
                if (imgFormat[key].mimeType === imageType) {
                    extention = imgFormat[key].extension;
                    break;
                }
            }
        }
        var modelname = this.sceneManager.getSceneName(0).toLowerCase();
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) +
            ("0" + (d.getMonth() + 1)).slice(-2) +
            d.getFullYear() +
            ("0" + d.getHours()).slice(-2) +
            ("0" + d.getMinutes()).slice(-2) +
            ("0" + d.getSeconds()).slice(-2);
        var fileName = "vcollab-capture-" + modelname + "-" + datestring + extention;
        Utility.SaveToDisk(url.imageDataUrl, fileName, imageType, url.bmpBlob);
    };
    App.prototype.getVisibleNodeIds = function () {
        var renderNodes = AppObjects.sceneManager.getRenderNodes();
        return renderNodes.filter(function (node) { return node.visible == true; })
            .map(function (node) { return node.index; });
    };
    App.prototype.getInvisibleNodeIds = function () {
        var renderNodes = AppObjects.sceneManager.getRenderNodes();
        return renderNodes.filter(function (node) { return node.visible == false; })
            .map(function (node) { return node.index; });
    };
    //#region Camera
    App.prototype.getCameraMatrix = function (camType) {
        return this.renderer.camControl.getCameraMatrix(camType);
    };
    App.prototype.setCameraMatrix = function (camType, mat) {
        this.renderer.camControl.setCameraMatrix(camType, mat);
    };
    App.prototype.getCameraFrustum = function (camType) {
        var orthoParams = this.renderer.camControl.orthoParams;
        var perspParams = this.renderer.camControl.perspParams;
        return {
            fov: perspParams.fov,
            aspect: perspParams.aspect,
            near: perspParams.near,
            far: perspParams.far,
            left: orthoParams.left,
            right: orthoParams.right,
            top: orthoParams.top,
            bottom: orthoParams.bottom,
        };
    };
    App.prototype.setCameraFrustum = function (data, camType) {
        var perspParams = this.renderer.camControl.perspParams;
        var d = camType === CameraType.Perspective ? data : Utility.orthoToPerspective(data.left, data.right, data.top, data.bottom, data.near, data.far);
        perspParams.fov = d.fov;
        perspParams.aspect = d.aspect;
        perspParams.near = d.near;
        perspParams.far = d.far;
        this.setProjection(this.renderer.camControl.camType);
        this.renderer.camControl.update();
    };
    App.prototype.getProjection = function () {
        return this.renderer.camControl.camType;
    };
    App.prototype.setProjection = function (mode) {
        this.renderer.camControl.resetZoomFactor();
        this.renderer.camControl.camType = (mode === CameraType.Ortho) ? CameraType.Ortho : CameraType.Perspective;
        if (mode === CameraType.Ortho) {
            var pos = this.renderer.camControl.getPosition(CameraType.Perspective);
            var rotPoint = this.renderer.camControl.getRotationPoint();
            var dist$1 = dist(pos, rotPoint);
            var y = dist$1 * Math.tan(this.renderer.camControl.perspParams.fov / 2 * Math.PI / 180);
            var x = y * this.renderer.camControl.perspParams.aspect;
            this.renderer.camControl.setOrthoWindowWidth(2 * x);
            this.renderer.camControl.update();
        }
    };
    //#endregion
    //#region input
    App.prototype.setMouseInputMapping = function (json) {
        return this.input.setMouseMappings(json);
    };
    App.prototype.getMouseInputData = function () {
        return { controls: this.input.Mouse.getControls(), actions: this.input.Mouse.getActions() };
    };
    App.prototype.getSystemMouseMappings = function () {
        return this.input.getSystemMouseMappings();
    };
    //#endregion
    //#region probing && selection API
    App.prototype.getRenderNodesFromId = function (nodeIndexList) {
        var nodes = this.sceneManager.getRenderNodes();
        var renderNodes = [];
        if (nodeIndexList && nodeIndexList instanceof Array && nodeIndexList.length > 0) {
            nodeIndexList.forEach(function (index) {
                for (var i = 0; i < nodes.length; i++)
                    if (index === nodes[i].index) {
                        renderNodes.push(nodes[i]);
                        break;
                    }
            });
        }
        return renderNodes;
    };
    App.prototype.pickFromNodes = function (nodeIndexList, mouseXY) {
        var renderNodes = this.getRenderNodesFromId(nodeIndexList);
        if (mouseXY.xyFromTop == undefined)
            return;
        AppObjects.picker.pickPart(renderNodes, mouseXY);
    };
    App.prototype.probeFromNodes = function (nodeIndexList, mouseXY) {
        var renderNodes = this.getRenderNodesFromId(nodeIndexList);
        if (mouseXY.xyFromTop == undefined)
            return;
        else
            return AppObjects.picker.probePart(renderNodes, mouseXY);
    };
    //#endregion
    //#region Section API
    App.prototype.setActiveSectionPlaneId = function (id) {
        AppObjects.sectionManager.setActivePlane(id);
    };
    App.prototype.enableClipPlane = function (id) {
        AppObjects.sectionManager.enableClipPlane(id);
    };
    App.prototype.disableClipPlane = function (id) {
        AppObjects.sectionManager.disableClipPlane(id);
    };
    App.prototype.showClipPlane = function (id) {
        AppObjects.sectionManager.showClipPlane(id);
    };
    App.prototype.hideClipPlane = function (id) {
        AppObjects.sectionManager.hideClipPlane(id);
    };
    App.prototype.addSectionPlane = function (planeId, transform, color) {
        AppObjects.sectionManager.addPlane(planeId, transform, color);
    };
    App.prototype.deleteSectionPlane = function (planeId) {
        AppObjects.sectionManager.deletePlane(planeId);
    };
    App.prototype.setSectionPlaneEquation = function (planeId, transform, initTransform) {
        AppObjects.sectionManager.setPlaneEquation(planeId, transform, initTransform);
    };
    App.prototype.getSectionPlaneEquation = function (planeId) {
        return AppObjects.sectionManager.getPlaneEquation(planeId);
    };
    //#endregion
    //#region Part Manipulator
    App.prototype.explodeParts = function (percent, center, contraint) {
        AppObjects.partManipulator.explodeParts(percent, center, contraint);
    };
    App.prototype.enablePickAndMove = function (value) {
        AppObjects.partManipulator.enablePickAndMove(value);
    };
    App.prototype.resetExplode = function () {
        AppObjects.partManipulator.resetExplode();
    };
    App.prototype.resetPickAndMove = function () {
        AppObjects.partManipulator.resetPickAndMove();
    };
    App.prototype.getPartPickandMoveMatrix = function (nodeIndex) {
        return this.sceneManager.getPartPickandMoveMatrix(nodeIndex);
    };
    App.prototype.setPartPickandMoveMatrix = function (nodeIndexList, mat4) {
        this.sceneManager.setPartPickandMoveMatrix(nodeIndexList, mat4);
    };
    //#endregion
    //#region Label API
    App.prototype.addLabel = function (id, hitpt, type, probeData) {
        var labelManager = AppObjects.labelManager;
        labelManager.addLabel3D(id, hitpt, type, probeData);
    };
    App.prototype.showHideLabelVisibility = function (id, flag) {
        var labelManager = AppObjects.labelManager;
        return labelManager.showHideLabelVisibility(id, flag);
    };
    App.prototype.add3dLabelforNodeId = function (id, type, nodeid, modelIndex, nodeidIndex, selectedPartNodes) {
        var labelManager = AppObjects.labelManager;
        var renderNodes = this.getRenderNodesFromId(selectedPartNodes);
        return labelManager.add3dLabelforNodeId(id, type, nodeid, modelIndex, nodeidIndex, renderNodes);
    };
    App.prototype.deleteLabel = function (id) {
        return AppObjects.labelManager.deleteLabel(id);
    };
    App.prototype.get3DLabelCanvasPos = function (id) {
        return AppObjects.labelManager.get3DLabelCanvasPos(id);
    };
    App.prototype.getLabel3DInfo = function (id) {
        var labelManager = AppObjects.labelManager;
        return labelManager.getLabel3DInfo(id);
    };
    //#endregion
    //#region networking API
    App.prototype.printNetworkMetrics = function () {
        this.dataManager.getNetworkMetrics();
        ////console.log(string);
    };
    App.prototype.downloadNetworkMetrics = function () {
        var string = this.dataManager.getNetworkMetrics();
        ////console.log(string);
        var modelname = this.sceneManager.getSceneName(0).toLowerCase();
        var d = new Date();
        var datestring = ("0" + d.getDate()).slice(-2) +
            ("0" + (d.getMonth() + 1)).slice(-2) +
            d.getFullYear() +
            ("0" + d.getHours()).slice(-2) +
            ("0" + d.getMinutes()).slice(-2) +
            ("0" + d.getSeconds()).slice(-2);
        var data = new Blob([string], { type: 'text/plain' });
        var fileURL = window.URL.createObjectURL(data);
        var extention = '.txt';
        var fileName = "vcollab-network-" + modelname + "-" + datestring + extention;
        var mimeType = 'text/plain';
        Utility.SaveToDisk(fileURL, fileName, mimeType, data);
    };
    App.prototype.setFPSVisibility = function (value) {
        AppState.showFPS = (value === true ? true : false);
    };
    //#endregion
    //#region Custom Rendering API
    App.prototype.addPoint = function (name, point, size, color) {
        var p = new PointNode(name, point, color);
        AppObjects.renderer.addCustomRenderNode(p);
        return p.getUid();
    };
    App.prototype.removePoint = function (shapeNodeId) {
        AppObjects.renderer.deleteCustomRenderNode(shapeNodeId);
    };
    //#endregion
    //#region input
    App.prototype.startAnimation = function () {
        if (this.animationManager) {
            this.animationManager.IsAnimationOn = true;
            return this.renderer.startAnimation();
        }
        return false;
    };
    App.prototype.stopAnimation = function () {
        if (this.animationManager) {
            this.renderer.stopAnimation();
            return this.animationManager.IsAnimationOn = false;
        }
        return false;
    };
    App.prototype.pauseAnimation = function () {
        if (this.animationManager) {
            this.animationManager.IsAnimationOn = true;
            return this.renderer.pauseAnimation();
        }
        return false;
    };
    App.prototype.moveForwardAnimationFrame = function () {
        if (this.animationManager) {
            this.animationManager.IsAnimationOn = true;
            return this.renderer.moveForwardAnimationFrame();
        }
        return false;
    };
    App.prototype.moveBackwardAnimationFrame = function () {
        if (this.animationManager) {
            this.animationManager.IsAnimationOn = true;
            return this.renderer.moveBackwardAnimationFrame();
        }
        return false;
    };
    App.prototype.moveToSpecificAnimationFrame = function (frameNumber) {
        if (this.animationManager) {
            this.animationManager.IsAnimationOn = true;
            return this.renderer.moveToSpecificAnimationFrame(frameNumber);
        }
        return false;
    };
    App.prototype.changeAnimationFrameDelay = function (delay) {
        return this.renderer.changeAnimationFrameDelay(delay);
    };
    App.prototype.setAnimationData = function (type, numberOfFrames, delay) {
        if (this.animationManager) {
            this.animationManager.type = type;
            this.animationManager.numberOfFrames = numberOfFrames;
            this.renderer.changeAnimationFrameDelay(delay);
            return true;
        }
        return false;
    };
    App.prototype.setAnimationScaleFactor = function (scaleFactor) {
        if (this.animationManager) {
            this.animationManager.scaleFactor = scaleFactor;
            return true;
        }
        return false;
    };
    //#endregion
    //Region Camera controls
    App.prototype.zoomOut = function (scale) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.zoomOut(scale);
    };
    App.prototype.zoomIn = function (scale) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.zoomIn(scale);
    };
    App.prototype.pointZoomIn = function (posX, posY, factor) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.pointZoomIn(posX, posY, factor);
    };
    App.prototype.pointZoomOut = function (posX, posY, factor) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.pointZoomOut(posX, posY, factor);
    };
    App.prototype.onMouseRotation = function (newX, newY, lastX, lastY) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.onMouseRotation(newX, newY, lastX, lastY);
    };
    App.prototype.onMousePanRotation = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.onMousePanRotation(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    App.prototype.panRotateCamera = function (deltaX, deltaY) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.panRotateCamera(deltaX, deltaY);
    };
    App.prototype.rotateCamera = function (angleInRadian, axisInCameraCoord) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.rotateCamera(angleInRadian, axisInCameraCoord);
    };
    App.prototype.zoomOutCamera = function (scale) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.zoomOutCamera(scale);
    };
    App.prototype.zoomInCamera = function (scale) {
        var cameraControl = AppObjects.mouseControl.camControls;
        return cameraControl.zoomInCamera(scale);
    };
    App.prototype.translatePart = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        var cameraControl = AppObjects.partManipulator;
        return cameraControl.translatePart(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    App.prototype.rotatePartCamera = function (angleInRadian, axisInCameraCoord) {
        var cameraControl = AppObjects.partManipulator;
        return cameraControl.rotatePartCamera(angleInRadian, axisInCameraCoord);
    };
    App.prototype.translateZ = function (scale) {
        var cameraControl = AppObjects.partManipulator;
        return cameraControl.translateZ(scale);
    };
    return App;
}());var version = "0.0.14";//@public
var vctViewer = /** @class */ (function () {
    function vctViewer(_containerID, _connectorObject, _disableMouseEvents) {
        this.appli = new App(_containerID, _connectorObject, _disableMouseEvents);
    }
    vctViewer.prototype.getVersion = function () {
        return version;
    };
    vctViewer.prototype.init = function (_serverAddress) {
        var serverAddress = _serverAddress || 'http://127.0.0.1:8080';
        this.appli.init(serverAddress);
    };
    vctViewer.prototype.load = function (filePath) {
        this.appli.load(filePath);
    };
    vctViewer.prototype.loadGLTF = function (json) {
        return this.appli.loadGLTF(json);
    };
    vctViewer.prototype.addCaxFile = function (filePath) {
        this.appli.addCaxFile(filePath);
    };
    vctViewer.prototype.addFile = function (API, filePath) {
        this.appli.addFile(API, filePath);
    };
    vctViewer.prototype.getSceneBoundingBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        return this.appli.getSceneBoundingBox(onlyVisible);
    };
    vctViewer.prototype.fitView = function (selectedNodeIds) {
        if (selectedNodeIds === void 0) { selectedNodeIds = []; }
        this.appli.fitView(selectedNodeIds);
    };
    vctViewer.prototype.setBackgroundColor = function (colors) {
        this.appli.setBackgroundColor(colors);
    };
    vctViewer.prototype.setBackgroundImage = function (data) {
        this.appli.setBackgroundImage(data);
    };
    vctViewer.prototype.setDisplayMode = function (displayModeValue, arr) {
        if (arr === void 0) { arr = []; }
        this.appli.setDisplayMode(displayModeValue, arr);
    };
    vctViewer.prototype.setHighlightedNodes = function (selectedNodeIds, visibility) {
        if (selectedNodeIds === void 0) { selectedNodeIds = []; }
        this.appli.setHighlightedNodes(selectedNodeIds, visibility);
    };
    vctViewer.prototype.cloneRenderNode = function (sourceRep, targetRep, isDeep) {
        this.appli.cloneRenderNode(sourceRep, targetRep, isDeep);
    };
    vctViewer.prototype.applyResultByURL = function (filePath) {
        this.appli.applyResultByURL(filePath);
    };
    vctViewer.prototype.applyResult_old = function (selectedResultName, selectedStepName, derivedTypeFunc) {
        this.appli.applyResult_old(selectedResultName, selectedStepName, derivedTypeFunc);
    };
    vctViewer.prototype.applyResult = function (gltf) {
        this.appli.applyResult(gltf);
    };
    vctViewer.prototype.setValueMinMax = function (minMax) {
        this.appli.setValueMinMax(minMax);
    };
    vctViewer.prototype.setBelowMinColor = function (color) {
        this.appli.setBelowMinColor(color);
    };
    vctViewer.prototype.setAboveMaxColor = function (color) {
        this.appli.setAboveMaxColor(color);
    };
    vctViewer.prototype.setNoResultColor = function (color) {
        this.appli.setNoResultColor(color);
    };
    vctViewer.prototype.updateTextureCoordsArrayBuffer = function (url, arrayBuffer) {
        this.appli.updateTextureCoordsArrayBuffer(url, arrayBuffer);
    };
    vctViewer.prototype.updateValuesArrayBuffer = function (url, arrayBuffer) {
        return this.appli.updateValuesArrayBuffer(url, arrayBuffer);
    };
    vctViewer.prototype.updateDeformationValueBuffer = function (arrayBuffer, selectedPartNodes) {
        return this.appli.updateDeformationValueBuffer(arrayBuffer, selectedPartNodes);
    };
    vctViewer.prototype.startAnimation = function () {
        return this.appli.startAnimation();
    };
    vctViewer.prototype.stopAnimation = function () {
        return this.appli.stopAnimation();
    };
    vctViewer.prototype.pauseAnimation = function () {
        return this.appli.pauseAnimation();
    };
    vctViewer.prototype.moveForwardAnimationFrame = function () {
        return this.appli.moveForwardAnimationFrame();
    };
    vctViewer.prototype.moveBackwardAnimationFrame = function () {
        return this.appli.moveBackwardAnimationFrame();
    };
    vctViewer.prototype.moveToSpecificAnimationFrame = function (frameNumber) {
        return this.appli.moveToSpecificAnimationFrame(frameNumber);
    };
    vctViewer.prototype.setAnimationData = function (type, numberOfFrames, delay) {
        if (delay === void 0) { delay = 0; }
        return this.appli.setAnimationData(type, numberOfFrames, delay);
    };
    vctViewer.prototype.changeAnimationFrameDelay = function (delay) {
        return this.appli.changeAnimationFrameDelay(delay);
    };
    vctViewer.prototype.setAnimationScaleFactor = function (scaleFactor) {
        return this.appli.setAnimationScaleFactor(scaleFactor);
    };
    vctViewer.prototype.replaceWEBGLBuffer = function (obj, arrayBuffer) {
        this.appli.replaceWEBGLBuffer(obj, arrayBuffer);
    };
    vctViewer.prototype.setUseTexture = function (nodeIndexList, useTexture) {
        this.appli.setUseTexture(nodeIndexList, useTexture);
    };
    vctViewer.prototype.setTextureData = function (textureData) {
        this.appli.setTextureData(textureData);
    };
    vctViewer.prototype.setNodeVisibility = function (nodeIndexList, visibility) {
        this.appli.setNodeVisibility(nodeIndexList, visibility);
    };
    vctViewer.prototype.showHiddenLines = function (meshNodes, lineNodes) {
        this.appli.showHiddenLines(meshNodes, lineNodes);
    };
    vctViewer.prototype.setColorMask = function (nodes, value) {
        this.appli.setColorMask(nodes, value);
    };
    vctViewer.prototype.setUseUserDefinedColor = function (nodeList, useUserDefinedColor) {
        this.appli.setUseUserDefinedColor(nodeList, useUserDefinedColor);
    };
    vctViewer.prototype.setNodeTransparency = function (nodeIndex, transparency) {
        if (transparency === void 0) { transparency = 0; }
        this.appli.setNodeTransparency(nodeIndex, transparency);
    };
    vctViewer.prototype.getSceneGraphJSON = function () {
        return this.appli.getSceneGraphJSON();
    };
    vctViewer.prototype.setNodeVisibilityByName = function (nodeName, visibility) {
        //this.appli.setNodeVisibilityByName(nodeName, visibility);
    };
    vctViewer.prototype.getEventDispatcher = function () {
        return this.appli.getEventDispatcher();
    };
    vctViewer.prototype.getEvents = function () {
        return this.appli.getEvents();
    };
    vctViewer.prototype.getResultSet = function () {
        return this.appli.getResultSet();
    };
    vctViewer.prototype.captureScreen = function () {
        this.appli.captureScreen();
    };
    vctViewer.prototype.downloadNodeRenderData = function (nodeIndexList) {
        return this.appli.downloadNodeRenderData(nodeIndexList);
    };
    vctViewer.prototype.downloadNodeDataAndRender = function (nodeIndexList) {
        return this.appli.downloadNodeDataAndRender(nodeIndexList);
    };
    vctViewer.prototype.getIsRenderDataAvailable = function (nodeIndexList) {
        return this.appli.getIsRenderDataAvailable(nodeIndexList);
    };
    vctViewer.prototype.getIsAttributeDataAvailable = function (nodeIndex, accessorId) {
        return this.appli.getIsAttributeDataAvailable(nodeIndex, accessorId);
    };
    vctViewer.prototype.showFPS = function () {
        this.appli.setFPSVisibility(true);
    };
    vctViewer.prototype.hideFPS = function () {
        this.appli.setFPSVisibility(false);
    };
    vctViewer.prototype.getVisibleNodeIds = function () {
        return this.appli.getVisibleNodeIds();
    };
    vctViewer.prototype.getInvisibleNodeIds = function () {
        return this.appli.getInvisibleNodeIds();
    };
    vctViewer.prototype.getDownloadDataSize = function (nodeIndexList) {
        return this.appli.getDownloadDataSize(nodeIndexList);
    };
    //#region camera
    vctViewer.prototype.getCameraMatrix = function (camType) {
        return this.appli.getCameraMatrix(camType);
    };
    vctViewer.prototype.setCameraMatrix = function (camType, mat) {
        this.appli.setCameraMatrix(camType, mat);
    };
    vctViewer.prototype.getCameraFrustum = function (camType) {
        return this.appli.getCameraFrustum(camType);
    };
    vctViewer.prototype.setCameraFrustum = function (data, camType) {
        this.appli.setCameraFrustum(data, camType);
    };
    vctViewer.prototype.getProjection = function () {
        return this.appli.getProjection();
    };
    vctViewer.prototype.setProjection = function (mode) {
        this.appli.setProjection(mode);
    };
    //#endregion
    //#region networking
    vctViewer.prototype.printNetworkMetrics = function () {
        this.appli.printNetworkMetrics();
    };
    vctViewer.prototype.downloadNetworkMetrics = function () {
        this.appli.downloadNetworkMetrics();
    };
    //#endregion
    //#region input
    vctViewer.prototype.setMouseInputMappings = function (json) {
        return this.appli.setMouseInputMapping(json);
    };
    vctViewer.prototype.getMouseInputData = function () {
        return this.appli.getMouseInputData();
    };
    vctViewer.prototype.getSystemMouseMappings = function () {
        return this.appli.getSystemMouseMappings();
    };
    //#endregion
    //#region Pick and probe
    vctViewer.prototype.pickFromNodes = function (nodes, mouseXY) {
        this.appli.pickFromNodes(nodes, mouseXY);
    };
    vctViewer.prototype.probeFromNodes = function (nodes, mouseXY) {
        return this.appli.probeFromNodes(nodes, mouseXY);
    };
    //#endregion
    //#region section API
    vctViewer.prototype.setActiveSectionPlaneId = function (id) {
        this.appli.setActiveSectionPlaneId(id);
    };
    vctViewer.prototype.enableClipPlane = function (id) {
        this.appli.enableClipPlane(id);
    };
    vctViewer.prototype.disableClipPlane = function (id) {
        this.appli.disableClipPlane(id);
    };
    vctViewer.prototype.showClipPlane = function (id) {
        this.appli.showClipPlane(id);
    };
    vctViewer.prototype.hideClipPlane = function (id) {
        this.appli.hideClipPlane(id);
    };
    vctViewer.prototype.addSectionPlane = function (planeId, transform, color) {
        this.appli.addSectionPlane(planeId, transform, color);
    };
    vctViewer.prototype.deleteSectionPlane = function (planeId) {
        this.appli.deleteSectionPlane(planeId);
    };
    vctViewer.prototype.setSectionPlaneEquation = function (planeId, transform, initTransform) {
        this.appli.setSectionPlaneEquation(planeId, transform, initTransform);
    };
    vctViewer.prototype.getSectionPlaneEquation = function (planeId) {
        return this.appli.getSectionPlaneEquation(planeId);
    };
    //#endregion
    //#region part manipulator
    vctViewer.prototype.explodeParts = function (percent, center, contraint) {
        if (center === void 0) { center = null; }
        if (contraint === void 0) { contraint = [1, 1, 1]; }
        this.appli.explodeParts(percent, center, contraint);
    };
    vctViewer.prototype.enablePickAndMove = function (value) {
        this.appli.enablePickAndMove(value);
    };
    vctViewer.prototype.resetExplode = function () {
        this.appli.resetExplode();
    };
    vctViewer.prototype.resetPickAndMove = function () {
        this.appli.resetPickAndMove();
    };
    vctViewer.prototype.getPartPickandMoveMatrix = function (nodeIndex) {
        return this.appli.getPartPickandMoveMatrix(nodeIndex);
    };
    vctViewer.prototype.setPartPickandMoveMatrix = function (nodeIndex, mat4) {
        return this.appli.setPartPickandMoveMatrix(nodeIndex, mat4);
    };
    //#endregion
    //#region Label API
    vctViewer.prototype.addLabel3D = function (id, hitpts, type, probeData) {
        this.appli.addLabel(id, hitpts, type, probeData);
    };
    vctViewer.prototype.showHideLabelVisibility = function (id, flag) {
        this.appli.showHideLabelVisibility(id, flag);
    };
    vctViewer.prototype.add3dLabelforNodeId = function (id, type, nodeid, modelIndex, nodeidIndex, selectedPartNodes) {
        return this.appli.add3dLabelforNodeId(id, type, nodeid, modelIndex, nodeidIndex, selectedPartNodes);
    };
    vctViewer.prototype.deleteLabel3D = function (id) {
        return this.appli.deleteLabel(id);
    };
    vctViewer.prototype.get3DLabelCanvasPos = function (id) {
        return this.appli.get3DLabelCanvasPos(id);
    };
    vctViewer.prototype.getLabel3DInfo = function (id) {
        return this.appli.getLabel3DInfo(id);
    };
    //#endregion
    //#region Custom Rendering API
    vctViewer.prototype.addPoint = function (uid, point, size, color) {
        return this.appli.addPoint(uid, point, size, color);
    };
    vctViewer.prototype.removePoint = function (uid) {
        return this.appli.removePoint(uid);
    };
    //#endregion
    //#region camera controls API
    vctViewer.prototype.zoomOut = function (scale) {
        this.appli.zoomOut(scale);
    };
    vctViewer.prototype.zoomIn = function (scale) {
        this.appli.zoomIn(scale);
    };
    vctViewer.prototype.pointZoomIn = function (posX, posY, factor) {
        this.appli.pointZoomIn(posX, posY, factor);
    };
    vctViewer.prototype.pointZoomOut = function (posX, posY, factor) {
        this.appli.pointZoomOut(posX, posY, factor);
    };
    vctViewer.prototype.onMouseRotation = function (newX, newY, lastX, lastY) {
        this.appli.onMouseRotation(newX, newY, lastX, lastY);
    };
    vctViewer.prototype.onMousePanRotation = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        this.appli.onMousePanRotation(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    vctViewer.prototype.panRotateCamera = function (deltaX, deltaY) {
        this.appli.panRotateCamera(deltaX, deltaY);
    };
    vctViewer.prototype.rotateCamera = function (angleInRadian, axisInCameraCoord) {
        this.appli.rotateCamera(angleInRadian, axisInCameraCoord);
    };
    vctViewer.prototype.zoomOutCamera = function (scale) {
        this.appli.zoomOutCamera(scale);
    };
    vctViewer.prototype.zoomInCamera = function (scale) {
        this.appli.zoomInCamera(scale);
    };
    vctViewer.prototype.translatePart = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        this.appli.translatePart(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    vctViewer.prototype.rotatePartCamera = function (angleInRadian, axisInCameraCoord) {
        this.appli.rotatePartCamera(angleInRadian, axisInCameraCoord);
    };
    vctViewer.prototype.translateZ = function (scale) {
        this.appli.translateZ(scale);
    };
        return vctViewer;
}());

return new vctViewer(_containerID, _connectorObject, _disableMouseEvents);
};var perspectiveToOrtho = function (fov, aspect, near, far) {
    var top, bottom, left, right;
    top = near * Math.tan(fov / 2 * Math.PI / 180);
    bottom = -top;
    right = top * aspect;
    left = -right;
    return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        near: near,
        far: far
    };
};var NetworkManager = /** @class */ (function () {
    function NetworkManager(eventDispatcher, viewerId) {
        this.viewerId = viewerId;
        this.dispatcher = eventDispatcher;
        this.downloads = new Map();
        this.register_events();
    }
    NetworkManager.prototype.register_events = function () {
        this.dispatcher.addEventListener(internalEvents.NETWORK_ADD_PART, this.handleAddPart.bind(this));
        this.dispatcher.addEventListener(internalEvents.NETWORK_UPDATE_PART, this.handleUpdataPart.bind(this));
    };
    NetworkManager.prototype.createGroup = function (info) {
        var id = Utility.create_UUID();
        this.downloads.set(id, {
            id: id,
            info: info,
            parts: []
        });
        if (info.notify)
            this.dispatcher.dispatchEvent({
                data: { id: id, event: info },
                type: viewerEvents.DOWNLOAD_START,
                viewerID: this.viewerId
            });
        ManagedURLDownloader.createURLGroup(id);
        //console.log("group created",info);
        return id;
    };
    NetworkManager.prototype.handleAddPart = function (event) {
        var data = event.data;
        var id = data.downloadId;
        data.event;
        this.addPart(id, {
            id: data.partId,
            loaded: 0,
            total: 0,
        });
    };
    NetworkManager.prototype.handleUpdataPart = function (event) {
        var data = event.data;
        var id = data.downloadId;
        var axios_event = data.event;
        this.updatePart(id, data.partId, axios_event);
    };
    NetworkManager.prototype.addPart = function (groupId, item) {
        var group = this.downloads.get(groupId);
        if (group) {
            group.parts.push(item);
            return true;
        }
        return false;
    };
    NetworkManager.prototype.updatePart = function (groupId, partId, event) {
        var group = this.downloads.get(groupId);
        if (group) {
            var part = group.parts.find(function (e) { return e.id === partId; });
            if (part) {
                part.loaded = event.loaded;
                part.total = event.total;
                //console.log("update part",part.id,part.loaded,part.total)
            }
            var total = group.info.totalSize;
            var loaded_1 = 0;
            group.parts.forEach(function (e) {
                loaded_1 += e.loaded;
            });
            if (group.info.notify)
                this.dispatcher.dispatchEvent({
                    data: { id: groupId, event: { loaded: loaded_1, total: total } },
                    type: viewerEvents.DOWNLOAD_PROGRESS,
                    viewerID: this.viewerId
                });
            //console.log("update total",loaded,total)
        }
        return false;
    };
    NetworkManager.prototype.deleteGroup = function (id) {
        if (this.downloads.has(id)) {
            var group = this.downloads.get(id);
            if (group.info.notify)
                this.dispatcher.dispatchEvent({
                    //data: {id,event: {title: group.info.title}},
                    data: { id: id, event: group.info },
                    type: viewerEvents.DOWNLOAD_END,
                    viewerID: this.viewerId
                });
            ManagedURLDownloader.deleteURLGroup(id);
            this.downloads.delete(id);
            //console.log("group deleted",id);
            return true;
        }
        return false;
    };
    return NetworkManager;
}());var Viewer = /** @class */ (function () {
    function Viewer(_UUID, _containerID, _eventDispacther, _disableMouseEvents) {
        this.UUID = _UUID;
        this.containerID = _containerID;
        this.connector = new AppConnector(this.UUID, _eventDispacther);
        this.eventDispatcher = _eventDispacther;
        this.state = new AppState();
        this.renderApp = new vctViewer(_containerID, {}, _disableMouseEvents);
        this.renderApp.init(_UUID);
        this.networkManager = new NetworkManager(this.eventDispatcher, this.UUID);
        this.externalEventDispatcher = this.renderApp.getEventDispatcher();
        this.externalEvents = this.renderApp.getEvents();
        this.registerEvents();
        this.mcax = null;
        this.progressiveLoader = null;
        this.productTree = null;
        this.legendManager = null;
        this.caeResult = null;
        this.sectionManager = null;
        this.labelManager = null;
    }
    //#region General
    Viewer.prototype.clear = function () {
    };
    Viewer.prototype.delete = function () {
        //console.log('viewer.delete() not implement yet');
        return "SUCCESS";
    };
    Viewer.prototype.getRenderVersion = function () {
        return this.renderApp.getVersion();
    };
    Viewer.prototype.loadModel = function (api, url) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var jsonResult, obj, model, obj_1, gltf, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.connector.getModel(api, encodeURIComponent(url), this.UUID)];
                    case 1:
                        jsonResult = _a.sent();
                        if (!(jsonResult && jsonResult.json_url)) {
                            reject("Invalid response from server");
                            //logger.setStatusBar("Invalid response from server",statusIconType.ERROR);
                            //throw new Error("Invalid response from server");
                        }
                        Logger.setStatusBar("Downloading data from server");
                        obj = { type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE, viewerID: this.UUID, data: "Downloading data from server" };
                        this.eventDispatcher.dispatchEvent(obj);
                        return [4 /*yield*/, this.connector.getJsonData(jsonResult.json_url)];
                    case 2:
                        model = _a.sent();
                        if (!model.error) return [3 /*break*/, 3];
                        reject("Error response from server : " + model.error);
                        return [3 /*break*/, 5];
                    case 3:
                        obj_1 = { type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE, viewerID: this.UUID, data: "Processing data" };
                        this.eventDispatcher.dispatchEvent(obj_1);
                        //logger.setStatusBar("Processing data");
                        this.mcax = Utility.deepCopy(model);
                        //console.log(this.mcax);          
                        this.productTree = new ModelTreeBuilder(this.mcax).build();
                        this.sectionManager = new Section(this.UUID, this.renderApp, this.state, this.eventDispatcher);
                        this.legendManager = new LegendManager();
                        this.caeResult = new CAEResult(Utility.deepCopy(this.mcax), this.renderApp, this.connector, this.legendManager, this.networkManager);
                        gltf = Utility.deepCopy(model.gltf);
                        return [4 /*yield*/, this.renderApp.loadGLTF(gltf)];
                    case 4:
                        _a.sent();
                        obj_1 = { type: viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE, viewerID: this.UUID, data: "Loading model..." };
                        this.eventDispatcher.dispatchEvent(obj_1);
                        resolve("SUCCESS");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    Viewer.prototype.getModelInfo = function () {
        var out = [];
        if (this.mcax && this.mcax.models) {
            this.mcax.models.forEach(function (model) {
                out.push({
                    name: model.name
                });
            });
        }
        return out;
    };
    Viewer.prototype.showModel = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.progressiveLoader = new ProgressiveLoader(Utility.deepCopy(this.mcax), this.renderApp, this.connector);
                        return [4 /*yield*/, this.progressiveLoader.showDefaultDisplay()];
                    case 1:
                        _a.sent();
                        resolve("SUCCESS");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Viewer.prototype.setInteractionMode = function (mode) {
        var prev = this.state.interactionMode;
        this.state.interactionMode = mode;
        this.eventDispatcher.dispatchEvent({
            viewerID: this.UUID,
            data: { prevState: prev, currState: this.state.interactionMode },
            type: viewerEvents.INTERACTION_MODE_CHANGED
        });
    };
    Viewer.prototype.registerEvents = function () {
        this.externalEventDispatcher.addEventListener(this.externalEvents.CLICK, this.handleClick.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.DBL_CLICK, this.handleDBLClick.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.MODEL_LOADED, this.handleModelLoad.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.CAMERA_MOVED, this.handleCameraMove.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.LABEL3D_CREATED, this.handleLabelCreated.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.ANIMATION_FRAME_NUMBER, this.handleAnimationFrameEvent.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.LABEL_MOVED, this.handleLabelMovedEvent.bind(this));
        this.externalEventDispatcher.addEventListener(this.externalEvents.LABEL_VISIBILITY, this.handleLabelParentVisibilityChange.bind(this));
    };
    Viewer.prototype.handleGUIEvents = function (eventType, event) {
        if (eventType === this.externalEvents.CLICK) {
            this.externalEventDispatcher.dispatchEvent({
                type: this.externalEvents.CLICK,
                data: event
            });
        }
        else if (eventType === this.externalEvents.DBL_CLICK) {
            this.externalEventDispatcher.dispatchEvent({
                type: this.externalEvents.DBL_CLICK,
                data: event
            });
        }
    };
    Viewer.prototype.handleClick = function (e) {
        var event = {
            type: viewerEvents.VIEWER_CLICK,
            data: e.data,
            viewerID: this.UUID,
        };
        this.eventDispatcher.dispatchEvent(event);
    };
    Viewer.prototype.handleDBLClick = function (e) {
        var event = e.data;
        var rect = [];
        try {
            rect = event.target.getBoundingClientRect();
        }
        catch (e) {
            throw new Error(e);
        }
        var xyFromTop = [
            event.clientX - rect.left,
            event.clientY - rect.top
        ];
        var data = this.probeFromNodes({ xyFromTop: xyFromTop, width: rect.width, height: rect.height });
        //console.log("probeData",data);
        this.handleHighlight(data);
    };
    Viewer.prototype.handleHighlight = function (probeData) {
        if ((probeData === null || probeData === void 0 ? void 0 : probeData.renderNodeId) > -1) {
            var nodeIds = this.productTree.getPartIdsFromRenderNodeIds([probeData.renderNodeId]);
            var parts = this.productTree.getPartNodeFromNodeIds(nodeIds);
            var isHighlighted = parts[0].customData.displayProps.isHighlighted;
            this.setHighlightedNodes(nodeIds, !isHighlighted);
            this.eventDispatcher.dispatchEvent({ type: viewerEvents.MODEL_PART_HIGHLIGHTED, viewerID: this.UUID, data: {
                    isHighlighted: !isHighlighted,
                    nodeIds: nodeIds
                } });
        }
        else {
            this.setHighlightedNodes([], false);
            this.eventDispatcher.dispatchEvent({ type: viewerEvents.MODEL_PART_HIGHLIGHTED, viewerID: this.UUID, data: {
                    isHighlighted: false,
                    nodeIds: []
                } });
        }
    };
    Viewer.prototype.handleModelLoad = function (e) {
        this.labelManager = new LabelManager(this.renderApp, this.state, this);
    };
    Viewer.prototype.handleCameraMove = function (e) {
        var event = {
            type: viewerEvents.CAMERA_MOVED,
            data: e,
            viewerID: this.UUID,
        };
        this.eventDispatcher.dispatchEvent(event);
    };
    Viewer.prototype.handleLabelCreated = function (e) {
        //e.data.msg = this.caeResult.getUVInterpolatedResultValue(e.data);
        if (e.data.nodeId !== undefined)
            e.data.nodeId = this.caeResult.getNodeId(e.data.nodeId);
        //if(e.data.elementId !== undefined)
        //    e.data.elementId = this.caeResult.getElementID(e.data);
        this.eventDispatcher.dispatchEvent({
            data: e.data,
            type: viewerEvents.LABEL3D_CREATED,
            viewerID: this.UUID
        });
    };
    Viewer.prototype.handleAnimationFrameEvent = function (e) {
        var event = {
            type: viewerEvents.ANIMATION_FRAME_NUMBER,
            data: e.data,
            viewerID: this.UUID,
        };
        this.eventDispatcher.dispatchEvent(event);
    };
    Viewer.prototype.handleLabelMovedEvent = function (e) {
        var event = {
            type: viewerEvents.LABEL_MOVED,
            data: e.data,
            viewerID: this.UUID,
        };
        this.eventDispatcher.dispatchEvent(event);
    };
    Viewer.prototype.handleLabelParentVisibilityChange = function (e) {
        var event = {
            type: viewerEvents.LABEL_VISIBILITY,
            data: e.data,
            viewerID: this.UUID,
        };
        this.eventDispatcher.dispatchEvent(event);
    };
    Viewer.prototype.getSearchHints = function () {
        return Promise.resolve([]);
    };
    Viewer.prototype.getSceneBoundingBox = function (onlyVisible) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        var bbox = this.renderApp.getSceneBoundingBox(onlyVisible);
        return bbox.clone();
    };
    Viewer.prototype.setBackground = function (type, data) {
        if (type === BackgroundType.GRADIENT)
            this.renderApp.setBackgroundColor(data);
        else if (type === BackgroundType.IMAGE)
            this.renderApp.setBackgroundImage(data);
    };
    Viewer.prototype.getEventDispatcher = function () {
        return this.eventDispatcher;
    };
    Viewer.prototype.getViewerSize = function () {
        return Utility.getDOMSize(this.containerID);
    };
    //#endregion
    //#region Camera
    Viewer.prototype.getCameraStdViews = function () {
        var perspective = this.renderApp.getCameraFrustum(CameraType.Perspective);
        perspective.fov = 35;
        perspective.near = 1.0;
        perspective.far = 1000;
        var ortho = perspectiveToOrtho(perspective.fov, perspective.aspect, perspective.near, perspective.far);
        var bbox = this.renderApp.getSceneBoundingBox(false);
        var r = bbox.getRadius();
        var c = bbox.getCenter();
        var offset = 3 * r;
        var stdViews = [];
        //front
        var newMat = create();
        lookAt(newMat, [c[0], c[1], c[2] + offset], c, [0, 1, 0]);
        stdViews.push({
            name: "Front",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        lookAt(newMat, [c[0], c[1], c[2] - offset], c, [0, 1, 0]);
        stdViews.push({
            name: "Back",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        lookAt(newMat, [c[0] - offset, c[1], c[2]], c, [0, 1, 0]);
        stdViews.push({
            name: "Left",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        lookAt(newMat, [c[0] + offset, c[1], c[2]], c, [0, 1, 0]);
        stdViews.push({
            name: "Right",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        lookAt(newMat, [c[0], c[1] + offset, c[2]], c, [0, 0, -1]);
        stdViews.push({
            name: "Top",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        lookAt(newMat, [c[0], c[1] - offset, c[2]], c, [0, 0, 1]);
        stdViews.push({
            name: "Bottom",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        var pos = clone$1(c);
        add(pos, pos, fromValues(offset / 2, offset / 2, offset / 2));
        lookAt(newMat, pos, c, [0, 1, 0]);
        stdViews.push({
            name: "Isometric",
            position: [newMat[12], newMat[13], newMat[14]],
            dir: [newMat[8], newMat[9], newMat[10]],
            up: [newMat[4], newMat[5], newMat[6]],
            perspective: perspective,
            ortho: ortho
        });
        return stdViews;
    };
    Viewer.prototype.setCameraInfo = function (camData) {
        var pos = camData.position;
        var dir = fromValues(camData.dir[0], camData.dir[1], camData.dir[2]);
        var up = fromValues(camData.up[0], camData.up[1], camData.up[2]);
        var left = create$1();
        cross(left, up, dir);
        var camMat = this.renderApp.getCameraMatrix(CameraType.Perspective);
        camMat[0] = left[0];
        camMat[1] = left[1];
        camMat[2] = left[2];
        camMat[4] = up[0];
        camMat[5] = up[1];
        camMat[6] = up[2];
        camMat[8] = dir[0];
        camMat[9] = dir[1];
        camMat[10] = dir[2];
        camMat[12] = pos[0];
        camMat[13] = pos[1];
        camMat[14] = pos[2];
        this.renderApp.setCameraMatrix(CameraType.Perspective, camMat);
        this.renderApp.setCameraMatrix(CameraType.Ortho, camMat);
        this.renderApp.setCameraFrustum(camData.perspective, CameraType.Perspective);
    };
    Viewer.prototype.getCameraInfo = function (camType) {
        var mat = this.renderApp.getCameraMatrix(camType);
        var pos = [mat[12], mat[13], mat[14]];
        var dir = [mat[8], mat[9], mat[10]];
        var up = [mat[4], mat[5], mat[6]];
        var right = [mat[0], mat[1], mat[2]];
        var frustum = this.renderApp.getCameraFrustum(camType);
        return {
            pos: pos,
            dir: dir,
            up: up,
            right: right,
            frustum: frustum
        };
    };
    Viewer.prototype.setCameraProjection = function (camType) {
        this.renderApp.setProjection(camType);
    };
    //#endregion
    //#region Input
    Viewer.prototype.setMouseInputMapping = function (json) {
        return this.renderApp.setMouseInputMappings(json);
    };
    Viewer.prototype.getMouseInputData = function () {
        return this.renderApp.getMouseInputData();
    };
    Viewer.prototype.getSystemMouseMappings = function () {
        return this.renderApp.getSystemMouseMappings();
    };
    //#endregion
    //#region product tree
    Viewer.prototype.getProductTree = function () {
        if (this.productTree)
            return {
                models: Utility.deepCopy(Object.fromEntries(this.productTree.models)),
                rootNodeIds: Utility.deepCopy(this.productTree.rootNodeIds)
            };
        return "No model is loaded";
    };
    Viewer.prototype.setSelectedParts = function (selectedParts) {
        //return "Not implemented"
        return "SUCCESS";
    };
    Viewer.prototype.setPartsVisibility = function (selectedNodes, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, reps, repIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodes = this.productTree.getPartNodeFromNodeIds(selectedNodes);
                        if (selectedNodes.length == 0) {
                            nodes = this.productTree.getAllPartNodes();
                        }
                        //update in local tree;
                        this.productTree.setVisibility(nodes, visibility);
                        reps = this.productTree.getRepresentationsFromParts(nodes);
                        reps = reps.filter(function (rep) { return rep.customData.type !== RepresentationType.HIGHLIGHT; });
                        repIds = reps.map(function (rep) { return rep.customData.node; });
                        if (!(repIds.length > 0 && (visibility === false))) return [3 /*break*/, 1];
                        this.renderApp.setNodeVisibility(repIds, false);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Promise.all(nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.setDisplayMode(false, node.customData.displayProps.displayId, [node.id])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, "SUCCESS"];
                }
            });
        });
    };
    Viewer.prototype.invertPartsVisibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var visibleNodeIds, invisibleNodeIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visibleNodeIds = this.productTree.getVisibleNodeIds();
                        invisibleNodeIds = this.productTree.getInvisibleNodeIds();
                        if (!(visibleNodeIds.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setPartsVisibility(visibleNodeIds, false)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(invisibleNodeIds.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setPartsVisibility(invisibleNodeIds, true)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, "SUCCESS"];
                }
            });
        });
    };
    Viewer.prototype.getDisplayModes = function (selectedNodes) {
        var e_1, _a;
        var modes = [];
        try {
            for (var _b = __values(Object.entries(displayModes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                var size = this.getDownloadSize(selectedNodes, value.ID);
                var disp = {
                    id: value.ID,
                    displayName: value.DISPLAYNAME,
                    displayOrder: value.DISPLAYORDER,
                    isDataAvailable: (size === 0 ? true : false),
                    downloadMetricType: downloadMetricTypes.SIZE,
                    downloadMetricValue: size
                };
                modes.push(disp);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Promise.resolve(modes);
    };
    Viewer.prototype.getDownloadSize = function (selectedNodes, displayModeId) {
        var nodes = this.productTree.getPartNodeFromNodeIds(selectedNodes);
        if ((selectedNodes === null || selectedNodes === void 0 ? void 0 : selectedNodes.length) === 0) {
            nodes = this.productTree.getAllPartNodes();
        }
        var representations = {
            meshEnabled: false,
            lineEnabled: false,
            pointEnabled: false,
            bboxEnabled: false
        };
        switch (displayModeId) {
            case displayModes.BOUNDING_BOX.ID:
                representations.bboxEnabled = true;
                break;
            case displayModes.POINT.ID:
                representations.pointEnabled = true;
                break;
            case displayModes.WIREFRAME.ID:
                representations.lineEnabled = true;
                break;
            case displayModes.HIDDEN_LINE.ID:
                representations.lineEnabled = true;
                representations.meshEnabled = true;
                break;
            case displayModes.SHADED.ID:
                representations.meshEnabled = true;
                break;
            case displayModes.SHADED_MESH.ID:
                representations.meshEnabled = true;
                representations.lineEnabled = true;
                break;
            case displayModes.TRANSPARENT.ID:
                representations.meshEnabled = true;
                break;
        }
        var geometries = [];
        nodes.forEach(function (node) {
            if (node && node.customData && node.customData.geometries)
                geometries.push.apply(geometries, __spread(node.customData.geometries));
        });
        var representationArray = [];
        geometries.forEach(function (item) {
            if (item.customData && item.customData.representations) {
                item.customData.representations.forEach(function (repre) {
                    if (repre.customData && repre.customData.type) {
                        if ((repre.customData.type ^ abstractType.MESH) === 0 && representations.meshEnabled) {
                            representationArray.push(repre);
                        }
                        if ((repre.customData.type ^ abstractType.WIREFRAME) === 0 && representations.lineEnabled) {
                            representationArray.push(repre);
                        }
                        if ((repre.customData.type ^ abstractType.POINT) === 0 && representations.pointEnabled)
                            representationArray.push(repre);
                        if ((repre.customData.type ^ abstractType.BBOX) === 0 && representations.bboxEnabled)
                            representationArray.push(repre);
                    }
                });
            }
        });
        var nodesList = representationArray.map(function (items) { return items.customData.node; });
        //console.log(nodesList);      
        return this.renderApp.getDownloadDataSize(nodesList);
    };
    Viewer.prototype.updateDisplayMode = function (downloadId, node, displayModeId) {
        return __awaiter(this, void 0, void 0, function () {
            var representations, selectionInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        representations = {
                            meshEnabled: false,
                            lineEnabled: false,
                            pointEnabled: false,
                            bboxEnabled: false,
                        };
                        node.customData.displayProps = {
                            displayId: displayModeId,
                            hiddenlineEnabled: false,
                            isHighlighted: node.customData.displayProps.isHighlighted,
                            transparency: 0.0,
                            useTexture: node.customData.displayProps.useTexture,
                            visibility: node.customData.displayProps.visibility
                        };
                        switch (displayModeId) {
                            case displayModes.BOUNDING_BOX.ID:
                                representations.bboxEnabled = true;
                                break;
                            case displayModes.POINT.ID:
                                representations.pointEnabled = true;
                                break;
                            case displayModes.WIREFRAME.ID:
                                representations.lineEnabled = true;
                                break;
                            case displayModes.HIDDEN_LINE.ID:
                                node.customData.displayProps.hiddenlineEnabled = true;
                                representations.lineEnabled = true;
                                representations.meshEnabled = true;
                                break;
                            case displayModes.SHADED.ID:
                                representations.meshEnabled = true;
                                break;
                            case displayModes.SHADED_MESH.ID:
                                representations.meshEnabled = true;
                                representations.lineEnabled = true;
                                break;
                            case displayModes.TRANSPARENT.ID:
                                representations.meshEnabled = true;
                                node.customData.displayProps.transparency = 0.79;
                                break;
                        }
                        selectionInfo = __assign(__assign({ nodes: [node] }, node.customData.displayProps), { representations: representations });
                        //console.log(`Node id: ${node.id } \n displayId: ${displayModeId}\n` );
                        //console.log(representations);
                        //console.log(selectionInfo);
                        return [4 /*yield*/, this.changeDisplayedNodes(downloadId, selectionInfo)];
                    case 1:
                        //console.log(`Node id: ${node.id } \n displayId: ${displayModeId}\n` );
                        //console.log(representations);
                        //console.log(selectionInfo);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Viewer.prototype.setDisplayMode = function (notify, displayModeId, selectedNodes) {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, reps, repIds, groupId, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodes = this.productTree.getPartNodeFromNodeIds(selectedNodes);
                        if (selectedNodes.length == 0) {
                            nodes = this.productTree.getAllPartNodes();
                        }
                        reps = this.productTree.getRepresentationsFromParts(nodes);
                        repIds = reps.map(function (rep) { return rep.customData.node; });
                        if (repIds.length > 0)
                            this.renderApp.setNodeVisibility(repIds, false);
                        nodes.forEach(function (node) { return _this.setHighlightedNodes([node.id], node.customData.displayProps.isHighlighted); });
                        groupId = this.networkManager.createGroup({
                            title: "Display mode - " + displayModes[displayModeId].DISPLAYNAME,
                            notify: notify,
                            totalSize: this.getDownloadSize(selectedNodes, displayModeId),
                            msg: "Downloading display mode - " + displayModes[displayModeId].DISPLAYNAME,
                            tag: "DISPLAYMODE"
                        });
                        promises = nodes.map(function (node) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.updateDisplayMode(groupId, node, displayModeId)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        this.networkManager.deleteGroup(groupId);
                        return [2 /*return*/, Promise.resolve("SUCCESS")];
                }
            });
        });
    };
    Viewer.prototype.setUseUserDefinedColor = function (nodeIds, value) {
        if (nodeIds.length === 0) {
            nodeIds = this.productTree.getAllPartNodes().map(function (node) { return node.id; });
        }
        var rNodeIds = this.productTree.getRenderNodeIdsFromNodeIds(nodeIds);
        this.renderApp.setUseUserDefinedColor(rNodeIds, value);
    };
    Viewer.prototype.setHighlightedNodes = function (selectedNodes, visiblity) {
        var _this = this;
        //selectedNodes = [{id:"component_17"},{id:"component_18"},{id:"component_19"}];
        var nodes = this.productTree.getPartNodeFromNodeIds(selectedNodes);
        if (selectedNodes.length == 0) {
            nodes = this.productTree.getAllPartNodes();
        }
        var hreps = [];
        nodes.forEach(function (node) {
            node.customData.displayProps.isHighlighted = visiblity;
            var reps = _this.productTree.getRepresentationsFromParts([node]);
            var hRep = reps.filter(function (rep) { return rep.customData.type === RepresentationType.HIGHLIGHT; });
            if (hRep.length === 0) {
                var boxReps = reps.filter(function (rep) { return rep.customData.type === RepresentationType.BBOX; });
                boxReps.forEach(function (boxRep) {
                    var highlightRep = Utility.deepCopy(boxRep);
                    highlightRep.customData.type = RepresentationType.HIGHLIGHT;
                    var uid = RepresentationType.HIGHLIGHT;
                    highlightRep.id += uid;
                    highlightRep.name += uid;
                    highlightRep.customData.type = RepresentationType.HIGHLIGHT;
                    highlightRep.customData.node += uid;
                    highlightRep.customData.name += uid;
                    hRep.push(highlightRep);
                    node.customData.geometries[0].customData.representations.push(highlightRep);
                    _this.renderApp.cloneRenderNode(boxRep.customData.node, highlightRep.customData.node, false);
                });
            }
            hreps.push.apply(hreps, __spread(hRep));
        });
        var repIds = hreps.map(function (rep) { return rep.customData.node; });
        this.renderApp.setHighlightedNodes(repIds, visiblity);
        return "SUCCESS";
    };
    Viewer.prototype.changeDisplayedNodes = function (downloadId, selectionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedNodes, geometries_1, meshRepresentation_1, lineRepresentation_1, representations_1, rNodeIds, rNodeIds, nodes, meshNodes, lineNodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selectionInfo) return [3 /*break*/, 5];
                        selectedNodes = selectionInfo.nodes;
                        geometries_1 = [];
                        selectedNodes.forEach(function (node) {
                            if (node && node.customData && node.customData.geometries)
                                geometries_1.push.apply(geometries_1, __spread(node.customData.geometries));
                        });
                        meshRepresentation_1 = [];
                        lineRepresentation_1 = [];
                        representations_1 = [];
                        geometries_1.forEach(function (item) {
                            if (item.customData && item.customData.representations) {
                                item.customData.representations.forEach(function (repre) {
                                    if (repre.customData && repre.customData.type) {
                                        if ((repre.customData.type ^ abstractType.MESH) === 0 && selectionInfo.representations.meshEnabled) {
                                            representations_1.push(repre);
                                            meshRepresentation_1.push(repre);
                                        }
                                        if ((repre.customData.type ^ abstractType.WIREFRAME) === 0 && selectionInfo.representations.lineEnabled) {
                                            representations_1.push(repre);
                                            lineRepresentation_1.push(repre);
                                        }
                                        if ((repre.customData.type ^ abstractType.POINT) === 0 && selectionInfo.representations.pointEnabled)
                                            representations_1.push(repre);
                                        if ((repre.customData.type ^ abstractType.BBOX) === 0 && selectionInfo.representations.bboxEnabled)
                                            representations_1.push(repre);
                                    }
                                });
                            }
                        });
                        if (selectionInfo.displayId === displayModes.SHADED_MESH.ID) {
                            rNodeIds = lineRepresentation_1.map(function (rep) { return rep.customData.node; });
                            this.renderApp.setUseUserDefinedColor(rNodeIds, true);
                        }
                        else {
                            rNodeIds = lineRepresentation_1.map(function (rep) { return rep.customData.node; });
                            this.renderApp.setUseUserDefinedColor(rNodeIds, false);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.progressiveLoader.loadSelectedRepresentations(downloadId, representations_1)];
                    case 2:
                        _a.sent();
                        nodes = representations_1.map(function (items) { return items.customData.node; });
                        if (selectionInfo.hiddenlineEnabled) {
                            meshNodes = meshRepresentation_1.map(function (items) { return items.customData.node; });
                            lineNodes = lineRepresentation_1.map(function (items) { return items.customData.node; });
                            this.renderApp.showHiddenLines(meshNodes, lineNodes);
                        }
                        else {
                            this.renderApp.setColorMask(nodes, true);
                        }
                        this.renderApp.setNodeTransparency(nodes, selectionInfo.transparency);
                        this.renderApp.setUseTexture(nodes, selectionInfo.useTexture);
                        if (nodes.length > 0)
                            this.renderApp.setNodeVisibility(nodes, selectionInfo.visibility);
                        return [2 /*return*/, Promise.resolve()];
                    case 3:
                        _a.sent();
                        Logger.setStatusBar("Error occurred while downloading buffers.", statusIconType.ERROR);
                        throw new Error("Error occurred while downloading buffers.");
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error("Invalid selection info.");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region probing
    Viewer.prototype.probeFromNodes = function (pointerData) {
        var mcaxFilter = new MCAXFilter(this.renderApp, this.mcax);
        var nodeIds = this.renderApp.getVisibleNodeIds();
        var visible = mcaxFilter.getVisibleGeometries(nodeIds);
        var selection = [];
        visible.forEach(function (geo) {
            geo.representations.forEach(function (repId) {
                if (mcaxFilter.getRepresentationType(repId) !== "BBOX")
                    selection.push(repId);
            });
        });
        var data = this.renderApp.probeFromNodes(selection, pointerData);
        return data;
        //console.log(data);
    };
    //#endregion
    //#region Labels
    Viewer.prototype.add3DLabel = function (uid, hitPoint, type, probeData) {
        this.labelManager.add3DLabel(uid, hitPoint, type, probeData);
    };
    Viewer.prototype.addMeasurementLabel = function (uid, hitPoint, type, probeData) {
        this.labelManager.addMeasurementLabel(uid, hitPoint, type, probeData);
    };
    Viewer.prototype.showHideLabelVisibility = function (id, flag) {
        this.labelManager.showHideLabelVisibility(id, flag);
    };
    Viewer.prototype.add3dLabelforNodeId = function (id, type, nodeIds, modelIndex) {
        var _this = this;
        var mcaxFilter = new MCAXFilter(this.renderApp, this.mcax);
        var partNodeIds = this.renderApp.getVisibleNodeIds();
        var visible = mcaxFilter.getVisibleGeometries(partNodeIds);
        var selectedPartNodes = [];
        visible.forEach(function (geo) {
            geo.representations.forEach(function (repId) {
                if (mcaxFilter.getRepresentationType(repId) !== "BBOX")
                    selectedPartNodes.push(repId);
            });
        });
        var results = [];
        if (selectedPartNodes.length > 0) {
            nodeIds.forEach(function (nodeId, index) {
                var nodeidIndex = _this.caeResult.getNodeIdIndex(nodeId, modelIndex);
                var result = _this.labelManager.add3dLabelforNodeId(id + "_" + index, type, nodeId, modelIndex, nodeidIndex, selectedPartNodes);
                results.push(result);
            });
            if (results.length === nodeIds.length && !results.includes(false))
                return true;
        }
        return false;
    };
    Viewer.prototype.add3dLabelforNodeIndex = function (id, type, nodeindex, modelIndex) {
        var mcaxFilter = new MCAXFilter(this.renderApp, this.mcax);
        var partNodeIds = this.renderApp.getVisibleNodeIds();
        var visible = mcaxFilter.getVisibleGeometries(partNodeIds);
        var selectedPartNodes = [];
        visible.forEach(function (geo) {
            geo.representations.forEach(function (repId) {
                if (mcaxFilter.getRepresentationType(repId) !== "BBOX")
                    selectedPartNodes.push(repId);
            });
        });
        if (selectedPartNodes.length > 0) {
            var nodeIds = this.caeResult.getNodeId(nodeindex);
            var labelId = id;
            var result = this.labelManager.add3dLabelforNodeId(labelId, type, nodeIds, modelIndex, nodeindex, selectedPartNodes);
            if (result === true)
                return labelId;
        }
        return null;
    };
    Viewer.prototype.getHotspotData = function (hotspotParams, variableId, stepId, derivedTypeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ///let hotspotNodeIndexes : Uint32Array = await this.caeResult.getHotSpot(hotspotParams, variableId, stepId, derivedTypeId);
                //return Array.from(hotspotNodeIndexes);
                return [2 /*return*/, this.caeResult.getHotSpot(hotspotParams, variableId, stepId, derivedTypeId)];
            });
        });
    };
    //testing
    Viewer.prototype.add3dLabelforNodeIndexes = function (id, type, nodeindexes, modelIndex) {
        var _this = this;
        var mcaxFilter = new MCAXFilter(this.renderApp, this.mcax);
        var partNodeIds = this.renderApp.getVisibleNodeIds();
        var visible = mcaxFilter.getVisibleGeometries(partNodeIds);
        var selectedPartNodes = [];
        visible.forEach(function (geo) {
            geo.representations.forEach(function (repId) {
                if (mcaxFilter.getRepresentationType(repId) !== "BBOX")
                    selectedPartNodes.push(repId);
            });
        });
        var labelIds = [];
        if (selectedPartNodes.length > 0) {
            nodeindexes.forEach(function (nodeindex, index) {
                var nodeIds = _this.caeResult.getNodeId(nodeindex);
                var labelId = id + "_Hotspot_" + index;
                var result = _this.labelManager.add3dLabelforNodeId(labelId, type, nodeIds, modelIndex, nodeindex, selectedPartNodes);
                if (result)
                    labelIds.push(labelId);
            });
        }
        return labelIds;
    };
    //testing
    Viewer.prototype.addHotspot3dLabel = function (id, type, modelIndex, hotspotParams, variableId, stepId, derivedTypeId) {
        return __awaiter(this, void 0, void 0, function () {
            var labelIds, hotspotNodeIndexes, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        labelIds = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.caeResult.getHotSpot(hotspotParams, variableId, stepId, derivedTypeId)];
                    case 2:
                        hotspotNodeIndexes = _a.sent();
                        labelIds = this.add3dLabelforNodeIndexes(id, type, Array.from(hotspotNodeIndexes), modelIndex);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, labelIds];
                }
            });
        });
    };
    Viewer.prototype.deleteLabel = function (uid) {
        return this.labelManager.delete3DLabel(uid);
    };
    Viewer.prototype.get3DLabelCanvasPos = function (uid) {
        return this.labelManager.get3DLabelCanvasPos(uid);
    };
    Viewer.prototype.getLabel3DInfo = function (id) {
        return this.labelManager.getLabel3DInfo(id);
    };
    //#endregion
    //#region Results
    Viewer.prototype.getIsCAEResultAvailable = function () {
        if (this.caeResult)
            return this.caeResult.getIsCAEResultAvailable();
        return false;
    };
    Viewer.prototype.getDisplayResult = function () {
        if (this.caeResult)
            return this.caeResult.getDisplayResult();
        return null;
    };
    Viewer.prototype.getSteps = function (selectedResultIndex) {
        if (this.caeResult)
            return this.caeResult.getSteps(selectedResultIndex);
        return null;
    };
    Viewer.prototype.getResults = function () {
        if (this.caeResult)
            return this.caeResult.getResults();
        return null;
    };
    Viewer.prototype.getDerivedTypes = function (selectedResultIndex) {
        if (this.caeResult)
            return this.caeResult.getDerivedTypes(selectedResultIndex);
        return null;
    };
    Viewer.prototype.applyResult = function (resultIndex, stepIndex, derivedTypeIndex) {
        if (this.caeResult)
            return this.caeResult.applyResult(resultIndex, stepIndex, derivedTypeIndex, this.productTree);
        return null;
    };
    Viewer.prototype.setValueMinMax = function (minMax) {
        if (this.caeResult)
            this.caeResult.setValueMinMax(minMax);
    };
    Viewer.prototype.getCurrentResultMinMAX = function () {
        if (this.caeResult)
            return this.caeResult.getMinMAX();
    };
    Viewer.prototype.applyMaterialColor = function (nodeIndexList) {
        if (this.renderApp) {
            this.renderApp.setUseTexture(nodeIndexList, false);
            //let nodes = this.productTree.getPartNodeFromNodeIds(selectedNodes);
            //if(selectedNodes.length == 0)
            //{
            var nodes = this.productTree.getAllPartNodes();
            nodes.forEach(function (node) {
                node.customData.displayProps.useTexture = false;
            });
            //}
        }
        return true;
    };
    Viewer.prototype.setLegendData = function (paletteType, colors, noResultColor) {
        if (this.caeResult)
            return this.caeResult.setLegendData(paletteType, colors, noResultColor);
        return false;
    };
    Viewer.prototype.setNoResultColor = function (noResultColor) {
        if (this.caeResult)
            return this.caeResult.setNoResultColor(noResultColor);
        return false;
    };
    Viewer.prototype.setAboveMaxColor = function (aboveMaxColor) {
        if (this.caeResult)
            return this.caeResult.setAboveMaxColor(aboveMaxColor);
        return false;
    };
    Viewer.prototype.setBelowMinColor = function (belowMinColor) {
        if (this.caeResult)
            return this.caeResult.setBelowMinColor(belowMinColor);
        return false;
    };
    Viewer.prototype.getLegendData = function () {
        if (this.caeResult)
            return this.caeResult.getLegendData();
        return null;
    };
    Viewer.prototype.getDeformationValues = function (resultIndex, stepIndex, derivedTypeIndex) {
        if (this.caeResult) {
            var mcaxFilter_1 = new MCAXFilter(this.renderApp, this.mcax);
            var partNodeIds = this.renderApp.getVisibleNodeIds();
            var visible = mcaxFilter_1.getVisibleGeometries(partNodeIds);
            var selectedPartNodes_1 = [];
            visible.forEach(function (geo) {
                geo.representations.forEach(function (repId) {
                    if (mcaxFilter_1.getRepresentationType(repId) !== "BBOX")
                        selectedPartNodes_1.push(repId);
                });
            });
            return this.caeResult.getDeformationValues(resultIndex, stepIndex, derivedTypeIndex, selectedPartNodes_1);
        }
        return null;
    };
    //#endregion 
    //#region section
    Viewer.prototype.getSectionGUIData = function () {
        return this.sectionManager.getSectionGUIData();
    };
    Viewer.prototype.setSectionGUIData = function (guiData) {
        this.sectionManager.setSectionGUIData(guiData);
        return 'SUCCESS';
    };
    Viewer.prototype.setActiveSectionPlane = function (planeId) {
        this.sectionManager.setActive(planeId);
        return 'SUCCESS';
    };
    Viewer.prototype.setSectionPlaneEquation = function (planeId, transform, initTransform) {
        this.sectionManager.setSectionPlaneEquation(planeId, transform, initTransform);
        return 'SUCCESS';
    };
    Viewer.prototype.getSectionPlaneEquation = function (planeId) {
        return this.sectionManager.getSectionPlaneEquation(planeId);
    };
    Viewer.prototype.addSectionPlane = function (planeId, transform, color) {
        this.sectionManager.addSectionPlane(planeId, transform, color);
        return 'SUCCESS';
    };
    Viewer.prototype.deleteSectionPlane = function (planeId) {
        this.sectionManager.deleteSectionPlane(planeId);
        return 'SUCCESS';
    };
    Viewer.prototype.setPlaneState = function (planeId, selectedPlaneOptions) {
        this.sectionManager.setPlaneState(planeId, selectedPlaneOptions);
        return 'SUCCESS';
    };
    Viewer.prototype.invertSectionPlane = function (planeId) {
        this.sectionManager.invert(planeId);
    };
    //#endregion
    //#region PartManipulation
    Viewer.prototype.enablePickAndMove = function (toEnable) {
        this.state.interactionMode = InteractionMode.PICK_AND_MOVE;
        this.renderApp.enablePickAndMove(toEnable);
        return 'SUCCESS';
    };
    Viewer.prototype.resetPickAndMove = function () {
        this.state.interactionMode = InteractionMode.DEFAULT;
        this.renderApp.resetPickAndMove();
        return 'SUCCESS';
    };
    Viewer.prototype.getPartPickandMoveMatrix = function (nodeId) {
        var nodes = this.productTree.getPartNodeFromNodeIds([nodeId]);
        var reps = this.productTree.getRepresentationsFromParts(nodes);
        reps = reps.filter(function (rep) { return rep.customData.type === RepresentationType.MESH; });
        var repIds = reps.map(function (rep) { return rep.customData.node; });
        if (repIds.length > 0) {
            return this.renderApp.getPartPickandMoveMatrix(repIds[0]);
        }
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]; // identity matrix         
    };
    Viewer.prototype.setPartPickandMoveMatrix = function (nodeIds, mat4) {
        var nodes = this.productTree.getPartNodeFromNodeIds(nodeIds);
        var reps = this.productTree.getRepresentationsFromParts(nodes);
        reps = reps.filter(function (rep) { return rep.customData.type !== RepresentationType.HIGHLIGHT; });
        var repIds = reps.map(function (rep) { return rep.customData.node; });
        if (repIds.length > 0) {
            this.renderApp.setPartPickandMoveMatrix(repIds, mat4);
        }
    };
    //#endregion
    //#region Quick Tools
    Viewer.prototype.fitView = function (selectedNodes) {
        if (selectedNodes.length == 0) {
            this.renderApp.fitView();
        }
        else {
            var repIds = this.productTree.getRenderNodeIdsFromNodeIds(selectedNodes);
            this.renderApp.fitView(repIds);
            //console.log("fitView for",repIds);
        }
        return 'SUCCESS';
    };
    Viewer.prototype.captureScreen = function () {
        this.renderApp.captureScreen();
        return 'SUCCESS';
    };
    //#
    //# Camera Control
    Viewer.prototype.zoomOut = function (scale) {
        this.renderApp.zoomOut(scale);
    };
    Viewer.prototype.zoomIn = function (scale) {
        this.renderApp.zoomIn(scale);
    };
    Viewer.prototype.pointZoomIn = function (posX, posY, factor) {
        this.renderApp.pointZoomIn(posX, posY, factor);
    };
    Viewer.prototype.pointZoomOut = function (posX, posY, factor) {
        this.renderApp.pointZoomOut(posX, posY, factor);
    };
    Viewer.prototype.onMouseRotation = function (newX, newY, lastX, lastY) {
        this.renderApp.onMouseRotation(newX, newY, lastX, lastY);
    };
    Viewer.prototype.onMousePanRotation = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        this.renderApp.onMousePanRotation(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    Viewer.prototype.panRotateCamera = function (deltaX, deltaY) {
        this.renderApp.panRotateCamera(deltaX, deltaY);
    };
    Viewer.prototype.rotateCamera = function (angleInRadian, axisInCameraCoord) {
        this.renderApp.rotateCamera(angleInRadian, axisInCameraCoord);
    };
    Viewer.prototype.zoomOutCamera = function (scale) {
        this.renderApp.zoomOutCamera(scale);
    };
    Viewer.prototype.zoomInCamera = function (scale) {
        this.renderApp.zoomInCamera(scale);
    };
    Viewer.prototype.translatePart = function (newMouseX, newMouseY, lastMouseX, lastMouseY) {
        this.renderApp.translatePart(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    Viewer.prototype.rotatePartCamera = function (angleInRadian, axisInCameraCoord) {
        this.renderApp.rotatePartCamera(angleInRadian, axisInCameraCoord);
    };
    Viewer.prototype.translateZ = function (scale) {
        this.renderApp.translateZ(scale);
    };
    //#endregion
    //#region Animation   
    Viewer.prototype.startAnimation = function () {
        return this.renderApp.startAnimation();
    };
    Viewer.prototype.stopAnimation = function () {
        return this.renderApp.stopAnimation();
    };
    Viewer.prototype.pauseAnimation = function () {
        return this.renderApp.pauseAnimation();
    };
    Viewer.prototype.setAnimationData = function (type, numberOfFrames, delay) {
        return this.renderApp.setAnimationData(type, numberOfFrames, delay);
    };
    Viewer.prototype.changeAnimationFrameDelay = function (delay) {
        return this.renderApp.changeAnimationFrameDelay(delay);
    };
    Viewer.prototype.moveForwardAnimationFrame = function () {
        return this.renderApp.moveForwardAnimationFrame();
    };
    Viewer.prototype.moveBackwardAnimationFrame = function () {
        return this.renderApp.moveBackwardAnimationFrame();
    };
    Viewer.prototype.moveToSpecificAnimationFrame = function (frameNumber) {
        return this.renderApp.moveToSpecificAnimationFrame(frameNumber);
    };
    Viewer.prototype.setAnimationScaleFactor = function (scalefactor) {
        return this.renderApp.setAnimationScaleFactor(scalefactor);
    };
    return Viewer;
}());var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this._listeners = {};
    }
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        if (this._listeners === undefined)
            this._listeners = {};
        var listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        if (this._listeners === undefined)
            return false;
        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener) {
        if (this._listeners === undefined)
            return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            var index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    };
    EventDispatcher.prototype.removeAllEventListener = function () {
        this._listeners = undefined;
    };
    EventDispatcher.prototype.dispatchEvent = function (event) {
        if (this._listeners === undefined)
            return;
        var listeners = this._listeners;
        var listenerArray = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            var array = [];
            var length_1 = listenerArray.length;
            for (var i = 0; i < length_1; i++) {
                array[i] = listenerArray[i];
            }
            for (var i = 0; i < length_1; i++) {
                array[i].call(this, event);
            }
        }
    };
    return EventDispatcher;
}());/// <reference path="../plugins/store.d.ts" />
//import boundStore from "../plugins/store.js";
/*
import debug from 'debug';
const log = debug('app:log');
// The logger should only be disabled if we’re not in production.
if ( globalThis && globalThis.process.env.NODE_ENV.toString() !== 'production') {
    debug.enable('*');
    log('Logging is enabled!');
  } else {
    debug.disable();
  }
*/
var ViewerManager = /** @class */ (function () {
    //private store : unknown;
    function ViewerManager() {
        this.viewerMap = new Map();
        this.eventDispacther = new EventDispatcher();
        this.defaultViewerID = null;
        //this.StoreTest();
    }
    /*
    StoreTest(){
        console.log("StoreTest start");
        const store = boundStore.getState();
        console.log(store);
        store.viewerState.addViewer("sdfsdfdf",{id : "sdfsdfdf"})
        store.viewerState.addViewer("44",{id : "44"})
        console.log(boundStore.getState());
        console.log("StoreTest end");
    }
    */
    //#region General
    ViewerManager.prototype.getVersion = function () {
        return version;
    };
    ViewerManager.prototype.getRenderVersion = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getRenderVersion();
        }
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.createViewer = function (_containerID, disableMouseEvents) {
        if (disableMouseEvents === void 0) { disableMouseEvents = false; }
        var viewerUUID = Utility.create_UUID();
        var viewer = new Viewer(viewerUUID, _containerID, this.eventDispacther, disableMouseEvents);
        if (this.defaultViewerID === null) {
            this.defaultViewerID = viewerUUID;
        }
        this.viewerMap.set(viewerUUID, viewer);
        /*
        boundStore.setState(state => {
            state.viewerState.createViewer(viewerUUID);
        })
        boundStore.setState(state => state.viewerState.)
        */
        return viewerUUID;
    };
    ViewerManager.prototype.getDefaultViewerID = function () {
        return this.defaultViewerID;
    };
    ViewerManager.prototype.getEventsList = function () {
        return { viewerEvents: viewerEvents, globalEvents: globalEvents };
    };
    ViewerManager.prototype.getEventDispatcher = function () {
        if (this.eventDispacther) {
            return this.eventDispacther;
        }
        return null;
    };
    ViewerManager.prototype.deleteViewer = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            viewer.clear();
            return viewer.delete();
        }
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.loadModel = function (api, url, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.loadModel(api, url);
        }
        return Promise.reject("Invalid viewer ID");
    };
    ViewerManager.prototype.getModelInfo = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getModelInfo();
        }
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.getSceneBoundingBox = function (onlyVisible, viewerUUID) {
        if (onlyVisible === void 0) { onlyVisible = true; }
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getSceneBoundingBox(onlyVisible);
        }
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.showModel = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        if (viewer) {
            return viewer.showModel();
        }
        return Promise.reject("Invalid viewer ID");
    };
    ViewerManager.prototype.getViewer = function (viewerUUID) {
        return viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
    };
    ViewerManager.prototype.setExternalLogger = function (externalLogger) {
        Logger.setExternalLogger(externalLogger);
    };
    ViewerManager.prototype.setInterationMode = function (mode, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        viewer.setInteractionMode(mode);
    };
    ViewerManager.prototype.setBackground = function (viewerUUID, type, data) {
        var viewer = this.getViewer(viewerUUID);
        viewer.setBackground(type, data);
    };
    ViewerManager.prototype.getViewerSize = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.getViewerSize();
    };
    //#endregion
    //#region Camera
    ViewerManager.prototype.getCameraStdViews = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getCameraStdViews();
    };
    ViewerManager.prototype.getCameraInfo = function (camType, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getCameraInfo(camType);
    };
    ViewerManager.prototype.setCameraInfo = function (camData, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.setCameraInfo(camData);
    };
    ViewerManager.prototype.setCameraProjection = function (camType, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        viewer.setCameraProjection(camType);
    };
    //#endregion
    //#region Input
    ViewerManager.prototype.setMouseInputMapping = function (json, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.setMouseInputMapping(json);
        }
        return false;
    };
    ViewerManager.prototype.getMouseInputData = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getMouseInputData();
        }
        return null;
    };
    ViewerManager.prototype.getSystemMouseMappings = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getSystemMouseMappings();
        }
        return null;
    };
    //#endregion 
    //#region part and product tree
    ViewerManager.prototype.getProductTree = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.getProductTree();
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.setSelectedParts = function (selectedParts, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.setSelectedParts(selectedParts);
        }
        return "Invalid viewer ID";
    };
    ViewerManager.prototype.setPartsVisibility = function (selectedParts, visibility, viewerUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var viewer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
                        if (!viewer) return [3 /*break*/, 2];
                        return [4 /*yield*/, viewer.setPartsVisibility(selectedParts, visibility)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, Promise.reject("Invalid viewer ID")];
                }
            });
        });
    };
    ViewerManager.prototype.invertPartsVisibility = function (viewerUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var viewer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
                        if (!viewer) return [3 /*break*/, 2];
                        return [4 /*yield*/, viewer.invertPartsVisibility()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, Promise.reject("Invalid viewer ID")];
                }
            });
        });
    };
    ViewerManager.prototype.getDisplayModes = function (selectedNodes, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getDisplayModes(selectedNodes);
        }
        return Promise.reject("Invalid viewer ID");
    };
    ViewerManager.prototype.setDisplayMode = function (displayModeId, selectedNodes, viewerUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var viewer, r, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
                        if (!viewer) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, viewer.setDisplayMode(true, displayModeId, selectedNodes)];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, r];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject("Error in setting display Mode" + error_1)];
                    case 4: return [2 /*return*/, Promise.reject("Invalid viewer ID")];
                }
            });
        });
    };
    ViewerManager.prototype.getSearchHints = function (viewerUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var viewer;
            return __generator(this, function (_a) {
                viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
                if (viewer) {
                    return [2 /*return*/, viewer.getSearchHints()];
                }
                return [2 /*return*/, Promise.reject("Invalid viewer ID")];
            });
        });
    };
    ViewerManager.prototype.setHighlightedNodes = function (selectedNodes, toHighlight, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.setHighlightedNodes(selectedNodes, toHighlight);
        }
    };
    // changeDisplayedNodes(selectionInfo:any, viewerUUID:any){
    //     let viewer = this.getViewer(viewerUUID);
    //     return viewer.changeDisplayedNodes(selectionInfo);
    // }
    //#endregion
    //#region CAE Result
    ViewerManager.prototype.isCAEResultAvailable = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getIsCAEResultAvailable();
    };
    ViewerManager.prototype.getDisplayResult = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getDisplayResult();
    };
    ViewerManager.prototype.getResults = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getResults();
    };
    ViewerManager.prototype.getSteps = function (selectedResultIndex, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getSteps(selectedResultIndex);
    };
    ViewerManager.prototype.getDerivedTypes = function (selectedResultIndex, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getDerivedTypes(selectedResultIndex);
    };
    ViewerManager.prototype.applyResult = function (resultId, stepId, derivedTypeId, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.applyResult(resultId, stepId, derivedTypeId);
    };
    ViewerManager.prototype.setValueMinMax = function (minMax, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        viewer.setValueMinMax(minMax);
    };
    ViewerManager.prototype.getCurrentResultMinMAX = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getCurrentResultMinMAX();
    };
    ViewerManager.prototype.applyMaterialColor = function (nodeIndexList, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.applyMaterialColor(nodeIndexList);
    };
    ViewerManager.prototype.setLegendData = function (paletteType, colors, viewerUUID, noResultColor) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.setLegendData(paletteType, colors, noResultColor);
    };
    ViewerManager.prototype.setNoResultColor = function (noResultColor, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.setNoResultColor(noResultColor);
    };
    ViewerManager.prototype.setAboveMaxColor = function (aboveMaxColor, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.setAboveMaxColor(aboveMaxColor);
    };
    ViewerManager.prototype.setBelowMinColor = function (belowMinColor, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.setBelowMinColor(belowMinColor);
    };
    ViewerManager.prototype.getLegendData = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getLegendData();
    };
    ViewerManager.prototype.getDeformationValues = function (resultIndex, stepIndex, derivedTypeIndex, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        return viewer.getDeformationValues(resultIndex, stepIndex, derivedTypeIndex);
    };
    //#endregion
    //#region Probing
    ViewerManager.prototype.probeFromNodes = function (pointerData, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.probeFromNodes(pointerData);
        else
            return "Invalid viewer id";
    };
    //#endregion
    //#region Labels
    ViewerManager.prototype.add3DLabel = function (uid, hitPoint, type, probeData, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        viewer.add3DLabel(uid, hitPoint, type, probeData);
    };
    ViewerManager.prototype.addMeasurementLabel = function (id, hitPoint, type, probeData, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        viewer.addMeasurementLabel(id, hitPoint, type, probeData);
    };
    ViewerManager.prototype.showHideLabelVisibility = function (id, flag, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        viewer.showHideLabelVisibility(id, flag);
    };
    ViewerManager.prototype.add3dLabelforNodeId = function (uid, type, nodeIds, modelIndex, viewerUUID) {
        if (modelIndex === void 0) { modelIndex = 0; }
        var viewer = this.getViewer(viewerUUID);
        return viewer.add3dLabelforNodeId(uid, type, nodeIds, modelIndex);
    };
    ViewerManager.prototype.getHotspotData = function (hotspotParams, variableId, stepId, derivedTypeId, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.getHotspotData(hotspotParams, variableId, stepId, derivedTypeId);
    };
    ViewerManager.prototype.add3dLabelforNodeIndex = function (id, type, nodeindex, modelIndex, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.add3dLabelforNodeIndex(id, type, nodeindex, modelIndex);
    };
    //testing
    ViewerManager.prototype.add3dLabelforNodeIndexes = function (uid, type, nodeindexes, modelIndex, viewerUUID) {
        if (modelIndex === void 0) { modelIndex = 0; }
        var viewer = this.getViewer(viewerUUID);
        return viewer.add3dLabelforNodeIndexes(uid, type, nodeindexes, modelIndex);
    };
    //testing
    ViewerManager.prototype.addHotspot3dLabel = function (id, type, modelIndex, hotspotParams, variableId, stepId, derivedTypeId, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.addHotspot3dLabel(id, type, modelIndex, hotspotParams, variableId, stepId, derivedTypeId);
    };
    ViewerManager.prototype.delete3DLabel = function (uid, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.deleteLabel(uid);
    };
    ViewerManager.prototype.get3DLabelCanvasPos = function (uid, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.get3DLabelCanvasPos(uid);
    };
    ViewerManager.prototype.getLabel3DInfo = function (id, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.getLabel3DInfo(id);
    };
    //#endregion
    //#region Section
    ViewerManager.prototype.getSectionGUIData = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.getSectionGUIData();
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.setActiveSectionPlane = function (planeId, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.setActiveSectionPlane(planeId);
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.setSectionPlaneEquation = function (planeId, transform, initTransform, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.setSectionPlaneEquation(planeId, transform, initTransform);
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.getSectionPlaneEquation = function (planeId, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.getSectionPlaneEquation(planeId);
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.addSectionPlane = function (planeId, transform, color, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.addSectionPlane(planeId, transform, color);
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.deleteSectionPlane = function (planeId, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.deleteSectionPlane(planeId);
        else
            return "Invalid viewer id";
    };
    ViewerManager.prototype.setSectionPlaneGUIData = function (planeId, selectedPlaneOptions, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.setPlaneState(planeId, selectedPlaneOptions);
        else
            return "Invalid viewer id";
    };
    // invertSectionPlane(planeId:PlaneId,viewerUUID:any){
    //     let viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
    //     if(viewer)
    //     viewer.invertSectionPlane(planeId);
    //     else
    //     return "Invalid viewer id";
    // }
    // planeFrom3pts(planeId:PlaneId,p1:number[],p2:number[],p3:number[],transform:mat4,viewerUUID:any){
    //     let viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
    //     if(viewer)
    //     viewer.planeFrom3pts(planeId,p1,p2,p3,transform);
    //     else
    //     return "Invalid viewer id";
    // }
    // resetSection(viewerUUID:any){
    //     let viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
    //     if(viewer)
    //     viewer.resetSection();
    //     else
    //     return "Invalid viewer id";
    // }
    //#endregion
    //#region PartManipulation
    ViewerManager.prototype.enablePickAndMove = function (toEnable, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.enablePickAndMove(toEnable);
        }
        return "Invalid viewer id";
    };
    ViewerManager.prototype.resetPickAndMove = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.resetPickAndMove();
        }
        return "Invalid viewer id";
    };
    ViewerManager.prototype.getPartPickandMoveMatrix = function (nodeId, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            return viewer.getPartPickandMoveMatrix(nodeId);
        }
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]; // identity matrix
    };
    ViewerManager.prototype.setPartPickandMoveMatrix = function (nodeIds, mat4, viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer) {
            viewer.setPartPickandMoveMatrix(nodeIds, mat4);
        }
    };
    //#endregion
    //#region Quick tools
    ViewerManager.prototype.fitView = function (selectedNodes, viewerUUID) {
        if (selectedNodes === void 0) { selectedNodes = []; }
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.fitView(selectedNodes);
        return "Invalid viewer id";
    };
    ViewerManager.prototype.captureScreen = function (viewerUUID) {
        var viewer = viewerUUID ? this.viewerMap.get(viewerUUID) : this.viewerMap.get(this.defaultViewerID);
        if (viewer)
            return viewer.captureScreen();
        return "Invalid viewer id";
    };
    //#endregion
    //#region Animation    
    ViewerManager.prototype.startAnimation = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.startAnimation();
    };
    ViewerManager.prototype.stopAnimation = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.stopAnimation();
    };
    ViewerManager.prototype.pauseAnimation = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.pauseAnimation();
    };
    ViewerManager.prototype.setAnimationData = function (type, numberOfFrames, delay, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.setAnimationData(type, numberOfFrames, delay);
    };
    ViewerManager.prototype.changeAnimationFrameDelay = function (delay, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.changeAnimationFrameDelay(delay);
    };
    ViewerManager.prototype.moveForwardAnimationFrame = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.moveForwardAnimationFrame();
    };
    ViewerManager.prototype.moveBackwardAnimationFrame = function (viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.moveBackwardAnimationFrame();
    };
    ViewerManager.prototype.moveToSpecificAnimationFrame = function (frameNumber, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.moveToSpecificAnimationFrame(frameNumber);
    };
    ViewerManager.prototype.setAnimationScaleFactor = function (scalefactor, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.setAnimationScaleFactor(scalefactor);
    };
    //#endregion
    //# camera controls
    ViewerManager.prototype.zoomOut = function (scale, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.zoomOut(scale);
    };
    ViewerManager.prototype.zoomIn = function (scale, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.zoomIn(scale);
    };
    ViewerManager.prototype.pointZoomIn = function (posX, posY, factor, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.pointZoomIn(posX, posY, factor);
    };
    ViewerManager.prototype.pointZoomOut = function (posX, posY, factor, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.pointZoomOut(posX, posY, factor);
    };
    ViewerManager.prototype.onMouseRotation = function (newX, newY, lastX, lastY, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.onMouseRotation(newX, newY, lastX, lastY);
    };
    ViewerManager.prototype.onMousePanRotation = function (newMouseX, newMouseY, lastMouseX, lastMouseY, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.onMousePanRotation(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    ViewerManager.prototype.panRotateCamera = function (deltaX, deltaY, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.panRotateCamera(deltaX, deltaY);
    };
    ViewerManager.prototype.rotateCamera = function (angleInRadian, axisInCameraCoord, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.rotateCamera(angleInRadian, axisInCameraCoord);
    };
    ViewerManager.prototype.zoomOutCamera = function (scale, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.zoomOutCamera(scale);
    };
    ViewerManager.prototype.zoomInCamera = function (scale, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.zoomInCamera(scale);
    };
    ViewerManager.prototype.handleGUIEvents = function (eventType, event, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.handleGUIEvents(eventType, event);
    };
    ViewerManager.prototype.translatePart = function (newMouseX, newMouseY, lastMouseX, lastMouseY, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.translatePart(newMouseX, newMouseY, lastMouseX, lastMouseY);
    };
    ViewerManager.prototype.rotatePartCamera = function (angleInRadian, axisInCameraCoord, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.rotatePartCamera(angleInRadian, axisInCameraCoord);
    };
    ViewerManager.prototype.translateZ = function (scale, viewerUUID) {
        var viewer = this.getViewer(viewerUUID);
        return viewer.translateZ(scale);
    };
    return ViewerManager;
}());
var ViewerManager$1 = (new ViewerManager);export default ViewerManager$1;export{EventDispatcher,InteractionMode,globalEvents,viewerEvents};//# sourceMappingURL=ViewerManager.js.map
