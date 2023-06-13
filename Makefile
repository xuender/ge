default: lint test

tools:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/cespare/reflex@latest

lint:
	golangci-lint run --timeout 60s --max-same-issues 50 ./...

lint-fix:
	golangci-lint run --timeout 60s --max-same-issues 50 --fix ./...

test:
	go test -race -v ./... -gcflags=all=-l -cover

watch-test:
	reflex -t 50ms -s -- sh -c 'gotest -v ./...'

clean:
	rm -rf dist

build:
	go build -o dist/ge main.go

proto: protojs
	protoc --go_out=. pb/*.proto

protojs:
	cd ui && node_modules/.bin/pbjs -t static-module -w es6 -o src/pb.js ../pb/*.proto
	cd ui && node_modules/.bin/pbts -o src/pb.d.ts src/pb.js

build-ui:
	cd ui && node_modules/@ionic/cli/bin/ionic build --prod
	echo '' > ui/www/.gitkeep

dev-ui:
	cd ui && node_modules/@ionic/cli/bin/ionic serve -- --proxy-config proxy.conf.json

dev:
	go run cmd/ges/main.go -debug
