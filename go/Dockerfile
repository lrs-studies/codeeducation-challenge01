FROM golang:1.16-alpine as builder

WORKDIR /go/src/app
COPY . .

RUN go build main.go

FROM scratch
COPY --from=builder /go/src/app .
CMD ["/main"]