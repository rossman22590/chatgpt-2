include .env

.PHONY: all

build:
	docker build -t very-chatgpt .

run:
	export $(cat .env | xargs)
	docker stop very-chatgpt || true && docker rm very-chatgpt || true
	docker run --name very-chatgpt --rm -e OPENAI_API_KEY=${OPENAI_API_KEY} -p 3000:3000 very-chatgpt

logs:
	docker logs -f very-chatgpt

push:
	docker tag very-chatgpt:latest ${DOCKER_USER}/very-chatgpt:${DOCKER_TAG}
	docker push ${DOCKER_USER}/very-chatgpt:${DOCKER_TAG}