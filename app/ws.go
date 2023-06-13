package app

import (
	"github.com/gorilla/websocket"
	"github.com/xuender/ge/pb"
	"google.golang.org/protobuf/proto"
)

func SendError(conn *websocket.Conn, err error) error {
	return Send(conn, &pb.Msg{Err: err.Error(), Format: pb.Format_err})
}

func SendFormat(conn *websocket.Conn, format pb.Format, data []byte) error {
	msg := &pb.Msg{Format: format}

	switch format {
	case pb.Format_svg:
		msg.Svg = string(data)
	case pb.Format_dot, pb.Format_source:
		msg.Dot = string(data)
	case pb.Format_png:
		msg.Png = data
	case pb.Format_jpg:
		msg.Jpg = data
	case pb.Format_err:
		msg.Err = string(data)
	}

	return Send(conn, msg)
}

func Send(conn *websocket.Conn, msg *pb.Msg) error {
	data, err := proto.Marshal(msg)
	if err != nil {
		return err
	}

	return conn.WriteMessage(websocket.BinaryMessage, data)
}
