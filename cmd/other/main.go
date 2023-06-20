package main

import (
	"bytes"
	"fmt"

	"github.com/awalterschulze/gographviz"
	"github.com/goccy/go-graphviz"
	"github.com/samber/lo"
)

// nolint: forbidigo
func main() {
	graphAst := lo.Must1(gographviz.ParseString(`digraph G {}`))
	graph := gographviz.NewGraph()

	lo.Must0(gographviz.Analyse(graphAst, graph))
	lo.Must0(graph.AddNode("G", "a", map[string]string{"label": "ff", "id": "xx"}))
	lo.Must0(graph.AddNode("G", "b", nil))
	lo.Must0(graph.AddEdge("a", "b", true, nil))

	fmt.Println(graph.String())
	dot := lo.Must1(graphviz.ParseBytes([]byte(graph.String())))

	gra := graphviz.New()
	defer gra.Close()

	var buf bytes.Buffer

	lo.Must0(gra.Render(dot, graphviz.XDOT, &buf))
	fmt.Println(buf.String())
}
