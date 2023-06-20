package main

import (
	"bytes"
	"fmt"

	"github.com/goccy/go-graphviz"
	"github.com/samber/lo"
)

// nolint: forbidigo
func main() {
	gra := graphviz.New()
	defer gra.Close()

	dot := lo.Must1(gra.Graph())
	defer dot.Close()

	node1 := lo.Must1(dot.CreateNode("n1"))
	node2 := lo.Must1(dot.CreateNode("n2"))
	node3 := lo.Must1(dot.CreateNode("n3"))

	node1.SetID("n1")
	node2.SetID("n2")
	node3.SetID("n3")
	node1.SetLabel("mother")
	node2.SetLabel("father")
	node3.SetLabel("son")

	edge1 := lo.Must1(dot.CreateEdge("l1", node1, node3))
	edge2 := lo.Must1(dot.CreateEdge("l2", node2, node3))

	edge1.SetID("l1")
	edge2.SetID("l2")
	edge1.SetLabel("mother and son")
	edge2.SetLabel("father an son")

	// gra.SetLayout(graphviz.PATCHWORK)
	buf := bytes.Buffer{}
	lo.Must0(gra.Render(dot, graphviz.XDOT, &buf))
	// lo.Must0(gra.Render(dot, "", &buf))
	fmt.Println(buf.String())
}
