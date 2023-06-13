package main

import (
	"flag"
	"fmt"
	"os"

	"gitee.com/xuender/gca"
	"github.com/gin-gonic/gin"
	"github.com/xuender/ge/app"
	"github.com/xuender/ge/pb"
	"github.com/xuender/ge/ui"
	"github.com/xuender/kit/logs"
)

func main() {
	isDebug := false
	flag.Usage = usage
	flag.BoolVar(&isDebug, "debug", false, "debug mode")
	flag.Parse()

	if !isDebug {
		gin.SetMode(gin.ReleaseMode)
		logs.SetLevel(logs.Info)
	}

	app := app.NewApp()
	gui := gca.NewApp[*pb.Msg]()
	gui.OnSay = app.OnSay
	gui.IsDebug = isDebug
	gui.Static("/", "www", ui.WWW)
	gui.NewMsg = func() *pb.Msg { return &pb.Msg{} }

	gui.Run(0, "", gca.NewOption().Maximized(true))
}

func usage() {
	fmt.Fprintf(os.Stderr, "ge\n\n")
	fmt.Fprintf(os.Stderr, "Graphviz Editor.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
