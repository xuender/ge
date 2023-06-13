/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const pb = $root.pb = (() => {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    const pb = {};

    /**
     * Format enum.
     * @name pb.Format
     * @enum {number}
     * @property {number} err=0 err value
     * @property {number} source=1 source value
     * @property {number} dot=2 dot value
     * @property {number} svg=3 svg value
     * @property {number} png=4 png value
     * @property {number} jpg=5 jpg value
     */
    pb.Format = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "err"] = 0;
        values[valuesById[1] = "source"] = 1;
        values[valuesById[2] = "dot"] = 2;
        values[valuesById[3] = "svg"] = 3;
        values[valuesById[4] = "png"] = 4;
        values[valuesById[5] = "jpg"] = 5;
        return values;
    })();

    pb.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof pb
         * @interface IMsg
         * @property {pb.Format|null} [format] Msg format
         * @property {string|null} [dot] Msg dot
         * @property {string|null} [svg] Msg svg
         * @property {string|null} [err] Msg err
         * @property {Uint8Array|null} [png] Msg png
         * @property {Uint8Array|null} [jpg] Msg jpg
         */

        /**
         * Constructs a new Msg.
         * @memberof pb
         * @classdesc Represents a Msg.
         * @implements IMsg
         * @constructor
         * @param {pb.IMsg=} [properties] Properties to set
         */
        function Msg(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg format.
         * @member {pb.Format} format
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.format = 0;

        /**
         * Msg dot.
         * @member {string} dot
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.dot = "";

        /**
         * Msg svg.
         * @member {string} svg
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.svg = "";

        /**
         * Msg err.
         * @member {string} err
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.err = "";

        /**
         * Msg png.
         * @member {Uint8Array} png
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.png = $util.newBuffer([]);

        /**
         * Msg jpg.
         * @member {Uint8Array} jpg
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.jpg = $util.newBuffer([]);

        /**
         * Creates a new Msg instance using the specified properties.
         * @function create
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg=} [properties] Properties to set
         * @returns {pb.Msg} Msg instance
         */
        Msg.create = function create(properties) {
            return new Msg(properties);
        };

        /**
         * Encodes the specified Msg message. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encode
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.format != null && Object.hasOwnProperty.call(message, "format"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.format);
            if (message.dot != null && Object.hasOwnProperty.call(message, "dot"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.dot);
            if (message.svg != null && Object.hasOwnProperty.call(message, "svg"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.svg);
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.err);
            if (message.png != null && Object.hasOwnProperty.call(message, "png"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.png);
            if (message.jpg != null && Object.hasOwnProperty.call(message, "jpg"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.jpg);
            return writer;
        };

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Msg();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.format = reader.int32();
                        break;
                    }
                case 2: {
                        message.dot = reader.string();
                        break;
                    }
                case 3: {
                        message.svg = reader.string();
                        break;
                    }
                case 4: {
                        message.err = reader.string();
                        break;
                    }
                case 5: {
                        message.png = reader.bytes();
                        break;
                    }
                case 6: {
                        message.jpg = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Msg message.
         * @function verify
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Msg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.format != null && message.hasOwnProperty("format"))
                switch (message.format) {
                default:
                    return "format: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.dot != null && message.hasOwnProperty("dot"))
                if (!$util.isString(message.dot))
                    return "dot: string expected";
            if (message.svg != null && message.hasOwnProperty("svg"))
                if (!$util.isString(message.svg))
                    return "svg: string expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            if (message.png != null && message.hasOwnProperty("png"))
                if (!(message.png && typeof message.png.length === "number" || $util.isString(message.png)))
                    return "png: buffer expected";
            if (message.jpg != null && message.hasOwnProperty("jpg"))
                if (!(message.jpg && typeof message.jpg.length === "number" || $util.isString(message.jpg)))
                    return "jpg: buffer expected";
            return null;
        };

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Msg} Msg
         */
        Msg.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Msg)
                return object;
            let message = new $root.pb.Msg();
            switch (object.format) {
            default:
                if (typeof object.format === "number") {
                    message.format = object.format;
                    break;
                }
                break;
            case "err":
            case 0:
                message.format = 0;
                break;
            case "source":
            case 1:
                message.format = 1;
                break;
            case "dot":
            case 2:
                message.format = 2;
                break;
            case "svg":
            case 3:
                message.format = 3;
                break;
            case "png":
            case 4:
                message.format = 4;
                break;
            case "jpg":
            case 5:
                message.format = 5;
                break;
            }
            if (object.dot != null)
                message.dot = String(object.dot);
            if (object.svg != null)
                message.svg = String(object.svg);
            if (object.err != null)
                message.err = String(object.err);
            if (object.png != null)
                if (typeof object.png === "string")
                    $util.base64.decode(object.png, message.png = $util.newBuffer($util.base64.length(object.png)), 0);
                else if (object.png.length >= 0)
                    message.png = object.png;
            if (object.jpg != null)
                if (typeof object.jpg === "string")
                    $util.base64.decode(object.jpg, message.jpg = $util.newBuffer($util.base64.length(object.jpg)), 0);
                else if (object.jpg.length >= 0)
                    message.jpg = object.jpg;
            return message;
        };

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Msg
         * @static
         * @param {pb.Msg} message Msg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Msg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.format = options.enums === String ? "err" : 0;
                object.dot = "";
                object.svg = "";
                object.err = "";
                if (options.bytes === String)
                    object.png = "";
                else {
                    object.png = [];
                    if (options.bytes !== Array)
                        object.png = $util.newBuffer(object.png);
                }
                if (options.bytes === String)
                    object.jpg = "";
                else {
                    object.jpg = [];
                    if (options.bytes !== Array)
                        object.jpg = $util.newBuffer(object.jpg);
                }
            }
            if (message.format != null && message.hasOwnProperty("format"))
                object.format = options.enums === String ? $root.pb.Format[message.format] === undefined ? message.format : $root.pb.Format[message.format] : message.format;
            if (message.dot != null && message.hasOwnProperty("dot"))
                object.dot = message.dot;
            if (message.svg != null && message.hasOwnProperty("svg"))
                object.svg = message.svg;
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            if (message.png != null && message.hasOwnProperty("png"))
                object.png = options.bytes === String ? $util.base64.encode(message.png, 0, message.png.length) : options.bytes === Array ? Array.prototype.slice.call(message.png) : message.png;
            if (message.jpg != null && message.hasOwnProperty("jpg"))
                object.jpg = options.bytes === String ? $util.base64.encode(message.jpg, 0, message.jpg.length) : options.bytes === Array ? Array.prototype.slice.call(message.jpg) : message.jpg;
            return object;
        };

        /**
         * Converts this Msg to JSON.
         * @function toJSON
         * @memberof pb.Msg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Msg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Msg
         * @function getTypeUrl
         * @memberof pb.Msg
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Msg.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Msg";
        };

        return Msg;
    })();

    return pb;
})();

export { $root as default };
