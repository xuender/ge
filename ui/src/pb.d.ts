import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace pb. */
export namespace pb {

    /** Format enum. */
    enum Format {
        err = 0,
        source = 1,
        dot = 2,
        svg = 3,
        png = 4,
        jpg = 5
    }

    /** Properties of a Msg. */
    interface IMsg {

        /** Msg format */
        format?: (pb.Format|null);

        /** Msg dot */
        dot?: (string|null);

        /** Msg svg */
        svg?: (string|null);

        /** Msg err */
        err?: (string|null);

        /** Msg png */
        png?: (Uint8Array|null);

        /** Msg jpg */
        jpg?: (Uint8Array|null);
    }

    /** Represents a Msg. */
    class Msg implements IMsg {

        /**
         * Constructs a new Msg.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMsg);

        /** Msg format. */
        public format: pb.Format;

        /** Msg dot. */
        public dot: string;

        /** Msg svg. */
        public svg: string;

        /** Msg err. */
        public err: string;

        /** Msg png. */
        public png: Uint8Array;

        /** Msg jpg. */
        public jpg: Uint8Array;

        /**
         * Creates a new Msg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Msg instance
         */
        public static create(properties?: pb.IMsg): pb.Msg;

        /**
         * Encodes the specified Msg message. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Msg;

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Msg;

        /**
         * Verifies a Msg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Msg
         */
        public static fromObject(object: { [k: string]: any }): pb.Msg;

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @param message Msg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Msg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Msg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Msg
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
