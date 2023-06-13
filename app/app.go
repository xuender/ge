package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
}
