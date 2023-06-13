package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"

	"gitee.com/xuender/gca"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"github.com/xuender/ge/app"
	"github.com/xuender/ge/ui"
	"github.com/xuender/kit/logs"
)

func main() {
	port := 8080
	isDebug := false
	flag.Usage = usage
	flag.IntVar(&port, "port", port, "web port")
	flag.BoolVar(&isDebug, "debug", false, "debug mode")
	flag.Parse()

	if !isDebug {
		gin.SetMode(gin.ReleaseMode)
		logs.SetLevel(logs.Info)
	}

	addr := fmt.Sprintf(":%d", port)
	app := app.NewApp()
	eng := gin.Default()
	eng.Use(gca.StaticHandler("/", ui.WWW, "www"))
	eng.GET("/ws", app.WS)
	// nolint: gosec
	lo.Must0(http.ListenAndServe(addr, eng))
}

func usage() {
	fmt.Fprintf(os.Stderr, "ges\n\n")
	fmt.Fprintf(os.Stderr, "Graphviz Editor Server.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
