package app

import (
	"bytes"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/goccy/go-graphviz"
	"github.com/gorilla/websocket"
	"github.com/xuender/ge/pb"
	"github.com/xuender/kit/logs"
	"google.golang.org/protobuf/proto"
)

type App struct {
	upGrader websocket.Upgrader
}

func NewApp() *App {
	return &App{
		upGrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
	}
}

func (p *App) WS(ctx *gin.Context) {
	conn, err := p.upGrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		logs.E.Println(err)

		return
	}

	defer func() {
		conn.Close()
	}()

	for {
		// 读取ws中的数据
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		if mt != websocket.BinaryMessage {
			logs.D.Println(string(message))

			continue
		}

		msg := &pb.Msg{}
		if err := proto.Unmarshal(message, msg); err != nil {
			logs.E.Println(err)

			continue
		}

		p.OnSay(msg, conn)
	}
}

func (p *App) OnSay(msg *pb.Msg, conn *websocket.Conn) {
	logs.D.Println(msg)

	if msg.Dot == "" || msg.Format == pb.Format_err {
		return
	}

	if msg.Format == pb.Format_source {
		logs.Log(Send(conn, msg))

		return
	}

	gra := graphviz.New()
	defer gra.Close()
	// g.SetLayout(graphviz.PATCHWORK)
	dot, err := graphviz.ParseBytes([]byte(msg.Dot))
	if err != nil {
		logs.Log(SendError(conn, err))

		return
	}

	defer dot.Close()

	format := pb.Format_name[int32(msg.Format)]

	var buf bytes.Buffer
	if err := gra.Render(dot, graphviz.Format(format), &buf); err != nil {
		logs.E.Println(err)

		return
	}

	logs.Log(SendFormat(conn, msg.Format, buf.Bytes()))
}
